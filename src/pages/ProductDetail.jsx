import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Stack,
  Divider,
  Paper,
  Rating,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve product and optional store reference from location state
  const product = location.state?.product;
  const store = location.state?.store;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Safety fallback if accessed directly without state
  if (!product) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">No product selected.</Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{ mt: 2, borderRadius: 3, textTransform: "none" }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "increase") {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: "auto" }}>
      {/* Top Bar Navigation */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "#f3f4f6",
            "&:hover": { bgcolor: "#e5e7eb" },
            color: "#111827",
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={() => setIsFavorite(!isFavorite)}
          sx={{
            bgcolor: isFavorite ? "#fee2e2" : "#f3f4f6",
            color: isFavorite ? "#ef4444" : "#111827",
            "&:hover": { bgcolor: isFavorite ? "#fca5a5" : "#e5e7eb" },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>

      {/* Main Content Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 3, md: 5 },
          alignItems: "start",
        }}
      >
        {/* Left Column: Product Image Display */}
        <Paper
          elevation={0}
          sx={{
            height: { xs: 280, md: 380 },
            borderRadius: 5,
            bgcolor: product.accent || "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography fontSize={{ xs: 90, md: 130 }}>
            {product.emoji || "📦"}
          </Typography>

          {product.badge && (
            <Chip
              label={product.badge}
              size="small"
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                bgcolor: "#ffffff",
                fontWeight: 700,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
          )}
        </Paper>

        {/* Right Column: Details & Actions */}
        <Stack spacing={2.5}>
          {/* Store Info Tag */}
          {store && (
            <Typography variant="caption" fontWeight={600} color="text.secondary">
              SOLD BY {store.name.toUpperCase()}
            </Typography>
          )}

          {/* Product Title & Rating */}
          <Box>
            <Typography variant="h4" fontWeight={800} color="#111827">
              {product.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <Rating
                value={4.8}
                precision={0.1}
                readOnly
                size="small"
                sx={{ color: "#F59E0B" }}
              />
              <Typography variant="body2" fontWeight={600} color="text.secondary">
                4.8 (124 reviews)
              </Typography>
            </Stack>
          </Box>

          {/* Price Section */}
          <Typography variant="h4" fontWeight={800} color="success.main">
            {product.price}
          </Typography>

          <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
            {product.description ||
              "Freshly sourced quality ingredients delivered fast to your doorstep. Guaranteed freshness and packed with care."}
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Quantity Selector */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle2" fontWeight={700}>
              Quantity
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                p: 0.5,
                bgcolor: "#fafafa",
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                sx={{ px: 2, fontWeight: 700, minWidth: 24, textAlign: "center" }}
              >
                {quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleQuantityChange("increase")}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          {/* Action Button */}
          <Button
            variant="contained"
            size="large"
            disableElevation
            startIcon={<ShoppingBagOutlinedIcon />}
            sx={{
              py: 1.5,
              borderRadius: 3.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              bgcolor: "#111827",
              "&:hover": { bgcolor: "#1f2937" },
            }}
          >
            Add to Order
          </Button>

          {/* Value Badges */}
          <Stack direction="row" spacing={2} pt={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalShippingOutlinedIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Fast Delivery
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <VerifiedOutlinedIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Quality Assured
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <ShieldOutlinedIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Fresh Guarantee
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}