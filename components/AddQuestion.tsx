import React from "react";
import useForm from "../hooks/useForm";
import { classNames } from "../utils/ui";

function AddQuestion({
  onSubmit,
  loading,
}: {
  onSubmit: (data: { title: string; content: string }) => {};
  loading: boolean;
}) {
  const [values, onChange] = useForm({ title: "", content: "" });

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={values.title}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="content"
                name="content"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={""}
                value={values.description}
                onChange={onChange}
                rows={8}
                required
              />
            </div>
          </div>
          <div className="pt-5">
            <button
              type="submit"
              className={classNames(
                "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                loading ? "animate-pulse" : ""
              )}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddQuestion;
