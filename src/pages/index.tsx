import { mockData } from "@/data/MockData";
import { Jura } from "next/font/google";

import FooterCard from "@/views/cards/footer-card/FooterCard";
import ProductCard from "@/views/cards/product-card/ProductCard";
import { AppBar, Button, Grid, List, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { useState } from "react";

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
  const initialState: any[] = [];
  const [productListData, setProductListData] = useState<any[]>(initialState);

  const [test, setTest] = useState(true);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      display={"inline-block"}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ direction: "rtl" }}
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
                await setProductListData(initialState);
                setProductListData([...mockData.graphicList]);
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              کارت گرافیک
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                await setProductListData(initialState);
                setProductListData([...mockData.mainBoardList]);
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              مادربورد
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                await setProductListData(initialState);
                setProductListData([...mockData.cpuList]);
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              پردازنده
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={async () => {
                await setProductListData(initialState);
                setProductListData([...mockData.ramList]);
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null || e.relatedTarget.id === "card") {
                  e.target.focus();
                }
              }}
            >
              رم کامپیوتر
            </CustomButton>
          </Grid>
        </Grid>
      </AppBar>
      <List sx={{ flexWrap: "wrap", mt: 17 }}>
        <center>
          {productListData.map((item) => {
            return (
              <ProductCard
                key={item.random_key}
                image={item.image_url}
                name={item.name1}
                price={item.price}
                rating={item.rating}
                freeDelivery={item.isFreeDelivery}
                onClick={() => {
                  console.log(item.name2);
                  setTest(true);
                }}
              />
            );
          })}
        </center>
      </List>
      <Grid item alignSelf={"start"}>
        <FooterCard />
        {/*           <Typography variant="h3">
            سلامت کارت گرافیک یب hiiii hello how are you
          </Typography> */}
      </Grid>
    </Grid>
  );
}
