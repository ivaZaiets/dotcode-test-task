import type { MuiColor } from "../types/MuiColor";

export const getTableBtns = (
  startSubscription: () => void,
  closeSubscription: () => void,
  resetSubscription: () => void,
) => {
  const buttons: {
    color: MuiColor;
    onClick: () => void;
    innerText: string;
  }[] = [
    {
      color: "success",
      onClick: startSubscription,
      innerText: "Start",
    },
    {
      color: "error",
      onClick: closeSubscription,
      innerText: "Stop",
    },
    {
      color: "warning",
      onClick: resetSubscription,
      innerText: "Reset",
    },
  ];

  return buttons;
};
