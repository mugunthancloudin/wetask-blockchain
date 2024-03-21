import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "../../campaign/campModule/formprovider";
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
import axios from "axios";
import FormData from 'form-data';
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import "../../campaign/campModule/campaignModule.css"
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

export default function EventBasicInfo() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [campaignDescription, setCampaignDescription] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [visibility, setVisibility] = useState("public");
  // const [fileInputKey, setFileInputKey] = useState(Date.now());
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { allFormData, updateFormData } = useFormContext();
  // const { updateFormData } = useFormContext();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSrc(reader.result);
      reader.readAsDataURL(file);

      // Upload the file to IPFS
      const formData = new FormData();
      formData.append('file', file);

      const pinataMetadata = JSON.stringify({
        name: `Campaign Cover Image - ${file.name}`,
      });
      formData.append('pinataMetadata', pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', pinataOptions);

      try {
        const response = await axios.post(
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
        console.log('IPFS Upload Response:', response.data);
        setIpfsHash(response.data.IpfsHash);
        // Handle the response, e.g., saving the IPFS hash to state or form
      } catch (error) {
        console.error('Error uploading file to IPFS:', error);
      }
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
        coverImageIpfsCid: ipfsHash,
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
              <div>
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
