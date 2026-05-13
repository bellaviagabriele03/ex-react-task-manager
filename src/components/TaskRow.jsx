import { memo } from "react"


export default memo(function TaskRow({ task }) {

    const { title, status, createdAt } = task;

    return (
        <>
            <tr>
                <td>{title}</td>
                <td>{status}</td>
                <td>{createdAt}</td>
            </tr>

        </>
    )
})