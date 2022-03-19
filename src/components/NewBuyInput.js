import React, { useState } from 'react';

const NewBuyInput = ({ onSubmit }) => {

  const [newItem, setNewItem] = useState('');

  function setNewBuy({target}) {
    setNewItem(target.value);
  } 

  function submit(e) {
    e.preventDefault();
    onSubmit(newItem);
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          className="Todo-input"
          placeholder="Digite uma nova compra"
          onChange={setNewBuy}
        />
        <button type="submit">
          Adicionar!
        </button>
      </form>
    </div>
  )
};

export default NewBuyInput;
