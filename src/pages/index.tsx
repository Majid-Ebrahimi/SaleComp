import { mockData } from "@/data/graphics";
import ProductCard from "@/views/cards/product-card/ProductCard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  AppBar,
  Box,
  Button,
  Grid,
  List,
  Tab,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

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

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box display={"inline-block"} dir="rtl">
      <AppBar sx={{ backgroundColor: "rgba(0, 141, 187)" }} position="fixed">
        <Grid sx={{ backgroundColor: "white" }}>
          <Typography
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
          <Grid item>
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
                if (e.relatedTarget === null) {
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
                setProductListData([...mockData.cpuList]);
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null) {
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
                // setProductListData([...mockData.cpuList]);
              }}
              onBlur={(e) => {
                if (e.relatedTarget === null) {
                  e.target.focus();
                }
              }}
            >
              حافظه SSD
            </CustomButton>
          </Grid>
        </Grid>
      </AppBar>
      <center>
        <List sx={{ flexWrap: "wrap", mt: 17 }}>
          {productListData.map((item) => {
            return (
              <ProductCard
                key={item.id}
                image={item.image_url}
                name={item.name}
                price={item.price}
                rating={item.rating}
                freeDelivery={item.freeDelivery}
                onClick={() => {
                  console.log(item.name);
                }}
              />
            );
          })}
        </List>
      </center>
    </Box>
  );
}
