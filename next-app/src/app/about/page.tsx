"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TvList from "../components/TvList";
import Footer from "../components/Footer";
import LG from "../components/Language.json";
export default function Page() {
  type Translations = {
    EN: JSX.Element;
    ES: JSX.Element;
  };
  const AboutText: Translations = {
    EN: (
      <div>
        <h1>Welcome to ArkByte TV,</h1>
        <br />
        <p>
          your ultimate destination for a diverse and immersive television
          experience!
        </p>
        <br />
        <p>
          
          We take pride in being the go-to online platform that brings together
          the best of TV channels and beyond, offering a one-stop solution for
          your entertainment needs.
        </p>
        <br />
        <p>
          our platform ensures that you have access to all your favorite
          channels in one convenient place. But we don&apost stop there. In addition
          to an impressive lineup, we offer an extensive range of content from
          around the world. Explore a variety of genres, from blockbuster movies
          to captivating documentaries, all accessible at your fingertips.
        </p>
        <br />
        <p>
          <br /> Why choose ArkByte TV? All-in-One Platform: We bring together
          an extensive collection of Latinoamerican channels and international
          content, free of adds, ensuring that you never miss a moment of your
          favorite shows. Convenience: Say goodbye to cable subscriptions and
          multiple streaming services.
        </p>
      </div>
    ),
    ES: (
      <div>
        <h1>Bienvenido a ArkByte TV,</h1>
        <br />
        <p>
          tu destino definitivo para una experiencia televisiva diversa e
          inmersiva.
        </p>
        <br />
        <p>
          Nos enorgullece ser la plataforma en línea por excelencia que reúne lo
          mejor de los canales de televisión y más, ofreciendo una solución
          integral para tus necesidades de entretenimiento.
        </p>
        <br />
        <p>
          Nuestra plataforma asegura que tengas acceso a todos tus canales
          favoritos en un solo lugar conveniente. Pero no nos detenemos ahí.
          Además de una impresionante alineación, ofrecemos una amplia gama de
          contenido de todo el mundo. Explora una variedad de géneros, desde
          películas taquilleras hasta documentales cautivadores, todo accesible
          a tus dedos.
        </p>
        <br />
        <p>
          <br /> ¿Por qué elegir ArkByte TV? Plataforma Todo en Uno: Reunimos
          una extensa colección de canales latinoamericanos y contenido
          internacional, sin publicidad, asegurando que nunca te pierdas un
          momento de tus programas favoritos. Conveniencia: Di adiós a las
          suscripciones de cable y a los múltiples servicios de transmisión.
        </p>
      </div>
    ),
  };
  const defaultText = AboutText.ES;
  const [Languages, setLanguage] = useState<{
    aboutUs: React.JSX.Element;
    contactUS: string;
    yourEmail: string;
    yourMessage: string;
    leaveAComent: string;
    send: string;
  }>({
    aboutUs: AboutText.ES,
    contactUS: LG.ES.about.contactUS,
    yourEmail: LG.ES.about.yourEmail,
    yourMessage: LG.ES.about.yourMessage,
    leaveAComent: LG.ES.about.leaveAComent,
    send: LG.ES.about.send,
  });
  //use effect that executes the necesary translations
  useEffect(() => {
    //Set the interface to allow the language be a key string
    type LanguageType = {
      [key: string]: {
        aboutUs: React.JSX.Element;
        contactUS: string;
        yourEmail: string;
        yourMessage: string;
        leaveAComent: string;
        send: string;
      };
    };
    //set the language objects for the proper translation
    const Language: LanguageType = {
      ES: {
        aboutUs: AboutText.ES,
        contactUS: LG.ES.about.contactUS,
        yourEmail: LG.ES.about.yourEmail,
        yourMessage: LG.ES.about.yourMessage,
        leaveAComent: LG.ES.about.leaveAComent,
        send: LG.ES.about.send,
      },
      EN: {
        aboutUs: AboutText.EN,
        contactUS: LG.EN.about.contactUS,
        yourEmail: LG.EN.about.yourEmail,
        yourMessage: LG.EN.about.yourMessage,
        leaveAComent: LG.EN.about.leaveAComent,
        send: LG.EN.about.send,
      },
    };
    //check if the window is loaded and then use a localstorage to set the language from the previous object
    if (typeof window !== "undefined") {
      setLanguage(Language[window.localStorage.getItem("lang") || "ES"]);
    }
  }, []);
  return (
    <>
      <header className="bg-blue-700">
        {/* Nav component */}
        <NavBar focus="about" />
      </header>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8 h-full bg-white border-gray-200 dark:bg-gray-800">
          <div className="container flex mx-auto lg:p-5 h-full rounded-lg shadow-2xl bg-white border-gray-200 dark:bg-gray-900">
            {/* TV list of below of the search bar component */}
            <div className="w-1/2">{Languages.aboutUs}</div>
            <div className="w-1/2">
              <h1 className=" text-2xl">{Languages.contactUS}</h1>
              <div className="p-10">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {Languages.yourEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                />

                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {Languages.yourMessage}
                </label>
                <textarea
                  id="message"
                  className="block p-2.5 w-full h-52 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={Languages.leaveAComent}
                ></textarea>
                <button
                  type="button"
                  className="my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {Languages.send}
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
