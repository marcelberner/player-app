import React from "react";
import { FiUsers, FiSearch } from "react-icons/fi";
import { BsPlay } from "react-icons/bs";
import {
  AiOutlineStar,
  AiOutlineClose,
  AiOutlineCalendar,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { RxPaperPlane } from "react-icons/rx";
import { BiArrowFromLeft, BiCompass, BiBell } from "react-icons/bi";
import { FaUserCircle, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineGlobeAlt,
  HiVolumeUp,
  HiVolumeOff,
} from "react-icons/hi";
import {
  RiLiveLine,
  RiFullscreenFill,
  RiFullscreenExitLine,
} from "react-icons/ri";
import { TbMessage2, TbGift } from "react-icons/tb";
import { IoPlay, IoPause } from "react-icons/io5";

interface iconProps {
  icon:
    | "usersLive"
    | "playOutline"
    | "starOutline"
    | "paperPlane"
    | "hideArrow"
    | "searchLoupe"
    | "userAvatar"
    | "homeOutline"
    | "compassOutline"
    | "liveOutline"
    | "communityOutline"
    | "messageOutline"
    | "bellOutline"
    | "closeOutline"
    | "calendarOutline"
    | "clockOutline"
    | "globeOutline"
    | "play"
    | "pause"
    | "pauseCircle"
    | "playCircle"
    | "fullscreenIn"
    | "fullscreenOut"
    | "volumeUp"
    | "volumeMute"
    | "giftOutline";
}

const ICONS = {
  usersLive: <FiUsers />,
  playOutline: <BsPlay />,
  starOutline: <AiOutlineStar />,
  paperPlane: <RxPaperPlane />,
  hideArrow: <BiArrowFromLeft />,
  searchLoupe: <FiSearch />,
  userAvatar: <FaUserCircle />,
  homeOutline: <HiOutlineHome />,
  compassOutline: <BiCompass />,
  communityOutline: <HiOutlineUserGroup />,
  liveOutline: <RiLiveLine />,
  messageOutline: <TbMessage2 />,
  bellOutline: <BiBell />,
  giftOutline: <TbGift />,
  closeOutline: <AiOutlineClose />,
  globeOutline: <HiOutlineGlobeAlt />,
  clockOutline: <AiOutlineClockCircle />,
  calendarOutline: <AiOutlineCalendar />,
  play: <IoPlay />,
  playCircle: <FaPlayCircle />,
  fullscreenIn: <RiFullscreenFill />,
  fullscreenOut: <RiFullscreenExitLine />,
  volumeUp: <HiVolumeUp />,
  volumeMute: <HiVolumeOff />,
  pause: <IoPause />,
  pauseCircle: <FaPauseCircle />,
};

const Icon: React.FC<iconProps> = ({ icon }) => {
  return ICONS[icon];
};

export default Icon;
