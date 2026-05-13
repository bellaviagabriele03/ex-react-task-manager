import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Task from "./pages/Task"
import AddTask from "./pages/AddTask"
import GlobalContextProvider from "./context/GlobalContext"
import TaskDetail from "./pages/TaskDetail"
function App() {


  return (
    <>
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>

            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<Task />} />
              <Route path="/addtask" element={<AddTask />} />
              <Route path="/task/:id" element={<TaskDetail />} />
            </Route>
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
