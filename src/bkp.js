import React, { useState } from 'react';
import './App.css';
import ListItem from './components/ListItem'
import NewBuyInput from './components/NewBuyInput'
import { supabase } from './service/supabase' 

const App = () => {
  const [Buys, setBuys] = useState([]);

  function addNewBuy(Buy) {      

    const itensCopy = Array.from(Buys);
    itensCopy.push({id: Buys.length, value: Buy});
    setBuys(itensCopy);


  }

  function updateBuy({target}, index) {
    const itensCopy = Array.from(Buys);
    itensCopy.splice(index, 1, { id: index, value: target.value });
    setBuys(itensCopy);
  }

  function deleteBuy(index) {
    const itensCopy = Array.from(Buys);
    itensCopy.splice(index, 1);
    setBuys(itensCopy);
  }

  // heuder
  const [name,setName] = React.useState("");
  const [purchase, setPurchases] = React.useState([]);
  // heuder

  const handleSubmit = async (e) => {
      e.preventDefault();
      const { data, error } = await supabase.from('purchases').insert({ name:name });
      if(data) {
        setName("")
      }
  }

  const  get_purchases =  async () => {
    const { data, error } = await supabase
        .from('purchases')
        .select()
        setPurchases(data);
  }

  React.useEffect(()=>{
    get_purchases();
  },[purchase])

  return (
    <div className="App">
      <div className="App-header">

        {/* <NewBuyInput onSubmit={addNewBuy} /> */}

        {/* heuder */}

      <form onSubmit={handleSubmit}>
      <input 
          type="text"
          value={name}
          onChange={e=>setName(e.target.value)}
        />
        <button> CADASTRAR </button>
      </form>





        {/* heuder */}

        {purchase.map((item)=> {
          return(
                <p key={item.id}> {item.name} </p>
          )
        })}

          {/* <ListItem
            key={id}
            value={purchase}
            onChange={(event) => updateBuy(event, index)}
            onDelete={() => deleteBuy(index)}
  
          /> */}
      </div>
      <div className="Array-preview">
        <pre>
          {JSON.stringify(Buys, null, 4)}
        </pre>
      </div>
    </div>
  )
}

export default App;
