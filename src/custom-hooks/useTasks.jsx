import { useEffect, useState, } from "react"
import { data } from "react-router-dom";





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


    useEffect(() => {
        getTask()
    }, [])

    function addTask(obj) {
        fetch(`${backUrl}tasks`, {
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
            .then(resp => resp.json())
            .then(data => {
                alert(`Task aggiunto correttamente, success: ${data.success}`);
                getTask();
            })
            .catch(error => console.error(`Errore impossibile aggiungere la Task ${error}`))
    }

    function removeTask(id) {
        fetch(`${backUrl}tasks/${id}`, {
            method: "DELETE",
        })
            .then(resp => resp.json())
            .then(data => {
                alert("eliminazione Task effettuata !!");
                getTask();
            })
            .catch(error => console.error(error))
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
                getTask();
            })
            .catch(error => console.error(error))
    }


    return { addTask, removeTask, updateTask, task, getTask }
}