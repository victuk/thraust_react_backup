import OtherPageHeader from "../components/OtherPageHeader";
import DefaultLayout from "../components/layout/DefaultLayout";
import Products from "../components/products/Products";
import { Link, useLocation } from "react-router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useCategory } from "../../hooks/useCategory";
import { CategoryInterface } from "../../interfaces/ProductInterface";

export default function OurProducts() {
  let sliderRef = useRef<any>(null);

  const [allCategories, setAllCategories] = useState<CategoryInterface[]>([]);

  const { getAllCategories } = useCategory();

  const fetchCategories = async () => {
    const response = await getAllCategories();

    console.log(response.data.result);
    setAllCategories(response.data.result);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const loc = useLocation();

  const categoryId = loc.search.split("=")[1];

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
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <FaAngleRight color="black" />,
    prevArrow: <FaAngleLeft color="black" />,
  };

  return (
    <DefaultLayout>
      <OtherPageHeader header="Products" />

      <div className="flex w-full gap-1 xl:gap-4 py-10 items-center">
        <Slider
          ref={sliderRef}
          {...settings}
          className="w-[85%] lg:w-[90%] mx-auto"
        >
          <Link to={`/products?category=all`} key={0}>
            <div className="px-1 md:px-2 xl:px-4 bg-white">
              <div
                className={`justify-center text-center items-center flex gap-4 font-bold w-full py-4 rounded-lg ${
                  categoryId == "all"
                    ? "text-white bg-primary"
                    : "text-primary bg-[#eee]"
                }`}
              >
                All
              </div>
            </div>
          </Link>
          {allCategories.map((cat, index: number) => (
            <Link to={`/products?category=${cat._id}`} key={index + 1}>
              <div className="px-1 md:px-2 xl:px-4 bg-white">
                <div
                  className={`justify-center text-center items-center flex gap-4 font-bold w-full py-4 rounded-lg ${
                    categoryId == cat._id
                      ? "text-white bg-primary"
                      : "text-primary bg-[#eee]"
                  }`}
                >
                  {/* <cat.icon /> */}
                  {cat.name[0].toLocaleUpperCase() + cat.name.slice(1)}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>

      <div className="mx-10 xl:mx-[140px] my-10">
        <Products showPageControl={true} category={categoryId} />
      </div>
    </DefaultLayout>
  );
}
