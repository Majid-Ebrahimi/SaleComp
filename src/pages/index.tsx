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
export default function Home() {
  const [category, setCategory] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [searchItemValue, setSearchItemValue] = useState("");
  const [productListData, setProductListData] = useState<Product[] | undefined>(
    loadingState
  );

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
    // retry: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setProductListData(data?.products);
  }, [data]);

  useEffect(() => {
    setProductListData(searchedData?.products);
  }, [searchItem, searchedData]);

  const handleSearch = (value: string) => {
    setSearchItemValue(value);
  };
  const handleSubmit = async () => {
    console.log(searchItemValue);
    if (searchItemValue === "") {
      setProductListData(data?.products);
    } else {
      await setSearchItem(searchItemValue);
      searchedDataRefetch();
      setProductListData(searchedData?.products);
    }
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
              <Grid sx={{ my: 1, mx: 2 }}>
                <NavigationMenu setCategory={setCategory} />
              </Grid>
            </Grid>
            <Grid item sx={{ my: 1 }}>
              <TextField
                sx={{ mx: 2 }}
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
            </Grid>
          </Grid>
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
