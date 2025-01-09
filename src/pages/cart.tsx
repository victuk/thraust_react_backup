import { useMemo } from "react";
import { authStore } from "../../store/authStore";
import { cartStore } from "../../store/cartStore";
import { shippingAddressStore } from "../../store/shippingAddressStore";
import CartItem from "../components/CartComponent/CartItem";
import OtherPageHeader from "../components/OtherPageHeader";
import DefaultLayout from "../components/layout/DefaultLayout";
import Marquee from "react-fast-marquee";
import { formatCurrency, getCurrencySymbol } from "../../utils/formatCurrency";
import { Link } from "react-router";

export default function Cart() {
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

  return (
    <DefaultLayout>
      <OtherPageHeader header="Cart" />

      <section
        id="about"
        className="flex flex-col-reverse md:flex-row-reverse gap-10 py-10 px-10 xl:px-[140px] min-h-[70vh]"
      >
        <div className="w-full md:w-[400px] text-left md:text-right">
          {isLoggedIn ? (
            <div>
              <div className="mb-4">
                <div className="my-2 font-bold text-[20px] text-left">User Details</div>
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
                  className={`w-full px-8 py-2 mt-4 font-bold ${
                    checkoutDisabled
                      ? "opacity-[0.6] bg-[#3E7B27]"
                      : "bg-[#3E7B27]"
                  } text-white rounded-xl`}
                  disabled={checkoutDisabled}
                >
                  {" "}
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>Login to see details</div>
              <div>
                <div style={{ opacity: 0.5 }}>
                  <div>
                    <div>User Details</div>
                    <div className="flex gap-4 items-center">
                      <img
                        src={"/avatar.png"}
                        className="h-[40px] w-[40px] rounded-full"
                      />
                      <div>
                        <div>Full name: --</div>
                        <div>Email: --</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>Shipping Details</div>
                    <div className="flex gap-4 items-center">
                      <div>
                        <div>Full name: --</div>
                        <div>Email: --</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button>Log In</button>
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
