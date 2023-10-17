import { useState } from "react";
import "./MenuVertical.css"
import { toast } from "sonner";
import { deleteAllUserRequest, getFileExcelUsersRequest, getFilePdfUsersRequest } from "../../services/users";
import { useContextUser } from "../../context/ProviderContextApp";
const MenuVertical = () => {
    const [openOption, setOpenOption] = useState(false);
    const { dataFilterUsers, users } = useContextUser();
    const [openConfirm, setOpenConfirm] = useState(false);

    const { setUsers } = useContextUser();

    const dowload = (response) => {
        const blob = response[0];
        blob.name = response[1];
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = blob.name;
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    const deleteAllUsers = async () => {
        try {
            setOpenOption(false);
            if (users.length === 0) {
                toast.error("No hay registros");
            }else{
                if (!openConfirm) {
                    toast("¿ Desea eliminar todos los registros ?", {
                        action: {
                            label: "Si",
                            onClick: async () => {
                                const responseData = await deleteAllUserRequest();
                                if (responseData.response === false) {
                                    toast.error(responseData.message);
                                } else {
                                    toast.success(responseData.message);
                                }
                                setOpenConfirm(false);
                                setUsers([]);
                                setOpenOption(false);
                            }
                        },
                        cancel: {
                            label: "No",
                            onClick: () => {
                                setOpenConfirm(false);
                            }
                        }
                    })
                    setOpenConfirm(true);
                }
            }
        } catch (error) {
            toast.error("Error al eliminar los registros");
        }
    }

    const getFilePdf = async (e) => {
        e.preventDefault();
        try {
            const bodyFilePdf = dataFilterUsers.length > 0 ? dataFilterUsers : users;
            if (bodyFilePdf.length === 0) {
                toast.error("No hay registros");
            } else {
                const response = await getFilePdfUsersRequest(bodyFilePdf);
                dowload(response);
                toast.success("Archivo pdf generado correctamente, revise sus archivos");
            }
            setOpenOption(false);
        } catch (error) {
            toast.error("Error al obtener archivo pdf");
        }
    }

    const getFileExcel = async (e) => {
        e.preventDefault();
        try {
            const bodyFileExcel = dataFilterUsers.length > 0 ? dataFilterUsers : users;
            if (bodyFileExcel.length === 0) {
                toast.error("No hay registros");
            } else {
                const response = await getFileExcelUsersRequest(bodyFileExcel);
                dowload(response);
                toast.success("Archivo exel generado correctamente, revise sus archivos");
            }
            setOpenOption(false);
        } catch (error) {
            toast.error("Error al obtener archivo excel");
        }
    }

    return (
        <>
            <section className="menu">
                <i className="uil uil-ellipsis-v icon__menu" onClick={() => setOpenOption(!openOption)}></i>
                <div className={`options ${openOption === true ? 'see__options' : ''}`}>
                    <h3 className="option__title">Exportar archivo</h3>
                    <div>
                        <button type="button" className="btn__operation__option btn__excel" onClick={(e) => getFileExcel(e)}>Excel</button>
                        <button type="button" className="btn__operation__option btn__pdf" onClick={(e) => getFilePdf(e)}>Pdf</button>
                    </div>
                    <h3 className="option__title">Avanzado</h3>
                    <button type="button" className="btn__operation__option btn__delete__all" onClick={() => deleteAllUsers()}>Eliminar todo</button>
                </div>
            </section>
        </>
    )
}

export default MenuVertical;