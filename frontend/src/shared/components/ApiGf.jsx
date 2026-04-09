// src/shared/components/ApiGf.jsx
import React, { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField
} from "@mui/material";

// Lista fija de personajes Gravity Falls
const gravityFallsCharacters = [
  {
    id: 1,
    name: "Dipper Pines",
    status: "Activo",
    species: "Humano",
    gender: "Masculino",
    image: "https://wallpapers.com/images/featured/dipper-pines-edp2x47as6ohzngc.jpg",
  },
  {
    id: 2,
    name: "Mabel Pines",
    status: "Activo",
    species: "Humano",
    gender: "Femenino",
    image: "https://static.wikia.nocookie.net/viajando-en-el-tiempo/images/f/f0/Mabel.png/revision/latest?cb=20160816173944&path-prefix=es",
  },
  {
    id: 3,
    name: "Grunkle Stan",
    status: "Activo",
    species: "Humano",
    gender: "Masculino",
    image: "https://static.wikia.nocookie.net/gravityfalls/images/9/92/S1e16_something_about_you.png/revision/latest/scale-to-width-down/1200?cb=20130530141339",
  },
  {
    id: 4,
    name: "Ford Pines",
    status: "Activo",
    species: "Humano",
    gender: "Masculino",
    image: "https://static.wikia.nocookie.net/gravityfalls/images/e/e5/Stanford_Pines_imagen_art%C3%ADculo.jpg/revision/latest?cb=20151112214747&path-prefix=es",
  },
  {
    id: 5,
    name: "Soos Ramirez",
    status: "Activo",
    species: "Humano",
    gender: "Masculino",
    image: "https://superawesomevectors.com/wp-content/uploads/2025/02/soos-ramirez-gravity-falls-vector.jpg",
  },
  {
    id: 6,
    name: "Wendy Corduroy",
    status: "Activo",
    species: "Humano",
    gender: "Femenino",
    image: "https://i.ytimg.com/vi/3ALJarWwPVw/maxresdefault.jpg",
  },
  {
    id: 7,
    name: "Bill Cipher",
    status: "Activo",
    species: "Entidad Interdimensional",
    gender: "Desconocido",
    image: "https://static.wikia.nocookie.net/disney/images/4/41/Profile_-_Bill_Cipher.png/revision/latest?cb=20190318132904",
  },
  {
    id: 8,
    name: "Pacifica Northwest",
    status: "Activo",
    species: "Humano",
    gender: "Femenino",
    image: "https://i.pinimg.com/736x/2f/53/f7/2f53f7811c60f58a6a876a735a29b74f.jpg",
  },
  {
    id: 9,
    name: "Gideon Gleeful",
    status: "Activo",
    species: "Humano",
    gender: "Masculino",
    image: "https://i.redd.it/nfnmg2iy81gf1.png",
  },
  {
    id: 10,
    name: "Gompers",
    status: "Activo",
    species: "Cabra",
    gender: "Masculino",
    image: "https://static.wikia.nocookie.net/gravityfalls/images/d/dd/Gompers_appearance.png/revision/latest?cb=20160220222006&path-prefix=es",
  }
];

const ApiGf = () => {
  const [query, setQuery] = useState('');

  // Filtrar personajes según búsqueda
  const filteredCharacters = gravityFallsCharacters.filter(char =>
    char.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>

      {/* TITULO */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Personajes Gravity Falls
      </Typography>

      {/* BUSCADOR */}
      <TextField
        fullWidth
        placeholder="Buscar personaje..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
          mt: "100px"
        }}
      />

      {/* GRID DE PERSONAJES */}
      <Grid container spacing={3}>
        {filteredCharacters.map((char) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={char.id}>
            <Card sx={{
              borderRadius: "16px",
              boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.25)"
              }
            }}>
              {/* IMAGEN */}
              <CardMedia
                component="img"
                height="250"
                image={char.image}
                alt={char.name}
              />

              {/* INFO */}
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{char.name}</Typography>
                <Typography variant="body2" color="text.secondary">Estado: {char.status}</Typography>
                <Typography variant="body2" color="text.secondary">Especie: {char.species}</Typography>
                <Typography variant="body2" color="text.secondary">Género: {char.gender}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default ApiGf;