import { MockProduct, Product } from "@/models";
import ProductCard from "@/views/cards/product-card/ProductCard";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, ButtonBase, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { inherits } from "util";
import { Container } from "@mui/joy";
/* 
interface Props {
  productData?: MockProduct;
} */

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
    <Box>
      {data ? (
        <Box
          // display={"flex"}
          sx={{
            p: 2,
            maxWidth: 600,
            width: "90%",
            // flexGrow: 1,
            backgroundColor: "inherit",
            // Todo: set DarkMode
            /* backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff", */
          }}
        >
          <Grid
            container
            spacing={2}
            direction="row"
            display={"flex"}
            justifyContent={"space-around"}
          >
            <Grid display={"inline"}>
              <Grid
                style={{
                  width: "400px",
                  height: "300px",
                  position: "relative",
                }}
              >
                <Image
                  loader={() => data.thumbnail}
                  alt={data?.title}
                  src={data?.thumbnail}
                  fill
                  unoptimized
                  sizes="(max-width: 400px) 50vw, 100vw"
                  style={{
                    objectFit: "contain",
                  }}
                  loading="lazy"
                />
              </Grid>
              {/*  <Image
                alt={data.brand}
                src={data.images[0]}
                width={50}
                height={50}
                unoptimized
              ></Image>
              <Image
                alt={data.brand}
                src={data.images[1]}
                width={50}
                height={50}
                unoptimized
              ></Image>
              <Image
                alt={data.brand}
                src={data.images[2]}
                width={50}
                height={50}
                unoptimized
              ></Image>
              <Image
                alt={data.brand}
                src={data.images[3]}
                width={50}
                height={50}
                unoptimized
              ></Image> */}
            </Grid>
            <Grid
              display={"inline"}
              container
              direction="column"
              spacing={2}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "3px",
                boxShadow: "0px 0px 10px #00000080",
              }}
            >
              <Grid>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {data.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.rating}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body2">
                  {data.discountPercentage}%
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle1" component="div">
                  {data.price * 500000}تومان
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>somethings wrong!!!</div>
      )}
    </Box>
  );
};

export default ProductDetails;
