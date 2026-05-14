import { useContext, useState, useMemo } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";


export default function Task() {

    //prendo i TASKS dal context globale:
    const { task, addTask } = useGlobalContext();

    const [sortBy, setSortBy] = useState()
    const [sortOrder, setSortOrder] = useState()


    useMemo(() => {

        
    }, [task, sortBy, sortOrder])


    return (
        <>
            <div className="container">
                <h1>LISTA DI TUTTI I TASK:</h1>

                <table className="list-task">
                    <thead>
                        <tr>
                            <th onClick={() => { console.log("ordino le task per nome") }}>Nome Task</th>
                            <th onClick={() => { console.log("ordino le task per status") }}>status</th>
                            <th onClick={() => { console.log("ordino le task per data di creazione") }}>creata</th>
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