import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DetalhesFilme from './DetalhesFilme';
import AdicionarFilme from './AdicionarFilme';
import filmemaxLogo from '/filmes/Filmemax.png';
import Button from '@mui/material/Button';


// Criando um tema utilizando theme do MUI
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

// Iniciando a função principal do site
function TelaPrincipal() {
  const [setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [filmData, setFilmData] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Atualizando setMobileOpen
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Saber se o mouse está em cima das imagens
  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  // Saber se o mouse saiu de cima das imagens
  const handleMouseLeave = () => {
    setHovered(null);
  };

  // Saber se a imagem foi clicada pelo mouse
  const handleImageClick = (index) => {
    if (selectedFilm === index) {
      setSelectedFilm(null);
      setShowDetails(false);
    } else {
      setSelectedFilm(index);
      setShowDetails(true);
    }
  };

  // Saber se o detalhes filme foi fechado
  const handleDetailsClose = () => {
    setSelectedFilm(null);
    setShowDetails(false);
  };

  // Fazendo requisição http com o axios
  useEffect(() => {
    axios
      .get('http://localhost:3001/itemData')
      .then((response) => {
        setFilmData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching film data:', error);
      });
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar component="nav" color="primary">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                color="inherit"
              >
                <img src={filmemaxLogo} alt="Filmemax" style={{ width: '120px' }} />
              </Typography>
              <Link to="/adicionar-filme"> {/* Adicione um link para a página de adicionar filmes */}
                <Button
                  color="primary"
                  aria-label="add"
                  edge="end"
                  sx={{ borderRadius: '50%', width: '40px', height: '40px', alignItems: 'center', fontSize: 50 }}
                >
                  +
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route
              path="/detalhes-filme/:id"
              element={
                <DetalhesFilme filmData={filmData[selectedFilm]} onClose={handleDetailsClose} />
              }
            />
            <Route
              path="/adicionar-filme"
              element={<AdicionarFilme />} // Renderize o componente de adicionar filmes aqui
            />
          </Routes>

          <Grid container spacing={2} sx={{ marginTop: '64px', padding: '16px' }}>
            {filmData.map((item, index) =>
              selectedFilm === index || !showDetails ? (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
                  <Link to={`/detalhes-filme/${index}`} onClick={() => handleImageClick(index)}>
                    <Paper
                      elevation={hovered === index ? 10 : 3}
                      sx={{
                        p: 3,
                        backgroundColor: '#FFFFFF',
                        transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: '0px 0px 20px 5px rgba(255,255,255,0.7)',
                        },
                        border: selectedFilm === index ? '2px solid green' : 'none',
                        display: selectedFilm !== null && selectedFilm !== index ? 'none' : 'block',
                        transform: selectedFilm === index || showDetails ? 'scale(2)' : 'none',
                        padding: selectedFilm === index ? '5px' : '16px',
                        marginTop: selectedFilm === index ? '70px' : '0',
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxWidth: '650px',
                          maxHeight: '800px',
                          transition: 'width 0.3s ease-in-out',
                        }}
                      />
                      <ImageListItemBar
                        title={selectedFilm === index ? '' : item.title}
                        subtitle={
                          <span style={{ color: 'black', fontSize: '1.2rem', marginTop: '10px' }}>
                            {selectedFilm === index ? '' : `Diretor: ${item.author}`}
                          </span>
                        }
                        position="below"
                        sx={{
                          color: 'black',
                        }}
                      />
                    </Paper>
                  </Link>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

TelaPrincipal.propTypes = {
  window: PropTypes.func,
};

export default TelaPrincipal;
