
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem, CustomerInfo } from "@/types/store";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields: (keyof CustomerInfo)[] = ['name', 'email', 'phone', 'address', 'city'];
    return requiredFields.every(field => customerInfo[field].trim() !== '');
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos al carrito antes de proceder.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    // Crear el contenido del email
    const orderSummary = cartItems.map(item => 
      `${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const emailBody = encodeURIComponent(`
Nueva Orden de Compra:

INFORMACIÓN DEL CLIENTE:
Nombre: ${customerInfo.name}
Email: ${customerInfo.email}
Teléfono: ${customerInfo.phone}
Dirección: ${customerInfo.address}
Ciudad: ${customerInfo.city}
Código Postal: ${customerInfo.zipCode}

PRODUCTOS ORDENADOS:
${orderSummary}

TOTAL: $${total.toFixed(2)}

Fecha: ${new Date().toLocaleString()}
    `);

    const mailtoLink = `mailto:tu-email@ejemplo.com?subject=Nueva Orden de Compra - ${customerInfo.name}&body=${emailBody}`;
    
    window.open(mailtoLink, '_blank');

    toast({
      title: "Orden enviada",
      description: "La orden ha sido enviada por correo electrónico.",
    });

    // Limpiar el formulario
    setCustomerInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: ""
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500">
          Agrega algunos productos a tu carrito para continuar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Carrito de Compras */}
      <Card>
        <CardHeader>
          <CardTitle>Carrito de Compras</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-600">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Separator />
          
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Información del Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Envío</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Tu número de teléfono"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Dirección *</Label>
              <Textarea
                id="address"
                value={customerInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Tu dirección completa"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  value={customerInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Tu ciudad"
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode">Código Postal</Label>
                <Input
                  id="zipCode"
                  value={customerInfo.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="Código postal"
                />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
            size="lg"
          >
            Enviar Orden por Email
          </Button>
          
          <p className="text-sm text-gray-600 text-center">
            * Campos requeridos. La orden se enviará por correo electrónico.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
