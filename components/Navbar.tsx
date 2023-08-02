"use client";
import React, { useEffect, useState } from "react";
import ThemeChanger from "./utils/ThemeChanger";
import { Button } from "./ui/button";
import Link from "next/link";
import Profile from "./Profile";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

// type Props = { session: User };

const Navbar = (/*{ session }: Props*/) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSession();
        setSession(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, []);

  // const session = await getAuthSession()

  return (
    <nav className="flex items-center justify-between p-5">
      <span>ChitChat</span>
      {/* <Navigation /> */}
      <div className="flex items-center gap-5">
        <ThemeChanger />
        {session?.user ? (
          <Profile user={session.user} />
          // <p>{session.user.name}</p>
        ) : (
          <Link href={"/login"}>
            <Button>Create Account</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
