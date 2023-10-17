import React from 'react'
import { useContextUser } from '../../context/ProviderContextApp';
import { toast } from 'sonner';
import { deleteUserRequest } from '../../services/users';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Table = () => {
    const { users, dataFilterUsers, setUsers ,setUserSelected} = useContextUser();
    const [open, setOpen] = useState(false);
    const navigate=useNavigate();

    const selectUser=(user)=>{
        setUserSelected(user);
        navigate("/editar-registro");
    }

    const deleteUser = (id, namecomplete) => {
        try {
            if (!open) {
                toast(`¿ Desea eliminar a ${namecomplete} ?`, {
                    onAutoClose: () => setOpen(false),
                    cancel: {
                        label: "No",
                        onClick: () => setOpen(false)
                    },
                    action: {
                        label: 'Si',
                        onClick: async () => {
                            const responseDataRequest = await deleteUserRequest(id);
                            if (responseDataRequest.response) {
                                const list = users;
                                list.splice(list.findIndex((item) => item.id === parseInt(id)), 1);
                                setUsers([...list]);
                                toast.success(`${namecomplete} se eliminó correctamente`);
                            } else {
                                toast.error(`Error al eliminar a ${namecomplete}`);
                            }
                            setOpen(false);
                        }
                    },
                });
                setOpen(true)
            }
        } catch (error) {
            toast.error("Se produjo un error");
        }
    }

    return (
        <div className="container__table">
            <table>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Sexo</th>
                        <th>Ciudad</th>
                        <th>Edad</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataFilterUsers.length > 0
                            ?
                            <>
                                {
                                    dataFilterUsers.reverse().map((item) => (
                                        <tr key={item.id}>
                                            <td data-title="Nombres" >{item.name}</td>
                                            <td data-title="Apellidos">{item.lastName}</td>
                                            <td data-title="Sexo">{item.sexo}</td>
                                            <td data-title="Ciudad">{item.city}</td>
                                            <td data-title="Edad">{item.age}</td>
                                            <td data-title="Fecha">{item.createdAt}</td>
                                            <td>
                                                <i className="uil uil-pen icon__edit icon" onClick={()=>selectUser(item)}></i>
                                                <i className="uil uil-trash-alt icon__delete icon" onClick={() => deleteUser(item.id, item.name + " " + item.lastName)}></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>
                            : <>
                                {
                                    users.reverse().map((item) => (
                                        <tr key={item.id}>
                                            <td data-title="Nombres" >{item.name}</td>
                                            <td data-title="Apellidos">{item.lastName}</td>
                                            <td data-title="Sexo">{item.sexo}</td>
                                            <td data-title="Ciudad">{item.city}</td>
                                            <td data-title="Edad">{item.age}</td>
                                            <td data-title="Fecha">{item.createdAt}</td>
                                            <td>
                                                <i className="uil uil-pen icon__edit icon"  onClick={()=>selectUser(item)}></i>
                                                <i className="uil uil-trash-alt icon__delete icon" onClick={() => deleteUser(item.id, item.name + " " + item.lastName)}></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Table