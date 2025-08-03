import { ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "11155111";

// Mock ABI for voting contract
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "candidateId", "type": "uint256"}],
    "name": "castVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getResults",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "candidates",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "hasVoted",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export interface VoteResult {
  candidateId: number;
  candidateName: string;
  voteCount: number;
}

export const getProvider = () => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }
  throw new Error("MetaMask is not installed. Please install MetaMask to use this application.");
};

export const connectWallet = async () => {
  try {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  } catch (error: any) {
    throw new Error("Failed to connect wallet: " + error.message);
  }
};

export const getContract = async () => {
  try {
    const { signer } = await connectWallet();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  } catch (error: any) {
    throw new Error("Failed to get contract instance: " + error.message);
  }
};

export const castVote = async (candidateId: number) => {
  try {
    const contract = await getContract();
    const tx = await contract.castVote(candidateId);
    await tx.wait();
    return {
      success: true,
      transactionHash: tx.hash,
      message: "Vote cast successfully!"
    };
  } catch (error: any) {
    console.error("Vote casting error:", error);
    throw new Error("Failed to cast vote: " + (error.reason || error.message));
  }
};

export const getResults = async (): Promise<VoteResult[]> => {
  try {
    // Mock data for demonstration since we don't have a real deployed contract
    const mockResults: VoteResult[] = [
      { candidateId: 1, candidateName: "Narendra Modi (BJP)", voteCount: 1250 },
      { candidateId: 2, candidateName: "Rahul Gandhi (INC)", voteCount: 980 },
      { candidateId: 3, candidateName: "Arvind Kejriwal (AAP)", voteCount: 750 },
      { candidateId: 4, candidateName: "Mamata Banerjee (AITC)", voteCount: 620 },
      { candidateId: 5, candidateName: "Independent Candidate", voteCount: 340 }
    ];
    
    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockResults;
  } catch (error: any) {
    throw new Error("Failed to fetch results: " + error.message);
  }
};

export const checkVotingStatus = async (address: string): Promise<boolean> => {
  try {
    // Mock implementation - in real scenario, this would check blockchain
    const votedAddresses = JSON.parse(localStorage.getItem('votedAddresses') || '[]');
    return votedAddresses.includes(address.toLowerCase());
  } catch (error: any) {
    throw new Error("Failed to check voting status: " + error.message);
  }
};

export const markAsVoted = (address: string) => {
  try {
    const votedAddresses = JSON.parse(localStorage.getItem('votedAddresses') || '[]');
    if (!votedAddresses.includes(address.toLowerCase())) {
      votedAddresses.push(address.toLowerCase());
      localStorage.setItem('votedAddresses', JSON.stringify(votedAddresses));
    }
  } catch (error) {
    console.error("Failed to mark as voted:", error);
  }
};

export const getCandidates = () => {
  return [
    { id: 1, name: "Narendra Modi", party: "Bharatiya Janata Party (BJP)", symbol: "Lotus" },
    { id: 2, name: "Rahul Gandhi", party: "Indian National Congress (INC)", symbol: "Hand" },
    { id: 3, name: "Arvind Kejriwal", party: "Aam Aadmi Party (AAP)", symbol: "Broom" },
    { id: 4, name: "Mamata Banerjee", party: "All India Trinamool Congress (AITC)", symbol: "Flowers" },
    { id: 5, name: "Independent Candidate", party: "Independent", symbol: "Cricket Ball" }
  ];
};
