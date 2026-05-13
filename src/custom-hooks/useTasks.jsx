import { useState, } from "react"





export default function useTasks() {

    const [task, setTask] = useState([])
    const backUrl = import.meta.env.VITE_BACKEND_URL;

    async function fetchJson(url) {
        const resp = await fetch(url)
        const data = await resp.json()
        return data;
    }

    async function getTask() {
        try {
            const taskFetch = await fetchJson(`${backUrl}tasks`);
            setTask(taskFetch)
        } catch (error) {
            console.error("Error Ask To Loris", error)
        }
    }
    
    function addTask() {
        console.log("funzione addTask")
    }

    function removeTask() {
        console.log("funzione removeTask")
    }

    function updateTask() {
        console.log("funzione updateTask")
    }


    return { addTask, removeTask, updateTask, task, getTask }
}