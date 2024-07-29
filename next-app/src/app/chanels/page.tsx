"use client";
import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TvList from "../components/TvList";
import ChanelsList from "../components/ChanelsList";
import DB from "../components/TvChanels2.json";
import LG from "../components/Language.json";

export default function page() {
  return (
    <>
      <header className="bg-blue-700">
        {/* Nav component */}
        <NavBar focus="chanels" />
      </header>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8 h-full bg-white border-gray-200 dark:bg-gray-800">
          <div className="container mx-auto lg:p-5 rounded-lg shadow-2xl bg-white border-gray-200 dark:bg-gray-900">
            {/* TV list of below of the search bar component */}
            {/* <TvList /> */}
            <ChanelsList/>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
