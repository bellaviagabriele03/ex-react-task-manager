import { memo } from "react"
import { NavLink, useNavigate, Link } from "react-router-dom";

export default memo(function TaskRow({ task }) {

    const { title, status, createdAt } = task;
    const navigate = useNavigate();
    return (
        <>
            <tr>
                <td><NavLink
                    to={`/task/${task.id}`}
                >{title}</NavLink></td>
                <td
                    className={status === "To do" ? "red" : status === "Doing" ? "yellow" : "green"}>
                    {status}
                </td>
                <td>{createdAt}</td>
            </tr>

        </>
    )
})