"use client";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "@/components/ThemeChanger";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Navbar />
    </ThemeProvider>
  );
}
