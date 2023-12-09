import {
  arbitrum,
  avalanche,
  bsc,
  mainnet,
  optimism,
  polygon,
  canto,
  celo,
  fantom,
  Chain,
} from 'wagmi/chains';

const opBNBMainnet: Chain = {
  id: 204,
  network: 'opBNB',
  name: 'opBNB Mainnet',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://1rpc.io/opbnb'],
    },
    public: {
      http: ['https://1rpc.io/opbnb'],
    },
  },
  blockExplorers: {
    default: {
      name: 'opBNBScan',
      url: 'https://opbnbscan.com',
    },
  },
};

const eosMainnet: Chain = {
  id: 17777,
  network: 'EOS EVM',
  name: 'EOS EVM Mainnet',
  nativeCurrency: {
    name: 'EOS',
    symbol: 'EOS',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://api.evm.eosnetwork.com'],
    },
    public: {
      http: ['https://api.evm.eosnetwork.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'eosnetwork',
      url: 'https://explorer.evm.eosnetwork.com/',
    },
  },
};

export const evmChains = [
  eosMainnet,
  mainnet,
  arbitrum,
  avalanche,
  bsc,
  optimism,
  polygon,
  canto,
  celo,
  fantom,
  opBNBMainnet,
];



