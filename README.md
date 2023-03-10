# Cards
// Importar los módulos necesarios
const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const path = require('path');
const cron = require('node-cron');

// Inicializar la aplicación de Express
const app = express();

// Establecer la ubicación de la plantilla EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Definir una función para obtener las noticias de la API
async function getNews() {
  try {
    // Definir los parámetros de búsqueda para la API de NewsAPI
    const params = {
      q: 'noticias',
      language: 'es',
      pageSize: 50,
      apiKey: 'TU_API_KEY_AQUI'
    };

    // Realizar la petición HTTP GET a la API de NewsAPI
    const response = await axios.get('https://newsapi.org/v2/everything', { params });

    // Devolver los datos de las noticias
    return response.data.articles;
  } catch (error) {
    console.error(error);
  }
}

// Establecer una tarea programada para actualizar las noticias diariamente
cron.schedule('0 0 * * *', async () => {
  // Obtener las noticias de la API
  const news = await getNews();

  // Almacenar las noticias en una variable global
  global.news = news;
});

// Ruta principal para mostrar las noticias
app.get('/', (req, res) => {
  // Obtener las noticias almacenadas en la variable global
  const news = global.news;

  // Renderizar la plantilla EJS con las noticias
  res.render('index', { news });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});


//Fetch Api
// Importar los módulos necesarios
const express = require('express');
const fetch = require('node-fetch');
const ejs = require('ejs');
const path = require('path');
const cron = require('node-cron');

// Inicializar la aplicación de Express
const app = express();

// Establecer la ubicación de la plantilla EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Definir una función para obtener las noticias de la API
async function getNews() {
  try {
    // Definir los parámetros de búsqueda para la API de NewsAPI
    const params = new URLSearchParams({
      q: 'noticias',
      language: 'es',
      pageSize: 50,
      apiKey: 'TU_API_KEY_AQUI'
    });

    // Realizar la petición HTTP GET a la API de NewsAPI
    const response = await fetch(`https://newsapi.org/v2/everything?${params}`);

    // Convertir la respuesta a formato JSON y devolver los datos de las noticias
    return await response.json().then(data => data.articles);
  } catch (error) {
    console.error(error);
  }
}

// Establecer una tarea programada para actualizar las noticias diariamente
cron.schedule('0 0 * * *', async () => {
  // Obtener las noticias de la API
  const news = await getNews();

  // Almacenar las noticias en una variable global
  global.news = news;
});

// Ruta principal para mostrar las noticias
app.get('/', (req, res) => {
  // Obtener las noticias almacenadas en la variable global
  const news = global.news;

  // Renderizar la plantilla EJS con las noticias
  res.render('index', { news });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
