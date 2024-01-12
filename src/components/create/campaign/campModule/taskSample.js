import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import "./campaignModule.css";
import twitter from "../../../assets/campaign/twitter.svg";
import { FaPlus } from "react-icons/fa";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [inputValues, setInputValues] = useState({});

  // Function to add tasks with detailed content
  const addTask = (taskType) => {
    const taskDetails = {
      Post: {
        title: "Post a Tweet",
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
      id: tasks.length + 1,
      type: taskType,
      details: taskDetails[taskType],
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleInputChange = (id, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Function to handle the drag end event
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row">
        <div className="col-lg-8 taskRightSide">
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-container"
                      >
                        <div className="sub-box mt-3 col-lg-12">
                          Task {task.id}
                        </div>
                        <div className="main-box">
                          <div className="d-flex my-2 ps-2">
                            <img src={twitter} alt="Twitter" />
                            <h6 className="pt-2 ms-2">{task.details.title}</h6>
                          </div>
                          <div className="mainDiv">
                            <p>{task.details.url}</p>
                            <input
                              type="text"
                              placeholder={task.details.placeholder}
                              value={inputValues[task.id] || ""}
                              onChange={(e) => handleInputChange(task.id, e.target.value)}
                              className="form-control text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

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
            <button className="task-box1 mt-2" onClick={() => addTask("Post")}>
              Post a Tweet With Specified Content{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
            <button className="task-box1 mt-2" onClick={() => addTask("Follow")}>
              Follow Twitter{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
            <button className="task-box1 mt-2" onClick={() => addTask("Like")}>
              Like a Tweet{" "}
              <div className="but-box">
                <FaPlus />
              </div>
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
