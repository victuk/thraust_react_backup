import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate } from 'react-router';
import { authStore } from '../../../store/authStore';


interface Props {
    children: React.ReactNode;
    withHeader?: boolean;
    withFooter?: boolean
}

export default function DefaultLayout({children, withHeader = true, withFooter = true}: Props) {

  const navigate = useNavigate();

  const userDetails = authStore(state => state.userDetails);
  const isLoggedIn = authStore(state => state.isLoggedIn);

  if(userDetails.role == "shop" && isLoggedIn) {
    navigate("/admin/dashboard");
  }

  return (
    <>
        {withHeader && <Header />}
        {children}
        {withFooter && <Footer />}
    </>
  )
}
