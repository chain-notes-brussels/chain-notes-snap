"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CreateNote: NextPage = () => {
  const [address, setAddress] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isDanger, setIsDanger] = useState(false);
  const { address: connectedAccount } = useAccount();
  const { data: NotesContractInfo } = useDeployedContractInfo("NotesContract");

  const { writeContractAsync: writeNotesContractAsync } = useScaffoldWriteContract("NotesContract");

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Create a Note</span>
      </h1>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
          <div className="flex flex-col text-center mb-4">
            <span className="text-2xl font-semibold">Create Note</span>
            
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col items-center">
              <span className="w-full">
                Address{" "}
                <AddressInput value={address} onChange={value => setAddress(value)} placeholder="Address" />
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-full">
                Note Content{" "}
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
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
                  onChange={e => setIsDanger(e.target.checked)}
                />
              </label>
            </div>
            <div className="flex flex-col items-center mt-4">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    await writeNotesContractAsync({
                      functionName: "create",
                      args: [address, noteContent, isDanger],
                    });
                  } catch (err) {
                    console.error("Error calling create function", err);
                  }
                }}
              >
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
