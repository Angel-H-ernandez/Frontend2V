// src/components/AddUserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [imagen, setImagen] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://servidorexpress-hefx.onrender.com/addUsuario', { nombre, password, admin, imagen });
      console.log(response.data);
      alert('Usuario añadido correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al añadir el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Admin:</label>
        <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
      </div>
      <button type="submit">Añadir Usuario</button>
    </form>
  );
};

export default AddUserForm;
