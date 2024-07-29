"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DB from "./TvChanels2.json";
import CT from "./Categories.json";
import LG from "./Language.json";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ChanelsList() {
  //set the interface of the search result of the DB
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
  //Set the interface for the Category list Items
  type CategoryItem = {
    name: string;
    list: { name: string; value: string }[];
    label: string;
  };
  //initial state that sets the defaul value of the name and the list array for the translations
  const [Categories, setCategories] = useState<CategoryItem>({
    name: LG.EN.tvList.categories,
    list: CT.EN.categories,
    label: LG.EN.tvList.searchLabel,
  });
  const [tempCatName, setTempCatName] = useState<string>();
  //use effect that executes the necesary translations
  useEffect(() => {
    //Set the interface to allow the language be a key string
    type LanguageType = {
      [key: string]: {
        Categories: CategoryItem;
      };
    };
    //set the language objects for the proper translation
    const Language: LanguageType = {
      ES: {
        Categories: {
          name: LG.ES.tvList.country,
          list: CT.ES.contries,
          label: LG.ES.tvList.searchLabel,
        },
      },
      EN: {
        Categories: {
          name: LG.EN.tvList.country,
          list: CT.EN.contries,
          label: LG.EN.tvList.searchLabel,
        },
      },
    };
    //check if the window is loaded and then use a localstorage to set the language from the previous object
    if (typeof window !== "undefined") {
      setCategories(
        Language[window.localStorage.getItem("lang") || "ES"].Categories
      );
      setTempCatName(
        Language[window.localStorage.getItem("lang") || "ES"].Categories.name
      );
    }
  }, []);

  const InputRef = useRef<HTMLInputElement | null>(null);
  const [Chanels, setChanels] = useState<item[]>(DB);
  const [category, setCategory] = useState<string | null>(null);
  const searchData = (SearchValue: string) => {
    // let browse = SearchValue.split(" ");
    let pCh: item[] = [];
    if (SearchValue.length > 0) {
      DB.filter((item: item) => {
        if (
          item.chanel
            .toLocaleLowerCase()
            .includes(SearchValue.toLocaleLowerCase()) &&
          (category ? item.country.includes(category) : true)
        ) {
          pCh.push(item);
        }
      });
    } else {
      pCh = DB;
    }
    return pCh;
  };
  function checkCategoryName() {
    let CategoryName;
    if (typeof window !== "undefined") {
      CategoryName =
        localStorage.getItem("lang") == "ES"
          ? "Remover Categoria"
          : "Remove Category";
    }
    return CategoryName;
  }
  return (
    <>
      <form>
        <div className="flex flex-col p-5  md:flex-row">
          {/* Drop Down menu */}
          <Menu as="div" className="relative flex">
            <div className="w-full">
              <Menu.Button
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 w-full rounded-l-lg z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                {Categories.name}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {/* DropDown List */}
              <div
                id="dropdown"
                className="z-10 top-11 left-0 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {Categories.list.map((val, key) => {
                    return (
                      <li key={key}>
                        <button
                          onClick={() => {
                            setCategory(val.value);
                            Categories.name = val.name;
                          }}
                          type="button"
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {val.name}
                        </button>
                      </li>
                    );
                  })}
                  <li>
                    <button
                      onClick={() => {
                        setCategory(null);
                        Categories.name = tempCatName || "nothing";
                      }}
                      type="button"
                      className="inline-flex w-full px-4 py-2 bg-red-400 text-white dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700 dark:hover:text-white"
                    >
                      {checkCategoryName()}
                    </button>
                  </li>
                </ul>
              </div>
            </Transition>
          </Menu>
          {/* Search Bar */}
          <div className="relative w-full">
            <input
              ref={InputRef}
              onInput={() => {
                if (InputRef.current) {
                  setChanels(searchData(InputRef.current?.value));
                }
              }}
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder={Categories.label}
              required
            />
            <button
              type="submit"
              data-dropdown-toggle="dropdown"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
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
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2">
          {Chanels.length > 0 &&
            Chanels.map((val, key) => {
              return (
                <Link
                  href={"/chanel/" + val.chanel.replaceAll(" ", "-")}
                  key={key}
                  className="flex relative flex-row items-center justify-center h-52"
                >
                  <Image
                    className="rounded-lg absolute h-52 object-cover"
                    src={
                      val.coverImg.length > 0
                        ? val.coverImg
                        : "https://assets.turbologo.com/blog/en/2019/05/19085137/no-logo.png"
                    }
                    height={400}
                    width={300}
                    alt={val.coverImg + " ArkBite TV"}
                  />
                  <div className="absolute bg-transparent bg-white dark:bg-gray-800 p-2 rounded-none xl:rounded-lg shadow-xl w-full xl:w-2/3 opacity-90 hover:opacity-100 cursor-pointer flex justify-center">
                    <svg
                      className="h-12 w-12 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="absolute truncate text-sm text-black dark:text-white bg-white dark:text-dark-400 dark:bg-gray-800 top-14 p-2 rounded-none xl:rounded-lg w-full text-center">
                      {val.chanel}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
    </>
  );
}
