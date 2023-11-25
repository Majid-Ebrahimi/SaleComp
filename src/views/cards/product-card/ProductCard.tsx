import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";
import {
  Box,
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
      onClick={props.onClick}
      sx={{
        height: 400,
        minWidth: 300,
        width: "18%",
        border: "#D0F3FF 2px solid",
        boxShadow: "none",
        borderRadius: "3px",
        m: 2,
        p: 1,
        pt: 6,
      }}
    >
      <Box>
        <AspectRatio variant="plain" ratio="6/4" objectFit="contain">
          <Image
            loader={() => props.image}
            alt={props.name}
            src={props.image}
            width={"100"}
            height={"100"}
          />
        </AspectRatio>
        <CardContent>
          <Grid display={"flex"}>
            <Grid item sx={{ mx: 0.5 }}>
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
                <Typography sx={{ mb: 2 }}>ارسال رایگان</Typography>
              ) : (
                <Typography sx={{ mb: 2 }}>ارسال فردا</Typography>
              )}
            </Grid>
          </Grid>

          <TitleTypography flexWrap={"wrap"} sx={{ mb: 2 }}>
            {props.name}
          </TitleTypography>
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
                ريال{" "}
                {Intl.NumberFormat("en-US", {
                  maximumSignificantDigits: 4,
                }).format(Number(props.price))}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </ProductButton>
  );
};

export default ProductCard;
