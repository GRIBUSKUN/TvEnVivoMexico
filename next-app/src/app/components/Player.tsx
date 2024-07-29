"use client";
import { useRef, useEffect} from "react";
import videojs from "video.js";
import player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

const Player: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<player | null>(null);

  useEffect(() => {
    console.log("video setted");
    const player = playerRef.current;
    if (playerRef.current) {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    }
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, {
        autoplay:true,
        controls: true,
        fluid: true,
        sources: [{ src: src, type: "application/x-mpegURL" }],
        poster: poster,
      });
    }
  }, [src, poster]);
  return <div ref={videoRef}></div>;
};

export default Player;
