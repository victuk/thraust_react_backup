import { useCallback, useEffect, useRef, useState } from 'react';
import AdminDasboardLayout from '../../components/layout/AdminDasboardLayout'
import { Bounce } from "react-activity";
import {
  formatCurrency,
  getCurrencySymbol,
} from "../../../utils/formatCurrency";
import { CgClose } from "react-icons/cg";
import Slider from "react-slick";
import Modal from "react-modal";
import { ProductWithQuantity } from '../../../store/cartStore';
import { useOrders } from '../../../hooks/useOrders';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';


interface OrderHistoryDocsInterface {
  _id: string;
  address: string;
  city: string;
  comment: string;
  country: string;
  createdAt: Date;
  customerId: string;
  orderStatus: string;
  paystackReference: string;
  products: ProductWithQuantity[];
  rating: number;
  shippingFee: number;
  shopDeleted: boolean;
  state: string;
  totalCost: number;
  updatedAt: Date;
}

export default function AdminOrders() {

  const { adminPendingOrders, isAdminPendingOrderLoading } = useOrders();

  const [searchKeyword, setSearchKeyword] = useState("");
  
    const searchAction = () => {}

      useEffect(() => {
        adminPendingOrders();
      }, []);
    
      const [orderhistoryDetails, setOrderHistoryDetails] =
        useState<OrderHistoryDocsInterface[]>([]);
    
      const fetchOrderHistory = async () => {
        const response = await adminPendingOrders();
        console.log("Fetch pending order response", response.data.result);
        setOrderHistoryDetails(response.data.result);
      };

      useEffect(() => {
        fetchOrderHistory();
      }, []);
    
      const [modalIsOpen, setIsOpen] = useState(false);
    
      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }
    
      const currencySymbol = getCurrencySymbol();
    
      //   const fetchOrderHistory = async (page: number, limit: number) => {
      //     const response = await getOrderHistory(page, limit);
    
      //     // console.log(response.data.result);
    
      //     setOrderHistoryDetails(response.data.result);
      //   };
    
      const [productModalDetails, setProductModalDetails] =
        useState<ProductWithQuantity | null>(null);
    
      const openMoreDetails = (product: ProductWithQuantity) => {
        setProductModalDetails(product);
        openModal();
      };
    
      const closeMoreDetails = () => {
        closeModal();
        setProductModalDetails(null);
      };
    
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
    
      let [totalAmount, setTotalAmount] = useState(0);
    
      useEffect(() => {
        let totalQuantity = 0;
    
        if (productModalDetails) {
          if (productModalDetails.sizeColorQuantity!!.length > 0) {
            for (
              let i = 0;
              i < productModalDetails.sizeColorQuantity!!.length;
              i++
            ) {
              totalQuantity += productModalDetails.sizeColorQuantity!![i].quantity;
            }
          }
    
          let totalAmountCalculated = productModalDetails.cost * totalQuantity;
          setTotalAmount(totalAmountCalculated);
        }
      }, [modalIsOpen]);
    
      const grandTotal = useCallback((orderHistory: OrderHistoryDocsInterface) => {
        let total = 0;
    
        for (let i = 0; i < orderHistory.products.length; i++) {
          let totalPerQuantity = 0;
          if (orderHistory.products[i].sizeColorQuantity!!.length > 0) {
            for (
              let j = 0;
              j < orderHistory.products[i].sizeColorQuantity!!.length;
              j++
            ) {
              totalPerQuantity +=
                orderHistory.products[i].cost *
                orderHistory.products[i].sizeColorQuantity!![j].quantity;
            }
            total += totalPerQuantity;
          }
        }
    
        return total;
      }, []);

  return (
    <AdminDasboardLayout header='Orders' searchPlaceholder='Search Products' showSearch={true} searchValue={searchKeyword} setSearchValue={setSearchKeyword} searchAction={searchAction}>
      <div className="mt-4">
        <div className="font-bold text-[25px]">Pending Orders</div>
        <div>
          <div className="flex flex-col gap-10">
            {isAdminPendingOrderLoading && (
              <Bounce size={20} className="mx-auto" />
            )}
            {!isAdminPendingOrderLoading &&
              orderhistoryDetails.length == 0 && (
                <div className="text-center font-bold text-[25px]">
                  No pending order
                </div>
              )}
            <div>
              {orderhistoryDetails.map((orderHistory) => {
                const total = grandTotal(orderHistory);

                return (
                  <div
                    key={orderHistory._id}
                    className="p-4 rounded-xl my-10 flex flex-col md:flex-row items-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  >
                    <div>
                      <div className="font-medium text-[16px] mb-4">
                        <div>Products ordered</div>
                      <div className='bg-[green] text-white px-2 rounded-xl w-fit text-[10px]'>Pending</div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                        {orderHistory.products.map((product) => (
                          <div className="text-center">
                            <img
                              src={product.pictures[0]}
                              className="h-[120px] w-[120px] mx-auto rounded-md"
                            />
                            <div className="font-bold">
                              {product.productName}
                            </div>
                            <button
                              className="font-medium py-1 px-4 w-full border border-primary rounded-xl text-primary"
                              onClick={() => {
                                openMoreDetails(product);
                              }}
                            >
                              View More Details
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className='mt-8'>
                      <button className='bg-primary text-white font-medium px-4 py-1 rounded-md'>Mark as delivered</button>
                    </div>
                    </div>
                    <div>
                      <div className="text-left md:text-right">
                        <div className="font-bold text-[20px] mb-2">
                          Shipping Details
                        </div>
                        <div className="flex flex-col gap-2">
                          <div>
                            <div className="font-medium text-[10px] text-[#aaa]">
                              State
                            </div>
                            <div className="font-medium text-[18px]">
                              {orderHistory.state[0].toLocaleUpperCase() +
                                orderHistory.state.slice(1)}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-[10px] text-[#aaa]">
                              City
                            </div>
                            <div className="font-medium text-[18px]">
                              {orderHistory.city}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-[10px] text-[#aaa]">
                              Address
                            </div>
                            <div className="font-medium text-[18px]">
                              {orderHistory.address}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-left md:text-right mt-4">
                        <div className="font-medium text-[10px] text-[#aaa]">
                          Total
                        </div>
                        <div className="font-bold text-[20px]">
                          {currencySymbol}
                          {formatCurrency(total)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div></div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeMoreDetails}
            style={{ overlay: { zIndex: 200 } }}
            // contentLabel="Example Modal"
          >
            <div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-[25px] mb-8">
                  Order Product Detail
                </div>
                <button onClick={closeMoreDetails}>
                  <CgClose size={25} />
                </button>
              </div>
              <div className="flex gap-10 items-center p-8">
                <div className="w-full md:w-1/2">
                  <Slider ref={sliderRef} {...settings}>
                    {productModalDetails?.pictures.map((picture) => (
                      <div>
                        <img
                          src={picture}
                          className="h-[400px] w-[400px] mx-auto rounded-xl"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="font-bold text-[25px]">
                    {productModalDetails?.productName}
                  </div>
                  <div>
                    Cost per unit: {currencySymbol}
                    {formatCurrency(productModalDetails?.cost || 0)}
                  </div>
                  <div>
                    <div>Color, Size and Quantity purchased:</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      {productModalDetails?.sizeColorQuantity
                        ?.filter((s) => s.quantity != 0)
                        .map((SCQ) => {
                          return (
                            <div className="flex gap-2 border border-primary py-2 px-4 rounded-md text-primary font-bold mt-2 justify-center">
                              <div className="text-center">
                                <div>{SCQ.color}</div>
                                <div className="text-[10px] font-thin">
                                  Color
                                </div>
                              </div>
                              <div className="text-center">
                                <div>{SCQ.size}</div>
                                <div className="text-[10px] font-thin">
                                  Size
                                </div>
                              </div>
                              <div className="text-center">
                                <div>{SCQ.quantity}</div>
                                <div className="text-[10px] font-thin">
                                  Quantity
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    Total amount paid: {currencySymbol}
                    {formatCurrency(totalAmount)}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </AdminDasboardLayout>
  )
}
