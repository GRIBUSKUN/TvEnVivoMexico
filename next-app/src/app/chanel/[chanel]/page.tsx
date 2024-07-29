"use client";
import React, { FC } from "react";
import HomeLayout from "../../pages/home/HomeLayout";

interface pageProps {
  params: { chanel: string };
}

const page: FC<pageProps> = ({ params }) => {
  params.chanel = params.chanel.replaceAll('-',' ');
  let chanel = decodeURIComponent(params.chanel);
  return <HomeLayout chanel={chanel} />;
};

export default page;
