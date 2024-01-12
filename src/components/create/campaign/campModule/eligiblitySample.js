import React, { useState } from "react";
import "./campaignModule.css";
import twitter from "../../../assets/campaign/twitter.svg";
import { FaPlus } from "react-icons/fa";
export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [inputValues, setInputValues] = useState({});

  // Function to add tasks
  const addTask = (taskName) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, name: taskName, content: "" },
    ]);
  };

  // Function to handle input change
  const handleInputChange = (id, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Function to save the content of a task
  const saveTaskContent = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, content: inputValues[id] || "" } : task
      )
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8 taskRightSide">
          {tasks.map((task) => (
            <div key={task.id} className="task-container">
              <div className="sub-box mt-3 col-lg-12">Task {task.id}</div>
              <div className="main-box">
                <div className="d-flex my-2 ps-2">
                  <img src={twitter} alt="Twitter" />
                  <h6 className="pt-2 ms-2">{task.name}</h6>
                </div>

                {task.content === "" && (
                  <div className="task-input-container d-flex">
                    <p className="text-nowrap mt-3 me-3 fs-6">Handle Twitter</p>
                    <input
                      type="text"
                      placeholder="Enter content"
                      value={inputValues[task.id] || ""}
                      onChange={(e) =>
                        handleInputChange(task.id, e.target.value)
                      }
                      className="form-control"
                    />
                    {/* <button onClick={() => saveTaskContent(task.id)}>Save</button> */}
                  </div>
                )}
                {task.content !== "" && <p>Content: {task.content}</p>}
              </div>
            </div>
          ))}

          <div className="buttons my-4 ">
            <button className="save-draft text-nowrap">Save as Draft</button>
            <button className="save-draft ms-3">Previous</button>
            <button className="next">Next</button>
          </div>
        </div>

        <div className="col-lg-4 ">
          <h5>platform</h5>
          <button className="task-button">
            <img src={twitter} alt="Twitter" /> Twitter
          </button>
          <hr />
          <div>
            <button
              className="task-box1 mt-2"
              onClick={() => addTask("Post a Tweet With Specified Content")}
            >
              Post a Tweet With Specified Content{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
            <button
              className="task-box1 mt-2"
              onClick={() => addTask("Follow a Twitter")}
            >
              Follow Twitter{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
            <button
              className="task-box1 mt-2"
              onClick={() => addTask("Like a Tweet")}
            >
              Like a Tweet{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
