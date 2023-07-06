"use client";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { Card } from "./ui/card";

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendForm: FC = () => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
    defaultValues: {
      email: "",
    },
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        form.setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        form.setError("email", { message: error.response?.data });
        // form.clearErrors("email")
        return;
      }

      form.setError("email", { message: "Something went wrong." });
    }
  };

  // 2. Define a submit handler.
  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-5 sm:w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add your Email to send Friend request
                  </FormDescription>
                  <FormMessage/>
                  {showSuccessState ? (
                    <FormMessage className="text-green-300">Friend request sent!</FormMessage>
                  ) : null}
                </FormItem>
              )}
            />
            <Button type="submit" className="">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddFriendForm;
