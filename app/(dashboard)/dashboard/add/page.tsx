"use client"
import AddFriendForm from "@/components/AddFriendForm";
import { ThemeProvider } from "next-themes";
import { FC } from "react";

const page: FC = () => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AddFriendForm />
    </ThemeProvider>
  );
};

export default page;
