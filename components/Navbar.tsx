import React from "react";
import ThemeChanger from "./utils/ThemeChanger";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Navigation from "./utils/Navigation";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex items-center justify-between p-5">
      <span>ChitChat</span>
      <Navigation />
      <div className="flex items-center gap-5">
        <ThemeChanger />
        <span>name</span>
        <Avatar>
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
