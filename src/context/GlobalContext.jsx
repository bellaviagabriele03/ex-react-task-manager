import { createContext, useState, useEffect, useContext } from "react";

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {

    const [taskList, setTaskList] = useState([]);

    const backUrl = import.meta.env.VITE_BACKEND_URL;


    async function fetchJson(url) {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    }


    useEffect(() => {

        async function getTasks() {
            try {
                const tasks = await fetchJson(`${backUrl}tasks`)
                setTaskList(tasks)


            } catch (error) {
                console.error("Error ask to Loris:", error)
            }
        }
        getTasks()
    }, [])




    return (
        <GlobalContext.Provider value={{ taskList, setTaskList }}>
            {children}
        </GlobalContext.Provider>
    )


}

export function useGlobalContext() {
    return useContext(GlobalContext)
}