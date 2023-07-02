import React from 'react'
import "./task.css"
import classNames from 'classnames'
import  useStore  from '../store'
import DeleteIcon from '@mui/icons-material/Delete';
const Task = ({title}) => {
    console.log("he",title)
    const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const setDraggedTask=useStore((store)=>store.setDraggedTask)
  const deleteTask=useStore((store)=>store.deleteTask)
    
    console.log("kn",task)
  return (
    <div className='task' draggable onDragStart={()=>{setDraggedTask(task.title)}}>
       <div>
        {task.title}
       </div>
       <div className='bottomWrapper'>
        <div onClick={()=>deleteTask(task.title)}><DeleteIcon className='deleteIcons'/></div>
        <div className={classNames("status",task.state)}>{task.state}</div>
       </div>
    </div>
  )
}

export default Task
