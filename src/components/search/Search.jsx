import { useState } from "react";
import "./Search.css"
import { useContextUser } from "../../context/ProviderContextApp";
const Search = () => {
  const [openInput,setOpenInput]=useState(false);
  const { users ,setDataFilterUsers} = useContextUser();

  const searchUser=(value)=>{
    if(value===""){
      setDataFilterUsers([]);
    }else{
      const dataFound=users.filter((user)=>user.name.concat(` ${user.lastName}`).toLowerCase().includes(value.toLowerCase()));
      setDataFilterUsers([...dataFound]);
    }
  }

  return (
    <form className="form__search">
        <i className="uil uil-search icon__search" onClick={()=>setOpenInput(!openInput)}></i>
        {openInput === true ?<input onInput={(e)=>searchUser(e.target.value)} className="input__search" type="text" placeholder="Buscar..." />:""}
    </form>
  )
}

export default Search;