"use client";
import React, { FC, useState } from "react";

import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { Badge } from "./ui/badge";

interface FriendRequestSidebarOptionsProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

const FriendRequestSidebarOption: FC<FriendRequestSidebarOptionsProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );
  return (
    <Link href="/dashboard/request">
      <Button variant="outline" className="relative w-full gap-3">
        Friend Requests
        <User className="w-4 h-4" />
        {unseenRequestCount > 0 ? (
          <Badge variant="default" className="absolute -top-3 -right-4">
            {unseenRequestCount}
          </Badge>
        ) : null}
      </Button>
    </Link>
  );
};

export default FriendRequestSidebarOption;
