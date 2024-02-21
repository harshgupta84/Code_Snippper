import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../utils/ErrorMessage";
import { Card, Button, Label, TextInput } from "flowbite-react";
import ReactMarkdown from "react-markdown";
import MarkdownPreview from "@uiw/react-markdown-preview";

const CreateNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <div className="mt-10 mx-auto max-w-xl">
      <h1 class="flex items-center text-5xl font-extrabold dark:text-white">
        Create Your
        <span class="bg-blue-100 text-blue-800 text-5xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
          Note
        </span>
      </h1>
      <form
        onSubmit={updateHandler}
        className="flex flex-col gap-4 mt-10 mb-10"
      >
        {error && <ErrorMessage error={error} />}
        <div>
          <Label htmlFor="title" className="text-xl" value="Your Title" />
          <TextInput
            id="title"
            type="text"
            placeholder="Enter Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="category" className="text-xl" value="Category" />
          <TextInput
            id="category"
            type="text"
            placeholder="Enter Category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="content" className="text-xl" value="Your Content" />
          <textarea
            id="content"
            rows="4"
            className="w-full px-3 py-2 mt-1 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            placeholder="Write notes here..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          {content && (
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Note Preview
              </h2>
              <div className="text-lg text-gray-700 dark:text-gray-300">
                <MarkdownPreview source={content} />
              </div>
              <p className="inline-flex items-center text-base font-normal text-gray-500 hover:underline dark:text-gray-400">
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Creating on - {new Date().toLocaleDateString()}
              </p>
            </Card>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <Button type="submit" className="w-1/2">
            Post Note
          </Button>
          <Button
            type="button"
            color="warning"
            onClick={resetHandler}
            className="w-1/2"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
