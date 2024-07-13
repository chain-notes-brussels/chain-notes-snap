/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  11155111: {
    Notes: {
      address: "0x62a4d5b0f16d8eb9065310afbb7f2622d981f124",
      abi: [
        {
          type: "function",
          name: "DENOMINATOR",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "HELPFULNESS_THRESHOLD",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "INITIAL_ELIGIBILITY_RATING_THRESHOLD",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "amountOfRating",
          inputs: [
            {
              name: "contractAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "index",
              type: "uint16",
              internalType: "uint16",
            },
            {
              name: "rating",
              type: "uint8",
              internalType: "enum CNDataTypes.Rating",
            },
          ],
          outputs: [
            {
              name: "amount",
              type: "uint32",
              internalType: "uint32",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "notesOf",
          inputs: [
            {
              name: "contractAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "noteWriter",
              type: "address",
              internalType: "address",
            },
            {
              name: "sentiment",
              type: "uint8",
              internalType: "enum CNDataTypes.Sentiment",
            },
            {
              name: "score",
              type: "uint16",
              internalType: "uint16",
            },
            {
              name: "uri",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "publishNote",
          inputs: [
            {
              name: "_contractAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "_uri",
              type: "string",
              internalType: "string",
            },
            {
              name: "_sentiment",
              type: "uint8",
              internalType: "enum CNDataTypes.Sentiment",
            },
          ],
          outputs: [
            {
              name: "_note",
              type: "tuple",
              internalType: "struct CNDataTypes.Note",
              components: [
                {
                  name: "noteWriter",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "sentiment",
                  type: "uint8",
                  internalType: "enum CNDataTypes.Sentiment",
                },
                {
                  name: "score",
                  type: "uint16",
                  internalType: "uint16",
                },
                {
                  name: "uri",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "ratingWeightOf",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address",
            },
            {
              name: "",
              type: "uint8",
              internalType: "enum CNDataTypes.Rating",
            },
          ],
          outputs: [
            {
              name: "amount",
              type: "uint40",
              internalType: "uint40",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "retrieveContractNotes",
          inputs: [
            {
              name: "_contractAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "_notes",
              type: "tuple[]",
              internalType: "struct CNDataTypes.Note[]",
              components: [
                {
                  name: "noteWriter",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "sentiment",
                  type: "uint8",
                  internalType: "enum CNDataTypes.Sentiment",
                },
                {
                  name: "score",
                  type: "uint16",
                  internalType: "uint16",
                },
                {
                  name: "uri",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "sentimentOf",
          inputs: [
            {
              name: "contractAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "sentiment",
              type: "uint8",
              internalType: "enum CNDataTypes.Sentiment",
            },
          ],
          outputs: [
            {
              name: "amount",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tip",
          inputs: [
            {
              name: "_noteIndex",
              type: "uint16",
              internalType: "uint16",
            },
            {
              name: "_contractAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "_success",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "userRatingOfNote",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address",
            },
            {
              name: "contractAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "index",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint8",
              internalType: "enum CNDataTypes.Rating",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "vote",
          inputs: [
            {
              name: "_rating",
              type: "uint8",
              internalType: "enum CNDataTypes.Rating",
            },
            {
              name: "_noteIndex",
              type: "uint16",
              internalType: "uint16",
            },
            {
              name: "_contractAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "NotePublished",
          inputs: [
            {
              name: "author",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amountOfNotesForContract",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "note",
              type: "tuple",
              indexed: false,
              internalType: "struct CNDataTypes.Note",
              components: [
                {
                  name: "noteWriter",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "sentiment",
                  type: "uint8",
                  internalType: "enum CNDataTypes.Sentiment",
                },
                {
                  name: "score",
                  type: "uint16",
                  internalType: "uint16",
                },
                {
                  name: "uri",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Tipped",
          inputs: [
            {
              name: "tipper",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "author",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "tipAmount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "note",
              type: "tuple",
              indexed: false,
              internalType: "struct CNDataTypes.Note",
              components: [
                {
                  name: "noteWriter",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "sentiment",
                  type: "uint8",
                  internalType: "enum CNDataTypes.Sentiment",
                },
                {
                  name: "score",
                  type: "uint16",
                  internalType: "uint16",
                },
                {
                  name: "uri",
                  type: "string",
                  internalType: "string",
                },
              ],
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Voted",
          inputs: [
            {
              name: "voter",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "contractAddress",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "noteIndex",
              type: "uint16",
              indexed: false,
              internalType: "uint16",
            },
            {
              name: "rating",
              type: "uint8",
              indexed: false,
              internalType: "enum CNDataTypes.Rating",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;