import { useMemo, useState } from "react";
import { CategoryInterface, ProductInterface } from "../../../interfaces/ProductInterface";
import { Link, useNavigate } from "react-router";
import { formatCurrency, getCurrencySymbol } from "../../../utils/formatCurrency";
import { cartStore } from "../../../store/cartStore";
import Modal from "react-modal";
import DeleteProductModal from "./DeleteProductModal";
import { useProduct } from "../../../hooks/useProduct";

interface ProductCardInterface extends ProductInterface {
  isAdmin: boolean;
}

export default function ProductCard({
  _id,
  productName,
  description,
  pictures,
  categories,
  sizeAndColor,
  cost,
  isAdmin,
  forType,
  stockStatus
}: ProductCardInterface) {
  const [isHovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const cart = cartStore(state => state.cart);
  const addToCart = cartStore(state => state.addToCart);
  const removeProduct = cartStore(state => state.removeProduct);
  const isInCart = cartStore(state => state.isInCart);

  const isProductInCart = useMemo(() => {
    return isInCart(_id!!);
  }, [cart]);

  const currencySymbol = getCurrencySymbol();


  const {deleteProduct} = useProduct();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
const openModal = () => {
    setDeleteModalOpen(true);
  };

  const closeModal = (shouldDelete: boolean) => {
    if (shouldDelete) {
      deleteProduct(_id!!);
    }
    setDeleteModalOpen(false);
  };

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
            navigate(`/product/${_id}`);
          } else {
            navigate(`/admin/addoredit?id=${_id}`);
          }
        }}
      >
        <img src={pictures[0]} alt={productName} className="w-[400px] h-[320px] rounded-md" />
      </div>
      <div>
        {(categories as CategoryInterface[]).map((c) => (
          <div className="bg-[#ccc] px-2 text-black inline-block rounded-xl text-[10px] font-bold">
            {c.name}
          </div>
        ))}
      </div>
      <div>
        {/* <div className="text-[10px]">Sizes available:</div> */}
        <div className="flex gap-1">
          {sizeAndColor.map((s) => (
            <div className="border border-2 border-solid border-primary px-2 text-primary inline-block text-[14px] rounded-md font-bold">
              {s.size}
            </div>
          ))}
        </div>
      </div>
      <div
        className="font-bold text-[20px]"
        onClick={() => {
          if (isAdmin == false) {
            navigate("/product/1");
          }  else {
            navigate(`/admin/addoredit?id=${_id}`);
          }
        }}
      >
        {productName}
      </div>
      <p>{description}</p>
      <div>
        <div className="text-[10px]">Cost:</div>
        <div className="font-bold">{currencySymbol}{formatCurrency(cost)}</div>
      </div>

      {isAdmin ? (
        <div className={`flex flex-col gap-2`}>
        <button onClick={() => {navigate(`/admin/addoredit?id=${_id}`);}} className="border border-2 border-solid border-primary text-primary w-full text-center py-2 rounded-xl font-bold">
          Edit
        </button>
        <button
          onClick={() => {openModal()}}
          className="border border-2 border-solid border-[red] text-[red] w-full text-center py-2 rounded-xl font-bold"
        >
          Delete
        </button>
      </div>
      ) : (
        <div
          className={`${
            isHovered ? "md:opacity-1" : "md:opacity-0"
          } opacity-1 flex flex-col gap-2`}
        >
          {isProductInCart ? (
            <button className="bg-primary text-white w-full text-center py-2 rounded-xl font-bold" onClick={() => {removeProduct(_id!!)}}>
            Remove from Cart
          </button>
          ) : (
            <button className="bg-primary text-white w-full text-center py-2 rounded-xl font-bold" onClick={() => {addToCart({
              _id,
              productName,
              description,
              pictures,
              categories,
              sizeAndColor,
              cost,
              forType,
              stockStatus
            })}}>
              Add to Cart
          </button>
          ) }
          
          <Link
            to={`/product/${_id}`}
            className="border border-2 border-solid border-primary text-primary w-full text-center py-2 rounded-xl font-bold"
          >
            View
          </Link>
        </div>
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        style={{overlay: {zIndex: 200}}}
        onRequestClose={() => {closeModal(false)}}
      >
        <DeleteProductModal productName={productName} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
