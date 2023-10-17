import { useEffect, useState } from "react";
import { conditionals, fieldsFilter, lisSex } from "../../constansts/constanst";
import "./Filter.css"
import { useContextUser } from "../../context/ProviderContextApp";
import { toast } from "sonner";
import { filterUsersRequest } from "../../services/users";
const Filter = () => {
  const [openListField, setOpenListField] = useState(false);
  const [valueSelectField, setValueField] = useState(null);
  const [labelSelectField, setLabelSelectField] = useState(null);

  const [openSelectCondition, setOpenSelectCondition] = useState(false)
  const [valueSelectCondition, setValueSelectCondition] = useState(null);
  const [labelSelectCondition, setLabelSelectCondition] = useState(null);

  const [openListSexo, setOpenListSexo] = useState(false);
  const [valueSelectSexo, setValueSelectSexo] = useState(null);
  const [labelSelectSexo, setLabelSelectSexo] = useState(null);

  const [valueInput, setValueInput] = useState("");

  const [options, setOptions] = useState({});

  const [seeBtn, setSeeBtn] = useState(false);

  const { setDataFilterUsers ,seIsLoader} = useContextUser();

  const filterUsers = async (e) => {
    e.preventDefault();
    seIsLoader(true);
    try {
      const responseData = await filterUsersRequest(options);
      if (!responseData.response) {
        toast.error(responseData.message);
      }else if(responseData.data.length===0){
        toast.error("No se encotraron registros");
        setDataFilterUsers([]);
      }else{
        setDataFilterUsers([...responseData.data]);
      }
      seIsLoader(false);
    } catch (error) {
      toast.error("Error al filtrar");
    }
  }

  const handlerOptions = (key, value) => {
    if (value === 'none') {
      setSeeBtn(false);
      const properties = {
        "field": () => { delete options.field; delete options.operator; delete options.value; },
        "operator": () => { delete options.operator },
        "value": () => { delete options.value }
      }
      properties[`${key}`]();
      setOptions({ ...options });
    } else {
      setOptions({ ...options, [`${key}`]: value });
    }
  }

  const handlerValueSelectedField = (key, value) => {
    clearValues();
    handlerOptions("field", value);
    if (value === 'none') {
      clearValues();
    } else {
      setValueField(value);
      setLabelSelectField(key);
      setOpenListField(false);
    }
    setDataFilterUsers([]);
  }

  const handlerValueSelectSexo = (key, value) => {
    if (value === "none") {
      setSeeBtn(false);
    } else {
      setSeeBtn(true);
    }
    handlerOptions("value", value);
    setLabelSelectSexo(key);
    setValueSelectSexo(value);
    setOpenListSexo(false);
  }

  const handlerValueSelectedCondition = (key, value) => {
    handlerOptions("operator", value);
    setValueSelectCondition(value);
    setLabelSelectCondition(key);
    setOpenSelectCondition(false);
  }

  const handlerInput = (e) => {
    setValueInput(e.target.value);
    handlerOptions("value", e.target.value);
  }

  const clearValues = () => {
    setValueSelectCondition(null);
    setLabelSelectCondition(null);
    setOpenSelectCondition(false);
    setValueField(null);
    setLabelSelectField(null);
    setOpenListField(false);
    setOpenListSexo(false);
    setValueSelectSexo(null);
    setLabelSelectSexo(null);
    setValueInput("");
    setSeeBtn(false);
  }

  useEffect(() => {
    if (valueInput !== "") {
      setSeeBtn(true);
    } else {
      setSeeBtn(false);
    }
  }, [valueInput])

  return (
    <div className="filter">
      <h1 className="filter__title">Filtrar por campo</h1>
      <div className="filter__container">
        <div className="filter__select">

          <div className="select__field">

            <div className="input__filter" onClick={() => setOpenListField(!openListField)} >
              <span className="input__filter__leyend">{valueSelectField === null || valueSelectField === "none" ? 'Campo' : labelSelectField}</span>
              <i className="uil uil-angle-down"></i>
            </div>
            <ul className={`list__values ${openListField === true ? 'see__list' : ''}`}>
              {
                fieldsFilter.map((item) => {
                  return <li className="value" key={item.keyValue} onClick={(e) => handlerValueSelectedField(item.keyValue, item.value)}>{item.keyValue}</li>
                })
              }
            </ul>

          </div>

          <div className={`select ${valueSelectField === 'age' ? 'see__element' : ''}`}>

            <div className="input__filter" onClick={() => setOpenSelectCondition(!openSelectCondition)}>
              <span className="input__filter__leyend">{valueSelectCondition === null || valueSelectCondition === 'none' ? 'Condición' : labelSelectCondition}</span>
              <i className="uil uil-angle-down"></i>
            </div>
            <ul className={`list__values ${openSelectCondition === true ? 'see__list' : ''}`}>
              {
                conditionals.map((item) => {
                  return <li className="value" key={item.keyValue} onClick={(e) => handlerValueSelectedCondition(item.keyValue, item.value)}>{item.keyValue}</li>
                })
              }
            </ul>

          </div>

          <div className={`select select__sex ${valueSelectField === "sexo" ? 'see__element' : ''}`}>
            <div className="input__filter" onClick={() => setOpenListSexo(!openListSexo)}>
              <span className="input__filter__leyend">{valueSelectSexo === null || valueSelectSexo === 'none' ? 'Elige' : labelSelectSexo}</span>
              <i className="uil uil-angle-down"></i>
            </div>
            <ul className={`list__values ${openListSexo === true ? 'see__list' : ''}`}>
              {
                lisSex.map((item) => {
                  return <li className="value" key={item.keyValue} onClick={(e) => handlerValueSelectSexo(item.keyValue, item.value)}>{item.keyValue}</li>
                })
              }
            </ul>

          </div>

          <form className={`filter__form select ${((valueSelectField === "age") && (valueSelectCondition !== null && valueSelectCondition !== 'none')) || (valueSelectField !== "age" && valueSelectField !== null && valueSelectField !== "sexo") ? 'see__element' : ""}`}>
            <input className="input__value" value={valueInput} type="text" placeholder="Valor" onInput={(e) => handlerInput(e)} />
          </form>

          {seeBtn === true ? <button type="button" className="btn btn__filter" onClick={(e) => filterUsers(e)}>Filtrar</button> : ""}

        </div>

      </div>

    </div>
  )
}

export default Filter;