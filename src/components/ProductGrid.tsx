
import { Product } from "@/types/store";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          No hay productos disponibles
        </h2>
        <p className="text-gray-500">
          Ve a la sección de Administrar para agregar productos a tu tienda.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Nuestros Productos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
