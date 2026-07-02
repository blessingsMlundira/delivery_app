import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Chip,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonOutlineIcon from "@mui/icons-material/Person";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { motion } from "framer-motion";
import { useState } from "react";

/* ================= DATA ================= */

const drinkCategories = [
  { emoji: "🥤", name: "Soft Drinks" },
  { emoji: "🍺", name: "Energy Drinks" },
  { emoji: "🍷", name: "Juices" },
  { emoji: "🧃", name: "Water" },
];

const pharmacyCategories = [
  { emoji: "💊", name: "Pain Relief" },
  { emoji: "🩹", name: "First Aid" },
  { emoji: "🧴", name: "Skincare" },
  { emoji: "🧼", name: "Hygiene" },
];

const drinkItems = [
  { name: "Coca Cola", tag: "Cold & Fresh", rating: "4.7", eta: "10 min" },
  { name: "Red Bull", tag: "Energy Boost", rating: "4.6", eta: "8 min" },
  { name: "Pepsi", tag: "Chilled", rating: "4.5", eta: "12 min" },
];

const pharmacyItems = [
  { name: "Panado", tag: "Pain Relief", rating: "4.8", eta: "15 min" },
  { name: "Vitamin C", tag: "Immune Support", rating: "4.6", eta: "20 min" },
  { name: "Plasters Pack", tag: "First Aid", rating: "4.7", eta: "18 min" },
];

/* ================= COMPONENT ================= */

export default function Home() {
  const [nav, setNav] = useState(0);
  const [service, setService] = useState("drinks"); // 👈 NEW

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const isDrinks = service === "drinks";

  const categories = isDrinks ? drinkCategories : pharmacyCategories;
  const items = isDrinks ? drinkItems : pharmacyItems;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* APP SHELL */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          bgcolor: "#fff",
          minHeight: "100vh",
          boxShadow: isDesktop ? "0 0 30px rgba(0,0,0,0.05)" : "none",
          pb: 8,
        }}
      >
        {/* ================= HEADER ================= */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            bgcolor: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* SERVICE SWITCHER */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              textAlign: "center",
              px: { xs: 2, md: 6 },
              py: 2,
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => setService("drinks")}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                fontWeight={service === "drinks" ? 700 : 500}
                sx={{ opacity: service === "drinks" ? 1 : 0.5 }}
              >
                🥤 Drinks
              </Typography>

              {service === "drinks" && (
                <Box
                  sx={{
                    height: 3,
                    width: 60,
                    mx: "auto",
                    bgcolor: "#00C853",
                    mt: 1,
                    borderRadius: 10,
                  }}
                />
              )}
            </Box>

            <Box
              onClick={() => setService("pharmacy")}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                fontWeight={service === "pharmacy" ? 700 : 500}
                sx={{ opacity: service === "pharmacy" ? 1 : 0.5 }}
              >
                💊 Pharmacy
              </Typography>

              {service === "pharmacy" && (
                <Box
                  sx={{
                    height: 3,
                    width: 80,
                    mx: "auto",
                    bgcolor: "#00C853",
                    mt: 1,
                    borderRadius: 10,
                  }}
                />
              )}
            </Box>
          </Box>

          {/* SEARCH */}
          <Box px={{ xs: 2, md: 6 }} pb={2}>
            <TextField
              fullWidth
              placeholder={`Search ${isDrinks ? "drinks" : "medicine"}`}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  bgcolor: "#fafafa",
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
          </Box>
        </Box>

        {/* ================= CATEGORY ================= */}
        <Box
          sx={{
            px: { xs: 2, md: 6 },
            py: 2,
            display: "flex",
            gap: 3,
            overflowX: "auto",
          }}
        >
          {categories.map((item) => (
            <Box key={item.name} textAlign="center" sx={{ minWidth: 80 }}>
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  bgcolor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  mx: "auto",
                }}
              >
                {item.emoji}
              </Box>

              <Typography mt={1} fontSize={13}>
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ================= HERO ================= */}
        <Box px={{ xs: 2, md: 6 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Box
              sx={{
                borderRadius: 4,
                p: { xs: 3, md: 5 },
                color: "#fff",
                background: isDrinks
                  ? "linear-gradient(135deg,#00C853,#00E676)"
                  : "linear-gradient(135deg,#1565C0,#42A5F5)",
              }}
            >
              <Typography variant={isDesktop ? "h3" : "h4"} fontWeight={700}>
                {isDrinks ? "Drinks Delivered Fast" : "Pharmacy at Your Doorstep"}
              </Typography>

              <Typography mt={1}>
                {isDrinks
                  ? "Cold beverages delivered in minutes."
                  : "Essential medication delivered safely."}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: "#fff",
                  color: isDrinks ? "#00C853" : "#1565C0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                Order Now
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* ================= FEATURED GRID ================= */}
        <Box px={{ xs: 2, md: 6 }} mt={5}>
          <Typography variant="h5" fontWeight={700}>
            Featured {isDrinks ? "Drinks" : "Pharmacy"}
          </Typography>

          <Typography color="text.secondary" mb={2}>
            Popular items
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {items.map((item) => (
              <Card
                key={item.name}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #eee",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 140,
                    bgcolor: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Image
                </Box>

                <CardContent>
                  <Typography fontWeight={700}>{item.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.tag}
                  </Typography>

                  <Typography variant="body2" mt={1}>
                    ⭐ {item.rating} • {item.eta}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* ================= BOTTOM NAV ================= */}
        <BottomNavigation
          value={nav}
          onChange={(e, v) => setNav(v)}
          showLabels
          sx={{
            position: isDesktop ? "static" : "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid #eee",
            bgcolor: "#fff",
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Services" icon={<AppsIcon />} />
          <BottomNavigationAction label="Activity" icon={<ReceiptLongIcon />} />
          <BottomNavigationAction label="Account" icon={<PersonOutlineIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}