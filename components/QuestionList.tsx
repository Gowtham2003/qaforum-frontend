import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import React, { Fragment } from "react";
import { QuestionType } from "../pages";
import { classNames } from "../utils/ui";
import Question from "./Question";

function QuestionList({ questions }: { questions: QuestionType[] }) {
  return (
    <ul role="list" className="space-y-4">
      {questions?.map((question) => (
        <>
          <Question key={question.id} {...question} />
          <hr />
        </>
      ))}
    </ul>
  );
}

export default QuestionList;
