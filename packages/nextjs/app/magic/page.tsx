"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const MagicPage: NextPage = () => {
  const { resolvedTheme } = useTheme();
  const { address: connectedAccount } = useAccount();
  const { data: GoodContractInfo } = useDeployedContractInfo("MockContractA");
  const { data: BadContractInfo } = useDeployedContractInfo("MockContractB");
  const { writeContractAsync: writeGoodContractAsync } = useScaffoldWriteContract("MockContractA");
  const { writeContractAsync: writeBadContractAsync } = useScaffoldWriteContract("MockContractB");

  const isDarkMode = resolvedTheme === "dark";

  const handleMagicGoodContract = async () => {
    try {
      await writeGoodContractAsync({
        functionName: "magic",
        args: [],
      });
      console.log("GoodContract magic function called");
    } catch (err) {
      console.error("Error calling magic function on GoodContract", err);
    }
  };

  const handleMagicBadContract = async () => {
    try {
      await writeBadContractAsync({
        functionName: "magic",
        args: [],
      });
      console.log("BadContract magic function called");
    } catch (err) {
      console.error("Error calling magic function on BadContract", err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Magic Contracts</span>
      </h1>

      <div className="flex justify-center items-center flex-col space-y-8">
        <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">GoodContract</h2>
          <button className="btn btn-primary" onClick={handleMagicGoodContract}>
            Call Magic Function
          </button>
        </div>

        <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">BadContract</h2>
          <button className="btn btn-primary" onClick={handleMagicBadContract}>
            Call Magic Function
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagicPage;
