import { useCallback, useEffect, useState } from "react";
import AdminDasboardLayout from "../../components/layout/AdminDasboardLayout";
import { useCategory } from "../../../hooks/useCategory";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { IoClose } from "react-icons/io5";
import { useFileUpload } from "../../../hooks/useFileUploads";
import { useProduct } from "../../../hooks/useProduct";
import { Bounce } from "react-activity";
import { errorHandler } from "../../../utils/errorHandler";
import { useLocation } from "react-router";

interface SizeAndColor {
  id: string;
  size: string;
  color: string;
}

interface CategoryInterface {
  _id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function AdminAddOrEdit() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [forType, setForType] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [isNumericSize, setNumericSize] = useState(false);
  const [color, setColor] = useState("");
  const [sizeAndColor, setSizeAndColor] = useState<SizeAndColor[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageForUpdates, setImageForUpdates] = useState<string[]>([]);
  const [stockStatus, setStockStatus] = useState("in-stock");

  const {
    uploadProduct,
    isUploadProductsLoading,
    getProductById,
    isSingleProductLoading,
    editProduct,
    isEditProductsLoading
  } = useProduct();

  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const toggleForType = (val: string) => {
    if (forType.includes(val)) {
      setForType(forType.filter((s) => s != val));
    } else {
      setForType(forType.concat(val));
    }
  };

  const query = useQuery();

  const editableId = query.get("id");

  console.log("Search ID", editableId);

  const { uploadFile, isFileUploadLoading } = useFileUpload();

  const { getAllCategories } = useCategory();

  const [allCategories, setAllCategories] = useState<CategoryInterface[]>([]);

  const fetchCategories = async () => {
    const response = await getAllCategories();

    console.log(response.data.result);
    setAllCategories(response.data.result);
  };

  useEffect(() => {
    fetchCategories();

    if (editableId) {
      const editableProduct = async () => {
        const response = await getProductById(editableId);

        const productDetails = response.data.result;

        setProductName(productDetails.productName);
        setDescription(productDetails.description);
        setCost(productDetails.cost);
        setCategories(productDetails.categories._id);
        setForType(productDetails.forType);
        setImageForUpdates(productDetails.pictures);
        setSizeAndColor(
          productDetails.sizeAndColor.map((s: SizeAndColor) => ({
            size: s.size,
            color: s.color,
          }))
        );
        setStockStatus(productDetails.stockStatus);

        console.log("Editable product response", response.data.result);
      };
      editableProduct();
    }
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

  const toggleCategory = useCallback(
    (id: string) => {
      if (categories.includes(id)) {
        setCategories(categories.filter((c) => c != id));
      } else {
        setCategories(categories.concat(id));
      }
    },
    [categories, allCategories]
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageUrls: string[] = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(imageUrls); // Create preview URLs for selected images
      setImageFiles(files);
    }
  };

  const uploadImages = async () => {
    const uploads: string[] = [];
      if (imageFiles != null) {
        const fileArray = Array.from(imageFiles);
        console.log("Files length", fileArray!!.length);
        console.log("Files files", fileArray);
  
        for (let i = 0; i < fileArray.length; i++) {
          const response = await uploadFile(fileArray[i]);
          console.log("File", i, response.data);
          uploads.push(response.data.result.secure_url);
        }
  
        console.log(uploads);
        return uploads;
  }

}

  const publishProduct = async () => {

    let uploads: string[] = [];

    if(imageFiles) {
      const fileArray = Array.from(imageFiles).length;
      if(fileArray >= 2) {
        uploads = await uploadImages() as string[] ;
      } else {
        toast.error("You have to upload at least two product images");
      }
    }

    if(editableId) {
      
      const response = await editProduct({
        _id: editableId,
        productName,
        description,
        pictures: uploads.length > 0 ? uploads : imageForUpdates,
        cost,
        forType,
        stockStatus,
        sizeAndColor: sizeAndColor.map((s) => ({
          size: s.size,
          color: s.color,
        })),
        categories,
      });

      console.log(response);

      if (response.data.status == 200) {
        toast.success("Product Updated Successfully");
      } else {
        toast.error(errorHandler(response.data.error));
      }

    } else {
      
        // const uploads = await uploadImages();
  
        const response = await uploadProduct({
          productName,
          description,
          pictures: uploads!!,
          cost,
          forType,
          stockStatus,
          sizeAndColor: sizeAndColor.map((s) => ({
            size: s.size,
            color: s.color,
          })),
          categories,
        });
  
        console.log(response);
  
        if (response.data.status == 201) {
          toast.success("Product Uploaded Successfully");
        } else {
          toast.error(errorHandler(response.data.error));
        }
      }
    

  };

  return (
    <AdminDasboardLayout
      header={editableId ? "Update product" : " Add Product"}
      showSearch={false}
    >
      {isSingleProductLoading && (<div className="text-center"><Bounce color="black" size={25} /></div>)}
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
            <label className="text-[14px]">Stock Status</label>
            <div>
              <input
                type="radio"
                checked={stockStatus == "in-stock"}
                onClick={() => {
                  setStockStatus("in-stock");
                }}
              />{" "}
              In stock
            </div>
            <div>
              <input
                type="radio"
                checked={stockStatus == "out-of-stock"}
                onClick={() => {
                  setStockStatus("out-of-stock");
                }}
              />{" "}
              Out of stock
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[14px] mb-4">Select product pictures</div>

            <label
              className="text-[14px] bg-[#eee] py-4 px-8 w-fit text-black rounded-md"
              htmlFor="pictures"
            >
              Choose Pictures (Min 2)
            </label>
            <input
              id="pictures"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              multiple
              accept="image/jpeg, image/png, image/gif, image/svg+xml"
            />
            {imageForUpdates.length > 0 && imagePreviews.length == 0 ? (
              <div className="grid grid-cols-4 gap-2 justify-center items-center">
                {imageForUpdates.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    className="rounded-md border border-2 p-2 bg-[#ccc] border-primary"
                    alt={`Preview ${index + 1}`}
                    style={{ width: "150px", height: "150px", margin: "10px" }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 justify-center items-center">
                {imagePreviews.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    className="rounded-md border border-2 p-2 bg-[#ccc] border-primary"
                    alt={`Preview ${index + 1}`}
                    style={{ width: "150px", height: "150px", margin: "10px" }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-[14px]">Cost</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => {
                setCost(Number(e.target.value));
              }}
              placeholder="E.g johndoe@gmail.com"
              className="border border-2 border-solid border-primary py-2 px-4 rounded-md"
            />
          </div>

          <div>
            <div className="font-bold text-[20px]">Categories</div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {allCategories.map((c, index) => (
                <button
                  key={index}
                  className={`${
                    categories?.includes(c._id)
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } border border-2 border-primary rounded-md border-solid`}
                  value={c._id}
                  onClick={() => {
                    toggleCategory(c._id);
                  }}
                >
                  {c.name}
                </button>
              ))}
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
            className="text-[14px] bg-[#eee] py-4 px-8 w-fit text-black rounded-md"
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
        <button
          className="text-white bg-primary py-2 px-8 rounded-xl font-bold"
          onClick={publishProduct}
        >
          {isFileUploadLoading || isUploadProductsLoading || isEditProductsLoading ? (
            <Bounce />
          ) : editableId ? (
            "Update product"
          ) : (
            "Upload Product"
          )}
        </button>
      </div>
    </AdminDasboardLayout>
  );
}
