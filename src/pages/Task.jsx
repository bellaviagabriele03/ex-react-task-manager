import { useContext } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";


export default function Task() {

    //prendo i TASKS dal context globale:
    const { taskList, setTaskList } = useGlobalContext();

    return (
        <>
            <div className="container">
                <h1>LISTA DI TUTTI I TASK:</h1>
                <table className="list-task">
                    <thead>
                        <tr>
                            <th>Nome Task</th>
                            <th>status</th>
                            <th>creata</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.length > 0 && (<>
                            {taskList.map((t) => (
                                <TaskRow
                                    key={t.id}
                                    task={t} />
                            ))}
                        </>)}
                    </tbody>

                </table>
            </div>

        </>
    )
}