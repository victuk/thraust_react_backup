import { useRef } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";

export default function HeroComponent() {
  let sliderRef = useRef<any>(null);

  const navigate = useNavigate();

  const swiperSlideStyle =
    "h-[calc(100vh_-_65px)] flex flex-col lg:flex-row items-center text-center lg:text-left px-10 xl:px-[140px] bg-[rgba(0,_0,_255,_0.1)] gap-10";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    nextArrow: <></>,
    prevArrow: <></>
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      <div>
        <section id="home" className={swiperSlideStyle}>
          <div>
            <div className="flex flex-col gap-4 items-start">
              <div className="text-[35px] lg:text-[60px] font-bold text-primary mt-20 lg:mt-0">
                Thraust Your Confidence
              </div>
              <div className="text-[20px] lg:text-[35px]">
                Discover the latest trends and must-haves from Thraust, your
                ultimate destination for stylish clothing.
              </div>
              <div className="w-full">
                <button
                  className="text-white bg-primary mx-auto lg:mr-auto font-bold px-10 py-4 rounded-xl"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Shop Our Collections
                </button>
              </div>
            </div>
          </div>
          <img src="2.png" className="h-full" />
        </section>
      </div>

      <div>
        <section id="home" className={swiperSlideStyle}>
          <div>
            <div className="flex flex-col gap-4 items-start">
              <div className="text-[60px] font-bold text-primary">
                Thraust Your Confidence
              </div>
              <div className="text-[35px]">
                Discover the latest trends and must-haves from Thraust, your
                ultimate destination for stylish clothing.
              </div>
              <button
                className="text-white bg-primary font-bold px-10 py-4 rounded-xl"
                onClick={() => {
                  navigate("/products");
                }}
              >
                Shop Our Collections
              </button>
            </div>
          </div>
          <img src="3.png" className="h-full" />
        </section>
      </div>
    </Slider>
  );
}
