import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Badge, Blockquote } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import LoadingSpinner from "../utils/LodingSpinner"; // Corrected import
import ErrorMessage from "../utils/ErrorMessage";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useDispatch, useSelector } from "react-redux";

const MyNotes = ({ search }) => {
  console.log(search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successDelete,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const renderCodeBlock = (code, language) => {
    return (
      <div key={Math.random()} style={{ textAlign: "left" }}>
        <SyntaxHighlighter language={language} style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-10 mb-4 min-h-screen">
      {error && <ErrorMessage error={error} />}
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome{" "}
        <span class="text-blue-600 dark:text-blue-500">
          {userInfo && userInfo.name}
        </span>{" "}
        to CodeSnipper
      </h1>
      <Link to="/createnote">
        <Button size="xl" className="m-10">
          Create New Note
        </Button>
      </Link>
      <Accordion className="mx-5 p-5" collapseAll>
        {notes
          ?.reverse()
          .filter((filterNote) =>
            filterNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((noteItem, index) => (
            <Accordion.Panel key={index} eventKey={index.toString()}>
              <Card>
                <div className="flex ">
                  <Accordion.Title>{noteItem.title}</Accordion.Title>

                  <Button href={`/note/${noteItem._id}`}>Edit</Button>
                  <Button
                    color="warning"
                    className="mx-2"
                    onClick={() => deleteHandler(noteItem._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
              <Accordion.Content>
                <Badge color="success" className="text-xl max-w-44">
                  Category - {noteItem.category}
                </Badge>

                <Blockquote className="blockquote mb-2 ml-10 mr-10">
                  <MarkdownPreview source={noteItem.content} />

                  <footer className="blockquote-footer">
                    Created On -
                    <cite>{noteItem.createdAt.substring(0, 10)}</cite>
                  </footer>
                </Blockquote>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
      </Accordion>
    </div>
  );
};

export default MyNotes;