import { useContext } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";


export default function Task() {

    //prendo i TASKS dal context globale:
    const { task, addTask } = useGlobalContext();

    addTask()

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
                        {task && (<>
                            {task.map((t) => (
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