import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import BottomNav from "../components/navigation/BottomNav";

export default function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        pb: 8,
      }}
    >
      <Outlet />
      <BottomNav />
    </Box>
  );
}