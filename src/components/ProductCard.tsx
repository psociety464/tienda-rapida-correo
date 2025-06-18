
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/store";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="text-2xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
