import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

//Iniciando a função dos detalhes
function DetalhesFilme(props) {
  const { id } = useParams();
  const { onClose } = props;
  const [filme, setFilme] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/itemData/${id}`)
      .then((response) => {
        setFilme(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, [id]);

  //Voltando para a pagina principal 
  const handleFechar = () => {
    onClose();
    navigate('/');
  };

  if (!filme) {
    return <p>Carregando...</p>;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        maxWidth: 500,
        margin: 10,
        padding: 5,
        borderRadius: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        color: 'black',
        wordWrap: 'break-word',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        <b>{filme.title}</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Diretor:</b> {filme.author}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Sinopse:</b> {filme.summary}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '10px',
          border: '1px solid #ccc',
          padding: '5px',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >

        <Rating name="movie-rating" value={filme.rate} max={5} precision={0.1} readOnly />({filme.rate})

      </Box>
      <Button variant="contained" onClick={handleFechar} sx={{ marginTop: '20px' }}>
        Fechar
      </Button>
    </Box>
  );
}

export default DetalhesFilme;
