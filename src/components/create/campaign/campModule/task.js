import React, { useState } from "react";
import axios from 'axios'; // Ensure axios is imported
import "./campaignModule.css";
import twitter from "../../../assets/campaign/twitter.svg"; // Adjust the import path as necessary
import { FaPlus } from "react-icons/fa";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (id, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const addTask = (taskType) => {
    const newTaskId = tasks.length + 1;
    const taskDetails = {
      Post: {
        title: "Post a tweet with specified content",
        description: "Write your tweet content.",
        placeholder: "What's happening?",
        url: "Content",
      },
      Follow: {
        title: "Follow a Twitter Account",
        description: "Enter the Twitter handle you want to follow.",
        placeholder: "Enter Twitter handle",
        url: "Twitter Handle",
      },
      Like: {
        title: "Like a Tweet",
        description: "Provide the URL of the Tweet you want to like.",
        placeholder: "Enter a Tweet URL",
        url: "Tweet URL",
      },
    };

    const newTask = {
      id: newTaskId,
      type: taskType,
      details: taskDetails[taskType],
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValues((prevValues) => ({
      ...prevValues,
      [newTaskId]: "",
    }));
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
                              .map((task, index) => ({ ...task, id: index + 1 }));
    setTasks(updatedTasks);

    const newInputValues = updatedTasks.reduce((acc, task) => {
      acc[task.id] = inputValues[task.id] || "";
      return acc;
    }, {});

    setInputValues(newInputValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submittedData = tasks.map((task) => ({
      taskNumber: task.id,
      taskTitle: task.type,
      value: inputValues[task.id] || "",
    }));

    const blob = new Blob([JSON.stringify(submittedData, null, 2)], { type: 'application/json' });
    const formData = new FormData();
    formData.append('file', blob, 'tasksData.json');

    try {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NWM1YzJmNC0xZGRlLTRiNWEtYTBlMi1lYTNkNjVmNWFhMjIiLCJlbWFpbCI6ImZlYXJvZmFsbGdhbWVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkNTA0MmU2ZDllNTgzYjE5MjRhYiIsInNjb3BlZEtleVNlY3JldCI6IjQ0ODAwYjQ5YWNlZmNlNzhiM2U2MjRlZmFmNzU2YjVjZDZhODJkYTk2MGM5MzdiMjQ3YWIyODNhZmUwZjBmYTYiLCJpYXQiOjE3MDA3Mzg5OTJ9.2CI_ewpLvbwj7bgxW9Iu6QnDqC2gkjyTJHtyk6DNp4U`, // Replace YOUR_PINATA_JWT with your actual JWT
          },
        }
      );
      console.log('File uploaded to IPFS with CID:', response.data.IpfsHash);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  };

  return (
    <>
      <div className="row taskLeft">
        <div className="col-lg-8 task-scroll">
          <form onSubmit={handleSubmit}>
            {tasks.length === 0 ? (
              <div className="no-tasks-template my-5">
                <p>No tasks added. Add a task from the platform.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="task-container">
                  <div className="sub-box mt-3 col-lg-12">Task {task.id}</div>

                  <div className="main-box">
                    <div
                      className={`row taskdiv d-flex my-2 ps-2 ${
                        isHovered ? "hovered" : ""
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div className=" col-lg-10 d-flex">
                        <img
                          src={twitter}
                          alt="Twitter"
                          style={{ width: "30px", height: "30px" }}
                        />
                        <h6 className="pt-1 ms-2">{task.details.title}</h6>
                      </div>

                      {/* <div
                        className="taskCloseDiv col-lg-2 text-center"
                        onClick={() => removeTask(task.id)}
                      >
                        <h5 className="taskClose">x</h5>
                      </div> */}

                    </div>
                    <div className="mainDiv">
                      <p>{task.details.url}</p>
                      <input
                        type="text"
                        placeholder={task.details.placeholder}
                        value={inputValues[task.id]}
                        onChange={(e) =>
                          handleInputChange(task.id, e.target.value)
                        }
                        className="form-control text-white"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="buttons my-4 ">
              <button className="save-draft text-nowrap">Save as Draft</button>
              <button className="save-draft ms-3">Previous</button>
              <button className="next" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-4 taskRightSide">
          <h5>Platform</h5>
          <button className="task-button">
            <img src={twitter} alt="Twitter" /> Twitter
          </button>
          <hr />
          <div>
            <button className="task-box1 mt-2" onClick={() => addTask("Post")}>
              Post a Tweet With Specified Content{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
            <button
              className="task-box1 mt-2"
              onClick={() => addTask("Follow")}
            >
              Follow Twitter{" "}
              <div className="but-box">
                < FaPlus />
              </div>
            </button>
            <button className="task-box1 mt-2" onClick={() => addTask("Like")}>
              Like a Tweet{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
          </div>
          <div className="mt-5">
            <button className="task-Morebutton ">More Info...!</button>
          </div>
        </div>
      </div>
    </>
  );
}
