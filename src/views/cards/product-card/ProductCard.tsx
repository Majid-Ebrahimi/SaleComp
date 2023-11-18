import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

interface Props {
  image: string;
  name: string;
  rating?: number;
  price?: number;
  freeDelivery?: boolean;
}

const ProductCard = (props: Props) => {
  return (
    <Card
      sx={{
        width: 300,
        // height: auto,
        border: "#D0F3FF 2px solid",
        boxShadow: "none",
        borderRadius: "3px",
        m: 2,
        p: 3,
      }}
    >
      {/* <CardMedia
        sx={{ height: 300, width: "100%", objectFit: "cover" }}
        image={props.image}
      /> */}
      <AspectRatio variant="plain" ratio="4/3" objectFit="contain">
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
    </Card>
  );
};

export default ProductCard;
