import axios from "axios";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent, taskStatus = "Pending" }) => {
  const [todoStatus, setTodoStatus] = useState(taskStatus);
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };
  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };
  const updateStatus = (newStatus) => {
    axios
      .put(`${baseURL}/update-status/${id}`, { status: newStatus }) 
      .then((res) => {
        console.log(res.data);
        setTodoStatus(newStatus);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="toDo">
      <p>{text}</p>
      <p className="status">  {todoStatus}</p>
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
      </div>
      <div className="status-buttons">
        <button onClick={() => updateStatus("Ongoing")} className="ongoing-btn">Ongoing</button>
        <button onClick={() => updateStatus("Completed")} className="completed-btn">Completed</button>
      </div>
    </div>
  );
};

export default ToDo;