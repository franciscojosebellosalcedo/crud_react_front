import { useNavigate } from "react-router-dom";
import Filter from "../filter/Filter";
import MenuVertical from "../menuVertical/MenuVertical";
import Loader from "../loader/Loader";
import Search from "../search/Search";
import Table from "../table/Table";
import "./Main.css";
import { Toaster, toast } from 'sonner'
import { useContextUser } from "../../context/ProviderContextApp";
import { getAllUsersRequest } from "../../services/users";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();
  const { setUsers } = useContextUser();
  const {isLoader, seIsLoader}=useContextUser();

  const getAllUsers = async () => {
    try {
      const responseRequest = await getAllUsersRequest();
      if (responseRequest.response) {
        setUsers([...responseRequest.data]);
        seIsLoader(false);
      } else {
        toast.error("Error al cargar los usuarios");
      }
    } catch (error) {
      toast.error("Error al cargar los usuarios");
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="main">
      <Toaster closeButton expand={false} position="top-center" richColors />
      <h1 className="main__title">Lista de registros de personas</h1>
      <button className="btn btn__add" onClick={() => navigate("/nuevo-registro")}>Agregar</button>

      <Filter isLoader={isLoader} seIsLoader={seIsLoader}/>
      {isLoader === false ?
        <>
          <div className="conatiner__oprations">
            <MenuVertical />
            <Search />
          </div>
          <Table />
        </> : <Loader />}
    </div>
  )
}

export default Main;