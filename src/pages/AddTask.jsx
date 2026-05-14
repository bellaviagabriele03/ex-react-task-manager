import { useRef, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
export default function AddTask() {

    const [taskName, setTaskName] = useState("");
    const description = useRef();
    const status = useRef();

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~`;

    const { addTask } = useGlobalContext();
    const navigate = useNavigate();


    function handlerSubmit(e) {
        e.preventDefault();

        const symbolsArray = symbols.split("")
        const titleArray = taskName.split("")

        const nameValid = titleArray.some((letters) => {
            return symbolsArray.includes(letters)
        })

        if (nameValid) {
            alert("errore il nome non può contenere caratteri speciali !")
            setTaskName("")
            return
        }

        const result = {
            title: taskName,
            description: description.current.value,
            status: status.current.value || "To do",

        }
        addTask(result)
        navigate(`/`)

    }


    return (
        <div className="container">
            <h1>AGGIUNGI UN NUOVO TASK !</h1>
            <form
                className="form-control"
                onSubmit={handlerSubmit}>
                <label>
                    NOME TASK:
                    <input
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        type="text"
                        placeholder="es: Milestone 1" />
                </label>
                <label>
                    DESCRIZIONE:
                    <textarea
                        ref={description}
                    ></textarea>
                </label>
                <label>
                    STATO TASK:
                    <select
                        ref={status}
                    >
                        <option value="">Scegli un opzione</option>
                        <option value="To do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>
                <button type="submit">INVIA</button>
            </form>
        </div>

    )
}