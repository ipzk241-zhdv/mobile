import StoreIcon from "../assets/icons/StoreIcon.svg";
import CommunityIcon from "../assets/icons/CommunityIcon.svg";
import ChatIcon from "../assets/icons/ChatIcon.svg";
import { NumberProp } from "react-native-svg";

export const LoadIcons = () => {
    return [
        { name: "MainScreen", Icon: StoreIcon },
        { name: "GoalsScreen", Icon: CommunityIcon },
        { name: "SettingsScreen", Icon: ChatIcon },
    ];
};

export const GetIcon = (icon: string, size: NumberProp, stroke?: string, fill?: string) => {
    const IcoEntry = LoadIcons().find((ico) => ico.name === icon);
    const Icon = IcoEntry?.Icon;
    return Icon ? <Icon width={size} height={size} stroke={stroke} fill={fill} /> : null;
};
