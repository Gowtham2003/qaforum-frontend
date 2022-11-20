import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { QuestionType } from "..";
import Prism from "prismjs";
import "prism-themes/themes/prism-atom-dark.css";

function QuestionPage({ data }: { data: RootObject }) {
  console.log(data);
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8 border sm:p-8">
        <h1 className="text-3xl font-bold text-black mb-16 border-b-2 pb-8">
          Question: {data.title}
        </h1>
        <div className="prose sm:mx-16">
          <div className="text-2xl font-semibold text-black underline">
            Description
          </div>
          <div
            className="mt-2 text-sm text-gray-700 space-y-4 "
            dangerouslySetInnerHTML={{ __html: data.markdown }}
          />
        </div>
        <hr />
        <div>
          <div className="text-2xl font-semibold text-black underline">
            {data.comments.length} Answers
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/question/" + context.query.id
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
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
  comment: string;
  votes: number;
  created_at?: any;
  updated_at?: any;
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
  comments: Comment[];
}
