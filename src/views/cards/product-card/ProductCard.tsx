import Image from "next/image";
import {
  ButtonBase,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  image?: string;
  name?: string;
  rating?: number;
  price?: number;
  freeDelivery?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
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
      onClick={props.onClick}
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
        fontFamily: "Rubik",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <div style={{ position: "relative", height: "230px" }}>
          {props.isLoading ? (
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "100%", height: "90%", mt: 4 }}
            />
          ) : (
            <Image
              loader={() => props.image}
              alt={props.name}
              src={props.image}
              fill
              unoptimized
              sizes="(max-width: 300px) 50vw, 100vw"
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            {props.isLoading ? (
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "30%", height: "100%", py: 1 }}
              />
            ) : (
              <>
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
              </>
            )}
          </Grid>

          <Grid
            container
            textAlign={"start"}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              mb: 1,
              minHeight: 65,
            }}
          >
            {props.isLoading ? (
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "100%", height: "100%", py: 4 }}
              />
            ) : (
              <TitleTypography>{props.name}</TitleTypography>
            )}
          </Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            {props.isLoading ? (
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: "100%", height: "100%", py: 2, mb: 4 }}
              />
            ) : (
              <>
                <Grid display={"flex"}>
                  <Grid item>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
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
                    }).format(Number(props.price) * 50000)}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Grid>
    </ProductButton>
  );
};

export default ProductCard;
