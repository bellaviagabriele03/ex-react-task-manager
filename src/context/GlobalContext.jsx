import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {

    const [taskList, setTaskList] = useState([]);

    const backUrl = import.meta.env.VITE_BACKEND_URL;





    useEffect(() => {

        fetch(`${backUrl}tasks`).then(resp => resp.json()
        ).then(data => console.log(data)
        )

    }, [])

    return (
        <GlobalContext.Provider value={taskList, setTaskList}>
            {children}
        </GlobalContext.Provider>
    )


}