// URL de la API de YouTube Data
const apiUrl = 'https://www.googleapis.com/youtube/v3/videos';

// Lista de identificadores de video que deseas mostrar
const videoIds = ['2tXQbi16EdI', 'fyctbKQgClY', 'ZIm_qrJSOds', 'In58AKwTero'];

// Parámetros de la solicitud
const params = {
  key: 'AIzaSyD3vKSQWl21Vlp4CYyk0h10T2iezP7hd9c', 
  part: 'snippet',
  id: videoIds.join(','), 
};

// Realiza la solicitud
fetch(`${apiUrl}?${new URLSearchParams(params)}`)
  .then((response) => response.json())
  .then((data) => {
    // Maneja los datos de la respuesta (información de los videos)
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
