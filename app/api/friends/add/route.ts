import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userToAddId = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;

    if (!userToAddId) {
      return new Response("This person does not exist.", { status: 400 });
    }

    if (userToAddId === session.user.id) {
      return new Response("You cannot add Yourself as friend", { status: 400 });
    }

    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${userToAddId}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("Already added this user", { status: 400 });
    }

    const isAlreadyReceiveFriendRequest = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      userToAddId
    )) as 0 | 1;

    if (isAlreadyReceiveFriendRequest) {
      return new Response(
        "This user already invite you first please check your friend requests",
        { status: 400 }
      );
    }

    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      userToAddId
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response("Already friends with this user", { status: 400 });
    }

    await pusherServer.trigger(
      toPusherKey(`user:${userToAddId}:incoming_friend_requests`),
      "incoming_friend_requests",
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      }
    );

    await db.sadd(`user :${userToAddId}:incoming_friend_requests`, session.user.id);

    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request ", { status: 400 });
  }
}
