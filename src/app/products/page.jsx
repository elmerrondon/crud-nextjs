import ProductCard from "@/components/ProductCard";
import { conn } from "@/libs/mysql";

async function loadProducts() {
  try {
    const products = await conn.query("SELECT * FROM product");
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function ProductsPage() {
  const products = await loadProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {products.length === 0 ? (
        <p className="text-white text-center text-lg mt-8">
          No hay productos disponibles.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
