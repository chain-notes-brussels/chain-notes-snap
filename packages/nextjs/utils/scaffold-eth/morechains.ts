import { defineChain } from "viem";

export const zircuit = defineChain({
  id: 48899,
  network: "zircuit",
  name: "Zircuit Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://zircuit1.p2pify.com/"],
    },
    public: {
      http: ["https://zircuit1.p2pify.com/"],
    },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://explorer.zircuit.com",
    },
    default: {
      name: "Blockscout",
      url: "https://explorer.zircuit.com",
    },
  },
  testnet: true,
});

export const apeChain = defineChain({
  id: 1798,
  network: "Jenkins",
  name: "apeChain Jenkins",
  nativeCurrency: { name: "APE", symbol: "APE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://jenkins.rpc.caldera.xyz/http"],
    },
    public: {
      http: ["https://jenkins.rpc.caldera.xyz/http"],
    },
  },
  testnet: true,
});

export const zerion = defineChain({
  id: 4457845,
  network: "ZERϴ Network",
  name: "ZERϴ Network",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.zerion.io/v1/zero-sepolia"],
    },
    public: {
      http: ["https://rpc.zerion.io/v1/zero-sepolia"],
    },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://explorer.zero.network",
    },
    default: {
      name: "Blockscout",
      url: "https://explorer.zero.network",
    },
  },
  testnet: true,
});

export const morph = defineChain({
  id: 2810,
  network: "Morph Holesky Testnet",
  name: "Morph Holesky Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-quicknode-holesky.morphl2.io"],
    },
    public: {
      http: ["https://rpc-quicknode-holesky.morphl2.io"],
    },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://explorer-holesky.morphl2.io",
    },
    default: {
      name: "Blockscout",
      url: "https://explorer-holesky.morphl2.io",
    },
  },
  testnet: true,
});
