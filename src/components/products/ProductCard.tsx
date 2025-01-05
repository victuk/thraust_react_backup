import { useState } from "react";
import { ProductInterface } from "../../../interfaces/ProductInterface";
import { Link, useNavigate } from "react-router";

interface ProductCardInterface extends ProductInterface {
  isAdmin: boolean;
}

export default function ProductCard({
  name,
  description,
  picture,
  categories,
  sizesAvailable,
  cost,
  isAdmin,
}: ProductCardInterface) {
  const [isHovered, setHovered] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col gap-2 border border-2 border-white hover:border-[#eee] border-solid p-2 rounded-xl"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        className="w-full h-[400px] flex justify-center items-center"
        onClick={() => {
          if (isAdmin == false) {
            navigate("/product/1");
          }
        }}
      >
        <img src={picture} alt={name} className="w-[400px] h-[320px]" />
      </div>
      <div>
        {categories.map((c) => (
          <div className="bg-[#ccc] px-2 text-black inline-block rounded-xl text-[10px] font-bold">
            {c}
          </div>
        ))}
      </div>
      <div>
        {/* <div className="text-[10px]">Sizes available:</div> */}
        <div className="flex gap-1">
          {sizesAvailable.map((s) => (
            <div className="border border-2 border-solid border-primary px-2 text-primary inline-block text-[14px] rounded-md font-bold">
              {s}
            </div>
          ))}
        </div>
      </div>
      <div
        className="font-bold text-[20px]"
        onClick={() => {
          if (isAdmin == false) {
            navigate("/product/1");
          }
        }}
      >
        {name}
      </div>
      <p>{description}</p>
      <div>
        <div className="text-[10px]">Cost:</div>
        <div className="font-bold">N{cost}</div>
      </div>

      {isAdmin ? (
        <div className={`flex flex-col gap-2`}>
        <button className="border border-2 border-solid border-primary text-primary w-full text-center py-2 rounded-xl font-bold">
          Edit
        </button>
        <Link
          to="/product/1"
          className="border border-2 border-solid border-[red] text-[red] w-full text-center py-2 rounded-xl font-bold"
        >
          Delete
        </Link>
      </div>
      ) : (
        <div
          className={`${
            isHovered ? "md:opacity-1" : "md:opacity-0"
          } opacity-1 flex flex-col gap-2`}
        >
          <button className="bg-primary text-white w-full text-center py-2 rounded-xl font-bold">
            Add to Cart
          </button>
          <Link
            to="/product/1"
            className="border border-2 border-solid border-primary text-primary w-full text-center py-2 rounded-xl font-bold"
          >
            View
          </Link>
        </div>
      )}
    </div>
  );
}
