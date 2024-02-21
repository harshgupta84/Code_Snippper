import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../utils/ErrorMessage";
import LoadingSpinner from "../utils/LodingSpinner";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SingleNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
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
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  if (loading || loadingDelete) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto mt-10 mb-10">
      <form className="max-w-lg mx-auto" onSubmit={updateHandler}>
        {error && <ErrorMessage error={error} />}
        {errorDelete && <ErrorMessage error={errorDelete} />}
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
              <MarkdownPreview source={content} />
              <p className="text-xs text-gray-500 hover:underline">
                Creating on - {new Date().toLocaleDateString()}
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
