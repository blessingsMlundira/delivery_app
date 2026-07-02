import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const MotionCard = motion(Card);

export default function DrinkCard({ drink }) {
  const dispatch = useDispatch();

  return (
    <MotionCard
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      sx={{ borderRadius: 3 }}
    >
      <CardMedia
        component="img"
        height="140"
        image={drink.image}
        alt={drink.name}
      />

      <CardContent>
        <Typography fontWeight={700}>
          {drink.name}
        </Typography>

        <Typography color="text.secondary">
          ${drink.price}
        </Typography>

        <Box mt={1}>
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              dispatch(addToCart(drink))
            }
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </MotionCard>
  );
}