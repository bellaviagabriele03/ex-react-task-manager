import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {

    const { id } = useParams();

    const { task } = useGlobalContext();

    const navigate = useNavigate();

    //ricerca della task 
    const taskSearch = task.find(t => t.id === Number(id))


    return (
        <>
            <div className="container">
                {taskSearch && (<>

                    <h1>{taskSearch.title}</h1>
                    <div className="task-detail">
                        <p><strong>Descrizione:</strong> {taskSearch.description}</p>
                        <p><strong>Status:</strong> {taskSearch.status}</p>
                        <p><strong>Creato il:</strong> {taskSearch.createdAt}</p>
                        <button
                            onClick={() => { console.log("Loris Eliminato, prossimo obbiettivo... Samuel") }}
                        >Elimina Task</button>
                    </div>
                    <div className="btn-navigate">
                        <button
                            onClick={() => {
                                navigate(-1)
                            }}
                        >BACK
                        </button>
                            <button
                            onClick={()=>{
                                navigate(`/`)
                            }}
                            >Torna Alla lista</button>
                        <button
                            onClick={() => {
                                navigate(`/task/${Number(id) + 1}`)
                            }}
                        >
                            NEXT
                        </button>
                    </div>
                </>)}

            </div>
        </>
    )
}