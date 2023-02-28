import React, { useState, useRef, useEffect, useCallback } from "react";

import styles from "./Player.module.scss";

import Icon from "../UI/Icon";

interface playerProps {
  video: string;
}

const Player: React.FC<playerProps> = ({ video }) => {
  const [playerState, setPlayerState] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoTime, setVideoTime] = useState<string>("00:00");
  const [videoDuration, setVideoDuration] = useState<string>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const playPauseHandler = () => {
    const videoElement = videoRef.current!;

    if (videoElement.paused) videoElement!.play();
    else videoElement!.pause();
    setPlayerState((prev) => !prev);
  };

  const updateProgressHandler = () => {
    const videoElement = videoRef.current!;

    setVideoTime(convertTimeHandler(videoElement.currentTime));
    setVideoProgress(
      (videoElement!.currentTime / videoElement!.duration) * 100
    );
  };

  const goFullscreenHandler = () => {
    const videoElement = videoRef.current!;
    videoElement.requestFullscreen();
  };

  const jumpTimelineHandler = (event: any) => {
    const videoElement = videoRef.current!;
    const timelineElement = timelineRef.current!;
    const timelineWidth = timelineElement.clientWidth;

    videoElement.currentTime =
      ((event.nativeEvent.offsetX + 9) / timelineWidth) * videoElement.duration;
  };

  const drag = useCallback((event: any) => {
    const videoElement = videoRef.current!;
    const timelineElement = timelineRef.current!;
    const timelineWidth = timelineElement.clientWidth;

    videoElement.currentTime =
      ((event.offsetX + 9) / timelineWidth) * videoElement.duration;
  }, []);

  const dragTimelineHandler = (event: any) => {
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", stopDagTimelineHandler, true);
  };

  const stopDagTimelineHandler = (event: any) => {
    const videoElement = videoRef.current!;

    window.removeEventListener("mousemove", drag, false);
  };

  const convertTimeHandler = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const hours = Math.floor(minutes / 60);
    const totalMinutes = minutes % 60;

    const arr = [
      hours,
      totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes,
      seconds < 10 ? `0${seconds}` : seconds,
    ];

    if (!hours) arr.splice(0, 1);

    return arr.join(":");
  };

  useEffect(() => {
    const videoElement = videoRef.current!;

    const time = convertTimeHandler(videoElement.duration);
    setVideoDuration(time);
  }, [videoRef]);

  return (
    <div className={styles.container}>
      {videoRef && (
        <>
          <div
            onClick={playPauseHandler}
            className={`${styles.backdrop} ${playerState ? "" : styles.active}`}
          ></div>
          <video
            onTimeUpdate={updateProgressHandler}
            ref={videoRef}
            className={styles.player}
            src={video}
          ></video>
          <button
            onClick={playPauseHandler}
            className={`${styles.button_main} ${
              playerState ? styles.paused : ""
            }`}
          >
            {playerState ? (
              <Icon icon="pauseCircle" />
            ) : (
              <Icon icon="playCircle" />
            )}
          </button>
          <div className={styles.controls}>
            <button onClick={playPauseHandler} className={styles.button}>
              {playerState ? <Icon icon="pause" /> : <Icon icon="play" />}
            </button>
            <span className={styles.duration}>{videoTime}</span>
            <div
              ref={timelineRef}
              onClick={jumpTimelineHandler}
              onMouseDown={dragTimelineHandler}
              // onMouseUp={stopDagTimelineHandler}
              className={styles.progressbar}
            >
              <div
                style={{ width: `${videoProgress}%` }}
                className={styles.progress}
              ></div>
            </div>
            <span className={styles.duration}>{videoDuration}</span>
            <div className={styles.buttons}>
              <div className={styles.volume}>
                <button className={styles.button}>
                  <Icon icon="volumeUp" />
                </button>
                <div className={styles.progressbar}>
                  <div className={styles.progress}></div>
                </div>
              </div>
              <button onClick={goFullscreenHandler} className={styles.button}>
                <Icon icon="fullscreenIn" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
