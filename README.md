# Base Watch 🌊

A comprehensive multi-chain portfolio monitoring application for tracking cryptocurrency wallets across multiple blockchains. Monitor your assets, NFTs, and transaction history all in one place.

## ✨ Features

### 📊 Portfolio Monitoring

- **Real-time Balance Tracking**: Monitor ETH balances with USD conversion
- **Multi-chain Support**: Track assets across 10+ supported blockchains
- **Net Worth Display**: View total portfolio value with privacy toggle
- **Auto-refresh**: Real-time updates with manual refresh capability

### 🎨 NFT Collection Viewer

- **NFT Gallery**: Browse your NFT collection with high-quality previews
- **Interactive Media**: Support for images, animations, and HTML-based NFTs
- **Collection Grouping**: Organized view of NFT collections
- **Pagination**: Efficient loading with load-more functionality

### 📈 Transaction History

- **Complete Transaction Log**: View all wallet transactions with pagination (25 per page)
- **Transaction Details**: Comprehensive transaction information with external links
- **Multi-chain Aggregation**: Transactions from all supported networks
- **Real-time Updates**: Live transaction monitoring
- **Smart Pagination**: Navigate through large transaction histories efficiently
- **Interactive Analytics**: GitHub-style heatmap showing 365 days of activity

### 🔍 Address Search

- **Universal Search**: Search any wallet address across supported chains
- **Quick Navigation**: Easy wallet switching and monitoring
- **Address Management**: Copy and save frequently monitored addresses

### 🎯 User Experience

- **Modern UI**: Clean, responsive design with dark theme
- **Privacy Controls**: Hide/show sensitive balance information
- **Mobile Responsive**: Full functionality on all devices
- **Fast Performance**: Optimized API calls and data caching

### 🔗 Wallet Integration

- **Multi-Wallet Support**: Connect with MetaMask, WalletConnect, and more
- **Network Switching**: Seamless switching between supported networks
- **Real-time Connection**: Live connection status with visual indicators
- **Disconnect Control**: Easy wallet disconnection and management

### 📊 Advanced Analytics

- **Transaction Heatmap**: GitHub-style 365-day activity visualization
- **Interactive Tooltips**: Hover over any day to see transaction details
- **Weekly Patterns**: Bar chart showing activity by day of week
- **Volume Analytics**: Total volume, average transaction value, and peak activity
- **Smart Data Processing**: Automatic Wei to ETH conversion and date formatting

## 🌐 Supported Chains

| Chain ID | Network          | Status |
| -------- | ---------------- | ------ |
| 1        | Ethereum Mainnet | ✅     |
| 10       | Optimism         | ✅     |
| 137      | Polygon          | ✅     |
| 8453     | Base             | ✅     |
| 42161    | Arbitrum One     | ✅     |
| 42220    | Celo             | ✅     |
| 43114    | Avalanche        | ✅     |
| 146      | Sonic Mainnet    | ✅     |
| 534352   | Scroll           | ✅     |
| 81457    | Blast            | ✅     |
| 999      | Zora Network     | ✅     |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/base-watch.git
   cd base-watch
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_ETHERSCAN_API_TOKEN=your_etherscan_api_key_here
   VITE_REOWN_PROJECT_ID=your_reown_project_id_here
   ```

   **Get API Keys:**

   - [Etherscan API Key](https://etherscan.io/apis) - For blockchain data
   - [Reown Project ID](https://dashboard.reown.com) - For wallet connectivity
   - The app also uses HyperScan API for NFT data (no key required)

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### 🤖 Auto-Commit Feature

For development convenience, you can enable automatic commits every 2 minutes:

```bash
# Auto-commit every 2 minutes (default)
npm run auto-commit

# Custom interval (e.g., every 5 minutes)
npm run auto-commit:custom 5

# View help and options
npm run auto-commit:help
```

**Features:**

- ✅ Automatically commits changes every N minutes
- ✅ Only commits when there are actual changes
- ✅ Timestamped commit messages with counters
- ✅ Shows summary of modified/added/deleted files
- ✅ Stop anytime with `Ctrl+C`

**Note:** This feature is for development only. See [AUTO_COMMIT.md](docs/AUTO_COMMIT.md) for detailed documentation.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── features/          # Main feature components
│   │   ├── Analytics.jsx       # Transaction analytics & heatmap
│   │   ├── BalanceCards.jsx    # Portfolio balance display
│   │   ├── ConnectButton.jsx   # Wallet connection & network switching
│   │   ├── History.jsx         # Paginated transaction list
│   │   ├── Nft.jsx            # NFT gallery
│   │   └── Transactions.jsx    # Transaction history tabs
│   ├── hooks/             # Custom React hooks
│   │   ├── useGetaBalance.js      # Balance fetching
│   │   ├── useGetHypeNft.js       # NFT data fetching
│   │   ├── useGetTokens.js        # Token holdings
│   │   └── useGetTransactions.js  # Transaction history
│   ├── layout/            # Layout components
│   │   ├── Layout.jsx          # Main app layout
│   │   ├── Navbar.jsx          # Navigation with search
│   │   └── Footer.jsx          # App footer
│   └── utils/             # Utility functions
│       └── utils.js            # Helper functions
├── pages/                 # Route components
│   ├── Dashboard.jsx           # Main portfolio view
│   └── Home.jsx               # Landing page
├── scripts/               # Development tools
│   └── auto-commit.js          # Auto-commit functionality
├── docs/                  # Documentation
│   └── AUTO_COMMIT.md          # Auto-commit guide
├── provider.jsx           # Wallet & network provider setup
└── App.jsx               # Main app component
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks + TanStack Query
- **Wallet Integration**: Reown AppKit (formerly WalletConnect) + Wagmi
- **Blockchain Interaction**: Viem + Wagmi
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Package Manager**: Yarn

## 🔌 API Integration

### Blockchain Data

- **Etherscan API v2**: Multi-chain blockchain data
- **CoinGecko API**: Real-time price data

### NFT Data

- **HyperScan API**: NFT metadata and collections

## 📱 Usage

1. **Search Wallet**: Enter any wallet address in the search bar
2. **View Portfolio**: Monitor balances, NFTs, and transaction history
3. **Switch Chains**: Data automatically aggregates from all supported chains
4. **Navigate Tabs**: Switch between Holdings, NFTs, and Transactions
5. **Privacy Toggle**: Hide/show sensitive balance information
6. **Refresh Data**: Use refresh buttons for real-time updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://base-watch.vercel.app](https://base-watch.vercel.app)
- **Repository**: [https://github.com/yourusername/base-watch](https://github.com/yourusername/base-watch)

## 🙏 Acknowledgments

- Etherscan for comprehensive blockchain APIs
- HyperScan for NFT data services
- CoinGecko for cryptocurrency pricing
- The entire Web3 community for building the infrastructure

---

**© 2025 Base Watch. All rights reserved.**
