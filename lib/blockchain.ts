import { ethers } from 'ethers';

// ALCHEMY_API_KEY ကို .env.local ထဲမှာ ထည့်ထားရပါမယ်
const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);

export const getGasPrice = async () => {
  try {
    const feeData = await provider.getFeeData();
    return {
      baseFee: ethers.formatUnits(feeData.gasPrice || 0, 'gwei'),
      propose: ethers.formatUnits(feeData.maxFeePerGas || 0, 'gwei'),
      fast: ethers.formatUnits(feeData.maxPriorityFeePerGas || 0, 'gwei')
    };
  } catch (error) {
    console.error("Error fetching gas price:", error);
    return null;
  }
};

export const getPortfolioBalance = async (address: string) => {
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0";
  }
};