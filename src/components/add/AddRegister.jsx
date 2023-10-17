import { useState } from 'react';
import { lisSex } from '../../constansts/constanst';
import './AddRegister.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { createUserRequest } from '../../services/users';
import { useEffect } from 'react';

const AddRegister = () => {
    const [openListSexo, setOpenListSexo] = useState(false);
    const [valueSelectSexo, setValueSelectSexo] = useState(null);
    const [labelSelectSexo, setLabelSelectSexo] = useState(null);
    const navigate = useNavigate();
    const [newRegister, setNewRegister] = useState({ name: "", lastName: "", sexo: "", city: "", age: "" });
    const [enableButton, setEnableButton] = useState(false);

    const enableButtonSend = (data) => {
        const keys = Object.keys(data);
        let aux = 0;
        keys.map((key) => {
            if (data[`${key}`] !== "") {
                aux++
            }
        });
        if (keys.length === aux) {
            setEnableButton(true);
        } else {
            setEnableButton(false);
        }
    }

    const handlerValueSelectSexo = (key, value) => {
        setLabelSelectSexo(key);
        setValueSelectSexo(value);
        setOpenListSexo(false);
        value === "none" ? setNewRegister({ ...newRegister, sexo: "" }):setNewRegister({...newRegister,sexo:value});;
    }

    const handlerInput = (e) => {
        setNewRegister({ ...newRegister, [e.target.name]: e.target.value });

    }

    const createNewRegister = async (e) => {
        e.preventDefault();
        try {
            const responseDataRequest = await createUserRequest(newRegister);
            if (responseDataRequest.response) {
                toast.success(responseDataRequest.message);
                setNewRegister({ name: "", lastName: "", sexo: "", city: "", age: "" })
            } else {
                toast.error("Error al crear el registro");
            }
        } catch (error) {
            toast.error("Error al crear el registro");
        }
    }

    useEffect(() => {
        enableButtonSend(newRegister);
    }, [newRegister]);

    return (
        <div className='container__form'>
            <Toaster expand={false} richColors position='top-center'/>
            <h1 className='form__title'>Nuevo registro</h1>
            <i className="uil uil-arrow-left icon icon__back" onClick={() => navigate("/")}></i>
            <form className='form'>
                <div className='item__form'>
                    <label htmlFor="input__name">Nombres</label>
                    <input onInput={(e) => handlerInput(e)} value={newRegister.name} className='input__form input__name' type="text" name="name" id="input__name" placeholder='Ingrese nombres' />
                </div>

                <div className='item__form'>
                    <label htmlFor="input__last__name">Apellidos</label>
                    <input onInput={(e) => handlerInput(e)} value={newRegister.lastName} className='input__form input__last__name' type="text" name="lastName" id="input__last__name" placeholder='Ingrese apellidos' />
                </div>

                <div className='item__form'>
                    <label htmlFor="">Sexo</label>
                    <div className="select__form__sex">
                        <div className="input__filter" onClick={() => setOpenListSexo(!openListSexo)} >
                            <span className="input__filter__leyend">{valueSelectSexo === null || valueSelectSexo === 'none' ? 'Elige' : labelSelectSexo}</span>
                            <i className="uil uil-angle-down"></i>
                        </div>
                        <ul className={`list__values__select__sex list__values ${openListSexo === true ? 'see__list' : ''}`}>
                            {
                                lisSex.map((item) => {
                                    return <li className="value" key={item.keyValue} onClick={(e) => handlerValueSelectSexo(item.keyValue, item.value)}>{item.keyValue}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className='item__form'>
                    <label htmlFor="input__city">Ciudad</label>
                    <input onInput={(e) => handlerInput(e)} value={newRegister.city} className='input__form input__city' type="text" name="city" id="input__city" placeholder='Ingrese la ciudad' />
                </div>

                <div className='item__form'>
                    <label htmlFor="input__age">Edad</label>
                    <input onInput={(e) => handlerInput(e)} value={newRegister.age} className='input__form input__age' type="number" name="age" id="input__age" placeholder='Ingrese la edad' />
                </div>

                <div className='buttons__form'>
                    <button className='btn btn__cancel' onClick={() => navigate("/")}>Regresar</button>
                    <button type='button' className={`btn btn__send ${enableButton && 'see__btn__send'}`} onClick={(e) => createNewRegister(e)}>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default AddRegister;