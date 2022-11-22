import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { CommentType } from "../pages/question/[id]";

function Comment({ comment }: { comment: CommentType }) {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <div className="bg-white px-4 py-6 shadow- sm:p-6 sm:rounded-lg border rounded-lg shadow-sm">
      <div className="mt-2 text-sm text-gray-700 space-y-4">
        {comment.comment}
      </div>

      <div className="mt-6 flex justify-between space-x-8">
        <div className="flex space-x-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900">
              <a href={"/user/" + comment.user_id} className="hover:underline">
                {comment.user.name}
              </a>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(Date.parse(comment.created_at)).toLocaleDateString()}
            </div>
            <div className="flex space-x-6">
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium text-gray-900">
                    Votes: {comment.vote_sum}
                  </span>
                  <span className="sr-only">votes</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
