// src/components/StoreProducts.jsx
import {
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const defaultProducts = [
  {
    name: "Signature Bundle",
    price: "R89.90",
    badge: "Best Seller",
    emoji: "✨",
    accent: "#FDE68A",
  },
  {
    name: "Daily Essentials",
    price: "R54.50",
    badge: "New",
    emoji: "🧴",
    accent: "#BFDBFE",
  },
  {
    name: "Weekend Treats",
    price: "R38.00",
    badge: "Hot Pick",
    emoji: "🍓",
    accent: "#FBCFE8",
  },
];

export default function StoreProducts({ store }) {
  const products = store?.products || defaultProducts;
  const storeColor = store?.color || "#00C853";

  return (
    <Box sx={{ mt: 3 }}>
      {/* Category Badges */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
        <Chip
          label="Fresh arrivals"
          color="success"
          sx={{ borderRadius: 999, fontWeight: 600 }}
        />
        <Chip
          label="Fast delivery"
          sx={{ borderRadius: 999, fontWeight: 600 }}
        />
        <Chip
          label="Great value"
          sx={{ borderRadius: 999, fontWeight: 600 }}
        />
      </Stack>

      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Popular items for sale
      </Typography>

      {/* Products Grid */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        {products.map((item) => (
          <Card
            key={item.name}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
              border: "1px solid rgba(226,232,240,0.9)",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            {/* Image Box */}
            <Box
              sx={{
                height: 140,
                background: `linear-gradient(135deg, ${
                  item.accent || storeColor
                } 0%, #ffffff 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 54,
              }}
            >
              {item.emoji || "🛒"}
            </Box>

            {/* Content Box */}
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography fontWeight={700}>{item.name}</Typography>
                <Chip
                  label={item.badge || "Top pick"}
                  size="small"
                  sx={{ borderRadius: 999, fontWeight: 600 }}
                />
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Curated for quick delivery and everyday convenience.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight={800} color={storeColor}>
                  {item.price}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartOutlinedIcon fontSize="small" />}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    bgcolor: storeColor,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: storeColor,
                      opacity: 0.9,
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}