import { useMemo } from "react";
import { authStore } from "../../store/authStore";
import { cartStore } from "../../store/cartStore";
import { shippingAddressStore } from "../../store/shippingAddressStore";
import CartItem from "../components/CartComponent/CartItem";
import OtherPageHeader from "../components/OtherPageHeader";
import DefaultLayout from "../components/layout/DefaultLayout";
import { formatCurrency, getCurrencySymbol } from "../../utils/formatCurrency";
import { Link, useNavigate } from "react-router";
import { useOrders } from "../../hooks/useOrders";
import { toast } from "react-toastify";
import { Bounce } from "react-activity";

export default function Cart() {

  const navigate = useNavigate();

  const { createPaystackPaymentLink, isCreatePaymentLinkLoading, createAnOrder, isCreateOrderLoading } = useOrders();

  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const userDetails = authStore((state) => state.userDetails);

  const cart = cartStore((state) => state.cart);

  const shippingAddresses = shippingAddressStore(
    (state) => state.shippingAddresses
  );

  const defaultShippingAddress = shippingAddresses.find(
    (s) => s.isDefault == true
  );

  const checkoutDisabled = useMemo(() => {
    return !defaultShippingAddress || !isLoggedIn;
  }, [shippingAddresses, isLoggedIn]);

  const grandTotal = useMemo(() => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      let totalPerQuantity = 0;
      if (cart[i].sizeColorQuantity!!.length > 0) {
        for (let j = 0; j < cart[i].sizeColorQuantity!!.length; j++) {
          totalPerQuantity +=
            cart[i].cost * cart[i].sizeColorQuantity!![j].quantity;
        }
        total += totalPerQuantity;
      }
    }

    return total;
  }, [cart]);

  const currencySymbol = getCurrencySymbol();

  const pay = async () => {

    if(!defaultShippingAddress) {
      toast.error("No shipping address is selected");
      return;
    }

    const orderDetails = await createAnOrder({
      products: cart,
      totalCost: grandTotal,
      state: defaultShippingAddress!!.state,
      city: defaultShippingAddress!!.city,
      address: defaultShippingAddress!!.address
    });

    const orderId = orderDetails.data.result._id;

    const response = await createPaystackPaymentLink(orderId);

    const authorizationUrl = response.data.result.data.authorization_url;

    location.assign(`${authorizationUrl}?orderId=${orderId}`);

  };

  return (
    <DefaultLayout>
      <OtherPageHeader header="Cart" />

      <section
        id="about"
        className="flex flex-col-reverse md:flex-row-reverse gap-10 py-10 px-10 xl:px-[140px] min-h-[70vh]"
      >
        <div className="w-full md:w-[460px] text-left md:text-right">
          {isLoggedIn ? (
            <div>
              <div className="mb-4">
                <div className="my-2 font-bold text-[20px] text-left">
                  User Details
                </div>
                <div className="flex flex-col gap-2">
                  {/* <img src={
                      userDetails.profilePicture == ""
                        ? "/avatar.png"
                        : userDetails.profilePicture
                    } className="ml-0 md:ml-auto h-[80px] w-[80px] rounded-full" /> */}
                  <div className="flex justify-between items-end">
                    <div className="text-[#aaa] text-[14px]">Full name</div>
                    <div className="font-medium text-[18px]">
                      {userDetails.fullName}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-[#aaa] text-[14px]">Email</div>
                    <div className="font-medium text-[18px]">
                      {userDetails.email}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="my-2 font-bold text-[20px] text-left">
                  Shipping Details
                </div>
                <div className=" justify-end items-center">
                  {defaultShippingAddress ? (
                    <div className="flex flex-col gap-2 text-right w-full">
                      {/* <div>Country: {defaultShippingAddress?.country}</div> */}
                      <div className="flex justify-between items-end">
                        <div className="text-[#aaa] text-[14px]">State</div>
                        <div className="font-medium text-[18px]">
                          {defaultShippingAddress?.state[0].toLocaleUpperCase() +
                            defaultShippingAddress?.state.slice(1)}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-[#aaa] text-[14px]">City</div>
                        <div className="font-medium text-[18px]">
                          {defaultShippingAddress?.city}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-[#aaa] text-[14px]">Address</div>
                        <div className="font-medium text-[18px]">
                          {defaultShippingAddress?.address}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>No shipping address</div>
                  )}
                </div>
                <Link
                  to="/shippingaddress"
                  className="block text-center w-full px-8 py-2 mt-4 font-bold border border-2 border-primary text-primary rounded-xl"
                >
                  {defaultShippingAddress ? "Update" : "Add"} Shipping Address
                </Link>
              </div>

              <div className="text-right my-2">
                <div className="border-y border-y-1 border-[#ccc] py-4 my-4">
                  <div className="font-bold">Total</div>
                  <div className="font-bold text-[25px]">
                    {currencySymbol}
                    {formatCurrency(grandTotal)}
                  </div>
                </div>
                <button
                onClick={pay}
                  className={`w-full px-8 py-2 mt-4 font-bold ${
                    checkoutDisabled
                      ? "opacity-[0.6] bg-[#3E7B27]"
                      : "bg-[#3E7B27]"
                  } text-white rounded-xl`}
                  disabled={checkoutDisabled}
                >
                  {isCreateOrderLoading || isCreatePaymentLinkLoading ? (<Bounce />) : "Checkout"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div style={{ opacity: 0.5 }}>
                  <div>
                  <div className="my-2 font-bold text-[20px] text-left">
                  User Details
                </div>
                    <div className="flex flex-col gap-2">
                  {/* <img src={
                      userDetails.profilePicture == ""
                        ? "/avatar.png"
                        : userDetails.profilePicture
                    } className="ml-0 md:ml-auto h-[80px] w-[80px] rounded-full" /> */}
                  <div className="flex justify-between items-end">
                    <div className="text-[#aaa] text-[14px]">Full name</div>
                    <div className="font-medium text-[18px]">
                      --
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-[#aaa] text-[14px]">Email</div>
                    <div className="font-medium text-[18px]">
                      --
                    </div>
                  </div>
                </div>
                  </div>

                  <div>
                  <div className="my-2 font-bold text-[20px] text-left">
                  Shipping Details
                </div>
                    <div className="flex flex-col gap-2">
                  {/* <img src={
                      userDetails.profilePicture == ""
                        ? "/avatar.png"
                        : userDetails.profilePicture
                    } className="ml-0 md:ml-auto h-[80px] w-[80px] rounded-full" /> */}
                  <div className="flex justify-between items-end">
                    <div className="text-[#aaa] text-[14px]">State</div>
                    <div className="font-medium text-[18px]">
                      --
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-[#aaa] text-[14px]">City</div>
                    <div className="font-medium text-[18px]">
                      --
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-[#aaa] text-[14px]">Address</div>
                    <div className="font-medium text-[18px]">
                      --
                    </div>
                  </div>
                </div>
                  </div>
                </div>
                <div className="mt-4">
                <div className="mb-2 text-left font-medium">Login to see details</div>
                <button onClick={() => {navigate("/login")}} className="border border-primary text-primary font-medium py-2 px-4 w-full rounded-md">Log In</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full">
          {cart.length > 0 ? (
            <div className=" flex flex-col gap-8">
              {cart.map((cartItem) => (
                <CartItem cart={cartItem} key={cartItem._id} />
              ))}
            </div>
          ) : (
            <div className="h-[70vh] w-full flex justify-center items-center">
              <div className="font-bold text-[40px]">No product in cart</div>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
