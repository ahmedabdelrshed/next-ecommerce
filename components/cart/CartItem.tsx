import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useCartStore from "@/store/cartStore";

interface CartItem {
  id: number;

  name: string;

  price: number;

  quantity: number;

  image: string;
}
const CartItem = ({ item }: { item: CartItem }) => {
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className=" p-4 sm:p-6 rounded-lg shadow-lg mb-4 relative overflow-hidden border-2 border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
          />

          <div className="flex-1">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent line-clamp-1">
              {item.name}
            </h3>

            <p className="text-gray-400">${item?.price?.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end sm:flex-1">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white cursor-pointer"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <Input
              type="number"
              min="0"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value))
              }
              className="w-16  border-gray-600 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent"
            />

            <Button
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200 ml-4 cursor-pointer"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
