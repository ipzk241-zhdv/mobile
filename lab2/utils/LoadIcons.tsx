import StoreIcon from "../assets/icons/StoreIcon.svg";
import CommunityIcon from "../assets/icons/CommunityIcon.svg";
import ChatIcon from "../assets/icons/ChatIcon.svg";
import SafetyIcon from "../assets/icons/SafetyIcon.svg";
import ProfileIcon from "../assets/icons/ProfileIcon.svg";
import SearchIcon from "../assets/icons/search.svg";
import SteamIcon from "../assets/icons/steam.svg";
import ShareIcon from "../assets/icons/share.svg";
import LikeIcon from "../assets/icons/like.svg";
import CommentIcon from "../assets/icons/comment.svg";
import MacIcon from "../assets/icons/mac.svg";
import WindowsIcon from "../assets/icons/windows.svg";
import { NumberProp } from "react-native-svg";

export const LoadIcons = () => {
    return [
        { name: "StoreScreen", Icon: StoreIcon },
        { name: "CommunityScreen", Icon: CommunityIcon },
        { name: "ChatScreen", Icon: ChatIcon },
        { name: "SafetyScreen", Icon: SafetyIcon },
        { name: "ProfileScreen", Icon: ProfileIcon },
        { name: "search", Icon: SearchIcon },
        { name: "steam", Icon: SteamIcon },
        { name: "like", Icon: LikeIcon },
        { name: "comment", Icon: CommentIcon },
        { name: "share", Icon: ShareIcon },
        { name: "mac", Icon: MacIcon },
        { name: "windows", Icon: WindowsIcon },
    ];
};

export const GetIcon = (icon: string, size: NumberProp, stroke?: string, fill?: string) => {
    const IcoEntry = LoadIcons().find((ico) => ico.name === icon);
    const Icon = IcoEntry?.Icon;
    return Icon ? <Icon width={size} height={size} stroke={stroke} fill={fill} /> : null;
};
