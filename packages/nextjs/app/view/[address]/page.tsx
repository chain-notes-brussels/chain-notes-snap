"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { NextPage } from "next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { isAddress } from "viem";

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewNote: NextPage = () => {
  const { address } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [validAddress, setValidAddress] = useState(false);
  const [ratings, setRatings] = useState<number[]>([]); // Array to store selected ratings

  const { data: notesData, refetch } = useScaffoldReadContract({
    contractName: "Notes",
    functionName: "notesOf",
    args: [address, 1n],
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

  const getPieChartData = (upVotes: number, downVotes: number) => {
    return {
      labels: ['Up Votes', 'Down Votes'],
      datasets: [
        {
          label: 'Votes',
          data: [upVotes, downVotes],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">View Note</span>
      </h1>
      {validAddress ? (
        <div className="flex flex-col items-center">
          {notes.map((note, index) => (
            <div key={index} className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Address</span>
                <Address size="xl" address={note.noteWriter} />
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Note Content</span>
                <p>{note.uri}</p>
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Score</span>
                <p>{note.score}</p>
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Sentiment</span>
                <p>{note.sentiment}</p>
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Vote Distribution</span>
                <Pie data={getPieChartData(note.upVotes, note.downVotes)} />
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Rate this note</span>
                <select
                  value={ratings[index]}
                  onChange={(e) => handleRatingChange(index, Number(e.target.value))}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value={0}>HELPFUL</option>
                  <option value={1}>NOT_HELPFUL</option>
                  <option value={2}>SOMEWHAT_HELPFUL</option>
                </select>
                <button
                  onClick={() => handleVote(index, ratings[index])}
                  className="btn btn-primary mt-4"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Vote"}
                </button>
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
