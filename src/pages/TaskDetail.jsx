import { useParams } from "react-router-dom"


export default function TaskDetail() {

    const { id } = useParams();

    return (
        <>
            <div className="container">
                <h1>Pagina dei Dettagli Task: {id}</h1>
            </div>
        </>
    )
}