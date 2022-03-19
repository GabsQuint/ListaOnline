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
  // const [ nameRequest,setNameReques ] = React.useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName('')
    if (editar !== 0){
      await edit()
      return
      
    }
    if(!name) return;
      
    const { data } = await supabase.from('purchases').insert({ name: name });
    if (data) {
      setName("")
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


  const handleDelete = async (id) => {
       await supabase
      .from('purchases')
      .delete()
      .match({ id: id })
    get_purchases();
  }


  const edit = async() => {
      await supabase
      .from('purchases')
      .update({ name: name })
      .match ({ id: editar })
 
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
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
            <button> { editar !== 0 ? "Editar" : "Cadastrar" } </button>
            {/* { editar != 0 ?  <button type="button" onClick={edit} > EDITAR </button> : <button  onClick={handleSubmit}> CADASTRAR </button>  } */}
        </form>

        {purchase.map((item) => {
          return (
            <div key={item.id}>
              <p> {item.name}
                <button onClick={() => handleUpdate(item)} > EDITAR </button>
                <button onClick={() => handleDelete(item.id)} > DELETAR </button>
              </p>

            </div>
          )
        })}

      </div>
    </div>
  )
}

export default App;
