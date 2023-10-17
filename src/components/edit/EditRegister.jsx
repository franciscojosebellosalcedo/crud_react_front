import { useEffect, useState } from 'react';
import { lisSex } from '../../constansts/constanst';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useContextUser } from '../../context/ProviderContextApp';
import { updateUserRequest } from '../../services/users';

const EditRegister = () => {
    const [openListSexo, setOpenListSexo] = useState(false);
    const [valueSelectSexo, setValueSelectSexo] = useState(null);
    const [labelSelectSexo, setLabelSelectSexo] = useState(null);
    const [newData,setNewData]=useState({id:"",name:"",lastName:"",city:"",sexo:"",age:"",createdAt:"",updatedAt:""});

    const navigate=useNavigate();

    const [enableButton, setEnableButton] = useState(false);
    const {userSelected}=useContextUser();

    const handlerInputs=(e)=>{
        setNewData({...newData,[e.target.name]:e.target.value});
    }

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

    const goTo=()=>{
        navigate("/");
    }

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const {createdAt,updatedAt, id, ...newDataUser}=newData;
            const responseData=await updateUserRequest(parseInt(userSelected?.id),newDataUser);
            if(responseData.response){
                toast.success(responseData.message);
            }else{
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Error al editar el registro");
        }
    }

    const handlerValueSelectSexo = (key, value) => {
        setLabelSelectSexo(key);
        setValueSelectSexo(value);
        setOpenListSexo(false);
        value==="none" ? setNewData({...newData,sexo:""}):setNewData({...newData,sexo:value});
    }

    
    useEffect(() => {
        if(!userSelected){
            goTo();
        }else{
            enableButtonSend(userSelected);
            setNewData(userSelected);
            setLabelSelectSexo(userSelected.sexo);
            setValueSelectSexo(userSelected.sexo);
            setOpenListSexo(false);
        }
    }, [userSelected]);
    
    useEffect(()=>{
        enableButtonSend(newData);
    },[newData]);

    return (
        <>
            <Toaster richColors position='top-center'/>
            <div className='container__form'>
                <h1 className='form__title'>Editar registro</h1>
                <i className="uil uil-arrow-left icon icon__back" onClick={(e)=>goTo(e)}></i>
                <form className='form'>
                    <div className='item__form'>
                        <label htmlFor="input__name">Nombres</label>
                        <input onInput={(e)=>handlerInputs(e)} value={newData?.name} className='input__form input__name' type="text" name="name" id="input__name" placeholder='Ingrese nombres' />
                    </div>

                    <div className='item__form'>
                        <label htmlFor="input__last__name">Apellidos</label>
                        <input onInput={(e)=>handlerInputs(e)} value={newData?.lastName}  className='input__form input__last__name' type="text" name="lastName" id="input__last__name" placeholder='Ingrese apellidos' />
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
                        <input onInput={(e)=>handlerInputs(e)} value={newData?.city}  className='input__form input__city' type="text" name="city" id="input__city" placeholder='Ingrese la ciudad' />
                    </div>

                    <div className='item__form'>
                        <label htmlFor="input__age">Edad</label>
                        <input onInput={(e)=>handlerInputs(e)} value={newData?.age}  className='input__form input__age' type="number" name="age" id="input__age" placeholder='Ingrese la edad' />
                    </div>

                    <div className='buttons__form'>
                        <button className='btn btn__cancel' onClick={(e)=>goTo(e)}>Regresar</button>
                        <button type='button' className={`btn btn__send ${enableButton && 'see__btn__send'}`} onClick={(e)=>updateUser(e)}>Guardar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditRegister;