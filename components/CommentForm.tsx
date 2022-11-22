import React from "react";
import useForm from "../hooks/useForm";

function CreateForm({
  onSubmit,
}: {
  onSubmit: (data: { comment: string }) => {};
}) {
  const [values, onChange] = useForm({ comment: "" });

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
          <div className="sm:col-span-6">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <div className="mt-1">
              <textarea
                id="comment"
                name="comment"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                value={values.comment}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="pt-5">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateForm;
