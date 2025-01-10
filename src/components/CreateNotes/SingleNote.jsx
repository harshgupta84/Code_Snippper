import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "../utils/ErrorMessage";
import LoadingSpinner from "../utils/LodingSpinner";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Toaster } from "react-hot-toast";
import useNotesStore from "../../stores/notesStore";


const SingleNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");


  const { loading, error, updateNote, deleteNote } = useNotesStore();



  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteNote(id);
    }
    navigate("/mynotes");
  };

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

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    updateNote(id, title, content, category);
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  if (loading ) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-10 mb-10">
      <form className="max-w-screen mx-80" onSubmit={updateHandler}>
        {error && <ErrorMessage error={error} />}
  
        <Toaster />
        <div className="mb-4">
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            type="text"
            placeholder="Enter Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="category" value="Category" />
          <TextInput
            id="category"
            type="text"
            placeholder="Enter Category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="content" value="Content" />
          <textarea
            id="content"
            rows="6"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-gray-500"
            placeholder="Write notes here..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          {content && (
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Note Preview
              </h5>
              <MarkdownPreview style={{ padding: 40, textAlign: "left" }} source={content} />
              <p className="text-xs text-gray-500 hover:underline">
                Updating on - {new Date().toLocaleDateString()}
              </p>
            </Card>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">Update Note</Button>
          <Button color="red" onClick={() => deleteHandler(id)}>
            Delete Note
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SingleNote;
