import OtherPageHeader from '../components/OtherPageHeader'
import ContactComponent from '../components/Contact'
import DefaultLayout from '../components/layout/DefaultLayout'

export default function ContactUs() {
  return (
    <DefaultLayout>
        <OtherPageHeader header='Contact Us' />
        <ContactComponent />
    </DefaultLayout>
  )
}
