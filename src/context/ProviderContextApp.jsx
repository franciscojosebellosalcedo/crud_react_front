import {useState,createContext,useContext} from 'react';

export const ContextUser=createContext();

const ProviderContextApp = ({children}) => {
  const [users,setUsers]=useState([]);
  const [dataFilterUsers,setDataFilterUsers]=useState([]);
  const [userSelected,setUserSelected]=useState(null);
  const [isLoader, seIsLoader] = useState(true);
  return (
    <ContextUser.Provider value={{users,setUsers,dataFilterUsers,setDataFilterUsers,userSelected,setUserSelected,isLoader, seIsLoader}}>
      {children}
    </ContextUser.Provider>
  )
}

export const useContextUser=()=>useContext(ContextUser);

export default ProviderContextApp;