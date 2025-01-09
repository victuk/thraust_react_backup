interface Props {
    productName: string;
    closeModal: (shouldDelete: boolean) => void;
}

export default function DeleteProductModal({
    productName, closeModal
}: Props) {

    const yesOrNo = "w-full md:w-1/2 my-2";

  return (
    <div>
        <div>Are you sure you want to delete "{productName}"</div>
        <div className='flex gap-2'>
            <button className={yesOrNo} onClick={() => {closeModal(true)}}>Yes</button>
            <button className={yesOrNo} onClick={() => {closeModal(false)}}>No</button>
        </div>
    </div>
  )
}
