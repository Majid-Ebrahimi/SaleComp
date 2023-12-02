import { Product } from "@/models";
import ProductCard from "@/views/cards/product-card/ProductCard";
import { mockData } from "@/data/MockData";
import { useRouter } from "next/router";

interface Props {
  productData?: Product;
}

const ProductDetails = (props: Props) => {
  const router = useRouter();
  let filteredData;
  if (router.query.category == "graphic") {
    filteredData = mockData.graphicList.filter(
      (i) => i.random_key === router.query.key
    );
  } else if (router.query.category == "ram") {
    filteredData = mockData.ramList.filter(
      (i) => i.random_key === router.query.key
    );
  } else if (router.query.category == "cpu") {
    filteredData = mockData.cpuList.filter(
      (i) => i.random_key === router.query.key
    );
  } else if (router.query.category == "mainBoard") {
    filteredData = mockData.mainBoardList.filter(
      (i) => i.random_key === router.query.key
    );
  }

  return (
    <div>
      {!!filteredData ? (
        <ProductCard
          key={filteredData[0].random_key}
          image={filteredData[0].image_url}
          name={filteredData[0].name1}
          price={filteredData[0].price}
          rating={filteredData[0].rating}
          freeDelivery={filteredData[0].isFreeDelivery}
          onClick={() => {}}
        />
      ) : (
        <div>something wrong!!!</div>
      )}
    </div>
  );

  {
    true ? <div></div> : <div></div>;
  }
};

export default ProductDetails;
