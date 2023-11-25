import { mockGraphicsData } from "@/data/graphics";
import ProductCard from "@/views/cards/product-card/ProductCard";
import {
  AppBar,
  Box,
  Button,
  Grid,
  List,
  Typography,
  styled,
} from "@mui/material";
import toast from "react-hot-toast";

const CustomButton = styled(Button)({
  boxShadow: "none",
  color: "inherit",
  textTransform: "none",
  fontSize: 20,
  lineHeight: 1.5,
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
    borderBottom: "3px solid #D0F3FF",
    fontSize: 22,
  },
});

export default function Home() {
  return (
    <Box display={"inline-block"} dir="rtl">
      <Grid>
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
      <AppBar sx={{ backgroundColor: "#008DBB" }} position="sticky">
        <Grid
          container
          justifyContent={"center"}
          display={"flex"}
          spacing={30}
          sx={{ p: 0.5 }}
        >
          <Grid item>
            <Typography color={"inherit"} variant="h5">
              محصولات
            </Typography>
          </Grid>
          <Grid item>
            <CustomButton>کارت گرافیک</CustomButton>
          </Grid>
          <Grid item>
            <CustomButton>پردازنده</CustomButton>
          </Grid>
          <Grid item>
            <CustomButton>حافظه SSD</CustomButton>
          </Grid>
        </Grid>
      </AppBar>
      <center>
        <List sx={{ flexWrap: "wrap" }}>
          {mockGraphicsData.graphicList.map((item) => {
            return (
              <ProductCard
                key={item.id}
                image={item.image_url}
                name={item.name}
                price={item.price}
                rating={item.rating}
                freeDelivery={item.freeDelivery}
                onClick={() => {
                  toast(item.name);
                  console.log("hiiii");
                }}
              />
            );
          })}
        </List>
      </center>
    </Box>
  );
}
