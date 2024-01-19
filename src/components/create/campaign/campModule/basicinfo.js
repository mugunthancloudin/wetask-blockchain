import React, { useRef, useState } from "react";
import axios from 'axios';
import FormData from 'form-data';
import { Editor, EditorState, RichUtils } from "draft-js";
import {
  MdOutlineCloudUpload,
  MdFormatSize,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import "./campaignModule.css";
import "draft-js/dist/Draft.css";

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NWM1YzJmNC0xZGRlLTRiNWEtYTBlMi1lYTNkNjVmNWFhMjIiLCJlbWFpbCI6ImZlYXJvZmFsbGdhbWVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkNTA0MmU2ZDllNTgzYjE5MjRhYiIsInNjb3BlZEtleVNlY3JldCI6IjQ0ODAwYjQ5YWNlZmNlNzhiM2U2MjRlZmFmNzU2YjVjZDZhODJkYTk2MGM5MzdiMjQ3YWIyODNhZmUwZjBmYTYiLCJpYXQiOjE3MDA3Mzg5OTJ9.2CI_ewpLvbwj7bgxW9Iu6QnDqC2gkjyTJHtyk6DNp4U'; // Replace with your actual JWT token


export default function Basicinfo() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [previewSrc, setPreviewSrc] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [visibility, setVisibility] = useState("public");
  const fileInputRef = useRef();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSrc(reader.result);
      reader.readAsDataURL(file);
      // Upload to IPFS
      const formData = new FormData();
      formData.append('file', file);

      const pinataMetadata = JSON.stringify({
        name: file.name,
      });
      formData.append('pinataMetadata', pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', pinataOptions);

      try {
        const res = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            maxBodyLength: 'Infinity',
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${JWT}`,
            },
          }
        );
        console.log(`Uploaded to IPFS:`, res.data);
      } catch (error) {
        console.error(`Error uploading to IPFS:`, error);
        }
      }
    };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  // const handleEditorChange = (newEditorState) => {
  //   setEditorState(newEditorState);
  
  //   const plainText = newEditorState.getCurrentContent().getPlainText('');
  //   const wordCount = plainText.split(/\s+/).filter((word) => word.length > 0).length;
  //   setWordCount(wordCount);
  // };
  

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  
    const plainText = newEditorState.getCurrentContent().getPlainText('');
    const charCount = plainText.length;
    setWordCount(charCount);
  };

  const toggleVisibility = (choice) => setVisibility(choice);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const applyStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-10 col-md-12">
          <h5>Campaign Name</h5>
          <input
            type="text"
            placeholder="Enter a Campaign name"
            className="form-control w-50 mt-3"
          />

          <h5 className="mt-3">Campaign Period</h5>
          <div className="d-flex">
            <input type="date" className="form-control me-2" />
            <input type="date" className="form-control ms-2" />
          </div>

          <h5 className="mt-3">Campaign Cover Image</h5>
          <div className="upload-container">
            <div className="upload-box" onClick={openFileDialog}>
              {previewSrc ? (
                <img src={previewSrc} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-instructions text-center">
                  <MdOutlineCloudUpload size={50} className="mb-3" />
                  <br />
                  JPG, PNG, SVG, WEBP, GIF. MAX 10MB.
                  <br />
                  THE SIZE OF THE COVER IMAGE: 1360PX*680PX
                  <br />
                  Click to select an image
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".jpg,.png,.svg,.webp,.gif"
              />
            </div>
          </div>

          <h5 className="mt-3">Campaign Description</h5>
          <div className="editor-container">
            <div className="toolbar text-center">
              <p onClick={() => applyStyle("BOLD")}>
                <MdFormatBold />
              </p>
              <p onClick={() => applyStyle("ITALIC")}>
                <MdFormatItalic />
              </p>
              <p onClick={() => applyStyle("UNDERLINE")}>
                <MdFormatUnderlined />
              </p>
              <p onClick={() => applyStyle("STRIKETHROUGH")}>
                <MdFormatStrikethrough />
              </p>
              <p onClick={() => applyStyle("LEFT")}>
                <MdFormatAlignLeft />
              </p>
              <p onClick={() => applyStyle("CENTER")}>
                <MdFormatAlignCenter />
              </p>
              <p onClick={() => applyStyle("RIGHT")}>
                <MdFormatAlignRight />
              </p>
              <p onClick={() => applyStyle("JUSTIFY")}>
                <MdFormatAlignJustify />
              </p>
              {/* Additional toolbar icons */}
            </div>
            <Editor
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={handleEditorChange}
            />
            <div className="word-count">{wordCount} words</div>
          </div>

          <h5>Who can see this Campaign</h5>
          <div className="toggle-switches justify-content-around my-4">
            <div
              className={`text-center toggle-option ${
                visibility === "public" ? "active" : ""
              }`}
              onClick={() => toggleVisibility("public")}
            >
              <IoEyeSharp size={25} />
              <br />
              <label className="mt-2">Public</label>
            </div>
            <div
              className={`text-center toggle-option ${
                visibility === "private" ? "active" : ""
              }`}
              onClick={() => toggleVisibility("private")}
            >
              <FaRegEyeSlash size={25} />
              <br />
              <label className="mt-2">Private</label>
            </div>
          </div>

          <p id="campaign-description" className="CampDescription text-center">
            {visibility === "public"
              ? "*This campaign will be listed on the Campaign/Space/Home page and is available to everyone"
              : "*This campaign will not be listed on the Campaign/Space/Home page and is available only to users who get the specified campaign link"}
          </p>

          <div className="buttons">
            <button className="save-draft">Save as Draft</button>
            <button className="next">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
