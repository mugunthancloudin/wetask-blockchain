import React, { useRef, useState } from "react";
import "./campaignModule.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import {
  MdFormatSize, // For H1, H2
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdInsertLink,
  MdLinkOff,
  MdInsertPhoto,
} from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function Basicinfo() {
  console.log("Rendering Basicinfo");

  const fileInputRef = useRef();
  const textInputRef = useRef(null);

  // State for storing the preview image
  const [previewSrc, setPreviewSrc] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [visibility, setVisibility] = useState("public");

  const toggleVisibility = (choice) => {
    setVisibility(choice);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Generate a URL for the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleTextInput = (event) => {
    const text = event.target.innerText;
    const letterCount = text.trim().length;
    setWordCount(letterCount);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
    <div className="container ">
      <div className="row mb-5">
        <div className="col-lg-10 col-md-12">
          <h5>Campaign Name</h5>
          <input
            type="text"
            placeholder="Enter a Campaign name"
            className="form-control w-50 mt-3"
          />

          <h5 className="mt-3">Campign Period</h5>
          <input type="date" />
          <input type="date" className="ms-5" />

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
            {/* <button className="upload-example">Cover Image Example</button> */}

            <h5 className="mt-3">Campign Description</h5>
            <div className="editor-container">
              <div className="toolbar text-center">
                <p onClick={() => applyStyle("formatBlock", "<h1>")}>
                  <MdFormatSize />
                </p>
                <p onClick={() => applyStyle("formatBlock", "<h2>")}>
                  <MdFormatSize />
                </p>
                <p onClick={() => applyStyle("bold")}>
                  <MdFormatBold />
                </p>
                <p onClick={() => applyStyle("italic")}>
                  <MdFormatItalic />
                </p>
                <p onClick={() => applyStyle("underline")}>
                  <MdFormatUnderlined />
                </p>
                <p onClick={() => applyStyle("strikeThrough")}>
                  <MdFormatStrikethrough />
                </p>
                <p onClick={() => applyStyle("insertUnorderedList")}>
                  <MdFormatListBulleted />
                </p>
                <p onClick={() => applyStyle("insertOrderedList")}>
                  <MdFormatListNumbered />
                </p>
                <p onClick={() => applyStyle("justifyLeft")}>
                  <MdFormatAlignLeft />
                </p>
                <p onClick={() => applyStyle("justifyCenter")}>
                  <MdFormatAlignCenter />
                </p>
                <p onClick={() => applyStyle("justifyRight")}>
                  <MdFormatAlignRight />
                </p>
                <p onClick={() => applyStyle("justifyFull")}>
                  <MdFormatAlignJustify />
                </p>
                <p onClick={() => applyStyle("createLink")}>
                  <MdInsertLink />
                </p>
                <p onClick={() => applyStyle("unlink")}>
                  <MdLinkOff />
                </p>
                <p onClick={() => applyStyle("insertImage")}>
                  <MdInsertPhoto />
                </p>

                <Editor
                  editorState={editorState}
                  handleKeyCommand={handleKeyCommand}
                  onChange={setEditorState}
                />
              </div>
              <div
                className="text-input"
                ref={textInputRef}
                contentEditable
                onInput={handleTextInput}
                // suppressContentEditableWarning={true}
              >
                Editable content goes here
              </div>
              <div className="word-count">{wordCount}</div>
            </div>
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

          {/* <div class="recaptcha-checkbox">
          <input type="checkbox" id="recaptcha" />
          <label for="recaptcha">Google reCAPTCHA</label>
        </div>
        <p className="recaptcha-description">
          Check the box to enable robot check
        </p> */}

          <div className="buttons ">
            <button className="save-draft ">Save as Draft</button>
            <button className="next">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
