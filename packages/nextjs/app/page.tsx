"use client";

import Link from "next/link";
// import ReactDOM from 'react-dom';
import { useMetaMask, useRequestSnap } from "./hooks";
import type { NextPage } from "next";
import Confetti from "react-confetti";
import { useAccount } from "wagmi";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

// import type { ComponentProps, useState } from 'react';
// import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';



const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const requestSnap = useRequestSnap();

  // const [confettiVisible, setConfettiVisible] = useState(false);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Oh Snap!</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <p>
            <img
              src="/logo.png"
              // alt={fighters[0].name}
              // style={{ height: "200px" }}
            />

            {/*  here */}
            <div className="flex justify-center">
              <button
                onClick={requestSnap}
                className="bg-black text-white p-3 m-auto transition transform hover:bg-gray-900 hover:shadow-lg hover:scale-105 active:bg-gray-700 active:shadow-md active:scale-95"
              >
                Get Your Snap Now!
              </button>
            </div>
          </p>
          <br></br>
        </div>
        <p className="text-center text-lg">Providing context to contracts before making an on-chain transaction</p>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <PlusIcon className="h-8 w-8 fill-secondary" />
              <p>
                Provide context to an a contract on the{" "}
                <Link href="/create" passHref className="link">
                  Create Note
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore all notes made on a contract by using the{" "}
                <Link href="/view" passHref className="link">
                  View Notes
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
