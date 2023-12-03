import { mockData } from "@/data/MockData";
import { Jura } from "next/font/google";
import ProductCard from "@/views/cards/product-card/ProductCard";
import { AppBar, Button, Grid, List, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Product, ProductList } from "@/models";
import { LoadingButton } from "@mui/lab";

const jura = Jura({
  subsets: ["latin"],
  display: "swap",
});

const CustomButton = styled(Button)({
  boxShadow: "none",
  color: "inherit",
  marginBottom: "7px",
  fontSize: 20,
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#007aaa",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#018Dba",
  },
  "&:focus": {
    backgroundColor: "#00A6DD",
    borderRadius: "3px",
    height: "52px",
    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.50)",
  },
});

export default function Home() {
  const [category, setCategory] = useState("");
  const loadingState: any[] = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };
  const router = useRouter();

  const getProductByCategory = async (category = "") => {
    return (
      await axios.get(
        `https://dummyjson.com/products${category}/?skip=0&limit=100`
      )
    ).data;
  };

  const { isFetching, error, data, isLoading } = useQuery<ProductList>({
    queryFn: () => getProductByCategory(category),
    queryKey: ["products", category],
    retry: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setProductListData(data?.products);
  }, [data]);

  const [productListData, setProductListData] = useState<Product[] | undefined>(
    loadingState
  );

  return (
    <Grid
      container
      display={"inline-block"}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <AppBar sx={{ backgroundColor: "rgba(0, 141, 187)" }} position="fixed">
        <Grid sx={{ backgroundColor: "white" }}>
          <Typography
            className={jura.className}
            sx={{
              color: "#2889A9",
              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              mx: "7%",
              my: 2,
            }}
          >
            SaleComp
          </Typography>
        </Grid>
        <Grid
          maxHeight={50}
          overflow={"visible"}
          container
          direction="row"
          justifyContent="space-evenly"
        >
          <Grid sx={{ p: 1 }} item>
            <Typography color={"inherit"} variant="h5">
              محصولات
            </Typography>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                setCategory("");
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              همه ی محصولات
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                setCategory("/category/smartphones");
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              تلفن همراه
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                setCategory("/category/laptops");
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              لپتاپ
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                setCategory("/category/mens-watches");
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              ساعت مچی مردانه
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                setCategory("/category/sunglasses");
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              عینک آفتابی
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                setCategory("/category/womens-watches");
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              ساعت مچی زنانه
            </CustomButton>
          </Grid>
        </Grid>
      </AppBar>
      <List sx={{ flexWrap: "wrap", mt: 17 }}>
        <center>
          {error ? (
            <div>Error</div>
          ) : isFetching || isLoading ? (
            loadingState.map(() => {
              // eslint-disable-next-line react/jsx-key
              return <ProductCard isLoading />;
            })
          ) : (
            productListData?.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  image={item.thumbnail}
                  name={item.title}
                  price={item.price}
                  rating={item.rating}
                  freeDelivery={true}
                  onClick={() =>
                    router.push({
                      pathname: "/product-details",
                      query: {
                        category: category,
                        key: item.id,
                        shallow: true,
                      },
                    })
                  }
                />
              );
            })
          )}
        </center>
      </List>
    </Grid>
  );
}
