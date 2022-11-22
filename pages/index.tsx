import { useContext, useEffect, useState } from "react";
import http from "../services/httpService";
import QuestionList from "../components/QuestionList";
import Link from "next/link";
import { GetServerSideProps } from "next";
import UserContext from "../components/userContext";
export default function IndexPage({ data }: { data: QuestionType[] }) {
  const [user] = useContext(UserContext);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <header className="py-10">
            <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Home</h1>
              {user && (
                <Link
                  href="/question/create"
                  className="p-2 bg-gray-900 text-white rounded-lg"
                >
                  + Create Question
                </Link>
              )}
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="text-white mb-8">
              {data?.length
                ? `Showing ${data?.length} questions`
                : `There are no questions yet`}
            </div>
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <QuestionList questions={data ? data : []} />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionType {
  id: number;
  title: string;
  content: string;
  markdown: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  comments_count: number;
  questions_votes_sum_vote: string;
  user: User;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface QuestionResponse {
  current_page: number;
  data: QuestionType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const { data } = await http.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/questions"
  );
  console.log((data as QuestionResponse)?.data);
  // Pass data to the page via props
  return { props: { data: (data as QuestionResponse)?.data } };
};
