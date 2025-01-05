import OtherPageHeader from "../components/OtherPageHeader";
import DefaultLayout from "../components/layout/DefaultLayout";
import Products from "../components/products/Products";
import { sampleProductCategories, sampleProducts } from "../../db";
import { Link } from "react-router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import Slider from "react-slick";

export default function OurProducts() {
  let sliderRef = useRef<any>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <FaAngleRight color="black" />,
    prevArrow: <FaAngleLeft color="black" />,
  };

  return (
    <DefaultLayout>
      <OtherPageHeader header="Products" />

      <div className="flex w-full gap-1 xl:gap-4 py-10 items-center">
        <Slider ref={sliderRef} {...settings} className="w-[85%] lg:w-[90%] mx-auto">
          {sampleProductCategories.map((cat, index: number) => (
            <div className="px-1 md:px-2 xl:px-4 bg-white">
              <div
                className="justify-center text-center items-center flex gap-4 font-bold w-full py-4 text-primary rounded-lg bg-[#eee]"
                key={index}
              >
                <cat.icon />
                <Link to={`/products?category=${cat.name}`}>
                  {cat.name[0].toLocaleUpperCase() + cat.name.slice(1)}
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="mx-10 xl:mx-[140px] my-10">
        <Products products={sampleProducts} />
      </div>
    </DefaultLayout>
  );
}
