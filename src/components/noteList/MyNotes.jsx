import React, { useEffect } from "react";
import { Accordion, Button, Card, Badge, Blockquote } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import LoadingSpinner from "../utils/LodingSpinner";
import ErrorMessage from "../utils/ErrorMessage";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import {
  EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { FaEdit, FaTrash, FaShareAlt, FaDownload } from "react-icons/fa";

const MyNotes = ({ search }) => {
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

  const generateShareableLink = (id) => {
    toast.success("Link Created Successfully");
    return `${window.location.origin}/note/view/${id}`;
  };

  const downloadPDF = (content) => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save("note.pdf");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-10 mb-4 min-h-screen px-4">
      {error && <ErrorMessage error={error} />}
      <Toaster />
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
        Welcome{" "}
        <span className="text-blue-600 dark:text-blue-500">
          {userInfo && userInfo.name}
        </span>{" "}
        to CodeSnipper
      </h1>
      <div className="flex justify-center mb-6">
        <Link to="/createnote">
          <Button size="lg" className="m-2">
            Create New Note
          </Button>
        </Link>
      </div>
      <Accordion className="mx-5" collapseAll>
        {notes
          ?.reverse()
          .filter((filterNote) =>
            filterNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((noteItem, index) => (
            <Accordion.Panel key={index} eventKey={index.toString()}>
              <div>
                <Card className="m-1">
                  <div className="flex flex-col md:flex-row gap-3 items-center">
                    <Accordion.Title className="text-lg">
                      {noteItem.title}
                    </Accordion.Title>
                    <div className="flex gap-2">
                      <Link to={`/note/${noteItem._id}`}>
                        <Button size="sm" color="info">
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        color="warning"
                        onClick={() => deleteHandler(noteItem._id)}
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        size="sm"
                        color="info"
                        onClick={() => {
                          const shareableLink = generateShareableLink(
                            noteItem._id
                          );
                          navigator.clipboard.writeText(shareableLink);
                        }}
                      >
                        <FaShareAlt />
                      </Button>
                      <Button
                        size="sm"
                        color="success"
                        onClick={() => downloadPDF(noteItem.content)}
                      >
                        <FaDownload />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              <Accordion.Content>
                <div className="flex justify-start mt-2 mb-4">
                  <Badge color="success" className="text-lg">
                    Category - {noteItem.category}
                  </Badge>
                </div>

                <Blockquote className="mb-2">
                  <div className="relative rounded-t-xl p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                    <div className="h-12 flex items-center px-4 bg-slate-800 rounded-t-lg">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="ml-4 flex items-center">
                        <div className="bg-slate-700 rounded-t-lg px-4 py-1 text-white">
                          {noteItem.title}
                        </div>
                      </div>
                      <button className="ml-1 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center">
                        +
                      </button>
                    </div>

                    <MarkdownPreview
                      style={{
                        borderRadius: 4,
                        padding: 40,
                        textAlign: "left",
                      }}
                      source={noteItem.content}
                    />
                  </div>
                  <div className="ml-5 mt-4">
                    Created On
                    <cite>{" " + noteItem.createdAt.substring(0, 10)}</cite>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <EmailShareButton
                      subject={noteItem.title}
                      body={noteItem.content}
                    >
                      <EmailIcon size={32} round={true}></EmailIcon>
                    </EmailShareButton>
                    <WhatsappShareButton
                      title={noteItem.title + noteItem.content}
                      separator=":: "
                      url={window.location.href}
                    >
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </div>
                </Blockquote>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
      </Accordion>
    </div>
  );
};

export default MyNotes;
