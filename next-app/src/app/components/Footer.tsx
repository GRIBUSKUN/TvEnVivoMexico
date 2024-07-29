"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LG from "./Language.json";

export default function Footer() {
  type Translations = {
    title: string;
    home: string;
    tvChanels: string;
    about: string;
    searchLabel: string;
    PrivacyPolicy: string;
    Lisensing: string;
    contact: string;
  };
  //initial state that sets the defaul value of the name and the list array for the translations
  const [Languages, setLanguage] = useState<Translations>(LG.ES.menu);
  //use effect that executes the necesary translations
  useEffect(() => {
    //Set the interface to allow the language be a key string
    type LanguageType = {
      [key: string]: {
        Language: Translations;
      };
    };
    //set the language objects for the proper translation
    const Language: LanguageType = {
      ES: {
        Language: LG.ES.menu,
      },
      EN: {
        Language: LG.EN.menu,
      },
    };
    //check if the window is loaded and then use a localstorage to set the language from the previous object
    if (typeof window !== "undefined") {
      setLanguage(
        Language[window.localStorage.getItem("lang") || "ES"].Language
      );
    }
  }, []);
  return (
    <footer className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
              width={0}
              height={0}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {Languages.title}
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                {Languages.about}
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
              {Languages.PrivacyPolicy}
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
              {Languages.Lisensing}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
              {Languages.contact} 
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            ArkBite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
