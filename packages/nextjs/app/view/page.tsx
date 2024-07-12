"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
// import { isAddress } from "ethers/lib/utils";
import { AddressInput } from "~~/components/scaffold-eth";

const ViewPage: NextPage = () => {
  const [inputAddress, setInputAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const router = useRouter();

  const handleAddressChange = (value: string) => {
    setInputAddress(value);
    // setValidAddress(isAddress(value));
    setValidAddress(true);
  };

  const handleViewNote = () => {
    if (validAddress) {
      router.push(`/view/${inputAddress}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">View Notes</span>
      </h1>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
          <div className="flex flex-col items-center mb-4">
            <span className="block text-xl font-semibold mb-2">Enter Address</span>
            <AddressInput value={inputAddress} onChange={handleAddressChange} placeholder="Address" />
          </div>
          <div className="flex flex-col items-center mt-4">
            <button
              className={`btn btn-primary ${!validAddress && 'btn-disabled'}`}
              onClick={handleViewNote}
              disabled={!validAddress}
            >
              View Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
