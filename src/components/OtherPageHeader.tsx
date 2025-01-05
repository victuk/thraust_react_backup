


export default function OtherPageHeader({header}: {header: string}) {
  return (
    <div style={{backgroundImage: "url('/patterns.jpg')", backgroundRepeat: "repeat-x", backgroundSize: "contain"}} className='h-[120px] bg-[0,0,255,0.1] font-bold text-center'>
        <div className='bg-[rgba(0,0,255,0.6)] w-full h-full flex justify-center items-center text-white text-[35px] md:text-[40px] xl:text-[50px]'>
        {header}
        </div>
    </div>
  )
}
