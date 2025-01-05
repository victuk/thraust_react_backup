import OtherPageHeader from '../components/OtherPageHeader'
import DefaultLayout from '../components/layout/DefaultLayout'

export default function Gallery() {
    const pics = [
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery1.jpg",
        "/gallery2.jpg",
    ];
  return (
    <DefaultLayout>
        <OtherPageHeader header='Gallery' />

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-10 px-10 xl:px-[140px]'>
            {pics.map((pic, index) => (
                <div className='h-[450px] w-full' key={index}>
                    <div style={{backgroundImage: `url('${pic}')`, backgroundSize: "cover"}} className='w-full h-full'></div>
                </div>
            ))}
        </div>
    </DefaultLayout>
  )
}
