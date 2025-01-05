import { ProductInterface } from "../../../interfaces/ProductInterface";
import ProductCard from "./ProductCard";

interface Props {
  header?: string;
  products: ProductInterface[];
  isAdmin?: boolean;
}

export default function Products({ header, products, isAdmin = false }: Props) {
  return (
    <div>
      {header && <div>{header}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product: ProductInterface) => (
          <ProductCard
            id={product.id}
            name={product.name}
            description={product.description}
            categories={product.categories}
            picture={product.picture}
            sizesAvailable={product.sizesAvailable}
            cost={product.cost}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
