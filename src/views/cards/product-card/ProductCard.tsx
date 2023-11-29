import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";
import {
  ButtonBase,
  CardContent,
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
    border: "2px solid #D0F3FF",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.60)",
  },
  "&:active": {
    backgroundColor: "#D0F3FF",
    opacity: " 0.5",
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  color: "#2C2C34",
  direction: "rtl",
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "normal",
}));

const ProductCard = (props: Props) => {
  return (
    <ProductButton
      id="card"
      onClick={() => {
        props.onClick;
      }}
      sx={{
        height: 400,
        minWidth: 310,
        maxWidth: 375,
        width: "18%",
        border: "#D0F3FF 2px solid",
        boxShadow: "none",
        borderRadius: "3px",
        m: 2,
        p: 1,
        pt: 6,
        overflow: "hidden",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <AspectRatio
          minHeight={225}
          variant="plain"
          ratio="6/4"
          objectFit="contain"
        >
          <Image
            loader={() => props.image}
            alt={props.name}
            src={props.image}
            width={"100"}
            height={"100"}
          />
        </AspectRatio>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              {props.freeDelivery ? (
                <Image
                  width={25}
                  height={25}
                  alt="star"
                  src={`delivery-truck.svg`}
                ></Image>
              ) : (
                <Image
                  width={25}
                  height={25}
                  alt="star"
                  src={`delivery-parcel.svg`}
                ></Image>
              )}
            </Grid>
            <Grid item>
              {props.freeDelivery ? (
                <Typography>ارسال رایگان</Typography>
              ) : (
                <Typography>ارسال سریع</Typography>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            textAlign={"start"}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              mb: 2,
              minHeight: 65,
            }}
          >
            <TitleTypography>{props.name}</TitleTypography>
          </Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Grid display={"flex"}>
              <Grid item>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {props.rating}
                </Typography>
              </Grid>
              <Grid item sx={{ mx: 0.5 }}>
                <Image
                  width={22}
                  height={22}
                  alt="star"
                  src={`star.svg`}
                ></Image>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ mb: 2 }}>
                تومان
                {Intl.NumberFormat("en-US", {
                  maximumSignificantDigits: 4,
                }).format(Number(props.price))}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </ProductButton>
  );
};

export default ProductCard;
