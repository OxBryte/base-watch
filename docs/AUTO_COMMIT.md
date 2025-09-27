# Auto-Commit Feature 🤖

The Base Watch project includes an auto-commit feature that automatically commits your changes at regular intervals. This is particularly useful during development sessions to ensure no work is lost.

## 🚀 Quick Start

### Basic Usage (2-minute intervals)

```bash
npm run auto-commit
```

### Custom Interval

```bash
# Auto-commit every 5 minutes
npm run auto-commit:custom 5

# Auto-commit every 30 seconds (for testing)
npm run auto-commit:custom 0.5
```

### Help & Options

```bash
npm run auto-commit:help
```

## ✨ Features

- ✅ **Automatic Change Detection**: Only commits when there are actual changes
- ✅ **Timestamped Messages**: Each commit includes timestamp and counter
- ✅ **Change Summary**: Shows what files were modified/added/deleted
- ✅ **Graceful Shutdown**: Stop with `Ctrl+C`
- ✅ **Customizable Interval**: Set any interval in minutes
- ✅ **Git Safety**: Only works in git repositories
- ✅ **Zero Dependencies**: Uses only Node.js built-ins

## 📝 Commit Message Format

Auto-commits use this format:

```
🤖 Auto-commit #5 - 2025-01-20 15:30:45
```

Where:

- `🤖` indicates it's an automated commit
- `#5` is the commit counter for this session
- Timestamp shows when the commit was made

## 🔧 How It Works

1. **Initial Check**: Immediately checks for changes when started
2. **Periodic Monitoring**: Checks for changes every N minutes
3. **Smart Committing**: Only commits if there are staged or unstaged changes
4. **Automatic Staging**: Uses `git add .` to stage all changes
5. **Detailed Logging**: Shows exactly what was committed

## 📊 Console Output

```bash
🚀 Starting auto-commit service...
⏱️  Commit interval: 2 minutes
🛑 Press Ctrl+C to stop
──────────────────────────────────────────────────

✅ 2025-01-20 15:28:30 - Successfully committed changes:
   📝 Modified: 3 files
   ➕ Added: 1 files
   🆕 New: 2 files

⏰ 2025-01-20 15:30:30 - No changes to commit

✅ 2025-01-20 15:32:30 - Successfully committed changes:
   📝 Modified: 1 files
```

## ⚙️ Configuration Options

### Interval Setting

```bash
# Minutes (decimals supported)
node scripts/auto-commit.js --interval=2     # 2 minutes
node scripts/auto-commit.js --interval=0.5   # 30 seconds
node scripts/auto-commit.js --interval=10    # 10 minutes
```

### Direct Script Usage

```bash
# Run directly with Node.js
node scripts/auto-commit.js
node scripts/auto-commit.js --interval=5
node scripts/auto-commit.js --help
```

## 🚨 Important Notes

### ⚠️ Development Use Only

This feature is intended for development environments only. **Do not use in production** or for final commits to shared repositories.

### 🔄 Git Repository Required

The script will only work in a properly initialized git repository:

```bash
git init  # Initialize if needed
```

### 🛑 Stopping the Service

- Press `Ctrl+C` to stop the auto-commit service
- The script will show total commits made before exiting

### 📦 What Gets Committed

- All modified files (`git add .`)
- All new untracked files
- All staged changes
- **Note**: Respects `.gitignore` rules

## 🎯 Use Cases

### Perfect For:

- 🔄 **Rapid Prototyping**: Never lose experimental changes
- 📚 **Learning Sessions**: Automatic backup while learning
- 🧪 **Feature Development**: Regular snapshots during development
- 🏃‍♂️ **Hackathons**: Continuous backup during time-pressured coding

### Not Recommended For:

- 📝 **Final Commits**: Use meaningful commit messages for production
- 🤝 **Shared Repositories**: Other developers don't need auto-commits
- 📦 **Release Branches**: Keep clean history for releases

## 🔧 Troubleshooting

### "Not in a git repository" Error

```bash
git init
git add .
git commit -m "Initial commit"
npm run auto-commit
```

### Permission Denied

```bash
chmod +x scripts/auto-commit.js
```

### Script Not Found

Ensure you're in the project root directory where `package.json` exists.

## 🚀 Advanced Usage

### Integration with Development Workflow

```bash
# Terminal 1: Development server
npm run dev

# Terminal 2: Auto-commit (in another terminal)
npm run auto-commit
```

### Custom Git Hooks Integration

You can integrate this with git hooks for more advanced workflows by modifying the script to trigger on specific events.

---

**💡 Pro Tip**: Use shorter intervals (30 seconds to 1 minute) during intensive coding sessions, and longer intervals (5-10 minutes) for regular development work.
