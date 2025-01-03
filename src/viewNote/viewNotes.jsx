import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode";
import { Card, Badge, Button } from "flowbite-react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ViewNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [qrCode, setQrCode] = useState("");

  // Fetching the note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(`/api/notes/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
      } catch (err) {
        console.error("Error fetching note:", err);
      }
    };

    fetchNote();
  }, [id]);

  // QR Code generation
  const handleGenerateQR = async () => {
    const noteUrl = `${window.location.origin}`+"/notes/"+`${id}`;
    try {
      const qrCodeUrl = await QRCode.toDataURL(noteUrl);
      setQrCode(qrCodeUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white m-10">
          Shared Note Preview
        </h1>
        <div className="m-10 flex justify-start">
          <Button color="info" onClick={handleGenerateQR}>
            Generate QR Code
          </Button>
        </div>
        {qrCode && (
          <div className="flex justify-center mb-6">
            <img src={qrCode} alt="QR Code" className="w-40 h-40" />
          </div>
        )}
        {content && (
          <Card className="border border-xl border-white rounded-lg ml-10 mr-10">
            <div className="mb-4">
              <div className="flex justify-start mt-2 mb-4">
                <Badge color="success" className="text-lg">
                  Category - {category}
                </Badge>
              </div>
              <div className="relative rounded-t-xl p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                <div className="h-12 flex items-center px-4 bg-slate-800 rounded-t-lg">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 flex items-center">
                    <div className="bg-slate-700 rounded-t-lg px-4 py-1 text-white">
                      {title}
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
                  source={content}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Created on - {new Date(date).toLocaleDateString()}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
