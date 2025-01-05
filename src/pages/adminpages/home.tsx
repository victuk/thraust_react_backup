import AdminDasboardLayout from '../../components/layout/AdminDasboardLayout'

export default function AdminHome() {

    const dashboardCardStyle = "rounded-xl py-4 px-8 border border-solid border-2 border-primary w-full";

    const dashboardHeaderStyle = "text-[18px] text-primary font-medium";

    const dashboardCountStyle = "text-[35px] text-primary font-bold";

  return (
    <AdminDasboardLayout header='Home' showSearch={false}>
        <div className='grid grid-cols-4 gap-4'>
            <div className={`${dashboardCardStyle}`}>
                <div className={`${dashboardHeaderStyle}`}>Total Products</div>
                <div className={`${dashboardCountStyle}`}>
                    0
                </div>
            </div>

            <div className={`${dashboardCardStyle}`}>
                <div className={`${dashboardHeaderStyle}`}>In Stock</div>
                <div className={`${dashboardCountStyle}`}>
                    0
                </div>
            </div>

            <div className={`${dashboardCardStyle}`}>
            <div className={`${dashboardHeaderStyle}`}>Out of stock</div>
                <div className={`${dashboardCountStyle}`}>
                    0
                </div>
            </div>

            <div className={`${dashboardCardStyle}`}>
            <div className={`${dashboardHeaderStyle}`}>Pending orders</div>
                <div className={`${dashboardCountStyle}`}>
                    0
                </div>
            </div>
        </div>

        <div className='mt-10'>
            <div className='font-bold text-[25px]'>Transaction History</div>
            <div>

            </div>
        </div>
    </AdminDasboardLayout>
  )
}
