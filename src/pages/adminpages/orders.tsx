import { useState } from 'react';
import AdminDasboardLayout from '../../components/layout/AdminDasboardLayout'

export default function AdminOrders() {

  const [searchKeyword, setSearchKeyword] = useState("");
  
    const searchAction = () => {}

  return (
    <AdminDasboardLayout header='Orders' searchPlaceholder='Search Products' showSearch={true} searchValue={searchKeyword} setSearchValue={setSearchKeyword} searchAction={searchAction}>
      Orders
    </AdminDasboardLayout>
  )
}
