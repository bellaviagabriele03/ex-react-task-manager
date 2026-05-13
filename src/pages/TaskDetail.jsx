import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {

    const { id } = useParams();
    const { task, removeTask } = useGlobalContext();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const taskSearch = task.find(t => t.id === Number(id));

    function handleConfirmDelete() {
        removeTask(Number(id));
        setShowModal(false);
        navigate("/");
    }

    return (
        <>
            <div className="container">
                {taskSearch && (<>

                    <h1>{taskSearch.title}</h1>
                    <div className="task-detail">
                        <p><strong>Descrizione:</strong> {taskSearch.description}</p>
                        <p><strong>Status:</strong> {taskSearch.status}</p>
                        <p><strong>Creato il:</strong> {taskSearch.createdAt}</p>
                        <button onClick={() => setShowModal(true)}>Elimina Task</button>
                    </div>
                    <div className="btn-navigate">
                        <button onClick={() => navigate(-1)}>BACK</button>
                        <button onClick={() => navigate("/")}>Torna Alla lista</button>
                        <button onClick={() => navigate(`/task/${Number(id) + 1}`)}>NEXT</button>
                    </div>
                </>)}
            </div>

            <Modal
                title="Conferma eliminazione"
                content={`Sei sicuro di voler eliminare la task "${taskSearch?.title}"?`}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Elimina"
            />
        </>
    );
}
