import { Menu, Transition } from "@headlessui/react";
import {
  StarIcon,
  FlagIcon,
  EyeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import { classNames } from "../utils/ui";
import {CommentType} from "../pages/question/[id]"

function Comment(comment : {comment: Comment}) {
  return (
    <li
      key={comment.id}
      className="bg-white px-4 py-6 shadow- sm:p-6 sm:rounded-lg"
    >
      <article aria-labelledby={"comment-title-" + comment.id}>
        <div>
          <Link
            href={"/comment/" + comment.id}
            id={"comment-title-" + comment.id}
            className="text-base font-medium text-gray-900 underline"
          >
            {comment.}
          </Link>
        </div>
        {/* <div
          className="mt-2 text-sm text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: comment.markdown }}
        /> */}
        <div className="mt-6 flex justify-between space-x-8">
          
          <div className="flex space-x-3">
           
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <a
                  href={"/user/" + comment.user_id}
                  className="hover:underline"
                >
                  {comment.user?.name}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <a href={"/comment/" + comment.id} className="hover:underline">
                  <div>
                    {new Date(
                      Date.parse(comment.created_at)
                    ).toLocaleDateString()}
                  </div>
                </a>
              </p>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Comment;
