import React, { useState } from 'react';
import './App.css';
// import ListItem from './components/ListItem'
// import NewBuyInput from './components/NewBuyInput'
import { supabase } from './service/supabase'

const App = () => {
  // const [Buys, setBuys] = useState([]);

  const [editar, setEditar] = useState(false);
  const [editData, setEditData] = useState({name: ".", id : 0});
  const [inputBar, setInputBar] = useState("");

  const [purchase, setPurchases] = React.useState([]);
  // const [ nameRequest,setNameReques ] = React.useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputBar){
      return
    }
    if (editar){ 
      await edit()    
      setEditar(false)
      setEditData({})
      setInputBar("")
    }else{

      const { data } = await supabase.from('purchases')
                      .insert({ name: inputBar });
      setInputBar("")

      if (data) {
        get_purchases();

      }
      }
  }

  const get_purchases = async () => {
    const { data } = await supabase
      .from('purchases')
      .select().order("name", true)
    setPurchases(data);
  }

  React.useEffect(() => {
    get_purchases();
  }, [])


  const handleCheck = async(id, checked) => {
    await supabase
    .from('purchases')
    .update({checkbox: checked})
    .match({ id: id })
  get_purchases();
  };
      

  const handleDelete = async (id) => {
       await supabase
      .from('purchases')
      .delete()
      .match({ id: id })
      setEditar(false)
      setInputBar("")
    get_purchases();
  }


  const edit = async() => {
      await supabase
      .from('purchases')
      .update({ name: inputBar })
      .match ({ id: editData.id })
    get_purchases();
  }

  const handleUpdate = (item) => {
    setEditar(true)
    setEditData(item)
    setInputBar(item.name)
  }


  return (
    <div className="App">
      <div className="App-header">
        <form onSubmit={handleSubmit}>
          <h1 className="h1">Lista de compras</h1>
          <div className="separator">Insira seu produto abaixo</div>
          <input
            type="text"
            className="txt1"
            maxLength={30}
            value={inputBar}
            onChange={e => 
              setInputBar(e.target.value)
            }
          />
            <button className="Btn1"> { editar ? "Editar" : "Cadastrar" } </button>
            {/* { editar != 0 ?  <button type="button" onClick={edit} > EDITAR </button> : <button  onClick={handleSubmit}> CADASTRAR </button>  } */}
        </form>

        {purchase.map((item) => {
          return (
            <div key={item.id}><br></br>
              <p className="txt2"> 
                <input 
                  className="checkbox" type = "checkbox" onClick={() => {
                  handleCheck(item.id, item.checkbox?false:true)} }defaultChecked={item.checkbox?true:false}></input>
                {item.name}
                <button className="Btn2" onClick={() => handleUpdate(item)} > EDITAR </button>
                <button className="Btn3"onClick={() => handleDelete(item.id)} > DELETAR </button>
              </p>
            </div>
          )
        })}

      </div>
    </div>
  )
}


export default App;
