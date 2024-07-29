"use client";
import { useEffect, useState } from "react";
import DB from "./TvChanels2.json";
import Link from "next/link";
import LG from "./Language.json";
const SearchComponent: React.FC<{}> = () => {
  //initial state that sets the defaul value of the name and the list array for the translations
  const [Languages, setLanguage] = useState<string>(LG.ES.menu.searchLabel);
  //use effect that executes the necesary translations
  useEffect(() => {
    //Set the interface to allow the language be a key string
    type LanguageType = {
      [key: string]: {
        Language: string;
      };
    };
    //set the language objects for the proper translation
    const Language: LanguageType = {
      ES: {
        Language: LG.ES.menu.searchLabel
      },
      EN: {
        Language: LG.EN.menu.searchLabel,
      },
    };
    //check if the window is loaded and then use a localstorage to set the language from the previous object
    if (typeof window !== "undefined") {
      setLanguage(
        Language[window.localStorage.getItem("lang") || "ES"].Language
      );
    }
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setShowDropdown(term.length > 0); // Show dropdown if there is input
  };

  const handleInputBlur = () => {
    // Hide dropdown when input loses focus
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };
  let VideoName = searchTerm;
  const filtData = () => {
    interface item {
      groupTitle: string;
      coverImg: string;
      chanel: string;
      country: string;
      status: boolean;
      views: number;
      likes: number;
      Dislikes: number;
      link: string[];
    }
    let pCh: string[] = [];
    DB.filter((item: item) => {
      if (pCh.length < 7) {
        if (
          item.chanel
            .toLocaleLowerCase()
            .includes(VideoName.toLocaleLowerCase())
        ) {
          pCh.push(item.chanel);
        }
      }
    });
    return pCh;
  };
  return (
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        data-dropdown-toggle="dropdown"
        type="text"
        id="search-navbar"
        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={Languages}
      />
      {showDropdown && (
        <div
          id="dropdown"
          className="z-10 top-11 left-0 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transform opacity-100 scale-100"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {filtData().map((val, key) => {
              return (
                <Link
                  type="li"
                  href={"/chanel/" + val.replaceAll(" ", "-")}
                  key={key}
                  onClick={() => {
                    console.log(val.replace(" ", "-"));
                  }}
                  className="inline-flex text-left w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {val}
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
