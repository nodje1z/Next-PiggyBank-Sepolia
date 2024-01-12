import { ethers } from 'ethers';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

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
    const balance = await contractWithSigner.getBalance();
    console.log("Balance from contract:", balance.toString());
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};


export { deposit, withdraw, getBalance };
