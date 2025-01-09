import { useEffect, useState } from "react";
import { ProductInterface } from "../../../interfaces/ProductInterface";
import ProductCard from "./ProductCard";
import { useProduct } from "../../../hooks/useProduct";
import { Bounce } from "react-activity";
import { useNavigate } from "react-router";


interface Props {
  header?: string;
  // products: ProductInterface[];
  isAdmin?: boolean;
  limit?: number;
  showPaginatedControl: boolean;
  category?: string;
}

interface fetchedProductsInterface {
  docs: ProductInterface[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: any;
  page: number;
  pagingCounter: number;
  prevPage: any;
  totalDocs: number;
  totalPages: number;
}

export default function Products({
  header,
  category,
  limit = 5,
  isAdmin = false,
}: Props) {
  const [fetchedProducts, setFetchedProducts] =
    useState<fetchedProductsInterface>({
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit,
      nextPage: null,
      page: 1,
      pagingCounter: 1,
      prevPage: null,
      totalDocs: 0,
      totalPages: 1,
    });

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { getProductsPaginated, isProductsPaginatedLoading } = useProduct();

  const fetchProducts = async () => {
    const response = await getProductsPaginated(currentPage, limit, category);
    console.log(response.data.result);
    setFetchedProducts(response.data.result);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);


  return (
    <div>
      {header && <div>{header}</div>}
      <div>
        {fetchedProducts.docs.length == 0 ? (
          <div className="w-full h-full flex justify-center items-center text-center">
            {isProductsPaginatedLoading ? (
              <Bounce />
            ) : (
              <div className="font-bold text-[25px]">
                {isAdmin ? (
                  <div>
                    <div>No product added</div>
                    <button
                      className="bg-primary text-white px-8 py-2 font-bold rounded-md"
                      onClick={() => {
                        navigate("/admin/addoredit");
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                ) : (
                  "No product added"
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {fetchedProducts.docs.map((product: ProductInterface) => (
              <ProductCard
                _id={product._id}
                productName={product.productName}
                description={product.description}
                categories={product.categories}
                pictures={product.pictures}
                sizeAndColor={product.sizeAndColor}
                cost={product.cost}
                isAdmin={isAdmin}
                forType={product.forType}
                stockStatus={product.stockStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
