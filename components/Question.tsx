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
import React, { Fragment } from "react";
import { QuestionType } from "../pages";
import { classNames } from "../utils/ui";

function Question(question: QuestionType) {
  console.log(question.user);
  console.log(question.created_at);
  // const question = {
  //   id: "81614",
  //   likes: "29",
  //   replies: "11",
  //   views: "2.7k",
  //   author: {
  //     name: "Dries Vincent",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     href: "#",
  //   },
  //   date: "December 9 at 11:43 AM",
  //   datetime: "2020-12-09T11:43:00",
  //   href: "#",
  //   title: "What would you have done differently if you ran Jurassic Park?",
  //   body: `
  //         <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
  //         <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
  //       `,
  // };
  return (
    <li
      key={question.id}
      className="bg-white px-4 py-6 shadow- sm:p-6 sm:rounded-lg"
    >
      <article aria-labelledby={"question-title-" + question.id}>
        <div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-8 w-8 rounded-full  text-white " />
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
                  {/* <div>{question.created_at?.getDate()}</div> */}
                </a>
              </p>
            </div>
          </div>
          <h2
            id={"question-title-" + question.id}
            className="mt-4 text-base font-medium text-gray-900"
          >
            {question.title}
          </h2>
        </div>
        <div
          className="mt-2 text-sm text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: question.markdown }}
        />
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
        </div>
      </article>
    </li>
  );
}

export default Question;
