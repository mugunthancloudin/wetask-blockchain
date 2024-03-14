import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./campaignModule.css";
import twitter from "../../../assets/campaign/twitter.svg";
import { FaPlus } from "react-icons/fa";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Function to create a validation schema based on current tasks
  const createValidationSchema = (tasks) => {
    const schemaFields = tasks.reduce((acc, task, index) => {
      switch (task.type) {
        case "Post":
          acc[`tasks[${index}].content`] = yup
            .string()
            .required("Content is required");
          break;
        case "Follow":
          acc[`tasks[${index}].twitterHandle`] = yup
            .string()
            .required("Twitter handle is required");
          break;
        case "Like":
          acc[`tasks[${index}].tweetUrl`] = yup
            .string()
            .url("Enter a valid URL")
            .required("URL is required");
          break;
        default:
          break;
      }
      return acc;
    }, {});

    return yup.object().shape(schemaFields);
  };

  let validationSchema = createValidationSchema(tasks);

  const {
    register,
    handleSubmit,

    control,
    formState: { errors, touched },
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    validationSchema = createValidationSchema(tasks);
    reset(
      {},
      {
        keepValues: false,
      }
    );
  }, [tasks, reset]);

  const handleInputChange = (id, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Function to add tasks with detailed content
  const addTask = (taskType) => {
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
      id: tasks.length + 1,
      type: taskType,
      details: taskDetails[taskType],
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const renumberedTasks = updatedTasks.map((task, index) => ({
      ...task,
      id: index + 1,
    }));
    setTasks(renumberedTasks);
  };

  const onSubmit = (data) => {
    console.log("Form Data :", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row taskLeft">
          <div className="col-lg-8 task-scroll">
            {tasks.length === 0 ? (
              <div className="no-tasks-template my-5">
                <p>No tasks added. Add a task from the platform.</p>
              </div>
            ) : (
              tasks.map((task, index) => (
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
                      <div
                        className="taskCloseDiv col-lg-2 text-center"
                        onClick={() => removeTask(task.id)}
                      >
                        <h5 className="taskClose">x</h5>
                      </div>
                    </div>
                    <div className="mainDiv">
                      <p>{task.details.url}</p>
                      <Controller
                        name={`tasks[${index}].${
                          task.type === "Post"
                            ? "content"
                            : task.type === "Follow"
                            ? "twitterHandle"
                            : "tweetUrl"
                        }`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              placeholder={task.details.placeholder}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              className={`form-control ${
                                focusedField === field.name &&
                                errors?.tasks?.[index]?.[
                                  field.name.split(".").pop()
                                ]
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors?.tasks?.[index]?.[
                              field.name.split(".").pop()
                            ] && (
                              <p className="invalid-feedback">
                                {
                                  errors.tasks[index][
                                    field.name.split(".").pop()
                                  ].message
                                }
                              </p>
                            )}
                          </>
                        )}
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
                Next
              </button>
            </div>
          </div>

          <div className="col-lg-4 taskRightSide">
            <h5>Platform</h5>
            <button className="task-button">
              <img src={twitter} alt="Twitter" /> Twitter
            </button>
            <hr />
            <div>
              <button
                className="task-box1 mt-2"
                onClick={() => addTask("Post")}
              >
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
                  <FaPlus />
                </div>
              </button>
              <button
                className="task-box1 mt-2"
                onClick={() => addTask("Like")}
              >
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
      </form>
    </>
  );
}
