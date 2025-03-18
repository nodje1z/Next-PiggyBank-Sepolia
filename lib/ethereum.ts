import { ethers } from 'ethers';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

// Add debug logging for contract address
console.log("Contract address used:", contractAddress);
if (!contractAddress) {
  console.error("Contract address is undefined! Check .env.local file.");
}

const contractABI = require('./contracts/PiggyBankABI.json');

//returns a contract instance with signer to perform transactions
const getContractWithSigner = async () => {
  const { ethereum } = window as any;

  if (ethereum && ethereum.isMetaMask) {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signer = web3Provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    throw new Error("MetaMask is not installed");
  }
};


const deposit = async (amount: string) => {
  const contractWithSigner = await getContractWithSigner();
  const transaction = await contractWithSigner.signer.sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther(amount)
  });
  await transaction.wait();
};


const withdraw = async (amount: string) => {
  const contractWithSigner = await getContractWithSigner();
  const transaction = await contractWithSigner.withdraw(ethers.utils.parseEther(amount));
  await transaction.wait();
};


const getBalance = async () => {
  try {
    const contractWithSigner = await getContractWithSigner();
    console.log("Contract instance created with address:", contractAddress);
    
    // Check if contract is properly initialized
    if (!contractWithSigner || !contractWithSigner.getBalance) {
      console.error("Contract instance or getBalance method is undefined");
      return "0";
    }
    
    const balance = await contractWithSigner.getBalance();
    console.log("Balance from contract:", balance.toString());
    return ethers.utils.formatEther(balance);
  } catch (error: any) {
    console.error("Error fetching balance:", error);
    // Return more specific error message based on the type of error
    if (error.message && error.message.includes("MetaMask")) {
      console.error("MetaMask error:", error.message);
    } else if (error.message && error.message.includes("network")) {
      console.error("Network error:", error.message);
    }
    throw error;
  }
};


export { deposit, withdraw, getBalance };
