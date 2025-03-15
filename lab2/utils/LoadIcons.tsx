import StoreIcon from "../assets/icons/StoreIcon.svg"
import CommunityIcon from "../assets/icons/CommunityIcon.svg";
import ChatIcon from "../assets/icons/ChatIcon.svg";
import SafetyIcon from "../assets/icons/SafetyIcon.svg";
import ProfileIcon from "../assets/icons/ProfileIcon.svg";

console.log(StoreIcon)

export const LoadIcons = () => {
  return [
    { name: "StoreScreen", Icon: StoreIcon },
    { name: "CommunityScreen", Icon: CommunityIcon },
    { name: "ChatScreen", Icon: ChatIcon },
    { name: "SafetyScreen", Icon: SafetyIcon },
    { name: "ProfileScreen", Icon: ProfileIcon },
  ];
};
