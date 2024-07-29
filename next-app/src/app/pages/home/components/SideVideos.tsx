"use client";
import Image from "next/image";
import "video.js/dist/video-js.css";
import Link from "next/link";

interface Item {
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

interface ItemListProps {
  items: Item[];
}

const SideVideos: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className="flex-col hidden md:hidden lg:block relative overflow-x-auto text-6xl border-gray-300 rounded-xl dark:bg-black col-span-12  sm:col-span-12 lg:col-span-3 md:col-span-12 p-4 h-[250px] sm:h-[250px] xl:h-[600px] lg:h-[500px] bg-gray-200">
      <div className="grid grid-cols-2 xl:grid-cols-1 lg:gird-cols-1 md:grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, key) => (
          <div
            key={key}
            className="flex relative flex-row items-center justify-center"
          >
            <div className="flex relative flex-row items-center justify-center">
              <Image
                className="max-w-full rounded-lg object-cover"
                src={
                  item.coverImg.length > 0
                    ? item.coverImg
                    : "https://assets.turbologo.com/blog/en/2019/05/19085137/no-logo.png"
                }
                height={100}
                width={300}
                alt={item.chanel+" ArkBite TV"}
              />
              <Link
                href={"/chanel/" + item.chanel.replaceAll(" ", "-").toUpperCase()}
                className="absolute bg-transparent bg-white dark:bg-gray-800 p-2 rounded-none xl:rounded-lg shadow-xl w-full xl:w-2/3 opacity-90 hover:opacity-100 cursor-pointer flex justify-center"
              >
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
                  {item.chanel}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideVideos;
