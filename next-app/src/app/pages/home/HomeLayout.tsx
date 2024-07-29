"use client";
// Import Components of the home screen
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Player from "@/app/components/Player";
import TvList from "../../components/TvList";
import SideVideos from "./components/SideVideos";
import DB from "../../components/TvChanels2.json";
import LG from "../../components/Language.json";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const HomeLayout: React.FC<{ chanel: string }> = ({ chanel }) => {
  //initial state that sets the defaul value of the name and the list array for the translations
  const [Languages, setLanguage] = useState<{
    caption: string;
    share: string;
    Options: string;
  }>(LG.ES.player);
  //use effect that executes the necesary translations
  useEffect(() => {
    //Set the interface to allow the language be a key string
    type LanguageType = {
      [key: string]: {
        Language: { caption: string; share: string; Options: string };
      };
    };
    //set the language objects for the proper translation
    const Language: LanguageType = {
      ES: {
        Language: LG.ES.player,
      },
      EN: {
        Language: LG.EN.player,
      },
    };
    //check if the window is loaded and then use a localstorage to set the language from the previous object
    if (typeof window !== "undefined") {
      setLanguage(
        Language[window.localStorage.getItem("lang") || "ES"].Language
      );
    }
  }, []);
  //Chanel Props
  let VideoName = chanel;
  // let Chanel = DB["LAS ESTRELLAS LATAM"];

  const Chanel2 = DB.filter((item) =>
    item.chanel.toLocaleLowerCase().includes(VideoName.toLocaleLowerCase())
  );
  const [link, setLink] = useState<string>(
    Chanel2.length > 0 ? Chanel2[0].link[0] : ""
  );
  const [videoOption, setVideoOption] = useState<number>(0);

  useEffect(() => {
    setLink(Chanel2[0].link[videoOption]);
  }, [Chanel2, videoOption]);
  if (!(Chanel2.length > 0)) {
    return redirect("/notFound");
  }
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
    let browse = VideoName.split(" ");
    let pCh: item[] = [];
    for (let i = 0; i < browse.length; i++) {
      const word = browse[i];
      DB.filter((item: item) => {
        if (
          item.chanel.toLocaleLowerCase().includes(word.toLocaleLowerCase())
        ) {
          if (
            !(pCh.filter((itemf) => itemf.chanel == item.chanel).length == 1) &&
            item.chanel != Chanel2[0].chanel
          ) {
            pCh.push(item);
          }
        }
      });
    }
    if (pCh.length == 0) {
      VideoName = "las estrellas";
      filtData();
    }
    return pCh;
  };
  filtData();

  return (
    <>
      <header className="bg-blue-700">
        {/* Nav component */}
        <NavBar focus="home" />
      </header>
      {/* Main content */}
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8 h-full bg-white border-gray-200 dark:bg-gray-800">
          <div className="container mx-auto lg:p-5 rounded-lg shadow-2xl bg-white border-gray-200 dark:bg-gray-900">
            <div className="grid grid-cols-12 gap-6">
              {/* Player component */}
              <div className="flex-col justify-center text-6x rounded-xl p-6 col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 bg-gray-200 border-gray-200 dark:bg-black">
                <Player src={link} poster={Chanel2[0].coverImg} />
                <div className=" sm:flex-auto md:flex bg-white dark:bg-black">
                  <div className="flex flex-col text-start justify-center w-[100%] md:w-1/2 pt-2 mb-2 text-blue-700 dark:text-white">
                    <h1 className="rounded-l truncate p-5">
                      {Chanel2[0].chanel}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center justify-center md:items-end md:justify-end pt-5 w-[100%] md:w-1/2 relative dark:border-gray-800">
                    <div className="flex justify-center items-center">
                      {Chanel2[0].link.length > 1
                        ? Chanel2[0].link.map((val, key) => {
                            let button =
                              key == videoOption
                                ? "mb-4 bg-blue-500 hover:bg-blue-700 dark:text-white dark:border-white text-white font-semibold hover:text-white py-2 px-4 mx-2 border border-blue-500 hover:border-transparent rounded"
                                : "mb-4 bg-transparent hover:bg-blue-700 dark:text-white dark:border-white text-blue-700 font-semibold hover:text-white py-2 px-4 mx-2 border border-blue-500 hover:border-transparent rounded";
                            return (
                              <button
                                key={key}
                                onClick={() => {
                                  setVideoOption(key);
                                }}
                                className={button}
                              >
                                {Languages.Options} {key + 1}
                              </button>
                            );
                          })
                        : ""}
                    </div>
                    <div className="flex flex-col items-center px-5 mb-2">
                      <svg
                        className="w-3 h-3 text-blue-700 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z" />
                      </svg>
                      <span className="text-sm py-2">{Languages.share}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Side video component */}
              {/* <SideVideos /> */}
              <SideVideos items={filtData()} />
            </div>
          </div>
        </div>
        <div className="mx-auto py-6 sm:px-6 lg:px-8 h-full bg-white border-gray-200 dark:bg-gray-800">
          <div className="container mx-auto lg:p-5 rounded-lg shadow-2xl bg-white border-gray-200 dark:bg-gray-900">
            {/* TV list of below of the search bar component */}
            <TvList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
