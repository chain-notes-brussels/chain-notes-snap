"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { NextPage } from "next";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { isAddress } from "viem";

const ViewNote: NextPage = () => {
  const { address } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [validAddress, setValidAddress] = useState(false);
  const [ratings, setRatings] = useState<number[]>([]); // Array to store selected ratings

  const { data: notesData, refetch } = useScaffoldReadContract({
    contractName: "Notes",
    functionName: "retrieveContractNotes",
    args: [address],
  });

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
    if (notesData) {
      setNotes(notesData);
      setRatings(new Array(notesData.length).fill(0)); // Initialize ratings array with default value 0 (HELPFUL)
    }
  }, [notesData]);

  const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const handleVote = async (noteIndex: number, rating: number) => {
    const noteAddress = address; // Assuming the address is linked to the note
    try {
      console.log("Submitting vote...");
      await writeNotesContract({
        functionName: "vote",
        args: [rating, BigInt(noteIndex), noteAddress],
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
      {validAddress ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes
            .sort((a, b) => b.score - a.score) // Sort notes, highest score first
            .map((note, index) => (
              <div key={index} className="bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8">
                <div className="flex flex-col mb-4">
                  <p className="font-medium my-0 break-words mb-2">{note.sentiment ? "✅ Positive note" : "❌ Negative note"}</p>
                  <div className="bg-secondary rounded-3xl text-sm px-4 py-1.5 break-words overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">{note.uri}</pre>
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="block text-xl font-semibold mb-2">Score</span>
                  <p>{note.score}</p>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="block text-xl font-semibold mb-2">Rate this note</span>
                  <div className="flex">
                    <button
                      onClick={() => handleVote(index, 0)}
                      className="btn flex-1 rounded-none first:rounded-l-lg last:rounded-r-lg"
                      disabled={isPending}
                    >
                      HELPFUL
                    </button>
                    <button
                      onClick={() => handleVote(index, 2)}
                      className="btn flex-1 rounded-none first:rounded-l-lg last:rounded-r-lg"
                      disabled={isPending}
                    >
                      SOMEWHAT_HELPFUL
                    </button>
                    <button
                      onClick={() => handleVote(index, 1)}
                      className="btn flex-1 rounded-none first:rounded-l-lg last:rounded-r-lg"
                      disabled={isPending}
                    >
                      NOT_HELPFUL
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-500">Invalid address. Please check the URL.</p>
        </div>
      )}
    </div>
  );
};

export default ViewNote;
