import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Typography } from "@mui/material";
import type { Row } from "../interfaces/Row";
import type { SocketData } from "../interfaces/SocketData";
import { columns } from "../configs/columns";
import { getTableBtns } from "../utils/getTableBtns";

const Table = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const socketData: SocketData = JSON.parse(e.data);

      const formattedData = {
        id: socketData.x.hash,
        from: socketData.x.inputs
          .map((input) => input.prev_out.addr)
          .join(", "),
        to: socketData.x.out.map((el) => el.addr).join(", "),
        sum:
          socketData.x.out.length > 1
            ? `${socketData.x.out.reduce((acc, item) => acc + item.value, 0) / 100000000} BTC`
            : `${socketData.x.out[0].value / 100000000} BTC`,
      };

      setRows((prevRows) => [...prevRows, formattedData]);
    };
  }, [socket]);

  useEffect(() => {
    const totalRowsSum = rows.reduce(
      (acc, item) => acc + Number(item.sum.split("BTC")[0]),
      0,
    );

    setTotalSum(totalRowsSum);
  }, [rows]);

  const startSubscription = () => {
    if (socket) return;

    const wsChannel = new WebSocket("wss://ws.blockchain.info/inv");

    wsChannel.onopen = () => {
      wsChannel.send(JSON.stringify({ op: "unconfirmed_sub" }));
    };

    setSocket(wsChannel);
  };

  const closeSubscription = () => {
    if (!socket) return;

    socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));

    socket.close();
    setSocket(null);
  };

  const resetSubscription = () => setRows([]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 950,
        m: "0 auto",
        pt: 8,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: { xs: 3, sm: 0 },
          width: "100%",
          pb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {getTableBtns(
            startSubscription,
            closeSubscription,
            resetSubscription,
          ).map((btn) => (
            <Button
              key={btn.innerText}
              variant="contained"
              color={btn.color}
              onClick={btn.onClick}
            >
              {btn.innerText}
            </Button>
          ))}
        </Box>

        <Typography variant="h5" component="h5">
          {`${totalSum} BTC`}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 217px)",
          pb: { xs: 2, sm: 0 },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Table;
