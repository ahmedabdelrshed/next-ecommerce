import { getProductDetails } from "@/actions/catalog/getProductDetails";
import { getRelatedProducts } from "@/actions/catalog/getRelatedProducts";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { IProductEntity } from "oneentry/dist/products/productsInterfaces";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const useProduct = () => {
    const [productId, setProductId] = useState<string | null>(null);

    const [product, setProduct] = useState<IProductEntity>();

    const [relatedProducts, setRelatedProducts] = useState<IProductEntity[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const addToCart = useCartStore((state) => state.addToCart);

    
    useEffect(() => {
        const fetchData = async () => {
            if (!productId) return;

            try {
                const productData = await getProductDetails(parseInt(productId));

                if (!productData || (productData).id === undefined) {
                    throw new Error("Product not found");
                }

                setProduct(productData as IProductEntity);

                const relatedProductsData = await getRelatedProducts(

                    parseInt((productData)?.productPages[0].pageId),

                    parseInt(productId)
                );

                setRelatedProducts(relatedProductsData);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,

                name: product.attributeValues.p_title.value || "Product",

                price: product.attributeValues.p_price.value,

                quantity: 1,

                image: product.attributeValues.p_image.value.downloadLink,
            });

            toast("Added to Cart", {
                description: `${product.attributeValues.p_title.value} has been added to your cart.`,

                duration: 5000,
            });
        }
    };
    return {
        productId,
        setProductId,
        product,
        relatedProducts,
        isLoading,
        handleAddToCart,
        router,
  }
}

export default useProduct