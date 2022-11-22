import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { RootObject } from ".";
import CommentForm from "../../../components/CommentForm";
import UserContext from "../../../components/userContext";
import http from "../../../services/httpService";
function CreateComment({ data }: { data: RootObject }) {
  const router = useRouter();

  let jwt: string | null;
  useEffect(() => {
    jwt = localStorage.getItem(
      process.env.NEXT_PUBLIC_JWT_KEY || "jwtPrivateKey"
    );
    if (!jwt) router.push("/login");
  }, []);

  const createComment = async (question: { comment: string }) => {
    http.setHeader(
      "Authorization",
      `Bearer ${localStorage.getItem(
        process.env.NEXT_PUBLIC_JWT_KEY || "jwtPrivateKey"
      )}`
    );
    const res = await http.post(`/comments`, {
      ...question,
      question_id: data.id,
    });
    if (res.ok) router.push("/question/" + data.id);
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                    {data?.user?.name}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="prose sm:mx-8 p-8 bg-gray-50 rounded-lg mb-8">
            <div
              className="mt-2 text-sm text-gray-700 space-y-4 "
              dangerouslySetInnerHTML={{ __html: data.markdown }}
            />
          </div>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Your Answer
              </h2>
            </div>
            <CommentForm onSubmit={createComment} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateComment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await http.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/question/" + context.query.id
  );

  // Pass data to the page via props
  return { props: { data: res.data } };
};
