// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ nombreUsuario }) => {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [imagen, setImagen] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.post('http://localhost:3000/getUsuario', { nombre: nombreUsuario });
        setUsuario(response.data);
        setNombre(response.data.nombre);
        setPassword(response.data.password);
        setImagen(response.data.imagen);
      } catch (error) {
        console.error('Error fetching usuario:', error);
      }
    };

    fetchUsuario();
  }, [nombreUsuario]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:3000/updateUsuario', {
        OldNombre: usuario.nombre,
        OldContraseña: usuario.password,
        nombreNuevo: nombre,
        passwordNuevo: password,
        imagenNueva: imagen
      });

      if (response.data) {
        alert('Usuario actualizado exitosamente');
        navigate('/home');
      } else {
        alert('Error al actualizar el usuario.');
      }
    } catch (error) {
      console.error('Error updating usuario:', error);
      alert('Error al actualizar el usuario. Por favor, intenta nuevamente.');
    }
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div className="user-profile-container">
      <h1>Perfil de Usuario</h1>
      <div className="user-profile-form">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Imagen (URL):</label>
        <input
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <button onClick={handleUpdate}>Actualizar Perfil</button>
      </div>
    </div>
  );
};

export default UserProfile;
