import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";

import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  styled,
} from "@mui/material";

interface Props {
  image: string;
  name: string;
  rating?: number;
  price?: number;
  freeDelivery?: boolean;
  onClick?: () => void;
}

const ProductButton = styled(ButtonBase)(({ theme }) => ({
  "&:hover": {
    borderRadius: "3px",
    border: "2px solid var(--primery-color-light-blue-light-blue-10, #D0F3FF)",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.60)",
  },
}));

const ProductCard = (props: Props) => {
  return (
    <ProductButton
      onClick={props.onClick}
      sx={{
        height: 400,
        minWidth: 300,
        width: "18%",
        border: "#D0F3FF 2px solid",
        boxShadow: "none",
        borderRadius: "3px",
        m: 2,
        p: 2,
        pt: 6,
      }}
    >
      <Box>
        <AspectRatio variant="plain" ratio="6/3" objectFit="contain">
          <Image
            loader={() => props.image}
            alt={props.name}
            src={props.image}
            width={"100"}
            height={"100"}
          />
        </AspectRatio>
        <CardContent>
          {props.freeDelivery ? (
            <Typography>ارسال رایگان</Typography>
          ) : (
            <Typography>ارسال سریع</Typography>
          )}
          <Typography variant="body1" sx={{ mb: 2 }}>
            {props.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {props.price}
          </Typography>
          <Grid display={"flex"}>
            <Grid item>
              <Typography sx={{ color: "text.secondary" }}>
                {props.rating}
              </Typography>
            </Grid>
            <Grid item sx={{ m: 0.3, mx: 0.5 }}>
              <Image width={18} height={18} alt="star" src={`star.svg`}></Image>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </ProductButton>
  );
};

export default ProductCard;
