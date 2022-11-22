import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import Prism from "prismjs";
import http from "../../services/httpService";
import "prism-themes/themes/prism-atom-dark.css";
import Comment from "../../components/Comment";
import { UserCircleIcon } from "@heroicons/react/24/solid";
function QuestionPage({ data }: { data: RootObject }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8 sm:p-8">
        <div className="flex flex-col space-y-4 border-b-2 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-black">
            Question: {data.title}
          </h1>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-8 w-8 rounded-full text-black " />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <a href={"/user/" + data.user_id} className="hover:underline">
                  {data.user?.name}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <a href={"/question/" + data.id} className="hover:underline">
                  <div>
                    {new Date(Date.parse(data.created_at)).toLocaleDateString()}
                  </div>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="prose sm:mx-8">
          <div
            className="mt-2 text-sm text-gray-700 space-y-4 "
            dangerouslySetInnerHTML={{ __html: data.markdown }}
          />
        </div>
        <div className="border-4" />
        <div>
          <div className="text-lg font-semibold text-black pb-2 my-4">
            {data?.comments?.length} Answers
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
  vote_sum: string;
  created_at?: any;
  updated_at?: any;
  user: User;
}

export interface RootObject {
  id: number;
  title: string;
  content: string;
  markdown: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  comments: CommentType[];
}
