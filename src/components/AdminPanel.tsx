
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Upload } from "lucide-react";
import { Product } from "@/types/store";
import { useToast } from "@/hooks/use-toast";

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string) => void;
}

const AdminPanel = ({ products, onAddProduct, onDeleteProduct }: AdminPanelProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: ""
  });

  const categories = [
    "Electrónicos",
    "Ropa",
    "Hogar",
    "Deportes",
    "Libros",
    "Juguetes",
    "Belleza",
    "Otros"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "El precio debe ser un número válido mayor a 0.",
        variant: "destructive",
      });
      return;
    }

    onAddProduct({
      name: formData.name,
      price: price,
      image: formData.image || "/placeholder.svg",
      description: formData.description,
      category: formData.category
    });

    // Limpiar formulario
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      category: ""
    });

    toast({
      title: "Producto agregado",
      description: "El producto ha sido agregado exitosamente.",
    });
  };

  const handleDeleteProduct = (productId: string) => {
    onDeleteProduct(productId);
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado de la tienda.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Formulario para agregar productos */}
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nombre del producto"
              />
            </div>

            <div>
              <Label htmlFor="price">Precio *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="category">Categoría *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descripción del producto"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image">Imagen del Producto</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Agregar Producto
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de productos existentes */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Existentes ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay productos agregados aún.
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
