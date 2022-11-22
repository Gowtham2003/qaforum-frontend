import http from "../../services/httpService";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Question from "../../components/QuestionCard";

export default function UserPage({ data }: { data: RootObject }) {
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
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 shadow pb-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-500">
                    <span className="text-xl font-medium leading-none text-white">
                      {data.name[0]}
                    </span>
                  </span>
                  <span
                    className="absolute inset-0 shadow-inner rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {data.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-4 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Questions
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Showing {data.questions_count} questions
                    </p>
                  </div>
                </div>
                <ul role="list" className="space-y-4">
                  {data.questions?.map((question) => (
                    <>
                      <Question key={question.id} {...question} />
                      <hr />
                    </>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await http.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/" + context.query.id
  );

  // Pass data to the page via props
  return { props: { data: res.data } };
};

export interface QuestionType {
  id: number;
  title: string;
  content: string;
  markdown: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  questions_votes_sum_vote?: any;
}

export interface RootObject {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  questions_count: number;
  questions: QuestionType[];
}
