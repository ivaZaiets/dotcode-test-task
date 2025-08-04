import { useEffect, useState } from "react";
import { DraggableData, Position, Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import { Box, Button } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import type { Block } from "../interfaces/Block";
import { initialBlocks } from "../configs/initialBlocks";
import { pxToPercent } from "../utils/pxToPercent";
import { percentToPx } from "../utils/percentToPx";
import { getRandomColor } from "../utils/getRandomColor";
import { getDashboardBtns } from "../utils/getDashboardBtns";

const Dashboard = () => {
  const [blocks, setBlocks] = useState<Block[]>(() => {
    const storedItems = localStorage.getItem("blocks");
    return storedItems ? JSON.parse(storedItems) : initialBlocks;
  });
  const [dashboardSize, setDashboardSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    const updateSize = () => {
      const dashboard = document.getElementById("dashboard");

      if (dashboard) {
        setDashboardSize({
          width: dashboard.offsetWidth,
          height: dashboard.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getMaxZ = () => Math.max(...blocks.map((block) => block.z), 0);

  const createBlock = () => {
    const newBlock = {
      id: uuidv4(),
      x: pxToPercent(0, dashboardSize.width),
      y: pxToPercent(0, dashboardSize.height),
      z: getMaxZ() + 1,
      width: pxToPercent(200, dashboardSize.width),
      height: pxToPercent(200, dashboardSize.height),
      background: getRandomColor(),
    };

    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const bringToFront = (id: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, z: getMaxZ() + 1 } : block,
      ),
    );
  };

  const onDragStop = (block: Block, d: DraggableData) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((b) =>
        b.id === block.id
          ? {
              ...b,
              x: pxToPercent(d.x, dashboardSize.width),
              y: pxToPercent(d.y, dashboardSize.height),
            }
          : b,
      ),
    );
  };

  const onResizeStop = (block: Block, ref: HTMLElement, position: Position) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((b) =>
        b.id === block.id
          ? {
              ...b,
              width: pxToPercent(ref.offsetWidth, dashboardSize.width),
              height: pxToPercent(ref.offsetHeight, dashboardSize.height),
              x: pxToPercent(position.x, dashboardSize.width),
              y: pxToPercent(position.y, dashboardSize.height),
            }
          : b,
      ),
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "80vw",
        m: "0 auto",
        pt: 5,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          gap: 2,
          pb: 3,
        }}
      >
        {getDashboardBtns(setBlocks, createBlock).map((btn) => (
          <Button
            key={btn.color}
            variant="contained"
            color={btn.color}
            onClick={btn.onClick}
          >
            {btn.icon}
          </Button>
        ))}
      </Box>

      <Box
        id="dashboard"
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          mb: 4,
          background: "#f2f2f2",
          backgroundImage:
            "linear-gradient(to right, #e2e2e2 1px, transparent 1px), linear-gradient(to bottom, #e2e2e2 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      >
        {blocks.map((block) => (
          <Rnd
            key={block.id}
            bounds="#dashboard"
            size={{
              width: percentToPx(block.width, dashboardSize.width),
              height: percentToPx(block.height, dashboardSize.height),
            }}
            minWidth={50}
            minHeight={50}
            position={{
              x: percentToPx(block.x, dashboardSize.width),
              y: percentToPx(block.y, dashboardSize.height),
            }}
            dragGrid={[10, 10]}
            style={{
              background: block.background,
              transition: "transform 0.1s linear",
              zIndex: block.z,
              position: "absolute",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: 8,
            }}
            onMouseDown={() => bringToFront(block.id)}
            onDragStop={(e, d) => onDragStop(block, d)}
            onResizeStop={(e, direction, ref, delta, position) => {
              onResizeStop(block, ref, position);
            }}
          >
            <Button
              sx={{
                float: "right",
                width: 25,
                minWidth: 0,
                height: 25,
                p: 2,
              }}
              color="inherit"
              onClick={() => removeBlock(block.id)}
            >
              <ClearOutlinedIcon sx={{ fontSize: 20, color: "#fff" }} />
            </Button>
          </Rnd>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
