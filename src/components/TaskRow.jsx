import { memo } from "react"


export default memo(function TaskRow({ task }) {

    const { title, status, createdAt } = task;

    return (
        <>
            <tr>
                <td>{title}</td>
                <td
                    className={status === "To do" ? "red" : status === "Doing" ? "yellow" : "green"}>
                    {status}
                </td>
                <td>{createdAt}</td>
            </tr>

        </>
    )
})