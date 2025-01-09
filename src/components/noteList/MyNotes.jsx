import React, { useEffect } from "react";
import { Accordion, Button, Card, Badge, Blockquote } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../utils/LodingSpinner";
import ErrorMessage from "../utils/ErrorMessage";
import MarkdownPreview from "@uiw/react-markdown-preview";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import {
  EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { FaEdit, FaTrash, FaShareAlt, FaDownload, FaQrcode } from "react-icons/fa";
import useNotesStore from "../../stores/notesStore";
import useUserStore from "../../stores/userStore";


const MyNotes = ({ search }) => {

  const navigate = useNavigate();

  const { loading, error, notes, deleteNote,listNotes } = useNotesStore();


  const { userInfo } = useUserStore();


  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    listNotes();
  }, [
    navigate,
    userInfo,
    
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteNote(id);
    }
  };

  const generateShareableLink = (id) => {
    return `${window.location.origin}/note/view/${id}`;
  };

  const generateQRCode = async (id) => {
    const link = generateShareableLink(id);
    try {
      const qrCodeUrl = await QRCode.toDataURL(link);
      toast(
        <img src={qrCodeUrl} alt="QR Code" style={{ width: "150px" }} />,
        {
          duration: 15000,
        }
      );
    } catch (error) {
      toast.error("Failed to generate QR Code");
    }
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
                          toast.success("Link Copied to Clipboard!");
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
                      <Button
                        size="sm"
                        color="purple"
                        onClick={() => generateQRCode(noteItem._id)}
                      >
                        <FaQrcode />
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
                  <MarkdownPreview
                    style={{
                      borderRadius: 4,
                      padding: 40,
                      textAlign: "left",
                    }}
                    source={noteItem.content}
                  />
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
