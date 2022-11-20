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
import { QuestionType } from "../pages";
import { classNames } from "../utils/ui";

function Question(question: QuestionType) {
  console.log(question.user);
  console.log(question.created_at);

  return (
    <li
      key={question.id}
      className="bg-white px-4 py-6 shadow- sm:p-6 sm:rounded-lg"
    >
      <article aria-labelledby={"question-title-" + question.id}>
        <div>
          <Link
            href={"/question/" + question.id}
            id={"question-title-" + question.id}
            className="text-base font-medium text-gray-900 underline"
          >
            {question.title}
          </Link>
        </div>
        {/* <div
          className="mt-2 text-sm text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: question.markdown }}
        /> */}
        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">
                  {question.questions_votes_sum_vote}
                </span>
                <span className="sr-only">likes</span>
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <ChatBubbleLeftIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">
                  {question.questions_votes_count}
                </span>
                <span className="sr-only">replies</span>
              </button>
            </span>
          </div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-8 w-8 rounded-full text-black " />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <a
                  href={"/user/" + question.user_id}
                  className="hover:underline"
                >
                  {question.user?.name}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <a
                  href={"/question/" + question.id}
                  className="hover:underline"
                >
                  <div>
                    {new Date(
                      Date.parse(question.created_at)
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

export default Question;
