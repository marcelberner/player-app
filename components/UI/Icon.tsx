import React from "react";
import { FiUsers, FiSearch } from "react-icons/fi";
import { BsPlay, BsFillPersonCheckFill } from "react-icons/bs";
import { MdTableRows, MdOutlineHowToVote } from "react-icons/md";
import {
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineClose,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineArrowLeft,
  AiFillPicture,
} from "react-icons/ai";
import { RxPaperPlane } from "react-icons/rx";
import {
  BiArrowFromLeft,
  BiBell,
  BiGroup,
  BiMessageAltDetail,
  BiPencil,
  BiMailSend,
} from "react-icons/bi";
import {
  FaUserCircle,
  FaPlayCircle,
  FaPauseCircle,
  FaUserPlus,
} from "react-icons/fa";
import {
  HiOutlineHome,
  HiHome,
  HiOutlineUserGroup,
  HiUserGroup,
  HiOutlineGlobeAlt,
  HiVolumeUp,
  HiVolumeOff,
} from "react-icons/hi";
import {
  RiLiveLine,
  RiLiveFill,
  RiFullscreenFill,
  RiFullscreenExitLine,
  RiLayoutGridFill,
} from "react-icons/ri";
import { TbMessageCircle2, TbGift } from "react-icons/tb";
import { IoPlay, IoPause } from "react-icons/io5";
import { IoMdStarOutline, IoMdStar } from "react-icons/io";

interface iconProps {
  icon:
    | "usersLive"
    | "playOutline"
    | "starOutline"
    | "starFill"
    | "paperPlane"
    | "hideArrow"
    | "arrow"
    | "searchLoupe"
    | "userAvatar"
    | "homeOutline"
    | "homeFill"
    | "compassOutline"
    | "compassFill"
    | "liveOutline"
    | "liveFill"
    | "communityOutline"
    | "communityFill"
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
    | "displayGrid"
    | "displayRow"
    | "giftOutline"
    | "discussOutline"
    | "membersOutline"
    | "pencilOutline"
    | "picturePlaceholder"
    | "friendAdd"
    | "friendChecked"
    | "sendStatus"
    | "voteOutline";
}

const ICONS = {
  usersLive: <FiUsers />,
  playOutline: <BsPlay />,
  starOutline: <IoMdStarOutline />,
  starFill: <IoMdStar />,
  paperPlane: <RxPaperPlane />,
  hideArrow: <BiArrowFromLeft />,
  searchLoupe: <FiSearch />,
  userAvatar: <FaUserCircle />,
  homeOutline: <HiOutlineHome />,
  compassOutline: <AiOutlineCompass />,
  communityOutline: <HiOutlineUserGroup />,
  liveOutline: <RiLiveLine />,
  messageOutline: <BiMessageAltDetail />,
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
  arrow: <AiOutlineArrowLeft />,
  displayGrid: <RiLayoutGridFill />,
  displayRow: <MdTableRows />,
  homeFill: <HiHome />,
  compassFill: <AiFillCompass />,
  liveFill: <RiLiveFill />,
  communityFill: <HiUserGroup />,
  discussOutline: <TbMessageCircle2 />,
  membersOutline: <BiGroup />,
  voteOutline: <MdOutlineHowToVote />,
  pencilOutline: <BiPencil />,
  picturePlaceholder: <AiFillPicture />,
  friendAdd: <FaUserPlus />,
  friendChecked: <BsFillPersonCheckFill />,
  sendStatus: <BiMailSend />,
};

const Icon: React.FC<iconProps> = ({ icon }) => {
  return ICONS[icon];
};

export default Icon;
