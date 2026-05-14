import { useState, useMemo, useCallback, useRef } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";

const STATUS_ORDER = { "To do": 0, "Doing": 1, "Done": 2 };

export default function Task() {

    const { tasks } = useGlobalContext();

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const searchInputRef = useRef();

    function handleSort(column) {
        if (sortBy === column) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    }

    const debounced = useCallback(
        (() => {
            let timer;
            return (value) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    setDebouncedQuery(value);
                }, 300);
            };
        })(),
        []
    );

    const sortedTasks = useMemo(() => {
        if (!tasks) return [];
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(debouncedQuery.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === "title") {
                    return a.title.localeCompare(b.title) * sortOrder;
                }
                if (sortBy === "status") {
                    return (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) * sortOrder;
                }
                if (sortBy === "createdAt") {
                    return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
                }

                return 0;
            });
    }, [tasks, sortBy, sortOrder, debouncedQuery]);
    return (
        <>
            <div className="container">
                <h1>LISTA DI TUTTI I TASK:</h1>
                <div className="search-bar">
                    <label>
                        <h3>Cerca una task:</h3>
                        <input
                            placeholder="es: Chiamare il dottore"
                            ref={searchInputRef}
                            onChange={(e) => debounced(e.target.value)}
                            type="text" />
                    </label>

                </div>
                <table className="list-task">
                    <thead>
                        <tr>
                            <th
                                onClick={() => handleSort("title")}
                                className={sortBy === "title" ? "th-active" : ""}
                            >
                                Nome Task {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                            </th>
                            <th
                                onClick={() => handleSort("status")}
                                className={sortBy === "status" ? "th-active" : ""}
                            >
                                Status {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                            </th>
                            <th
                                onClick={() => handleSort("createdAt")}
                                className={sortBy === "createdAt" ? "th-active" : ""}
                            >
                                Creata {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((t) => (
                            <TaskRow
                                key={t.id}
                                task={t} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
