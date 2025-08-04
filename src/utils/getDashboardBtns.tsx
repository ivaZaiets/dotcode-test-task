import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import type { Block } from "../interfaces/Block";
import type { MuiColor } from "../types/MuiColor";
import { initialBlocks } from "../configs/initialBlocks";

export const getDashboardBtns = (
  setBlocks: (value: React.SetStateAction<Block[]>) => void,
  createBlock: () => void,
) => {
  const buttons: {
    color: MuiColor;
    onClick: () => void;
    icon: React.ReactNode;
  }[] = [
    {
      color: "warning",
      onClick: () => setBlocks(initialBlocks),
      icon: <RestartAltOutlinedIcon />,
    },
    {
      color: "success",
      onClick: createBlock,
      icon: <AddCircleOutlineOutlinedIcon />,
    },
  ];

  return buttons;
};
