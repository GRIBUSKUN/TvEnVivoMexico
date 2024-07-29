"use client";
import React, { FC, useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LG from "./Language.json";
import LGlist from "./LanguageList.json";

export default function LanguageDropDown() {

  type CategoryItem = {
    name: string;
    list: { name: string; value: string }[];
  };
  //initial state that sets the defaul value of the name and the list array for the translations
  const [Languages, setLanguage] = useState<CategoryItem>({
    name: LG.EN.menu.LanguageDropDown,
    list: LGlist,
  });
  //use effect that executes the necesary translations
  useEffect(() => {
    //Set the interface to allow the language be a key string
    type LanguageType = {
      [key: string]: {
        Language: CategoryItem;
      };
    };
    //set the language objects for the proper translation
    const Language: LanguageType = {
      ES: {
        Language: {
          name: LG.ES.menu.LanguageDropDown,
          list: LGlist,
        },
      },
      EN: {
        Language: {
          name: LG.EN.menu.LanguageDropDown,
          list: LGlist,
        },
      },
    };
    //check if the window is loaded and then use a localstorage to set the language from the previous object
    if (typeof window !== "undefined") {
      setLanguage(
        Language[window.localStorage.getItem("lang") || "ES"].Language
      );
    }
  }, []);
  function ConfigLangague(lang: string) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);
    }

    window.location.reload();
  }
  return (
    <Menu as="div" className="relative flex mx-2">
      <div className="w-full">
        <Menu.Button
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 w-full rounded-lg z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          {Languages.name}
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
            {Languages.list.map((val, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={() => {
                      ConfigLangague(val.value);
                    }}
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {val.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Transition>
    </Menu>
  );
}
