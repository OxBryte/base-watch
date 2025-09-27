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

- **Complete Transaction Log**: View all wallet transactions
- **Transaction Details**: Comprehensive transaction information
- **Multi-chain Aggregation**: Transactions from all supported networks
- **Real-time Updates**: Live transaction monitoring

### 🔍 Address Search

- **Universal Search**: Search any wallet address across supported chains
- **Quick Navigation**: Easy wallet switching and monitoring
- **Address Management**: Copy and save frequently monitored addresses

### 🎯 User Experience

- **Modern UI**: Clean, responsive design with dark theme
- **Privacy Controls**: Hide/show sensitive balance information
- **Mobile Responsive**: Full functionality on all devices
- **Fast Performance**: Optimized API calls and data caching

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
   ```

   **Get API Keys:**

   - [Etherscan API Key](https://etherscan.io/apis) - For blockchain data
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

## 🏗️ Project Structure

```
src/
├── components/
│   ├── features/          # Main feature components
│   │   ├── BalanceCards.jsx    # Portfolio balance display
│   │   ├── Transactions.jsx    # Transaction history tabs
│   │   ├── History.jsx         # Transaction list
│   │   └── Nft.jsx            # NFT gallery
│   ├── hooks/             # Custom React hooks
│   │   ├── useGetaBalance.js      # Balance fetching
│   │   ├── useGetTransactions.js  # Transaction history
│   │   ├── useGetTokens.js        # Token holdings
│   │   └── useGetHypeNft.js       # NFT data
│   ├── layout/            # Layout components
│   │   ├── Layout.jsx          # Main app layout
│   │   ├── Navbar.jsx          # Navigation with search
│   │   └── Footer.jsx          # App footer
│   └── utils/             # Utility functions
│       └── utils.js            # Helper functions
├── pages/                 # Route components
│   ├── Dashboard.jsx           # Main portfolio view
│   └── Home.jsx               # Landing page
└── App.jsx               # Main app component
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks
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
