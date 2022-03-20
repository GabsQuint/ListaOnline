import React, { useState } from 'react';
import './App.css';
// import ListItem from './components/ListItem'
// import NewBuyInput from './components/NewBuyInput'
import { supabase } from './service/supabase'

const App = () => {
  // const [Buys, setBuys] = useState([]);

  const [editar, setEditar] = useState(0);
  const [name, setName] = React.useState("");
  const [purchase, setPurchases] = React.useState([]);
  const [checkbox, setChecked] = React.useState(false);
  // const [ nameRequest,setNameReques ] = React.useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName('')
    if (editar !== 0){
      await edit()
    }
    if(!name) return;
    const { data } = await 
    supabase.from('purchases')
    .insert({ name: name });
    if (data) {
      setName("")
      get_purchases();
    }
  }

  const get_purchases = async () => {
    const { data } = await supabase
      .from('purchases')
      .select()
    setPurchases(data);
  }

  React.useEffect(() => {
    get_purchases();
  }, [])


  const handleCheck = async() => {
    await supabase
    .from('checkbox')
    .insert({checkbox: checkbox})
  get_purchases();
  };
      

  const handleDelete = async (id) => {
       await supabase
      .from('purchases')
      .delete()
      .match({ id: id })
      setName("")
      setEditar(0)
      setChecked(false)
    get_purchases();
  }


  const edit = async() => {
      await supabase
      .from('purchases')
      .update({ name: name })
      .match ({ id: editar })
      setEditar(0)
    get_purchases();

  }

  const handleUpdate = (item) => {
    setName(item.name);
    setEditar(item.id)
    console.log(editar)
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
            value={name}
            onChange={e => setName(e.target.value)}
          />
            <button className="Btn1"> { editar !== 0 ? "Editar" : "Cadastrar" } </button>
            <div></div>
            {/* { editar != 0 ?  <button type="button" onClick={edit} > EDITAR </button> : <button  onClick={handleSubmit}> CADASTRAR </button>  } */}
        </form>

        {purchase.map((item) => {
          return (
            <div key={item.id}><br></br>
              <p> <input type = "checkbox" onClick={() => handleCheck(checkbox)}></input>
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
