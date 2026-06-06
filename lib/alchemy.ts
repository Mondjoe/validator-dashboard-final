/**
 * Alchemy API Integration
 * Fetches real blockchain data for NFTs, tokens, and transactions
 */

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'demo';
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export interface AlchemyNFT {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  };
  title: string;
  description: string;
  media: Array<{
    gateway: string;
    raw: string;
  }>;
  metadata: {
    image: string;
    name: string;
    description: string;
    attributes?: Array<{
      trait_type: string;
      value: string;
    }>;
  };
  timeLastUpdated: string;
}

export interface AlchemyTokenBalance {
  contractAddress: string;
  tokenBalance: string;
  error: string | null;
}

export interface AlchemyTransaction {
  blockNum: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  input: string;
  methodId: string;
  functionName: string;
  blockHash: string;
  transactionIndex: string;
  type: string;
  category: string;
  rawContract: {
    value: string;
    address: string;
    decimal: string;
  };
}

/**
 * Fetch NFTs owned by wallet address
 */
export async function fetchNFTs(walletAddress: string) {
  try {
    const response = await fetch(
      `${ALCHEMY_BASE_URL}/getNFTs?owner=${walletAddress}&withMetadata=true&pageSize=100`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Alchemy API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.ownedNfts || [];
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return [];
  }
}

/**
 * Fetch token balances for wallet
 */
export async function fetchTokenBalances(walletAddress: string) {
  try {
    const response = await fetch(ALCHEMY_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'alchemy_getTokenBalances',
        params: [walletAddress, 'erc20'],
        id: 1,
      }),
    });

    const data = await response.json();
    return data.result?.tokenBalances || [];
  } catch (error) {
    console.error('Error fetching token balances:', error);
    return [];
  }
}

/**
 * Fetch transaction history for wallet
 */
export async function fetchTransactions(walletAddress: string) {
  try {
    const response = await fetch(
      `${ALCHEMY_BASE_URL}/getAssetTransfers?fromAddress=${walletAddress}&category=external,internal,erc20,erc721,erc1155&maxCount=100`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Alchemy API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.transfers || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

/**
 * Get ETH balance for wallet
 */
export async function fetchETHBalance(walletAddress: string) {
  try {
    const response = await fetch(ALCHEMY_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [walletAddress, 'latest'],
        id: 1,
      }),
    });

    const data = await response.json();
    const balanceHex = data.result;
    const balanceWei = parseInt(balanceHex, 16);
    const balanceEth = balanceWei / 1e18;
    return balanceEth;
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    return 0;
  }
}

/**
 * Get wallet portfolio summary
 */
export async function fetchPortfolioSummary(walletAddress: string) {
  try {
    const [nfts, tokenBalances, ethBalance] = await Promise.all([
      fetchNFTs(walletAddress),
      fetchTokenBalances(walletAddress),
      fetchETHBalance(walletAddress),
    ]);

    return {
      nfts,
      tokenBalances,
      ethBalance,
      totalNFTs: nfts.length,
      totalTokens: tokenBalances.length,
    };
  } catch (error) {
    console.error('Error fetching portfolio summary:', error);
    return {
      nfts: [],
      tokenBalances: [],
      ethBalance: 0,
      totalNFTs: 0,
      totalTokens: 0,
    };
  }
}

/**
 * Get current gas price
 */
export async function fetchGasPrice() {
  try {
    const response = await fetch(ALCHEMY_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        id: 1,
      }),
    });

    const data = await response.json();
    const gasPriceHex = data.result;
    const gasPriceWei = parseInt(gasPriceHex, 16);
    const gasPriceGwei = gasPriceWei / 1e9;
    return gasPriceGwei;
  } catch (error) {
    console.error('Error fetching gas price:', error);
    return 0;
  }
}

/**
 * Get block number
 */
export async function fetchBlockNumber() {
  try {
    const response = await fetch(ALCHEMY_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        id: 1,
      }),
    });

    const data = await response.json();
    return parseInt(data.result, 16);
  } catch (error) {
    console.error('Error fetching block number:', error);
    return 0;
  }
}
