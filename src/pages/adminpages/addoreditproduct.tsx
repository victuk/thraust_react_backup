import { useCallback, useEffect, useState } from "react";
import AdminDasboardLayout from "../../components/layout/AdminDasboardLayout";
import { useCategory } from "../../../hooks/useCategory";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { IoClose } from "react-icons/io5";

interface SizeAndColor {
  id: string;
  size: string;
  color: string;
}

export default function AdminAddOrEdit() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [cost, setCost] = useState("");
  const [categories, setCategories] = useState([]);
  const [forType, setForType] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [isNumericSize, setNumericSize] = useState(false);
  const [color, setColor] = useState("");
  const [sizeAndColor, setSizeAndColor] = useState<SizeAndColor[]>([]);

  const toggleForType = (val: string) => {
    if (forType.includes(val)) {
      setForType(forType.filter((s) => s != val));
    } else {
      setForType(forType.concat(val));
    }
  };

  const { getAllCategories } = useCategory();

  const [allCategories, setAllCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await getAllCategories();

    console.log(response.data.result);
    setAllCategories(response.data.result);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addSizeAndColor = () => {
    if (!size || !color) {
      toast.error("Size and color values are required!");
      return;
    }

    setSizeAndColor(
      sizeAndColor.concat({ id: v4(), size, color: color.toLocaleUpperCase() })
    );
    setSize("");
    setColor("");
  };

  const removeColor = useCallback(
    (id: string) => {
      setSizeAndColor(sizeAndColor.filter((s) => s.id != id));
    },
    [sizeAndColor]
  );

  return (
    <AdminDasboardLayout header="Add or edit" showSearch={false}>
      <div className="flex gap-10">

        <div className="w-full flex flex-col gap-4">
        <div className="font-bold text-[20px]">Product Details</div>
          <div className="flex flex-col">
            <label className="text-[14px]">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              placeholder="E.g T-shirt"
              className="border border-2 border-solid border-primary py-2 px-4 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px]">Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="E.g Here is a really nice product"
              className="border border-2 border-solid border-primary py-2 px-4 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px]">Cost</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
              placeholder="E.g johndoe@gmail.com"
              className="border border-2 border-solid border-primary py-2 px-4 rounded-md"
            />
          </div>

              <div>
              <div className="font-bold text-[20px]">Categories</div>

              <div>
                {/* {allCategories.map((c, index) => (
                  <div></div>
                ))} */}
              </div>

              </div>

        </div>
        <div className="w-full flex flex-col gap-4">

        <div>
            <div className="font-bold text-[20px]">Product Type</div>

            <div>
              <div>
                <input
                  type="checkbox"
                  checked={forType.includes("men")}
                  onChange={() => {
                    toggleForType("men");
                  }}
                />{" "}
                For men
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={forType.includes("women")}
                  onChange={() => {
                    toggleForType("women");
                  }}
                />{" "}
                For women
              </div>
            </div>
          </div>

          <div className="font-bold text-[20px]">Size and Color</div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isNumericSize}
              onClick={() => {
                setNumericSize(!isNumericSize);
              }}
            />
            <label className="text-[14px]">Numeric Size</label>
          </div>

          {isNumericSize ? (
            <div className="flex flex-col">
              <label className="text-[14px]">Size in number</label>
              <input
                type="text"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                placeholder="E.g 2"
                className="border border-2 border-solid border-primary py-2 px-4 rounded-md"
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="text-[14px]">Size</label>
              <select
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                className="border border-2 border-solid border-primary py-2 px-4 rounded-md"
              >
                <option value="">Select Color</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-[14px]">Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              placeholder="E.g johndoe@gmail.com"
              className="border border-2 border-solid border-primary py-2 px-4 rounded-md"
            />
          </div>

          <button
            onClick={addSizeAndColor}
            className="text-white bg-primary p-2 rounded-xl"
          >
            Add Size And Color
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {sizeAndColor.map((val, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-2 border-solid border-blue flex items-center justify-between"
              >
                <div>
                  <div>Size: {val.size}</div>
                  <div>Color: {val.color}</div>
                </div>
                <button>
                  <IoClose
                    color="red"
                    onClick={() => {
                      removeColor(val.id);
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[80px] text-center">
        <button className="text-white bg-primary py-2 px-8 rounded-xl font-bold">
          Upload Product
        </button>
      </div>
    </AdminDasboardLayout>
  );
}
