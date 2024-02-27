import React, { useState, useEffect} from "react";
import axios from 'axios';
import "./campaignModule.css";
import { useFormContext } from "./formprovider";
import twitter from "../../../assets/campaign/twitter.svg";
import { FaPlus } from "react-icons/fa";
import { getAuth, signInWithPopup, TwitterAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const { updateFormData } = useFormContext();
  const [twitterConnected, setTwitterConnected] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyAJDl6dWb5YcMjImrfeiLvvwf4nYxSc4Ns",
    authDomain: "wetask-17e40.firebaseapp.com",
    projectId: "wetask-17e40",
    storageBucket: "wetask-17e40.appspot.com",
    messagingSenderId: "228070378497",
    appId: "1:228070378497:web:2341b5d5b0a6c7be888400",
    measurementId: "G-B6XYBR5MZS"
  };

  const app = initializeApp(firebaseConfig);
  
  useEffect(() => {
    const auth = getAuth();
    // Check if a user is already signed in (Twitter connection status)
    if (auth.currentUser) {
      setTwitterConnected(true);
    }
  }, []);

  const handleTwitterAuth = () => {
    const auth = getAuth();
    const provider = new TwitterAuthProvider();
    // If not connected, initiate Twitter sign in
    if (!twitterConnected) {
      signInWithPopup(auth, provider).then((result) => {
        setTwitterConnected(true); // Update state to reflect Twitter connection
        // Handle success
      }).catch((error) => {
        // Handle Errors
      });
    } else {
      // If already connected, initiate Twitter sign out
      signOut(auth).then(() => {
        setTwitterConnected(false); // Update state to reflect disconnection
        // Handle sign-out successful.
      }).catch((error) => {
        // Handle Errors
      });
    }
  };

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
            'Authorization': `Bearer your-pinata-jwt`,
          },
        }
      );
      console.log('File uploaded to IPFS with CID:', response.data.IpfsHash);

      const submittedDataWithCid = {
        tasks: submittedData,
        cid: response.data.IpfsHash
      };

      updateFormData({ ...formData, submittedData: submittedDataWithCid });
      console.log("Form Submitted with tasks and CID", submittedDataWithCid);
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
          <button className="task-button" onClick={handleTwitterAuth}>
            {twitterConnected ? "Disconnect Twitter" : "Connect Twitter"}
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
