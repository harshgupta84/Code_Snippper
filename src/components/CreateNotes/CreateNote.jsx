import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../utils/ErrorMessage";
import { Card, Button, Label, TextInput } from "flowbite-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import toast, { Toaster } from "react-hot-toast";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const CreateNote = () => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBDpQ3QD6-mdf009l0LIUSv723Ywgl9D0w"
  );

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const [response, setResponse] = useState("");
  const [response2, setResponse2] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));
    toast.success("Note Created Successfully 😁");
    resetHandler();
    navigate("/mynotes");
  };

  const handleSendMessage = async () => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chatSession.sendMessage(
        `Summarize the following content: ${content}`
      );
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleGenerateContent = async () => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chatSession.sendMessage(
        `Generate content and summary for the title: ${title}`
      );
      setResponse2(result.response.text());
      setContent(
        (prevContent) => `${prevContent}\n\n${result.response.text()}`
      );
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div className="mt-10 mx-auto max-w-6xl">
      <Toaster />
      <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
        Create Your
        <span className="bg-blue-100 text-blue-800 text-5xl font-semibold ms-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
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
          <Button onClick={handleGenerateContent}>
            Generate Content By Title
          </Button>
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
          <Button onClick={handleSendMessage}>Summarize</Button>
          {response && (
            <div className="text-white">
              <MarkdownPreview  style={{ padding: 40 ,textAlign:"left"}} source={response} />
            </div>
          )}
        </div>
        <div>
          {content && (
            <div className=" flex flex-col ">
              <div className="flex">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Note Preview
                </h2>
              </div>
              <div className=" text-gray-700 dark:text-gray-300 ">
                <MarkdownPreview  style={{ padding: 40 ,textAlign:"left"}} className=" flex flex-col"source={content} />
              </div>
              <p className="inline-flex items-center text-base font-normal text-gray-500 hover:underline dark:text-gray-400">
                Creating on - {new Date().toLocaleDateString()}
              </p>
            </div>
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
