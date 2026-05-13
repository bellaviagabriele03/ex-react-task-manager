import { createContext, useState, useEffect, useContext } from "react";
import useTasks from "../custom-hooks/useTasks";


const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {


    const { addTask, removeTask, updateTask, getTask, task } = useTasks();





    useEffect(() => {
        getTask();
    }, [])




    return (
        <GlobalContext.Provider value={{ task, addTask, removeTask, updateTask, getTask }}>
            {children}
        </GlobalContext.Provider>
    )


}

export function useGlobalContext() {
    return useContext(GlobalContext)
}