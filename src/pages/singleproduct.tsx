import DefaultLayout from "../components/layout/DefaultLayout";
import { Link, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useProduct } from "../../hooks/useProduct";
import { Bounce } from "react-activity";
import {
  CategoryInterface,
  ProductInterface,
} from "../../interfaces/ProductInterface";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SingleProduct() {
  const [productDetails, setProductDetails] = useState<ProductInterface | null>(
    null
  );

  const { id } = useParams();

  console.log(id);

  const { getProductById, isSingleProductLoading } = useProduct();

  const fetchSingleProduct = async () => {
    const response = await getProductById(id!!);

    console.log("Response", response.data.result);

    if (response.data.status == 200) {
      setProductDetails(response.data.result);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  let sliderRef = useRef<any>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <FaAngleRight color="black" />,
    prevArrow: <FaAngleLeft color="black" />,
  };

  return (
    <DefaultLayout>
      {isSingleProductLoading && (
        <div className="text-center h-[calc(100vh-65px)] w-full flex justify-center items-center">
          <Bounce />
        </div>
      )}
      {productDetails && (
        <>
          <div className="mx-10 xl:mx-[140px] my-10 flex flex-col md:flex-row gap-24 items-center">
            <div className="w-full md:w-1/2">
              <Slider ref={sliderRef} {...settings}>
                {productDetails?.pictures.map((picture) => (
                  <div>
                    <img
                      src={picture}
                      className="h-[400px] w-[400px] mx-auto rounded-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div>
                {productDetails &&
                  (productDetails?.categories as CategoryInterface[]).map(
                    (c) => (
                      <div className="bg-[#ccc] px-2 text-black inline-block rounded-xl text-[10px] font-bold">
                        {c.name}
                      </div>
                    )
                  )}
              </div>
              <div>
                {/* <div className="text-[10px]">Sizes available:</div> */}
                <div className="flex gap-2">
                  {productDetails &&
                    productDetails?.sizeAndColor.map((s) => (
                      <div className="px-4 py-1 text-primary inline-block text-[14px] rounded-xl font-bold border border-primary border border-2 border-solid border-primary">
                        {s.color} ({s.size})
                      </div>
                    ))}
                </div>
              </div>
              <div className="font-bold text-[40px]">
                {productDetails?.productName}
              </div>
              <div>
                <div className="font-bold text-[25px]">
                  N{formatCurrency(productDetails?.cost as number)}
                </div>
                <div className={`flex gap-4 mt-4`}>
                  <Link
                    to="/product"
                    className="bg-primary text-white w-full text-center py-2 rounded-xl font-bold"
                  >
                    Add to Cart
                  </Link>
                  {/* <Link
                to="/product"
                className="border border-2 border-solid border-primary text-primary w-full text-center py-2 rounded-xl font-bold"
              >
                View
              </Link> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-10 xl:mx-[140px] my-20">
            <div className="font-bold">Description</div>
            <div>{productDetails.description}</div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}
