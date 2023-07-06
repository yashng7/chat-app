import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "FriendZone | Dashboard",
  description: "Your dashboard",
};

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);

  return <div>{children}</div>;
};

export default Layout;
