// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import './Home.css';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.post('https://servidorexpress-hefx.onrender.com/getNoticias');
        setArticles(response.data);
        console.log('Fetched articles:', response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleLogout = () => {
    // Aquí puedes realizar cualquier limpieza necesaria (por ejemplo, eliminar tokens, limpiar estado global, etc.)
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>GameltaNews</h1>
        <nav className="home-nav">
          <button onClick={handleProfile} className="profile-button">Perfil</button>
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </nav>
      </header>
      <main className="home-main">
        {articles.length > 0 && (
          <section className="featured-article">
            <ArticleCard 
              title={articles[0].titulo} 
              description={articles[0].sinopsis} 
              body={articles[0].cuerpoNoticia}
              imageUrl={articles[0].imagen}
            />
          </section>
        )}
        <section className="articles-grid">
          {articles.slice(1).map((article, index) => (
            <ArticleCard 
              key={index}
              title={article.titulo} 
              description={article.sinopsis} 
              body={article.cuerpoNoticia}
              imageUrl={article.imagen}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
