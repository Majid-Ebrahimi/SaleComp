import { MockProduct, Product } from "@/models";
import ProductCard from "@/views/cards/product-card/ProductCard";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { inherits } from "util";
import { Container } from "@mui/joy";
import PriceTypography from "@/components/price-typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomSubtitleProps {
  subjectText: string;
  contentText: string | number;
}
const CustomSubtitle = (props: CustomSubtitleProps) => {
  return (
    <Typography color={"#2C2C34"} variant="body2" marginBottom={1}>
      <span style={{ color: "#2889A9" }}>{props.subjectText}:</span>{" "}
      {props.contentText}
    </Typography>
  );
};

const ProductDetails = () => {
  const router = useRouter();

  const { isFetching, error, data, isLoading } = useQuery<Product>({
    queryFn: async () =>
      (await axios.get(`https://dummyjson.com/products/${router.query.id}`))
        .data,
    queryKey: ["products"],
    retry: false,
  });

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {data ? (
        <>
          <Grid item>
            <Box
              sx={{
                position: "relative",
                height: 300,
                width: 300,
              }}
            >
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
                mx: 6,
                maxWidth: 500,
                maxHeight: 500,
                minHeight: 400,
                border: "1px solid #B9BBBE",
                borderRadius: "3px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.50)",
              }}
            >
              <Grid item>
                <center>
                  <Typography gutterBottom variant="h6">
                    {data.title}
                  </Typography>
                </center>
                <Typography variant="body1" marginBottom={2}>
                  مشخصات
                </Typography>
                <CustomSubtitle contentText={data.brand} subjectText="برند" />
                <CustomSubtitle
                  contentText={data.category}
                  subjectText="دسته یندی"
                />
                <CustomSubtitle
                  contentText={data.stock}
                  subjectText="تعداد موجودی"
                />
                <CustomSubtitle
                  contentText={data.rating}
                  subjectText="امتیاز"
                />

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
                    subjectText="توضیحات"
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
                <PriceTypography
                  sx={{
                    px: 4,
                    my: 2,
                  }}
                  price={data.price}
                />
                <Button
                  sx={{
                    borderRadius: "3px",
                    backgroundColor: "#00C0FF",
                    px: 4,
                  }}
                  onClick={() => {
                    toast.success(
                      `با موفقیت به سبد خرید اضافه شد ${data.title}`,
                      {
                        position: "top-left",
                      }
                    );
                  }}
                  variant="contained"
                >
                  افزودن به سبد خرید
                </Button>
                <ToastContainer />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <div>somethings wrong!!!</div>
      )}
    </Grid>
  );
};

export default ProductDetails;
