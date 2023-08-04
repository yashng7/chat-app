import { Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { ReactNode } from "react";
import { SidebarOption } from "@/types/typings";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import FriendRequestSidebarOption from "@/components/FriendRequestSidebarOption";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "FriendZone | Dashboard",
  description: "Your dashboard",
};

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  

  const namesArray = session?.user?.name?.trim().split(/\s+/);

  const initials = namesArray
    ?.map((name) => name.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-full h-full max-w-xs px-6 overflow-y-auto border-r border-gray-200 grow gap-y-5 ">
        <Link href="/dashboard" className="flex items-center h-16 shrink-0">
          <Icons.Logo className="w-auto h-8 text-primary" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-primary">
          Your chats
        </div>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li> Chats of user </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-primary">
                Overview
              </div>
              <ul role="list" className="mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link href={option.href}>
                        <Button variant="outline" className="w-full gap-3">
                          <span className="truncate">{option.name}</span>
                          <Icon className="w-4 h-4" />
                        </Button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li>
              <FriendRequestSidebarOption  />
            </li>

            <li className="flex items-center mt-auto -mx-6">
              <div className="flex items-center flex-1 gap-1 px-5 py-3 text-sm font-semibold leading-6">
                <Avatar className="relative w-8 h-8">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
                <SignOutButton />
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
