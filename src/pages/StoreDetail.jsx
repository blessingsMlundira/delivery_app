// src/pages/StoreDetail.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StoreProducts from "./StoreProducts";

export default function StoreDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const store = location.state?.store;

  const [searchQuery, setSearchQuery] = useState("");

  // Safety check if no store state was passed
  if (!store) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">No store selected.</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2, borderRadius: 3 }}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  // Filter products by search input
  const filteredProducts =
    store.products?.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      {/* Top Header & Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            onClick={() => navigate(-1)}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f3f4f6",
              cursor: "pointer",
              color: "#111827",
              transition: "background 0.2s ease",
              "&:hover": {
                bgcolor: "#e5e7eb",
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              {store.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {store.tagline || store.tag || "Browse available items"}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip
            icon={
              <StarIcon sx={{ fontSize: "16px !important", color: "#F59E0B" }} />
            }
            label={store.rating || "4.8"}
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 600 }}
          />
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: "16px !important" }} />}
            label={store.eta || "15 min"}
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 600 }}
          />
        </Stack>
      </Box>

      {/* Store Banner Card */}
      <Box
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 4,
          bgcolor: store.color ? `${store.color}10` : "#f9fafb",
          border: `1px solid ${store.color ? `${store.color}30` : "#e5e7eb"}`,
          display: "flex",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            bgcolor: store.color ? `${store.color}25` : "#e5e7eb",
            color: store.color || "#111827",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            flexShrink: 0,
          }}
        >
          {store.logo || "🏪"}
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Welcome to {store.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order fresh groceries and essentials delivered straight to your door.
          </Typography>
        </Box>
      </Box>

      {/* Product Search */}
      <TextField
        fullWidth
        size="small"
        placeholder={`Search products in ${store.name}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mt: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: "#fafafa",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Products Section Header */}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
        Products
      </Typography>

      {/* Products Display */}
      {store.products && store.products.length > 0 ? (
        filteredProducts.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            {filteredProducts.map((product, idx) => (
              <Card
                key={product.id || idx}
                elevation={0}
                onClick={() =>
                  navigate(`/product/${product.id || idx}`, {
                    state: { product, store },
                  })
                }
                sx={{
                  cursor: "pointer",
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 35px rgba(15, 23, 42, 0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      height: 120,
                      borderRadius: 3,
                      bgcolor: product.accent || "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 48,
                      mb: 2,
                      position: "relative",
                    }}
                  >
                    {product.emoji || "📦"}

                    {product.badge && (
                      <Chip
                        label={product.badge}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          bgcolor: "#fff",
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      />
                    )}
                  </Box>

                  <Typography fontWeight={700} variant="subtitle1">
                    {product.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1.5,
                    }}
                  >
                    <Typography
                      fontWeight={800}
                      color="success.main"
                      variant="h6"
                    >
                      {product.price}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      disableElevation
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id || idx}`, {
                          state: { product, store },
                        });
                      }}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 700,
                        borderColor: "#e5e7eb",
                        color: "#374151",
                        "&:hover": {
                          borderColor: "#d1d5db",
                          bgcolor: "#f9fafb",
                        },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">
              No products match "{searchQuery}"
            </Typography>
          </Box>
        )
      ) : (
        /* Fallback component if store.products array is absent */
        <StoreProducts store={store} searchQuery={searchQuery} />
      )}
    </Box>
  );
}