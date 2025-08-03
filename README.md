# Blockchain Voting System for India

A secure, transparent, and decentralized voting system built with blockchain technology, designed specifically for Indian elections. This application leverages Next.js, TypeScript, and Ethereum blockchain to ensure tamper-proof and verifiable voting.

## 🚀 Features

- **Secure Blockchain Voting**: All votes are recorded on the Ethereum blockchain for transparency and immutability
- **Digital Identity Verification**: Aadhaar-based voter registration and verification
- **Real-time Results**: Live voting results with instant blockchain updates
- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS and shadcn/ui
- **Wallet Integration**: MetaMask wallet connectivity for secure transactions
- **Admin Dashboard**: Comprehensive analytics and voting statistics
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Blockchain**: Ethereum, ethers.js
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and local storage
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MetaMask browser extension
- Basic understanding of blockchain and cryptocurrency wallets

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blockchain-voting-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Blockchain Configuration
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4
   NEXT_PUBLIC_NETWORK_NAME=Ethereum Testnet
   NEXT_PUBLIC_CHAIN_ID=11155111
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:8000](http://localhost:8000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── register/          # Voter registration
│   ├── vote/              # Voting interface
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/ui/         # shadcn/ui components
├── lib/
│   ├── blockchain.ts      # Blockchain integration
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## 🔐 Security Features

- **Blockchain Immutability**: All votes are permanently recorded on the blockchain
- **Digital Signatures**: Each vote is cryptographically signed
- **Wallet Authentication**: Secure wallet-based user authentication
- **One Vote Per Address**: Smart contract prevents double voting
- **Transparent Verification**: All transactions are publicly verifiable

## 📱 Application Pages

### 1. Home Page (`/`)
- Landing page with system overview
- Navigation to all major features
- Information about blockchain voting benefits

### 2. Voter Registration (`/register`)
- Aadhaar-based registration form
- Personal information collection
- Terms and conditions acceptance
- Form validation with Zod schema

### 3. Voting Interface (`/vote`)
- Candidate selection interface
- MetaMask wallet integration
- Vote casting with blockchain confirmation
- Real-time transaction status

### 4. Admin Dashboard (`/admin`)
- Live voting results
- Detailed analytics and statistics
- Blockchain network status
- Vote distribution charts

## 🔗 Blockchain Integration

The application integrates with Ethereum blockchain through:

- **Smart Contract**: Voting logic deployed on Ethereum testnet
- **Web3 Provider**: MetaMask integration for wallet connectivity
- **Transaction Handling**: Secure vote casting and result retrieval
- **Gas Optimization**: Efficient smart contract interactions

### Key Blockchain Functions

```typescript
// Cast a vote for a candidate
await castVote(candidateId)

// Retrieve current voting results
const results = await getResults()

// Check if an address has already voted
const hasVoted = await checkVotingStatus(address)

// Connect to user's wallet
const { address } = await connectWallet()
```

## 🎨 UI Components

Built with shadcn/ui components for consistency and accessibility:

- **Cards**: Candidate information and result displays
- **Forms**: Registration and voting interfaces
- **Tables**: Detailed results and analytics
- **Alerts**: Status messages and error handling
- **Progress Bars**: Vote percentage visualization
- **Badges**: Status indicators and labels

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   Set the following in Vercel dashboard:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_NETWORK_NAME`
   - `NEXT_PUBLIC_CHAIN_ID`

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Wallet connection functionality
- [ ] Voter registration form validation
- [ ] Vote casting process
- [ ] Results display accuracy
- [ ] Responsive design on mobile devices
- [ ] Error handling for failed transactions

### Browser Testing

Test the application in:
- Chrome (with MetaMask)
- Firefox (with MetaMask)
- Safari (with compatible wallet)
- Mobile browsers

## 🔧 Configuration

### Blockchain Network Configuration

To connect to a different network, update `.env.local`:

```env
# For Ethereum Mainnet
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_NETWORK_NAME=Ethereum Mainnet

# For Polygon
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_NETWORK_NAME=Polygon
```

### Candidate Configuration

Candidates are configured in `src/lib/blockchain.ts`:

```typescript
export const getCandidates = () => {
  return [
    { id: 1, name: "Candidate Name", party: "Party Name", symbol: "Symbol" },
    // Add more candidates here
  ];
};
```

## 🐛 Troubleshooting

### Common Issues

1. **MetaMask Not Detected**
   - Ensure MetaMask extension is installed and enabled
   - Refresh the page after installing MetaMask

2. **Transaction Failures**
   - Check network connection
   - Ensure sufficient ETH for gas fees
   - Verify contract address is correct

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run build`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the Next.js and ethers.js documentation

## 🔮 Future Enhancements

- [ ] Multi-language support (Hindi, regional languages)
- [ ] Biometric authentication integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with Election Commission APIs
- [ ] Offline voting capability with sync
- [ ] Enhanced security auditing

---

**Built with ❤️ for Digital India Initiative**
=======
