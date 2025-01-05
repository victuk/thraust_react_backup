import DefaultLayout from "../components/layout/DefaultLayout";
import { Link } from "react-router";
import { sampleProductCategories, sampleProducts } from "../../db.ts";
import Products from "../components/products/Products";
import ContactComponent from "../components/Contact.tsx";
import HeroComponent from "../components/HeroComponent.tsx";
import AnimateOnScroll from "react-animate-on-scroll";

export default function Home() {

    

  return (
    <DefaultLayout>
      <main>

        <HeroComponent />
        
        <section id="products" className="py-10 px-10 xl:px-[140px]">
          <div className="text-center font-bold text-[35px] mb-10 text-primary">
            Latest Products
          </div>
          <div className="products">
            <Products products={sampleProducts} />

            <div className="w-full text-center mt-8">
              <button className="text-primary border border-2 font-bold border-primary px-8 py-2 rounded-xl text-primary">
                See more products
              </button>
            </div>
          </div>
        </section>

    <AnimateOnScroll animateIn="fadeInUp">
        <section className="py-10 px-10 xl:px-[140px]">
          <div className="text-center font-bold text-[35px] mb-10 text-primary">
            Collections/Categories
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sampleProductCategories.map((cat) => (
              <div className="justify-center items-center flex gap-4 font-bold w-full py-4 text-primary rounded-lg bg-[#eee]">
                <cat.icon />
                <Link to={`/products?category=${cat.name}`}>
                  {cat.name[0].toLocaleUpperCase() + cat.name.slice(1)}
                </Link>
              </div>
            ))}
          </div>
        </section>
    </AnimateOnScroll>
        
        <ContactComponent />
        
      </main>
    </DefaultLayout>
  );
}
