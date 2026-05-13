import { useContext } from "react"
import { useGlobalContext } from "../context/GlobalContext"


export default function Task() {

    //prendo i TASKS dal context globale:
    const { taskList, setTaskList } = useGlobalContext();


    console.log(taskList);


    return (
        <>

            <h1>LISTA DI TUTTI I TASK </h1>
            <div className="list-task">
                {taskList.length > 0 && (<>
                    {taskList.map((t) => (
                        <div
                            className="task"
                            key={t.id}>
                            <h2>{t.title}</h2>
                            <p>status: {t.status}</p>
                            <span>Creata: {t.createdAt}</span>
                        </div>
                    ))}
                </>)}
            </div>
        </>
    )
}