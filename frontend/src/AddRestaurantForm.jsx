import React, { useState } from 'react';

function AddRestaurantForm({ createRestaurant }) {
  const [metaMaskID, setMetaMaskID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createRestaurant(metaMaskID, name, description);
    // Clear input fields after submission
    setMetaMaskID('');
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        MetaMask ID:
        <input
          type="text"
          value={metaMaskID}
          onChange={(e) => setMetaMaskID(e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Add Restaurant</button>
    </form>
  );
}

export default AddRestaurantForm;
