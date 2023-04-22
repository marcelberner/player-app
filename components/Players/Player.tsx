import React, { useEffect } from "react";
import Plyr from "plyr";

interface playerProps {
  youtubeID?: string;
  src?: string;
  // genres: string[];
}

// const INTRO_LIST = {
//   animations: ["gX0CmJa5Gdk", "kzYfRLMtP9c"],
//   others: [
//     "PvKiWRTSAzg",
//     "DhNMHcRSNdo",
//     "JgVcKKTF8Y4",
//     "q4T4vdAV5Vk",
//     "OT9HsNszYCI",
//   ],
// };

const VideoPlayer: React.FC<playerProps> = ({ src, youtubeID }) => {
  const shoWControlsHandler = () => {
    (document.querySelector(".plyr__controls") as any)!.style.visibility =
      "visible";
  };

  useEffect(() => {
    const player = new Plyr("#my-video", {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "fullscreen",
      ],
      ratio: "16:9",
    });

    player.once("play", shoWControlsHandler);
    player.once("play", () => player.fullscreen.enter());

    return () => {
      if (player) {
        player.off("play", shoWControlsHandler);
        player.off("play", () => player.fullscreen.enter());
        player.destroy();
      }
    };
  }, []);

  // const getIntro = () => {
  //   if (genres.includes("Animation")) {
  //     const num = Math.floor(Math.random() * INTRO_LIST.animations.length);
  //     return INTRO_LIST.animations[num];
  //   } else {
  //     const num = Math.floor(Math.random() * INTRO_LIST.others.length);
  //     return INTRO_LIST.animations[num];
  //   }
  // };

  return (
    <>
      {!src ? (
        <div
          className="plyr__video-embed"
          id="my-video"
          style={{ padding: "0" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${
              !youtubeID ? "q4T4vdAV5Vk" : youtubeID
            }?&modestbranding=1&playsinline=1&showsearch=0&rel=0&iv_load_policy=3&showinfo=0&rel=0&enablejsapi=1&autoplay=0`}
            allowFullScreen
            // allowTransparency
          />
        </div>
      ) : (
        <div className="plyr__video-embed" style={{ padding: "0" }}>
          <video id="my-video" controls>
            <source src={src} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
