import { create } from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const useStore = create(persist(devtools((set) => ({
  tasks:[{title:"TestTask" ,state:"ONGOING"},{title:"Test" ,state:"PLANNED"}],
  draggedTask:null,
  addtask:(title,state)=>set((store)=>({tasks:[...store.tasks,{title,state}]}),false,"AddTask"),
  deleteTask:(title)=>set((store)=>({tasks:store.tasks.filter((task)=>task.title!==title)})),
  setDraggedTask:(title)=>set({draggedTask:title}),
  moveTask:(title,state)=>set(store=>({tasks:store.tasks.map(task=>task.title===title?{title,state}:task)}))
})),{name:"Store"}));

export default useStore;