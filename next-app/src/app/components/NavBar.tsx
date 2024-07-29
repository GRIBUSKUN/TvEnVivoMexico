import React, { useEffect, useState, Fragment, useRef } from "react";
import Image from "next/image";
import SearchNav from "./SearchNavComponent";
import LanguageDropDown from "./LanguageDropDown";
import LG from "./Language.json";
import { stringify } from "querystring";

const NavBar: React.FC<{ focus: string }> = ({ focus }) => {
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
  const [hidenbar, setHiden] = useState<boolean>(true);
  const homRef = useRef<HTMLAnchorElement>(null);
  const chanelsRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLAnchorElement>(null);
  if (homRef.current && focus == "home") {
    homRef.current.className = "text-blue-600";
  }
  if (chanelsRef.current && focus == "chanels") {
    chanelsRef.current.className = "text-blue-600";
  }
  if (aboutRef.current && focus == "about") {
    aboutRef.current.className = "text-blue-600";
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="ArkBite logo"
            width={0}
            height={0}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-white">
            {Languages.title}
          </span>
        </a>
        <div className="flex md:order-2">
          <SearchNav />
          <LanguageDropDown />
          <button
            onClick={() => {
              setHiden(false);
            }}
            onBlur={() => {
              setTimeout(() => {
                setHiden(true);
              }, 200);
            }}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            hidenbar
              ? "items-center justify-between w-full md:flex md:w-auto md:order-1 hidden"
              : "items-center justify-between w-full md:flex md:w-auto md:order-1"
          }
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                ref={homRef}
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {Languages.home}
              </a>
            </li>
            <li>
              <a
                ref={chanelsRef}
                href="/chanels"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {Languages.tvChanels}
              </a>
            </li>
            <li>
              <a
                ref={aboutRef}
                href="/about"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {Languages.about}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
