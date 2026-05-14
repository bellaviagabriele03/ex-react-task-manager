import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {

    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useGlobalContext();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const currentIndex = tasks.findIndex(t => t.id === Number(id));
    const taskSearch = tasks[currentIndex];
    const prevTask = currentIndex > 0 ? tasks[currentIndex - 1] : null;
    const nextTask = currentIndex < tasks.length - 1 ? tasks[currentIndex + 1] : null;

    const [editName, setEditName] = useState(taskSearch?.title)
    const [editStatus, setEditStatus] = useState(taskSearch?.status)
    const [editDescrip, setEditDescrip] = useState(taskSearch?.description)
    const editFormRef = useRef();

    // Sincronizza gli stati edit quando taskSearch arriva dopo la chiamata API asincrona
    useEffect(() => {
        if (taskSearch) {
            setEditName(taskSearch.title);
            setEditStatus(taskSearch.status);
            setEditDescrip(taskSearch.description);
        }
    }, [taskSearch]);


    async function handleConfirmDelete() {
        try {
            await removeTask(Number(id));
            alert("Task eliminato !")
            setShowModal(false);
            navigate("/");
        } catch (error) {
            alert(error.message)
        }
    }


    function handelConfirmEdit() {

        const editTaskOBJ = {
            title: editName,
            status: editStatus,
            description: editDescrip
        }

        updateTask(Number(id), editTaskOBJ)
        setShowEdit(false)
        // editFormRef.current.requestSubmit()
        navigate("/")
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
                        <button onClick={() => setShowEdit(true)}>Modifica Task</button>
                    </div>
                    <div className="btn-navigate">
                        <button onClick={() => navigate(`/task/${prevTask.id}`)} disabled={!prevTask}>BACK</button>
                        <button onClick={() => navigate("/")}>Torna Alla lista</button>
                        <button onClick={() => navigate(`/task/${nextTask.id}`)} disabled={!nextTask}>NEXT</button>
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


            <EditTaskModal
                show={showEdit}
                title="Modifica Task"
                content={<form
                    ref={editFormRef}>
                    <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        type="text" />
                    <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                    >
                        <option value="To Do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                    <textarea
                        onChange={(e) => setEditDescrip(e.target.value)}
                        value={editDescrip}>
                        {editDescrip}
                    </textarea>

                </form>}
                confirmText="Salva"
                onSave={handelConfirmEdit}
                onClose={() => {
                    setEditName(taskSearch.title)
                    setEditDescrip(taskSearch.description)
                    setEditStatus(taskSearch.status)
                    setShowEdit(false)
                }}
            />
        </>
    );
}
