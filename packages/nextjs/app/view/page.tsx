"use client";

import { useState } from "react";
import Link from "next/link";
import { isAddress } from "viem";
import { AddressInput } from "~~/components/scaffold-eth";

const ViewPage = () => {
  const [inputAddress, setInputAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);

  const handleAddressChange = (value: string) => {
    setInputAddress(value);
    setValidAddress(isAddress(value));
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
            <Link href={validAddress ? `/view/${inputAddress}` : "#"} passHref>
              <button
                className={`btn btn-primary ${!validAddress && 'btn-disabled'}`}
                disabled={!validAddress}
              >
                View Note
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
