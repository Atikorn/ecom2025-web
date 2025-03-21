import React, { useEffect, useState } from "react";
import { listproductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    listproductBy("sold", "desc", 12)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  // console.log(data);
  return (
    <SwiperShowProduct>
      {data?.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductCard item={item} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default BestSeller;
