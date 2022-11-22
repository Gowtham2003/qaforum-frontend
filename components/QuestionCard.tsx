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
import { QuestionType } from "../pages/user/[id]";
import { classNames } from "../utils/ui";

function Question(question: QuestionType) {
  return (
    <li
      key={question.id}
      className="bg-white px-4 py-6 shadow- sm:p-6 sm:rounded-lg border rounded-md m-8"
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
                  Votes: {question.questions_votes_sum_vote || 0}
                </span>
                <span className="sr-only">votes</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Question;
