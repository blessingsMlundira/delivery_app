import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import DrinkCard from "../components/drinks/DrinkCard";
import { fetchDrinks } from "../api/drinks";
import { motion } from "framer-motion";

export default function Explore() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchDrinks();
      setDrinks(data);
    };

    load();
  }, []);

  return (
    <Box p={2}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h5" fontWeight={700}>
          Explore Drinks
        </Typography>
      </motion.div>

      <Grid container spacing={2} mt={1}>
        {drinks.map((drink) => (
          <Grid item xs={6} key={drink.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <DrinkCard drink={drink} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}