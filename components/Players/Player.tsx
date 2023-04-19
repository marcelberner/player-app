import React, { useEffect } from "react";
import Plyr from "plyr";

interface playerProps {
  youtubeID?: string;
  src?: string;
}
const VideoPlayer: React.FC<playerProps> = ({ src, youtubeID }) => {
  const hideControlsHandler = () => {
    (document.querySelector(".plyr__controls") as any)!.style.display = "none";
  };
  const shoWControlsHandler = () => {
    (document.querySelector(".plyr__controls") as any)!.style.display = "flex";
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
      volume: 0.5,
      ratio: "16:9",
    });

    player.once("play", shoWControlsHandler);
    player.on("ready", hideControlsHandler);
    player.once("play", () => player.fullscreen.enter());

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  return (
    <>
      {youtubeID ? (
        <div
          className="plyr__video-embed"
          id="my-video"
          style={{ padding: "0" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${youtubeID}?&modestbranding=1&playsinline=1&showsearch=0&rel=0&iv_load_policy=3&showinfo=0&rel=0&enablejsapi=1&autoplay=0`}
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
