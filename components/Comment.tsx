import {
  ChevronDownIcon,
  ChevronUpIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { CommentType } from "../pages/question/[id]";
import UserContext from "./userContext";
import http from "../services/httpService";
function Comment({ comment }: { comment: CommentType }) {
  const [user] = useContext(UserContext);
  let jwt: string | null;
  const [hydrated, setHydrated] = React.useState(false);
  const [votes, setVotes] = useState(comment.vote_sum);
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
    jwt = localStorage.getItem(
      process.env.NEXT_PUBLIC_JWT_KEY || "jwtPrivateKey"
    );
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const handleVote = async (type: string): Promise<void> => {
    jwt = localStorage.getItem(
      process.env.NEXT_PUBLIC_JWT_KEY || "jwtPrivateKey"
    );
    jwt && http.setHeader("Authorization", "Bearer " + jwt);
    const url = `/comment/${comment.id}/${type}`;
    const res = await http.put(url);
    if (res.ok) setVotes(res?.data?.vote);
  };
  return (
    <div className="bg-white px-4 py-6 shadow- sm:p-6 sm:rounded-lg border rounded-lg shadow-sm mb-4">
      <div className="mt-2 text-sm text-gray-700 space-y-4 bg-gray-50 rounded-lg p-4">
        {comment.comment}
      </div>

      <div className="mt-6 flex justify-between space-x-8">
        {user ? (
          <div className="flex space-x-6 items-center">
            <button
              onClick={() => handleVote("upvote")}
              className="flex items-center font-medium text-gray-900"
            >
              <ChevronUpIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Upvote
            </button>
            <button
              onClick={() => handleVote("downvote")}
              className="flex items-center font-medium text-gray-900"
            >
              <ChevronDownIcon className="h-5 w-5 mr-1" aria-hidden="true" />{" "}
              Downvote
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="flex-1 w-full flex flex-row justify-between">
          <div className="flex space-x-6">
            <span className="flex items-center font-medium text-gray-900">
              <StarIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Votes: {parseInt(votes) || 0}
            </span>
          </div>
          <div className="flex justify-center space-x-2 pb-4">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
              <span className="text-xl font-medium leading-none text-white">
                {comment.user?.name[0]}
              </span>
            </span>
            <div>
              <div className="text-sm font-medium text-gray-900">
                <a
                  href={"/user/" + comment.user_id}
                  className="hover:underline"
                >
                  {comment.user.name}
                </a>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(Date.parse(comment.created_at)).toLocaleDateString(
                  "en-IN"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
