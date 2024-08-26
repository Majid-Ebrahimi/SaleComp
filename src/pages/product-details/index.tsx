import { Product } from "@/models";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PriceTypography from "@/components/price-typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Jura } from "next/font/google";

const jura = Jura({
  subsets: ["latin"],
  display: "swap",
});
interface CustomSubtitleProps {
  subjectText: string;
  contentText: string | number;
  isLoading?: boolean;
}
const CustomSubtitle = (props: CustomSubtitleProps) => {
  if (!props.isLoading) {
    return (
      <Typography color={"#2C2C34"} variant="body1" marginBottom={1}>
        <span style={{ color: "#2889A9" }}>{props.subjectText}: </span>
        {props.contentText}
      </Typography>
    );
  } else {
    return (
      <>
        <span style={{ color: "#2889A9" }}>{props.subjectText}: </span>
        <Skeleton animation={"wave"} sx={{ width: "30%" }} variant="text" />
      </>
    );
  }
};

const ProductDetails = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { isFetching, error, data, isLoading } = useQuery<Product>({
    queryFn: async () =>
      (await axios.get(`https://dummyjson.com/products/${router.query.id}`))
        .data,
    queryKey: ["product"],
    retry: false,
  });

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <AppBar
        component={"nav"}
        sx={{ backgroundColor: "#EAFAFF" }}
        position="fixed"
      >
        <Grid
          container
          justifyContent={"space-between"}
          alignContent={"center"}
          direction={"row"}
          sx={{ my: 2, px: "5%" }}
        >
          <Grid item display={"flex"}>
            <Typography
              className={jura.className}
              sx={{
                color: "#2889A9",
                fontSize: "40px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
              }}
            >
              SaleComp
            </Typography>
          </Grid>
          <Grid sx={{ my: 1 }} item>
            <IconButton>
              <Image
                onClick={async () => {
                  queryClient.removeQueries();
                  router.back();
                  await queryClient.refetchQueries({
                    queryKey: ["products", 1],
                    type: "active",
                    exact: true,
                  });
                  await queryClient.refetchQueries({
                    queryKey: ["searchedProducts", 1],
                    type: "active",
                    exact: true,
                  });
                }}
                width={24}
                height={24}
                alt="star"
                src={`images/home.svg`}
              />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
      {data ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction={"row"}
          sx={{ mt: 14 }}
        >
          <Grid item>
            <Box
              sx={{
                position: "relative",
                height: 400,
                width: 400,
              }}
            >
              {!(isFetching || isLoading) ? (
                <Image
                  loader={() => data.thumbnail}
                  alt={data?.title}
                  src={data?.thumbnail}
                  fill
                  unoptimized
                  style={{
                    objectFit: "contain",
                  }}
                  loading="lazy"
                />
              ) : (
                <Skeleton
                  animation={"wave"}
                  sx={{ width: "100%", height: "100%", m: 1 }}
                  variant="rounded"
                />
              )}
            </Box>
          </Grid>
          <Grid item>
            <Grid
              container
              item
              height={"100%"}
              width={"100%"}
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
              sx={{
                p: 2,
                my: 3,
                mx: 4,
                maxWidth: 600,
                maxHeight: 600,
                minHeight: 500,
                minWidth: 350,
                border: "1px solid #B9BBBE",
                borderRadius: "3px",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.30)",
              }}
            >
              <Grid item>
                <center>
                  {!(isFetching || isLoading) ? (
                    <Typography gutterBottom variant="h5">
                      {data.title}
                    </Typography>
                  ) : (
                    <Skeleton
                      animation={"wave"}
                      sx={{ width: "30%" }}
                      variant="rounded"
                    />
                  )}
                </center>
                {
                  <>
                    <Typography variant="h6" marginBottom={2}>
                      Information
                    </Typography>
                    <CustomSubtitle
                      contentText={data.brand}
                      subjectText="Brand"
                      isLoading={isFetching || isLoading}
                    />
                    <CustomSubtitle
                      contentText={data.category}
                      subjectText="Category"
                      isLoading={isFetching || isLoading}
                    />
                    <CustomSubtitle
                      contentText={data.stock}
                      subjectText="Stock"
                      isLoading={isFetching || isLoading}
                    />
                    <CustomSubtitle
                      contentText={data.rating}
                      subjectText="Rating"
                      isLoading={isFetching || isLoading}
                    />
                  </>
                }

                <Grid
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 5,
                    mb: 1,
                  }}
                >
                  <CustomSubtitle
                    contentText={data.description}
                    subjectText="Description"
                    isLoading={isFetching || isLoading}
                  />
                </Grid>
              </Grid>
              <Divider variant="fullWidth" />
              <Grid
                alignSelf={"end"}
                container
                direction="column"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                {!(isFetching || isLoading) ? (
                  <PriceTypography
                    sx={{
                      pr: 8,
                      my: 1,
                    }}
                    price={data.price}
                  />
                ) : (
                  <Skeleton
                    sx={{
                      my: 1,
                      width: "30%",
                    }}
                    animation={"wave"}
                    variant="text"
                  />
                )}
                <Button
                  disabled={isFetching || isLoading}
                  sx={{
                    borderRadius: "3px",
                    backgroundColor: "#00C0FF",
                    px: 4,
                  }}
                  onClick={() => {
                    toast.success(`${data.title} Successfully Added to Basket`);
                  }}
                  variant="contained"
                >
                  Add to Basket
                </Button>
                <ToastContainer />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div>somethings wrong!!!</div>
      )}
    </Grid>
  );
};

export default ProductDetails;
