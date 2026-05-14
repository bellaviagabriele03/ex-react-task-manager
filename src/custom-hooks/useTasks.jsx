import { useEffect, useState, } from "react"
import { data } from "react-router-dom";





export default function useTasks() {

    const [tasks, setTasks] = useState([])
    const backUrl = import.meta.env.VITE_BACKEND_URL;




    useEffect(() => {
        fetch(`${backUrl}tasks`)
            .then(resp => resp.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))

    }, [])

    async function addTask(obj) {
        const response = await fetch(`${backUrl}tasks`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                title: obj.title,
                description: obj.description,
                status: obj.status
            })
        })
        const { success, message, task } = await response.json()
        if (!success) throw new Error(message)

        setTasks(prev => [...prev, task])

    }

    async function removeTask(id) {
        const response = await fetch(`${backUrl}tasks/${id}`, {
            method: "DELETE",
        })
        const { success, message, } = await response.json()
        if (!success) throw new Error(message)
        setTasks(prev => [...prev])
    }

    function updateTask(id, obj) {
        fetch(`${backUrl}tasks/${id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                title: obj.title,
                description: obj.description,
                status: obj.status
            })
        })
            .then(resp => resp.json())
            .then(data => {
                alert(`TASK MODIFICATA !!, success: ${data.success}`);

            })
            .catch(error => console.error(error))
    }


    return { addTask, removeTask, updateTask, tasks, }
}