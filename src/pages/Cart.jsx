import { Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box p={2}>
      <Typography variant="h5">
        Cart
      </Typography>

      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography>
            {item.name} x {item.quantity}
          </Typography>

          <Button
            onClick={() =>
              dispatch(removeFromCart(item.id))
            }
          >
            Remove
          </Button>
        </Box>
      ))}

      <Typography mt={3} fontWeight={700}>
        Total: ${total.toFixed(2)}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => dispatch(clearCart())}
      >
        Checkout
      </Button>
    </Box>
  );
}