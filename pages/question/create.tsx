import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddQuestion from "../../components/AddQuestion";
import http from "../../services/httpService";
function Create() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let jwt: string | null;
  useEffect(() => {
    jwt = localStorage.getItem(
      process.env.NEXT_PUBLIC_JWT_KEY || "jwtPrivateKey"
    );
    if (!jwt) router.push("/login");
  }, []);

  const createQuestion = async (question: {
    title: string;
    content: string;
  }) => {
    setLoading(true);
    http.setHeader("Authorization", `Bearer ${jwt}`);
    const res = await http.post("/question", question);
    if (res.ok) {
      router.push("/question/" + (res.data as any).id);
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create Question
              </h2>
            </div>
            <AddQuestion onSubmit={createQuestion} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
