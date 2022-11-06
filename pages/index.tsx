import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Nav from "../components/nav";
import http from "../services/httpService";
import Question from "../components/Question";
export default function IndexPage() {
  const [questions, setQuestions] = useState<QuestionType[]>();
  const loadData = async () => {
    const { data } = await http.get("/questions");
    setQuestions((data as QuestionResponse).data);
  };
  useEffect(() => {
    loadData();
  });
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Home</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              {/* <Question /> */}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
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
  from?: any;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to?: any;
  total: number;
}

export interface QuestionType {
  id: number;
  title: string;
  content: string;
  markdown: string;
  user_id: number;
  votes: number;
  created_at: Date;
  updated_at: Date;
}
