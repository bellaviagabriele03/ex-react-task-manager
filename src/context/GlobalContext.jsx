import { createContext, useState, useEffect, useContext } from "react";
import useTasks from "../custom-hooks/useTasks";


const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {


    const taskData = useTasks();

    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    )


}

export function useGlobalContext() {
    return useContext(GlobalContext)
}