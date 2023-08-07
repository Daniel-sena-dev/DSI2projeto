import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

//Iniciando função para adicionar filmes
function AdicionarFilme() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [diretor, setDiretor] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [nota, setNota] = useState('');
    const [imagem, setImagem] = useState('');

    // atualizar o campo valor do formulario
    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
    };

    const handleDiretorChange = (event) => {
        setDiretor(event.target.value);
    };

    const handleSinopseChange = (event) => {
        setSinopse(event.target.value);
    };

    const handleNotaChange = (event) => {
        setNota(event.target.value);
    };

    const handleImagemChange = (event) => {
        setImagem(event.target.value);
    };

    const handleFechar = () => {
        navigate('/');
    };
    
    //Enviando para db.json
    const handleSubmit = async (event) => {
        event.preventDefault();

        const filmeData = {
            title: titulo,
            author: diretor,
            summary: sinopse,
            rate: nota,
            img: imagem
        };

        try {
            await axios.post('http://localhost:3001/itemData', filmeData);
            navigate('/'); 
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        //Definindo box como formulario
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 10 }}>
            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                margin="normal"
                value={titulo}
                onChange={handleTituloChange}
                required
            />
            <TextField
                label="Diretor"
                variant="outlined"
                fullWidth
                margin="normal"
                value={diretor}
                onChange={handleDiretorChange}
                required
            />
            <TextField
                label="Sinopse"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={sinopse}
                onChange={handleSinopseChange}
                required
            />
            <TextField
                label="Nota"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={nota}
                onChange={handleNotaChange}
                required
            />
            <TextField
                label="Imagem"
                variant="outlined"
                fullWidth
                margin="normal"
                value={imagem}
                onChange={handleImagemChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
                Adicionar Filme
            </Button>

            <Button variant="contained" onClick={handleFechar} sx={{ marginTop: '16px', marginLeft: '10px' }}>
                Cancelar
            </Button>
        </Box>
    );
}

export default AdicionarFilme;
