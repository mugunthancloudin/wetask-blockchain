import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "./formprovider";
import { Editor, EditorState, RichUtils } from "draft-js";
import {
  MdOutlineCloudUpload,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import "./campaignModule.css";
import "draft-js/dist/Draft.css";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NWM1YzJmNC0xZGRlLTRiNWEtYTBlMi1lYTNkNjVmNWFhMjIiLCJlbWFpbCI6ImZlYXJvZmFsbGdhbWVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkNTA0MmU2ZDllNTgzYjE5MjRhYiIsInNjb3BlZEtleVNlY3JldCI6IjQ0ODAwYjQ5YWNlZmNlNzhiM2U2MjRlZmFmNzU2YjVjZDZhODJkYTk2MGM5MzdiMjQ3YWIyODNhZmUwZjBmYTYiLCJpYXQiOjE3MDA3Mzg5OTJ9.2CI_ewpLvbwj7bgxW9Iu6QnDqC2gkjyTJHtyk6DNp4U"; // Replace with your actual JWT token

const BasicInfoSchema = yup.object().shape({
  campaignName: yup.string().required("*Please enter your Campaign name."),
  // campaignStartDate: yup.date().required("*Please select a start date."),
  // campaignExpairyDate: yup.date().required("*Please select an expiry date."),
  // campDescription: yup
  //   .string()
  //   .required("*Please enter your Campaign description."),

  // campaignCoverImage: yup
  //   .mixed()
  //   .required("*Please upload a campaign cover image")
  //   .test("fileType", "Invalid file format", (value) => {
  //     if (!value) {
  //       return false;
  //     }
  //     const supportedFormats = [
  //       "image/jpeg",
  //       "image/png",
  //       "image/svg+xml",
  //       "image/webp",
  //       "image/gif",
  //     ];
  //     return supportedFormats.includes(value[0].type);
  //   })
  //   .test("fileSize", "File size too large", (value) => {
  //     if (!value) {
  //       return false;
  //     }
  //     return value[0].size <= 10 * 1024 * 1024;
  //   }),
});

export default function BasicInfo() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [campaignDescription, setCampaignDescription] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [visibility, setVisibility] = useState("public");
  // const [fileInputKey, setFileInputKey] = useState(Date.now());
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { allFormData, updateFormData } = useFormContext();
  // const { updateFormData } = useFormContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const plainText = newEditorState.getCurrentContent().getPlainText("");
    setCampaignDescription(plainText);

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

  const {
    control,
    register,
    handleSubmit: handleSubmitCampaignDetails,
    formState: { errors: campaignError },
  } = useForm({
    resolver: yupResolver(BasicInfoSchema),
  }); 

  const onSubmitOfCampaignDetails = (data) => {
    try {
      // Convert campaign start and expiry dates from ISO string to epoch time (milliseconds)
      const campaignStartDateEpoch = new Date(data.campaignStartDate).getTime();
      const campaignExpairyDateEpoch = new Date(data.campaignExpairyDate).getTime();
  
      const submittedData = {
        ...data,
        campaignDescription,
        visibility,
        campaignStartDate: campaignStartDateEpoch,
        campaignExpairyDate: campaignExpairyDateEpoch,
      };
  
      // Log or handle the submitted data as needed
      alert("Submitted Data: " + JSON.stringify(submittedData, null, 2));
      console.log("onSubmitOfCampaignDetails triggered", submittedData);
  
      // Assuming updateFormData is a function to update the context or perform an API call
      const newData = { BasicInfo: submittedData };
      updateFormData(newData);
  
      navigate(`/camp/campaignrewards`);
    } catch (error) {
      console.error("Error in onSubmitOfCampaignDetails:", error);
    }
  };
  

  useEffect(() => {
    // Perform actions after state updates
    console.log("campaignDescription updated:", campaignDescription);
  }, [campaignDescription]);

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-10 col-md-12">
          <form
            onSubmit={handleSubmitCampaignDetails(onSubmitOfCampaignDetails)}
          >
            <div className="row">
              <h5>Campaign Name</h5>
              <input
                type="text"
                placeholder="Enter a Campaign name"
                className="form-control w-50 mt-3"
                {...register("campaignName")}
              />
              {campaignError.campaignName && (
                <p className="text-danger fw-bold">
                  {campaignError.campaignName.message}
                </p>
              )}
            </div>

            <div className="row">
              <h5 className="mt-3">Campaign Period</h5>
              <div className="d-flex row mt-4">
                <div className="col-lg-6">
                  <h6>Campiagn Start</h6>
                  <input
                    type="datetime-local"
                    className="form-control mt-3 "
                    {...register("campaignStartDate")}
                  />
                  {campaignError.campaignStartDate && (
                    <p className="text-danger fw-bold">
                      {campaignError.campaignStartDate.message}
                    </p>
                  )}
                </div>
                <div className="col-lg-6">
                  <h6 className="">Campiagn Emd</h6>
                  <input
                    type="datetime-local"
                    className="form-control mt-3"
                    {...register("campaignExpairyDate")}
                  />
                  {campaignError.campaignExpairyDate && (
                    <p className="text-danger fw-bold">
                      {campaignError.campaignExpairyDate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h5 className="mt-3">Campaign Cover Image</h5>
              <div className="upload-container">
                <div className="upload-box" onClick={openFileDialog}>
                  {previewSrc ? (
                    <img
                      src={previewSrc}
                      alt="Preview"
                      className="image-preview"
                    />
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
                    required
                  />
                </div>
              </div>
            </div>

            <div>
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
                </div>
                <Editor
                  editorState={editorState}
                  handleKeyCommand={handleKeyCommand}
                  onChange={handleEditorChange}
                />
                <div className="word-count">{wordCount} words</div>
              </div>

              {campaignError.campDescription && (
                <p className="text-danger fw-bold">
                  {campaignError.campDescription.message}
                </p>
              )}
            </div>

            <div className="mt-3">
              <h5>Who can see this Campaign</h5>
              <div className="toggle-switches justify-content-around my-4">
                <div
                  className={`text-center toggle-option ${
                    visibility === "public" ? "active" : " "
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

              <p id="campaign-mode" className="CampMode text-center">
                {visibility === "public"
                  ? "*This campaign will be listed on the Campaign/Space/Home page and is available to everyone"
                  : "*This campaign will not be listed on the Campaign/Space/Home page and is available only to users who get the specified campaign link"}
              </p>
            </div>

            <div className="buttons mt-5">
              <button className="save-draft">Save as Draft</button>
              <button type="submit" className="next">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>    
  );
}
