import React from 'react';
import { IoIosContact } from "react-icons/io";
import { FaStar, FaTags } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

export const menuItems = [
    { id: 'Contacts', icon: <IoIosContact className="size-6" />, label: 'Contacts' },
    { id: 'Favorites', icon: <FaStar className="size-5" />, label: 'Favorites' },
    { id: 'Tags', icon: <FaTags className="size-5" />, label: 'Tags' },
    { id: 'Groups', icon: <FaUserGroup className="size-5" />, label: 'Groups' },
    { id: 'Settings', icon: <IoMdSettings className="size-5" />, label: 'Settings' }
];

export const dummyContacts = () => [
    { id: 1, "name": "David Green", "email": "david.green@email.com", "phone": "7633289276" },
    { id: 2, "name": "Emma White", "email": "emma.white@email.com", "phone": "9633289276" },
    { id: 3, "name": "Olivia Smith", "email": "olivia.smith@email.com", "phone": "7633233276" },
    { id: 4, "name": "Noah Johnson", "email": "noah.johnsonegmail.com", "phone": "8633239276" },
    { id: 5, "name": "Ava Brown", "email": "ava.brown@email.com", "phone": "7638789276" }
];

export const randomColors = [
    { id: 1, name: "Coral", hex: "#FF7F7F", rgb: "rgb(255, 127, 127)" },
    { id: 2, name: "Sky Blue", hex: "#87CEEB", rgb: "rgb(135, 206, 235)" },
    { id: 3, name: "Mint Green", hex: "#98FB98", rgb: "rgb(152, 251, 152)" },
    { id: 4, name: "Lavender", hex: "#E6E6FA", rgb: "rgb(230, 230, 250)" },
    { id: 5, name: "Peach", hex: "#FFCBA4", rgb: "rgb(255, 203, 164)" },
    { id: 6, name: "Rose Gold", hex: "#E8B4CB", rgb: "rgb(232, 180, 203)" },
    { id: 7, name: "Turquoise", hex: "#40E0D0", rgb: "rgb(64, 224, 208)" },
    { id: 8, name: "Sunshine Yellow", hex: "#FFD700", rgb: "rgb(255, 215, 0)" },
    { id: 9, name: "Orchid", hex: "#DA70D6", rgb: "rgb(218, 112, 214)" },
    { id: 10, name: "Sage Green", hex: "#9CAF88", rgb: "rgb(156, 175, 136)" },
    { id: 11, name: "Periwinkle", hex: "#C5C5FF", rgb: "rgb(197, 197, 255)" },
    { id: 12, name: "Salmon", hex: "#FA8072", rgb: "rgb(250, 128, 114)" },
    { id: 13, name: "Teal", hex: "#008080", rgb: "rgb(0, 128, 128)" },
    { id: 14, name: "Burgundy", hex: "#800020", rgb: "rgb(128, 0, 32)" },
    { id: 15, name: "Amber", hex: "#FFBF00", rgb: "rgb(255, 191, 0)" },
    { id: 16, name: "Lilac", hex: "#B19CD9", rgb: "rgb(177, 156, 217)" },
    { id: 17, name: "Crimson", hex: "#DC143C", rgb: "rgb(220, 20, 60)" },
    { id: 18, name: "Forest Green", hex: "#228B22", rgb: "rgb(34, 139, 34)" },
    { id: 19, name: "Indigo", hex: "#4B0082", rgb: "rgb(75, 0, 130)" },
    { id: 20, name: "Tangerine", hex: "#FF8C00", rgb: "rgb(255, 140, 0)" }
];

export const favoriteContacts = () => [
    { id: 2, "name": "Emma White", "email": "emma.white@email.com", "phone": "9633289276" },
    { id: 3, "name": "Olivia Smith", "email": "olivia.smith@email.com", "phone": "7633233276" }
];