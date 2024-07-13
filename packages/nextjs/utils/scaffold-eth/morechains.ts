import { defineChain } from "viem"

export const zircuit = defineChain(
    {
      id: 48899,
      network: 'zircuit',
      name: 'Zircuit Testnet',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: {
          http: ['https://zircuit1.p2pify.com/'],
        },
        public: {
          http: ['https://zircuit1.p2pify.com/'],
        },
      },
      blockExplorers: {
        blockscout: {
          name: 'Blockscout',
          url: 'https://explorer.zircuit.com',
        },
        default: {
          name: 'Blockscout',
          url: 'https://explorer.zircuit.com',
        },
      },
      testnet: true,
  
    },

  )