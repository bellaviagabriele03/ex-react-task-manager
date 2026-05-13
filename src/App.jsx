import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Task from "./pages/Task"
import AddTask from "./pages/AddTask"
function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Task />} />
            <Route path="/addtask" element={<AddTask />} />

          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
