import {
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const fallbackStore = {
  name: "Store",
  logo: "🛍️",
  color: "#00C853",
  tagline: "Fresh finds and everyday essentials",
  products: [
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
  ],
};

export default function StoreProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = location.state?.store || fallbackStore;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", pb: 8 }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${store.color} 0%, #fff 100%)`,
          px: { xs: 2, md: 4 },
          pt: 3,
          pb: 4,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 2,
            color: "#111827",
            fontWeight: 700,
            textTransform: "none",
            bgcolor: "rgba(255,255,255,0.8)",
            borderRadius: 999,
            px: 2,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.95)",
            },
          }}
        >
          Back
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
              Featured store
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
              {store.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 500 }}>
              {store.tagline || "Quality picks, fast delivery, and everyday savings."}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 86,
              height: 86,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              bgcolor: "rgba(255,255,255,0.9)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            {store.logo}
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, md: 4 }, mt: 3 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
          <Chip label="Fresh arrivals" color="success" sx={{ borderRadius: 999, fontWeight: 600 }} />
          <Chip label="Fast delivery" sx={{ borderRadius: 999, fontWeight: 600 }} />
          <Chip label="Great value" sx={{ borderRadius: 999, fontWeight: 600 }} />
        </Stack>

        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Popular items for sale
        </Typography>

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
          {(store.products || fallbackStore.products).map((item) => (
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
              <Box
                sx={{
                  height: 140,
                  background: `linear-gradient(135deg, ${item.accent || store.color} 0%, #ffffff 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 54,
                }}
              >
                {item.emoji || "🛒"}
              </Box>

              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography fontWeight={700}>{item.name}</Typography>
                  <Chip label={item.badge || "Top pick"} size="small" sx={{ borderRadius: 999, fontWeight: 600 }} />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Curated for quick delivery and everyday convenience.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography fontWeight={800} color={store.color}>
                    {item.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCartOutlinedIcon fontSize="small" />}
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      bgcolor: store.color,
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: store.color,
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
    </Box>
  );
}
