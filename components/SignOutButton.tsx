"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, LogOut } from "lucide-react";

export default function SignOutButton() {
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  return (
    <Button
      variant="link"
      // onClick={async () => {
      //   setIsSigningOut(true);
      //   try {
      //     await signOut();
      //   } catch (error) {
      //     toast({
      //       title: "Error",
      //       description: "There was a problem signing out",
      //       // action: (
      //       //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      //       // ),
      //     });
      //   } finally {
      //     setIsSigningOut(false);
      //   }
      // }}
      onClick={(event) => {
        event.preventDefault();
        signOut().catch(console.error);
      }}
    >
      {isSigningOut ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
}
