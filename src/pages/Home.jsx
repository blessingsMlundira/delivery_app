import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearIcon from "@mui/icons-material/Clear";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= DATA ================= */

const drinkStores = [
  {
    name: "Quick Drinks",
    tag: "Soft Drinks • Energy • Water",
    rating: "4.8",
    eta: "10 min",
    icon: "🥤",
    color: "#E8F5E9",
  },
  {
    name: "Refresh Express",
    tag: "Cold Beverages",
    rating: "4.7",
    eta: "12 min",
    icon: "🧃",
    color: "#FFF3E0",
  },
  {
    name: "Bottle Hub",
    tag: "Juices • Soft Drinks",
    rating: "4.9",
    eta: "8 min",
    icon: "🍾",
    color: "#E1F5FE",
  },
  {
    name: "Chill Stop",
    tag: "Sodas • Ice Tea",
    rating: "4.6",
    eta: "15 min",
    icon: "🧊",
    color: "#F3E5F5",
  },
];

const pharmacyStores = [
  {
    name: "Health Plus Pharmacy",
    tag: "Medication & Wellness",
    rating: "4.9",
    eta: "15 min",
    icon: "💊",
    color: "#E3F2FD",
  },
  {
    name: "MediCare Pharmacy",
    tag: "Prescriptions & OTC",
    rating: "4.8",
    eta: "18 min",
    icon: "🩺",
    color: "#FFEBEE",
  },
  {
    name: "Care Pharmacy",
    tag: "Health Essentials",
    rating: "4.7",
    eta: "20 min",
    icon: "🩹",
    color: "#E8EAF6",
  },
  {
    name: "Express Rx",
    tag: "First Aid & Wellness",
    rating: "4.9",
    eta: "12 min",
    icon: "🧪",
    color: "#E0F2F1",
  },
];

/* ================= COMPONENT ================= */

export default function Home() {
  const navigate = useNavigate();
  const [service, setService] = useState("drinks");
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const isDrinks = service === "drinks";
  const stores = isDrinks ? drinkStores : pharmacyStores;
  const accentColor = isDrinks ? "#00C853" : "#1976D2";
  const gradientBg = isDrinks
    ? "radial-gradient(circle at 80% 20%, #66BB6A 0%, #00C853 50%, #1B5E20 100%)"
    : "radial-gradient(circle at 80% 20%, #42A5F5 0%, #1976D2 50%, #0D47A1 100%)";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        p: { xs: 1.5, sm: 3, md: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* APP SHELL */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          bgcolor: "#FFFFFF",
          minHeight: "100vh",
          borderRadius: { xs: 4, md: 6 },
          
          
          overflow: "hidden",
          pb: 8,
          my: { xs: 0, md: 1 },
        }}
      >
        {/* ================= HEADER ================= */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            bgcolor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {/* SERVICE SWITCHER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              px: { xs: 2, md: 6 },
              pt: 2.5,
              pb: 1.5,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                bgcolor: "#F1F5F9",
                p: 0.6,
                borderRadius: 12,
                gap: 1,
                width: { xs: "100%", sm: "auto" },
                maxWidth: 400,
              }}
            >
              {/* DRINKS TAB */}
              <Box
                onClick={() => setService("drinks")}
                sx={{
                  flex: 1,
                  position: "relative",
                  py: 1,
                  px: 3,
                  borderRadius: 10,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  transition: "color 0.2s",
                  zIndex: 1,
                }}
              >
                {service === "drinks" && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 24,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Typography fontSize={18}>🥤</Typography>
                <Typography
                  fontWeight={service === "drinks" ? 700 : 600}
                  fontSize={14}
                  color={service === "drinks" ? "#00C853" : "text.secondary"}
                >
                  Drinks
                </Typography>
              </Box>

              {/* PHARMACY TAB */}
              <Box
                onClick={() => setService("pharmacy")}
                sx={{
                  flex: 1,
                  position: "relative",
                  py: 1,
                  px: 3,
                  borderRadius: 10,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  transition: "color 0.2s",
                  zIndex: 1,
                }}
              >
                {service === "pharmacy" && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 24,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Typography fontSize={18}>💊</Typography>
                <Typography
                  fontWeight={service === "pharmacy" ? 700 : 600}
                  fontSize={14}
                  color={service === "pharmacy" ? "#1976D2" : "text.secondary"}
                >
                  Pharmacy
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* SEARCH */}
          <Box px={{ xs: 2, md: 6 }} pb={2}>
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${isDrinks ? "drinks, sodas, water..." : "medicines, wellness, first aid..."}`}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 6,
                  bgcolor: "#F8FAFC",
                  transition: "all 0.2s ease-in-out",
                  border: "1px solid #E2E8F0",
                  "& fieldset": { border: "none" },
                  "&:hover": {
                    bgcolor: "#F1F5F9",
                  },
                  "&.Mui-focused": {
                    bgcolor: "#FFFFFF",
                    boxShadow: `0 0 0 3px ${isDrinks ? "rgba(0, 200, 83, 0.15)" : "rgba(25, 118, 210, 0.15)"}`,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary", ml: 0.5 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery("")}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* ================= QUICK STORES HORIZONTAL LIST ================= */}
        <Box
          sx={{
            px: { xs: 2, md: 6 },
            py: 3,
            display: "flex",
            gap: 2.5,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {stores.map((store) => (
            <motion.div
              key={store.name}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                navigate("/store", {
                  state: { store },
                })
              }
              style={{ cursor: "pointer", minWidth: 88 }}
            >
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    bgcolor: store.color || "#F8FAFC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    mx: "auto",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                    border: "2px solid #FFFFFF",
                    outline: `2px solid ${accentColor}`,
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  {store.icon || (isDrinks ? "🥤" : "🏥")}
                </Box>

                <Typography
                  mt={1.2}
                  fontSize={13}
                  fontWeight={600}
                  color="text.primary"
                  noWrap
                  sx={{ maxWidth: 88 }}
                >
                  {store.name}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* ================= HERO ================= */}
        <Box px={{ xs: 2, md: 6 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 6,
                  p: { xs: 3.5, md: 5 },
                  color: "#FFFFFF",
                  background: gradientBg,
                  overflow: "hidden",
                  boxShadow: isDrinks
                    ? "0 20px 40px rgba(0, 200, 83, 0.25)"
                    : "0 20px 40px rgba(25, 118, 210, 0.25)",
                }}
              >
                {/* DECORATIVE VISUAL ELEMENTS */}
                <Box
                  sx={{
                    position: "absolute",
                    right: -30,
                    bottom: -30,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(10px)",
                    pointerEvents: "none",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: 60,
                    top: -50,
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.08)",
                    pointerEvents: "none",
                  }}
                />

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: { xs: "100%", md: "65%" },
                  }}
                >
                  <Chip
                    icon={
                      <LocalShippingIcon
                        sx={{ fontSize: "16px !important", color: "#FFF !important" }}
                      />
                    }
                    label="Ultra Fast Delivery"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "#FFF",
                      backdropFilter: "blur(6px)",
                      fontWeight: 600,
                      mb: 2,
                      px: 0.5,
                    }}
                  />

                  <Typography
                    variant={isDesktop ? "h3" : "h4"}
                    fontWeight={800}
                    letterSpacing="-0.02em"
                    lineHeight={1.15}
                  >
                    {isDrinks
                      ? "Drinks Delivered Fast"
                      : "Pharmacy at Your Doorstep"}
                  </Typography>

                  <Typography
                    mt={1.5}
                    fontSize={{ xs: 14, md: 16 }}
                    sx={{ opacity: 0.9, fontWeight: 400 }}
                  >
                    {isDrinks
                      ? "Cold beverages, sodas, and ice delivered right to your door in minutes."
                      : "Essential prescriptions, wellness supplies, and care kits delivered safely."}
                  </Typography>

                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      mt: 3.5,
                      px: 3.5,
                      py: 1.2,
                      bgcolor: "#FFFFFF",
                      color: accentColor,
                      borderRadius: 4,
                      fontWeight: 700,
                      fontSize: 15,
                      textTransform: "none",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: "#F8FAFC",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    Order Now
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* ================= FEATURED GRID ================= */}
        <Box px={{ xs: 2, md: 6 }} mt={5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={2.5}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={800}
                letterSpacing="-0.01em"
              >
                Featured Stores
              </Typography>
              <Typography color="text.secondary" variant="body2" mt={0.5}>
                Top rated local partners near your location
              </Typography>
            </Box>
          </Box>

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
            {stores.map((store) => (
              <Card
                key={store.name}
                elevation={0}
                sx={{
                  borderRadius: 5,
                  border: "1px solid #E2E8F0",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
                    borderColor: "transparent",
                  },
                }}
                onClick={() =>
                  navigate("/store", {
                    state: { store },
                  })
                }
              >
                {/* CARD GRAPHICAL BANNER */}
                <Box
                  sx={{
                    height: 140,
                    bgcolor: store.color || "#F8FAFC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 56,
                    position: "relative",
                    background: `linear-gradient(180deg, ${store.color || "#F8FAFC"} 0%, #FFFFFF 100%)`,
                  }}
                >
                  <Box
                    sx={{
                      filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.08))",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {store.icon || (isDrinks ? "🥤" : "🏥")}
                  </Box>

                  {/* RATING BADGE */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      px: 1.2,
                      py: 0.4,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    <StarIcon sx={{ color: "#FFB800", fontSize: 16 }} />
                    <Typography fontSize={12} fontWeight={700}>
                      {store.rating}
                    </Typography>
                  </Box>
                </Box>

                <CardContent
                  sx={{
                    p: 2.5,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography fontWeight={700} fontSize={16} noWrap>
                      {store.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={13}
                      mt={0.3}
                      noWrap
                    >
                      {store.tag}
                    </Typography>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1.5}
                      mt={1.5}
                      color="text.secondary"
                    >
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AccessTimeIcon sx={{ fontSize: 15, color: "#64748B" }} />
                        <Typography fontSize={12} fontWeight={600} color="#64748B">
                          {store.eta}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    sx={{
                      mt: 2.5,
                      py: 1,
                      borderRadius: 3,
                      bgcolor: accentColor,
                      fontWeight: 700,
                      fontSize: 13,
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: accentColor,
                        filter: "brightness(0.95)",
                      },
                    }}
                  >
                    View Store
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}