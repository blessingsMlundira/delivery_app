import {
  Box,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const stores = [
  {
    name: "Pick n Pay",
    logo: "🛒",
    color: "#00C853",
    tagline: "Everyday essentials with fresh local favorites",
    products: [
      { name: "Fresh Basket", price: "R79.90", badge: "Best Seller", emoji: "🥬", accent: "#DCFAE6" },
      { name: "Chilled Drinks", price: "R44.00", badge: "Hot", emoji: "🥤", accent: "#DBEAFE" },
    ],
  },
  {
    name: "Checkers",
    logo: "🛍️",
    color: "#F59E0B",
    tagline: "Stylish picks for your next pantry refresh",
    products: [
      { name: "Weekend Snacks", price: "R35.50", badge: "New", emoji: "🍿", accent: "#FEF3C7" },
      { name: "Household Pack", price: "R92.00", badge: "Value", emoji: "🏠", accent: "#FDE68A" },
    ],
  },
  {
    name: "Shoprite",
    logo: "🏪",
    color: "#2563EB",
    tagline: "Budget-friendly essentials and family favorites",
    products: [
      { name: "Family Bundle", price: "R120.00", badge: "Popular", emoji: "👨‍👩‍👧‍👦", accent: "#BFDBFE" },
      { name: "Cooler Essentials", price: "R58.00", badge: "Fresh", emoji: "🧊", accent: "#E0F2FE" },
    ],
  },
  {
    name: "Spar",
    logo: "🥫",
    color: "#EC4899",
    tagline: "Quick top-up groceries and convenience staples",
    products: [
      { name: "Snack Box", price: "R29.90", badge: "Quick", emoji: "🍫", accent: "#FCE7F3" },
      { name: "Fresh Picks", price: "R67.00", badge: "Trending", emoji: "🥒", accent: "#FBCFE8" },
    ],
  },
  {
    name: "Makro",
    logo: "📦",
    color: "#7C3AED",
    tagline: "Big-basket shopping with premium everyday deals",
    products: [
      { name: "Bulk Essentials", price: "R199.00", badge: "Bulk", emoji: "📦", accent: "#EDE9FE" },
      { name: "Premium Care", price: "R84.90", badge: "Premium", emoji: "🧼", accent: "#DDD6FE" },
    ],
  },
  {
    name: "Clicks",
    logo: "💊",
    color: "#0F766E",
    tagline: "Health, wellness, and daily-care essentials",
    products: [
      { name: "Wellness Kit", price: "R109.90", badge: "Health", emoji: "💚", accent: "#CCFBF1" },
      { name: "Care Essentials", price: "R63.50", badge: "New", emoji: "🩺", accent: "#A7F3D0" },
    ],
  },
];

export default function StoresPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedCategory = state?.category || "All";
  const service = state?.service || "drinks";

  const handleStoreClick = (store) => {
    navigate(`/stores/${store.name.toLowerCase().replace(/\s+/g, "-")}`, {
      state: { store },
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Heading */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
            
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


          <Typography variant="h5" fontWeight={700}>
            Stores
          </Typography>
          <Typography color="text.secondary" mt={0.5}>
            Browse stores selling {selectedCategory.toLowerCase()}
          </Typography>
        </Box>

        <Chip
          label={selectedCategory}
          color="success"
          sx={{
            borderRadius: 3,
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Search */}

      <TextField
        fullWidth
        size="small"
        placeholder="Search stores"
        sx={{
          mt: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {stores.map((store) => (
          <Box
            key={store.name}
            onClick={() => handleStoreClick(store)}
            sx={{
              cursor: "pointer",
              borderRadius: 4,
              p: 2.5,
              bgcolor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(15, 23, 42, 0.05)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 16px 35px rgba(15, 23, 42, 0.1)",
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 66,
                  height: 66,
                  borderRadius: "50%",
                  bgcolor: `${store.color}15`,
                  color: store.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 30,
                  flexShrink: 0,
                }}
              >
                {store.logo}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={700}>{store.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {store.tagline}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="Open now" size="small" sx={{ borderRadius: 999, fontWeight: 600 }} />
              <Chip label={service === "drinks" ? "Drinks" : "Pharmacy"} size="small" sx={{ borderRadius: 999, fontWeight: 600 }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}