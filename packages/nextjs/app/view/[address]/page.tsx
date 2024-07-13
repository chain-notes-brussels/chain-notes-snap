"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IDKitWidget } from "@worldcoin/idkit";
import axios from "axios";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { isAddress } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ViewNote: NextPage = () => {
  const { targetNetwork } = useTargetNetwork();
  const { address } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [votes, setVotes] = useState<any[]>([]);
  const [proof, setProof] = useState("");
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [noteContents, setNoteContents] = useState<string[]>([]);
  const [validAddress, setValidAddress] = useState(false);

  const { data: notesData, refetch } = useScaffoldReadContract({
    contractName: "Notes",
    functionName: "retrieveContractNotes",
    args: [address],
  });
  console.log("notesData", notesData);

  const { writeContractAsync: writeNotesContract, isPending } = useScaffoldWriteContract("Notes");

  useEffect(() => {
    if (address && isAddress(address as string)) {
      setValidAddress(true);
      refetch();
    } else {
      setValidAddress(false);
    }
  }, [address, refetch]);

  useEffect(() => {
    const fetchNoteContents = async () => {
      if (notesData && notesData.length === 2) {
        const [noteInfo, voteData] = notesData;

        const contentsPromises = noteInfo.map(async (note: any) => {
          try {
            console.log("Note content response: TRY");

            const response = await axios.get(`${process.env.NEXT_PUBLIC_IPFS_API}/getNote?cid=${note.uri}`);
            console.log("Note content response:", response);
            return response.data.content;
          } catch (error) {
            console.error("Error fetching note content:", error);
            return "Failed to fetch content";
          }
        });

        const contents = await Promise.all(contentsPromises);
        setNotes(noteInfo);
        setVotes(voteData);
        setNoteContents(contents);
      }
    };

    fetchNoteContents();
  }, [notesData]);

  const handleVote = async (noteIndex: number, rating: number) => {
    const noteAddress = address;
    try {
      console.log("Submitting vote...");
      await writeNotesContract({
        functionName: "vote",
        args: [rating, BigInt(noteIndex), noteAddress, proof],
      });
      console.log("Vote submitted successfully");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">View Note</span>
        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
          <p className="my-2 font-medium">Contract Address:</p>
          <Address address={address} />
        </div>
      </h1>
      <div className="flex justify-center items-center">
        {!proof && targetNetwork?.id === 84532 && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>We use Worldcoin World ID to verify your identity. Please sign in to continue.</p>
            <IDKitWidget
              app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
              action={process.env.NEXT_PUBLIC_ACTION_CREATE as string}
              signal={address}
              onSuccess={setProof}
            >
              {({ open }) => (
                <button className="btn btn-primary" onClick={open}>
                  Verify with World ID
                </button>
              )}
            </IDKitWidget>
            <p>Powered by: </p>
            <div>
              {isDarkMode ? (
                <img src="/Worldcoin-logo-lockup-light.svg" alt="Worldcoin Logo" className="w-200" />
              ) : (
                <img src="/Worldcoin-logo-lockup-dark.svg" alt="Worldcoin Logo" className="w-200" />
              )}
            </div>
          </div>
        )}
        {proof && targetNetwork?.id === 84532 && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>You have verified with World ID.</p>
            <p>Powered by: </p>
            <div>
              {isDarkMode ? (
                <img src="/Worldcoin-logo-lockup-light.svg" alt="Worldcoin Logo" className="w-200" />
              ) : (
                <img src="/Worldcoin-logo-lockup-dark.svg" alt="Worldcoin Logo" className="w-200" />
              )}
            </div>
          </div>
        )}
      </div>

      {validAddress && notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes
            .sort((a, b) => b.score - a.score)
            .map((note, index) => (
              <div
                key={index}
                className="bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8"
              >
                <div className="flex flex-col mb-4">
                  <p className="font-medium my-0 break-words mb-2">
                    {note.sentiment ? "✅ Positive note" : "❌ Negative note"}
                  </p>
                  <div className="bg-secondary rounded-3xl text-sm px-4 py-1.5 break-words overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">{noteContents[index]}</pre>
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="block text-xl font-semibold mb-2">Score: {votes[index]?.score.toString()}</span>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="block text-xl font-semibold mb-2">Rate this note</span>
                  <div className="flex">
                    <button
                      onClick={() => handleVote(index, 0)}
                      className="btn flex-1 rounded-none first:rounded-l-lg last:rounded-r-lg"
                      disabled={isPending}
                    >
                      Helpful
                    </button>
                    <button
                      onClick={() => handleVote(index, 2)}
                      className="btn flex-1 rounded-none first:rounded-l-lg last:rounded-r-lg"
                      disabled={isPending}
                    >
                      Somewhat helpful
                    </button>
                    <button
                      onClick={() => handleVote(index, 1)}
                      className="btn flex-1 rounded-none first:rounded-l-lg last:rounded-r-lg"
                      disabled={isPending}
                    >
                      Not helpful
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center">
          {notes.length > 0 ? (
            <p className="text-red-500">Invalid address. Please check the URL.</p>
          ) : (
            <p>No notes for this address.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewNote;
