import { mockGraphicsData } from "@/data/graphics";
import { Product, ProductList } from "@/models";
import ProductCard from "@/views/cards/product-card/ProductCard";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { dir } from "console";
import Image from "next/image";

/* const mockLaptopData: ProductList = {productList: [
{
  freeDelivery: true,
  id: 1,
  image: 'https://dkstatics-public.digikala.com/digikala-products/0b5f4468a6ae87164378a8591d3061ae7fa6fbee_1660571719.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
  name: 'رم دسکتاپ DDR4 تک کاناله 3200 مگاهرتز CL22 کروشیال مدل CT8G4DFRA32A ظرفیت 8 گیگابایت  ',
  price: '۹۳۵,۰۰۰'

}

]} ; */

const testData = mockGraphicsData.graphicList;

export default function Home() {
  return (
    <Box dir="rtl">
      <Grid>
        <Typography>SaleComp</Typography>
      </Grid>
      <AppBar position="static">
        <Grid container spacing={5}>
          <Grid item>
            <Button variant="contained">test</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">test1</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">test2</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">test3</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">test4</Button>
          </Grid>
        </Grid>
      </AppBar>
      <Grid>
        <List sx={{ display: "flex", flexWrap: "wrap" }}>
          {mockGraphicsData.graphicList.map((item) => {
            return (
              <ProductCard
                key={item.id}
                image={item.image_url}
                name={item.name}
                price={item.price}
                rating={item.rating}
                freeDelivery={item.freeDelivery}
              />
            );
          })}
        </List>
      </Grid>
    </Box>
  );
}
