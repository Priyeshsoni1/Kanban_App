import React, { useState } from "react";
import "./column.css";
import Task from "./Task";
import useStore from "../store";
import { shallow } from "zustand/shallow";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
const Column = ({ state }) => {
  const task = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const addTask = useStore((store) => store.addtask);
  const setDraggableTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask=useStore((store)=>store.moveTask);
  const [drag,setDrag]=useState(false);
  return (
    <div
      className={classNames("column",{drag:drag})}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={(e)=>{
        e.preventDefault();
        setDrag(false);
      }}

      onDrop={(e) => {
        setDrag(false)
        console.log("drop");
        moveTask(draggedTask,state);
        setDraggableTask(null);
        console.log(draggedTask)
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </div>

      {task.map((task) => (
        <Task title={task.title} key={uuidv4()} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                console.log("state", state);
                addTask(
                  text === ""
                    ? alert(`Please share your task for ${state} purpose`)
                    : text,
                  state
                );
                console.log("state", state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
