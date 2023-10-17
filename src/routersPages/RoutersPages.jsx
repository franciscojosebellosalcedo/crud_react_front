import { BrowserRouter,Routes,Route } from "react-router-dom";
import Main from "../components/main/Main";
import AddRegister from "../components/add/AddRegister";
import EditRegister from "../components/edit/EditRegister";

const RoutersPages = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/nuevo-registro" element={<AddRegister/>}></Route> 
            <Route path="/editar-registro" element={<EditRegister/>}></Route> 
            <Route path="*" element={<Main/>}></Route> 
        </Routes>
    </BrowserRouter>
  )
}

export default RoutersPages;