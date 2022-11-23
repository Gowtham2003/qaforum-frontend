import React, { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Prism from "prismjs";
import http from "../../../services/httpService";
import "prism-themes/themes/prism-atom-dark.css";
import Comment from "../../../components/Comment";
import {
  StarIcon,
  ChatBubbleLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {} from "@heroicons/react/24/outline";
import UserContext from "../../../components/userContext";
function QuestionPage({ data }: { data: RootObject }) {
  const [user] = useContext(UserContext);
  const [votes, setVotes] = useState(data.vote_sum);
  // useEffect(() => {
  //   Prism.highlightAll();
  // }, []);
  const [hydrated, setHydrated] = useState(false);
  let jwt: string | null;
  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
    Prism.highlightAll();
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
    const url = `/question/${data.id}/${type}`;
    const res = await http.put(url);
    if (res.ok) setVotes(res?.data?.vote);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8 sm:p-8">
        <div className="flex flex-col space-y-4 border-b-2 pb-4 mb-8 ">
          <h1 className="text-3xl font-bold text-black">
            Question: {data?.title}
          </h1>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                <span className="text-xl font-medium leading-none text-white">
                  {data?.user?.name[0]}
                </span>
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <a href={"/user/" + data.user_id} className="hover:underline">
                  {data.user?.name}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <div>
                  {new Date(Date.parse(data.created_at)).toLocaleDateString(
                    "en-IN"
                  )}
                </div>
              </p>
            </div>
          </div>

          <div className="flex space-x-6 items-center">
            <span className="flex items-center font-medium text-gray-900">
              <StarIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Votes: {votes || 0}
            </span>
            <span className="flex items-center font-medium text-gray-900">
              <ChatBubbleLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />{" "}
              Replies: {data.comments_count || 0}
            </span>
          </div>
        </div>
        <div className="prose sm:mx-8 p-8 bg-gray-50 rounded-lg">
          <div
            className="mt-2 text-sm text-gray-700 space-y-4 "
            dangerouslySetInnerHTML={{ __html: data.markdown }}
          />
        </div>
        {user ? (
          <div className="flex space-x-6 items-center">
            <button
              onClick={() => handleVote("upvote")}
              className="flex items-center font-medium text-gray-900"
            >
              <ChevronUpIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Upvotes
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
        <div className="border-2 my-4" />
        <div>
          <div className="flex justify-between mb-4 items-center">
            <div className="text-lg font-semibold text-black ">
              {data?.comments?.length} Answers
            </div>
            <Link
              href={`/question/${data.id}/comment`}
              className="bg-gray-900 text-white rounded-lg p-2"
            >
              + Answer Question
            </Link>
          </div>
          {data?.comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await http.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/question/" + context.query.id
  );

  // Pass data to the page via props
  return { props: { data: res.data } };
};
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface CommentType {
  id: number;
  question_id: number;
  user_id: number;
  comment: string;
  votes: number;
  created_at: string;
  updated_at: string;
  vote_sum: string;
  user: User;
}

export interface User2 {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface RootObject {
  id: number;
  title: string;
  content: string;
  markdown: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  vote_sum?: any;
  comments: CommentType[];
  user: User2;
  comments_count: number;
}
