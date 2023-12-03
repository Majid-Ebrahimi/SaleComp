import { MockProduct } from "@/models";
import ProductCard from "@/views/cards/product-card/ProductCard";
import { mockData } from "@/data/MockData";
import { useRouter } from "next/router";

interface Props {
  productData?: MockProduct;
}

const ProductDetails = (props: Props) => {
  const router = useRouter();
  let filteredData;
  if (router.query.category == "graphic") {
    filteredData = mockData.graphicList.find(
      (i) => i.random_key === router.query.key
    );
  } else if (router.query.category == "ram") {
    filteredData = mockData.ramList.find(
      (i) => i.random_key === router.query.key
    );
  } else if (router.query.category == "cpu") {
    filteredData = mockData.cpuList.find(
      (i) => i.random_key === router.query.key
    );
  } else if (router.query.category == "mainBoard") {
    filteredData = mockData.mainBoardList.find(
      (i) => i.random_key === router.query.key
    );
  }

  console.log(filteredData);

  return (
    <div>
      {!!filteredData ? (
        <ProductCard
          key={filteredData.random_key}
          image={filteredData.image_url}
          name={filteredData.name1}
          price={filteredData.price}
          rating={filteredData.rating}
          freeDelivery={filteredData.isFreeDelivery}
          onClick={() => {}}
        />
      ) : (
        <div>somethings wrong!!!</div>
      )}
    </div>
  );
};

export default ProductDetails;
