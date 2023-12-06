import { mockData } from "@/data/MockData";
import { Jura } from "next/font/google";
import ProductCard from "@/views/cards/product-card/ProductCard";
import {
  AppBar,
  Button,
  Grid,
  List,
  Slide,
  TextField,
  Typography,
  useScrollTrigger,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Product, ProductList } from "@/models";
import { LoadingButton } from "@mui/lab";
import NavigationMenu from "@/components/navigation-menu";

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

interface HideOnScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Home() {
  const [category, setCategory] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [searchItemValue, setSearchItemValue] = useState("");

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

  /* const handleChangeCategory = (category: string) => {
    setCategory(category);
  }; */
  const router = useRouter();

  const getProductByCategory = async (category = "") => {
    return (
      await axios.get(
        `https://dummyjson.com/products${category}/?skip=0&limit=100`
      )
    ).data;
  };

  const {
    isFetching: isSearchingFetch,
    error: searchError,
    data: searchedData,
    isLoading: isSearchingLoad,
    refetch: searchedDataRefetch,
  } = useQuery<ProductList>({
    queryFn: async () =>
      (await axios.get(`https://dummyjson.com/products/search?q=${searchItem}`))
        .data,
    queryKey: ["searchedProducts"],
    retry: false,
    enabled: false,
    placeholderData: keepPreviousData,
  });

  const { isFetching, error, data, isLoading } = useQuery<ProductList>({
    queryFn: () => getProductByCategory(category),
    queryKey: ["products", category],
    retry: false,
    placeholderData: keepPreviousData,
  });

  const {
    isFetching: categoriesIsFetching,
    error: categoriesError,
    data: categoriesData,
    isLoading: categoriesIsLoading,
  } = useQuery<Product["category"][] | undefined[]>({
    queryFn: async () =>
      (await axios.get(`https://dummyjson.com/products/categories`)).data,
    queryKey: ["categories"],
    retry: false,
  });

  useEffect(() => {
    setProductListData(data?.products);
  }, [data]);

  useEffect(() => {
    setProductListData(searchedData?.products);
  }, [searchItem, searchedData]);

  const [productListData, setProductListData] = useState<Product[] | undefined>(
    loadingState
  );

  const handleSearch = (value: string) => {
    setSearchItemValue(value);
  };
  const handleSubmit = async () => {
    await setSearchItem(searchItemValue);
    setProductListData(searchedData?.products);
  };

  return (
    <Grid
      container
      display={"inline-block"}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <HideOnScroll>
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
              <NavigationMenu
                categories={categoriesData}
                setCategory={setCategory}
              />
            </Grid>
            <Grid item>
              <form style={{ margin: "5px 0 0 5%" }}>
                <TextField
                  value={searchItemValue}
                  label="search"
                  variant="outlined"
                  size="small"
                  type="text"
                  placeholder="iphone..."
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <LoadingButton
                  variant="contained"
                  onClick={handleSubmit}
                  loading={isSearchingFetch || isSearchingLoad}
                >
                  search
                </LoadingButton>
              </form>
            </Grid>
          </Grid>

          {/* <Grid
            sx={{ backgroundColor: "rgba(0, 141, 187)" }}
            maxHeight={50}
            overflow={"visible"}
            container
            direction="row"
            justifyContent="space-evenly"
          >
            <NavigationMenu
              categories={categoriesData}
              setCategory={setCategory}
            />
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
                  if (
                    e.relatedTarget === null ||
                    e.relatedTarget.id === "card"
                  ) {
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
                  if (
                    e.relatedTarget === null ||
                    e.relatedTarget.id === "card"
                  ) {
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
                  if (
                    e.relatedTarget === null ||
                    e.relatedTarget.id === "card"
                  ) {
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
                  if (
                    e.relatedTarget === null ||
                    e.relatedTarget.id === "card"
                  ) {
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
                  if (
                    e.relatedTarget === null ||
                    e.relatedTarget.id === "card"
                  ) {
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
                  if (
                    e.relatedTarget === null ||
                    e.relatedTarget.id === "card"
                  ) {
                    e.target.focus();
                  }
                }}
              >
                ساعت مچی زنانه
              </CustomButton>
            </Grid>
          </Grid> */}
        </AppBar>
      </HideOnScroll>
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
                        id: item.id,
                        category: item.category,
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
