import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          position: "relative",
          minHeight: "calc(100vh - 68.5px)",
          "&::after": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            backgroundColor: "#fafafa",
            backgroundImage:
              "repeating-linear-gradient(45deg, #ccc 0, #ccc 1px, transparent 1px, transparent 20px)",
            backgroundSize: "25px 25px",
            zIndex: -1,
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default App;
