"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { IDKitWidget } from '@worldcoin/idkit';
import { useTheme } from "next-themes";

const CreateNote: NextPage = () => {
  const { targetNetwork } = useTargetNetwork();
  const [address, setAddress] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isDanger, setIsDanger] = useState(false);
  const { address: connectedAccount } = useAccount();
  const { data: NotesContractInfo } = useDeployedContractInfo("Notes");
  const { writeContractAsync: writeNotesContractAsync } = useScaffoldWriteContract("Notes");
  const { resolvedTheme } = useTheme();
  
  const isDarkMode = resolvedTheme === "dark";

  const handleCreateNote = async () => {
    // Create the note in IPFS
    const note: Note = {
      chainId: targetNetwork?.id || 0,
      commentator: connectedAccount || "",
      comment: noteContent,
      sentiment: isDanger,
      timestamp: Date.now(),
    };
    console.log("Address", address);
    const note_ipfs = JSON.stringify(note);

    try {
      // Pass Note to the endpoint and store response
      const response = await fetch("https://api-phi-vert.vercel.app/createNewNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: note_ipfs,
      });
      console.log("Response", response);

      if (!response.ok) {
        throw new Error("Failed to store note in IPFS");
      }

      const responseData = await response.json();
      console.log("Note stored in IPFS:", responseData);

      // Write the note to the contract
      await writeNotesContractAsync({
        functionName: "publishNote",
        args: [address, responseData.ipfsHash, isDanger],
      });
    } catch (err) {
      console.error("Error calling create function", err);
    }
  };

  type Note = {
    chainId: number;
    commentator: string;
    comment: string;
    sentiment: boolean;
    timestamp: number;
  };

  return (
    <div className="container mx-auto p-8">
      
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Create a Note</span>
      </h1>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
          <p>We use Worldcoin World ID to verify your identity. Please sign in to continue. </p>
          <div>
            {isDarkMode ? (
              <img src="Worldcoin-logo-lockup-light.svg" alt="Worldcoin Logo" className="w-200" />
            ) : (
              <img src="Worldcoin-logo-lockup-dark.svg" alt="Worldcoin Logo" className="w-200" />
            )}
          </div>
          <IDKitWidget
            app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // must be an app set to on-chain in Developer Portal
            action="claim_nft"
            signal={address} // proof will only verify if the signal is unchanged, this prevents tampering
            // onSuccess={onSuccess} // use onSuccess to call your smart contract
            // no use for handleVerify, so it is removed
            // use default verification_level (orb-only), as device credentials are not supported on-chain
          >
            {({ open }) => <button className="btn btn-primary" onClick={open}>Verify with World ID</button>}
          </IDKitWidget>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
          <div className="flex flex-col text-center mb-4">
            <span className="text-2xl font-semibold">Create Note</span>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col items-center">
              <span className="w-full">
                Address{" "}
                <AddressInput value={address} onChange={(value) => setAddress(value)} placeholder="Address" />
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-full">
                Note Content{" "}
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Note Content"
                />
              </span>
            </div>
            <div className="flex flex-col items-center">
              <label className="label cursor-pointer">
                <span className="label-text">Danger/Warning </span>
                <input
                  type="checkbox"
                  className="toggle toggle-error"
                  checked={isDanger}
                  onChange={(e) => setIsDanger(e.target.checked)}
                />
              </label>
            </div>
            <div className="flex flex-col items-center mt-4">
              <button className="btn btn-primary" onClick={handleCreateNote}>
                Create Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
