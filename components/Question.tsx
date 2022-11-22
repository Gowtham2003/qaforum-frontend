import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
  StarIcon,
  HandThumbDownIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { QuestionType } from "../pages";

function Question(question: QuestionType) {
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
          <div className="flex space-x-6 items-center">
            <span className="flex items-center font-medium text-gray-900">
              <StarIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Votes: {question.questions_votes_sum_vote || 0}
            </span>
            <span className="flex items-center font-medium text-gray-900">
              <ChatBubbleLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />{" "}
              Replies: {question.comments_count || 0}
            </span>
          </div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                <span className="text-xl font-medium leading-none text-white">
                  {question.user?.name[0]}
                </span>
              </span>
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
                {new Date(Date.parse(question.created_at)).toLocaleDateString(
                  "en-IN"
                )}
              </p>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Question;
