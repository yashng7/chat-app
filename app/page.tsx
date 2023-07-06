"use client";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Navbar />
    </ThemeProvider>
  );
}
