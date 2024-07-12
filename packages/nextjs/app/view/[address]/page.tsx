"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { NextPage } from "next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { isAddress } from "viem";

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewNote: NextPage = () => {
  const { address } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [validAddress, setValidAddress] = useState(false);

  const { data: notesData, refetch } = useScaffoldReadContract({
    contractName: "Notes",
    functionName: "notesOf",
    args: [address, 1n],
  });

  console.log("notesData" , notesData);
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
    }
  }, [notesData]);

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
          
            <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Address</span>
                <Address size="xl" address={notes.noteWriter} />
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Note Content</span>
                <p>{notes.uri}</p>
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Score</span>
                <p>{notes.score}</p>
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Sentiment</span>
                <p>{notes.sentiment}</p>
              </div>
              <div className="flex flex-col mb-4">
                <span className="block text-xl font-semibold mb-2">Vote Distribution</span>
                <Pie data={getPieChartData(notes.upVotes, notes.downVotes)} />
              </div>
            </div>
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
