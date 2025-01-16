import { useEffect, useState } from "react";
import { ProductInterface } from "../../../interfaces/ProductInterface";
import ProductCard from "./ProductCard";
import { useProduct } from "../../../hooks/useProduct";
import { Bounce } from "react-activity";
import { useNavigate } from "react-router";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";

interface Props {
  header?: string;
  // products: ProductInterface[];
  isAdmin?: boolean;
  limit?: number;
  category?: string;
  showPageControl?: boolean;
}

interface FetchedProductsInterface {
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
  limit = 20,
  isAdmin = false,
  showPageControl = false
}: Props) {
  const [fetchedProducts, setFetchedProducts] =
    useState<FetchedProductsInterface>({
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

  // const [currentPage, _setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { getProductsPaginated, isProductsPaginatedLoading } = useProduct();

  const fetchProducts = async (page: number) => {
    const response = await getProductsPaginated(page, limit, category);
    console.log(response.data.result);
    setFetchedProducts(response.data?.result);
  };

  useEffect(() => {
    fetchProducts(1);
  }, [category]);

  const [isPageModalOpen, setPageModalOpen] = useState(false);
  const [modalPageNumber, setModalPageNumber] = useState(0);
const openModal = () => {
  setPageModalOpen(true);
  };

  const closeModal = () => {
    setPageModalOpen(false);
    };

  const prevNextPageDesign = "py-1 px-4 font-medium rounded-md border border-2";

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
          <div>
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
            {
              showPageControl && (
                <div>
                <div className="flex gap-2 justify-center items-center mt-4">
                  <button onClick={() => {
                    if(fetchedProducts.hasPrevPage) {
                      fetchProducts(fetchedProducts.page - 1);
                    }
                  }} className={`${prevNextPageDesign} ${fetchedProducts.hasPrevPage ? "text-primary border-primary" : "text-primary/[0.5] border-primary/[0.5]"}`}><IoMdArrowRoundBack size={25} /></button>
                  <div className="font-medium text-[16px]">Page {fetchedProducts.page} of {fetchedProducts.totalPages} (showing {fetchedProducts.limit} per page)</div>
                  <button className={`py-1 px-4 font-medium text-primary border-primary text-[16px] text-medium`} onClick={openModal}>Go to Page</button>
                  <button onClick={() => {
                    if(fetchedProducts.hasNextPage) {
                      fetchProducts(fetchedProducts.page + 1);
                    }
                  }} className={`${prevNextPageDesign} ${fetchedProducts.hasNextPage ? "text-primary border-primary" : "text-primary/[0.5] border-primary/[0.5]"}`}><IoMdArrowRoundForward size={25} /></button>
                </div>
              </div>
              )
            }
          </div>
        )}
      </div>
      <Modal
              isOpen={isPageModalOpen}
              style={{overlay: {zIndex: 200}, content: {width: "400px", height: "250px", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}}
              onRequestClose={closeModal}
            >
              <div>
                <div className="text-right">
                  <button onClick={closeModal}><CgClose size={25} /></button>
                </div>
                <div className="flex justify-center items-center h-full">
                  <div className="flex flex-col gap-2 text-center">
                    <div className="font-bold text-[25px]">Go to page</div>
                    <div className="text-[10px]">Enter a page number between 1 and {fetchedProducts.totalPages}</div>
                    <div><input type="number" className="border border-2 border-primary py-1 px-2 rounded-md" placeholder={`Enter a page number`} value={modalPageNumber} onChange={(e) => {setModalPageNumber(parseInt(e.target.value))}} /></div>
                    <button
                    className="bg-primary text-white font-medium px-4 py-1 rounded-md"
                    onClick={() => {
                      if(modalPageNumber > fetchedProducts.totalPages || modalPageNumber < 1) {
                        toast.error("Invalid page number");
                        return;
                      }
                      fetchProducts(modalPageNumber);
                      setModalPageNumber(0);
                      closeModal();
                    }}
                    >Go</button>
                  </div>
                </div>
              </div>
            </Modal>
    </div>
  );
}
