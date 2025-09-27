#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutoCommitter {
  constructor(intervalMinutes = 2) {
    this.intervalMs = intervalMinutes * 60 * 1000;
    this.isRunning = false;
    this.commitCount = 0;
  }

  // Check if there are any changes to commit
  hasChanges() {
    try {
      const status = execSync("git status --porcelain", { encoding: "utf-8" });
      return status.trim().length > 0;
    } catch (error) {
      console.error("Error checking git status:", error.message);
      return false;
    }
  }

  // Get current timestamp for commit message
  getTimestamp() {
    return new Date().toISOString().replace("T", " ").substring(0, 19);
  }

  // Generate commit message
  generateCommitMessage() {
    const timestamp = this.getTimestamp();
    this.commitCount++;
    return `🤖 Auto-commit #${this.commitCount} - ${timestamp}`;
  }

  // Get summary of changes
  getChangesSummary() {
    try {
      const status = execSync("git status --porcelain", { encoding: "utf-8" });
      const lines = status
        .trim()
        .split("\n")
        .filter((line) => line);

      const changes = {
        modified: [],
        added: [],
        deleted: [],
        renamed: [],
        untracked: [],
      };

      lines.forEach((line) => {
        const statusCode = line.substring(0, 2);
        const fileName = line.substring(3);

        if (statusCode.includes("M")) changes.modified.push(fileName);
        else if (statusCode.includes("A")) changes.added.push(fileName);
        else if (statusCode.includes("D")) changes.deleted.push(fileName);
        else if (statusCode.includes("R")) changes.renamed.push(fileName);
        else if (statusCode.includes("??")) changes.untracked.push(fileName);
      });

      return changes;
    } catch (error) {
      console.error("Error getting changes summary:", error.message);
      return null;
    }
  }

  // Perform the auto-commit
  async performCommit() {
    try {
      if (!this.hasChanges()) {
        console.log(`⏰ ${this.getTimestamp()} - No changes to commit`);
        return;
      }

      const changes = this.getChangesSummary();
      const commitMessage = this.generateCommitMessage();

      // Add all changes
      execSync("git add .", { stdio: "pipe" });

      // Commit with generated message
      execSync(`git commit -m "${commitMessage}"`, { stdio: "pipe" });

      console.log(
        `✅ ${this.getTimestamp()} - Successfully committed changes:`
      );
      if (changes) {
        if (changes.modified.length > 0) {
          console.log(`   📝 Modified: ${changes.modified.length} files`);
        }
        if (changes.added.length > 0) {
          console.log(`   ➕ Added: ${changes.added.length} files`);
        }
        if (changes.deleted.length > 0) {
          console.log(`   ❌ Deleted: ${changes.deleted.length} files`);
        }
        if (changes.untracked.length > 0) {
          console.log(`   🆕 New: ${changes.untracked.length} files`);
        }
      }
    } catch (error) {
      console.error(
        `❌ ${this.getTimestamp()} - Commit failed:`,
        error.message
      );
    }
  }

  // Start the auto-commit process
  start() {
    if (this.isRunning) {
      console.log("🚫 Auto-commit is already running!");
      return;
    }

    console.log("🚀 Starting auto-commit service...");
    console.log(`⏱️  Commit interval: ${this.intervalMs / 1000 / 60} minutes`);
    console.log("🛑 Press Ctrl+C to stop");
    console.log("─".repeat(50));

    this.isRunning = true;

    // Initial commit check
    this.performCommit();

    // Set up interval for auto-commits
    this.intervalId = setInterval(() => {
      this.performCommit();
    }, this.intervalMs);

    // Handle graceful shutdown
    process.on("SIGINT", () => {
      this.stop();
    });

    process.on("SIGTERM", () => {
      this.stop();
    });
  }

  // Stop the auto-commit process
  stop() {
    if (!this.isRunning) {
      return;
    }

    console.log("\n🛑 Stopping auto-commit service...");

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.isRunning = false;
    console.log(
      `✅ Auto-commit stopped. Total commits made: ${this.commitCount}`
    );
    process.exit(0);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);

  // Default interval is 2 minutes
  let interval = 2;

  // Check for custom interval argument
  const intervalArg = args.find((arg) => arg.startsWith("--interval="));
  if (intervalArg) {
    const customInterval = parseInt(intervalArg.split("=")[1]);
    if (!isNaN(customInterval) && customInterval > 0) {
      interval = customInterval;
    }
  }

  // Check for help flag
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
🤖 Auto-Commit Script

Usage: node auto-commit.js [options]

Options:
  --interval=N    Set commit interval in minutes (default: 2)
  --help, -h      Show this help message

Examples:
  node auto-commit.js                    # Auto-commit every 2 minutes
  node auto-commit.js --interval=5       # Auto-commit every 5 minutes

This script will:
- Monitor your git repository for changes
- Automatically commit changes every N minutes
- Generate timestamped commit messages
- Show a summary of changes being committed
- Run until stopped with Ctrl+C
    `);
    process.exit(0);
  }

  // Check if we're in a git repository
  try {
    execSync("git rev-parse --git-dir", { stdio: "pipe" });
  } catch (error) {
    console.error("❌ Error: Not in a git repository!");
    console.log("💡 Initialize git first: git init");
    process.exit(1);
  }

  // Start the auto-committer
  const autoCommitter = new AutoCommitter(interval);
  autoCommitter.start();
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default AutoCommitter;
