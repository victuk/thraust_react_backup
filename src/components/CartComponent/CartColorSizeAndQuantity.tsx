import React from "react";
import { SizeAndColor } from "../../../store/cartStore";

export default function CartColorSizeAndQuantity({
  color,
  quantity,
  size,
}: SizeAndColor) {
  return (
    <div className="flex gap-2 border border-primary py-2 px-4 rounded-md text-primary font-bold mt-2">
      <div className="text-center">
          <div>{color}</div>
          <div className="text-[10px] font-thin">Color</div>
      </div>
      <div className="text-center">
        <div>{size}</div>
        <div className="text-[10px] font-thin">Size</div>
      </div>
      <div className="text-center">
        <div>{quantity}</div>
        <div className="text-[10px] font-thin">Quantity</div>
      </div>
    </div>
  );
}
