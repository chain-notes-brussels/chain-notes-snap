# 🏗 Chain Notes

<h4 align="center">
  <a href="https://github.com/chain-notes-brussels/chain-notes-snap">Repo</a> |
  <a href="https://chain-notes.vercel.app/">Website</a>
</h4>

🫰 Always falling for rugs and scams? Afraid to claim airdrops because you're unsure if the contract is safe? Chain Notes provides context about a contract, before a transaction. The context can show if a contract is malicious or safe, or provide other insightful information. What is shown is based on notes that are linked to an address, and voted on by the community. The voting logic is inspired on Twitter/X's implementation of Community Notes and [Vitalik's blog post](https://vitalik.eth.limo/general/2023/08/16/communitynotes.html).

⚙️ Built using NextJS, Foundry, Metamask Snap, WorldCoin and The Graph.

- ✅ **User friendly UX**: Our Metamask Snap shows the most useful note/context before the user approves a transaction, to ensure the user does not interact with any malicious contracts.
- 🧱 **Sybil resistant**: Using Worldcoin WorldID ensures that every person can only vote once on a note.
- ⛓️ **Available on all chains**: Chain Notes is available on all EVM chains!

## Bounties

### Worldcoin

### Base - Best Consumer App UX

Our dApp is deployed on Base testnet. Our dApp provides context to contracts before approving a transaction, which can be used to warn users about malicious contracts. We think this is a great improvement to UX, since it's not intrusive and keeps users informed and safe.

### Arbitrum - Best General Project Built on Arbitrum Technology

Deployed our project on Arbitrum testnet.

### Metamask Linea

We created a metamask snap ([in a seperate repo](https://github.com/chain-notes-brussels/snap)) and deployed to Linea testnet.

### Morph

We deployed our contracts on Morph Holesky and manually added the config for the frontend, since this is not available yet in viem and scaffold. Bridging tokens to Morph and deploying was very straightforward. Only hickup we encountered was that we had to manually add network config on the frontend. 

- [Manual network config](https://github.com/chain-notes-brussels/chain-notes-snap/blob/d71b19303b4d260dab5b9d66f40d89af665c750b/packages/nextjs/utils/scaffold-eth/morechains.ts)

### Scroll - Best Project on Scroll

### Neon EVM - Best Use Case of Neon EVM

We deployed our contracts to the Neon EVM.

### ApeCoin - Best Dapp

We deployed our contracts to the ApeChain. Also we added custom config for the network on the frontend, since it was not available in viem and scaffold by default.
- [Manual network config](https://github.com/chain-notes-brussels/chain-notes-snap/blob/d71b19303b4d260dab5b9d66f40d89af665c750b/packages/nextjs/utils/scaffold-eth/morechains.ts)


### Zerion - Best build on ZERϴ Network

We deployed our contracts on Zerio testnet. Also we added custom config for the network on the frontend, since it was not available in viem and scaffold by default.
- [Manual network config](https://github.com/chain-notes-brussels/chain-notes-snap/blob/d71b19303b4d260dab5b9d66f40d89af665c750b/packages/nextjs/utils/scaffold-eth/morechains.ts)

### Zircuit - Best Project on Zircuit

We deployed our contracts on Zircuit and manually added the config for the frontend, since this is not available yet in viem and scaffold. Getting testnet tokens and deploying on Zircuit was very smooth. Only hickup we encountered was that we had to manually add network config on the frontend.

- [Zircuit manual network config](https://github.com/chain-notes-brussels/chain-notes-snap/blob/d71b19303b4d260dab5b9d66f40d89af665c750b/packages/nextjs/utils/scaffold-eth/morechains.ts)


## Links

- [Live dApp on Vercel](https://chain-notes.vercel.app/)
- [Github: Solidity contract and frontend dashboard](https://github.com/chain-notes-brussels/chain-notes-snap)
- [Github: Metamask Snap](https://github.com/chain-notes-brussels/snap)

### Deployed contracts
- [Notes.sol on Sepolia](https://sepolia.etherscan.io/address/0x62a4d5b0f16d8eb9065310afbb7f2622d981f124)

### References
- [Vitalik blog - What do I think about Community Notes?](https://vitalik.eth.limo/general/2023/08/16/communitynotes.html)

## Team

- [arjanjohan](https://x.com/arjanjohan/)
- [0xjsi.eth](https://twitter.com/0xjsieth)
- [Aleksandre Tsetskhladze](https://twitter.com/atsetsoffc)