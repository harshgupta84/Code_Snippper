import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Button, Label, TextInput, Card } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ViewNotes = () => {
  // Corrected component name to start with an uppercase letter
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // You can continue your component implementation here
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id]);
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white m-10">
          Shared Note Preview
        </h1>
        {content && (
          <Card className="border border-xl border-white rounded-lg ml-10 mr-10">
            <div className="mb-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {title}
              </h1>
              <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {category}
              </h2>
              <MarkdownPreview source={content} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Created on - {new Date().toLocaleDateString()}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
