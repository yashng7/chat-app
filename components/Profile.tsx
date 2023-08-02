import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutButton from "./SignOutButton";
import  { User } from "next-auth";

type Props = { user: Pick<User, "name" | "image"> };

const Profile = ({ user }: Props) => {
  const namesArray = user?.name?.trim().split(/\s+/);

  const initials = namesArray
    ?.map((name) => name.charAt(0))
    .join("")
    .toUpperCase();

    console.log(user.image)

  return (
    <div className="flex items-center flex-1 gap-1 px-5 py-3 text-sm font-semibold leading-6">
      <Avatar className="relative w-8 h-8">
        <AvatarImage src={user.image || ""} alt="Your profile picture" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="sr-only">Your profile</span>
      <SignOutButton />
    </div>
  );
};

export default Profile;
