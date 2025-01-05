import DefaultLayout from "../components/layout/DefaultLayout";
import { sampleProducts } from "../../db";
import { Link } from "react-router";
import { useRef } from "react";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function SingleProduct() {
  const product = sampleProducts[0];

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
      <div className="mx-10 xl:mx-[140px] my-10 flex gap-24 items-center">
        <div className="w-1/2">
          <Slider ref={sliderRef} {...settings}>
            <div>
              <img
                src={product.picture}
                className="h-[400px] w-[400px] mx-auto"
              />
            </div>
            <div>
              <img
                src={product.picture}
                className="h-[400px] w-[400px] mx-auto"
              />
            </div>
            <div>
              <img
                src={product.picture}
                className="h-[400px] w-[400px] mx-auto"
              />
            </div>
            <div>
              <img
                src={product.picture}
                className="h-[400px] w-[400px] mx-auto"
              />
            </div>
          </Slider>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <div>
            {product.categories.map((c) => (
              <div className="bg-[#ccc] px-2 text-black inline-block rounded-xl text-[10px] font-bold">
                {c}
              </div>
            ))}
          </div>
          <div>
            {/* <div className="text-[10px]">Sizes available:</div> */}
            <div className="flex gap-1">
              {product.sizesAvailable.map((s) => (
                <div className="bg-primary px-2 text-white inline-block text-[14px] rounded-md font-bold">
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="font-bold text-[40px]">{product.name}</div>
          <div>
            <div className="font-bold text-[25px]">N{product.cost}</div>
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
        <div>{product.description}</div>
      </div>
    </DefaultLayout>
  );
}
