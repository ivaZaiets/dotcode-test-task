import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { cards } from "../configs/cards";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        minHeight: "calc(100vh - 68.5px)",
        py: { xs: 2, sm: 0 },
        px: 2,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            width: "100%",
            maxWidth: 345,
            borderRadius: 2,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            textDecoration: "none",
          }}
        >
          <CardActionArea component={NavLink} to={card.to}>
            <CardMedia
              component="img"
              height="220"
              image={card.img}
              alt={card.alt}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "text.secondary",
                }}
              >
                {card.description}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{ width: 24, minWidth: 0, height: 24, p: 0 }}
              >
                <OpenInNewIcon />
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default Home;
