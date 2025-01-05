import { useState } from 'react'
import { sampleProducts } from '../../../db'
import AdminDasboardLayout from '../../components/layout/AdminDasboardLayout'
import Products from '../../components/products/Products'
import { useNavigate } from 'react-router';

export default function AdminProducts() {

  const [searchKeyword, setSearchKeyword] = useState("");

  const searchAction = () => {}

  const navigate = useNavigate();

  return (
    <AdminDasboardLayout header='Products' addTopPadding={false} searchPlaceholder='Search Products' showSearch={true} searchValue={searchKeyword} setSearchValue={setSearchKeyword} searchAction={searchAction}>
      <div className='flex justify-end py-4 sticky top-0 bg-white'>
        <button className='bg-primary text-white px-8 py-2 font-bold rounded-md' onClick={() => {navigate("/admin/addoredit");}}>Add Product</button>
      </div>
      <div className='py-4'>
        <Products products={sampleProducts} />
      </div>
    </AdminDasboardLayout>
  )
}
