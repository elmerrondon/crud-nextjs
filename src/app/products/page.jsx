import ProductCard from "@/components/ProductCard";

async function loadProducts() {
    const res = await fetch('http://localhost:3000'+'/api/products', { cache: 'no-store' });
    const data = await res.json();
    return data;
}

async function ProductsPage() {

    const products  = await loadProducts();

    

   return(
        <div className="container mx-auto px-4 py-8"> 
            {products.length === 0 ? (
                <p className="text-white text-center text-lg mt-8">No hay productos disponibles.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
                    {products.map(product => (
                        <ProductCard key={product.id} product={product}></ProductCard>
                    ))}
                </div>
            )}
        </div>
    );
}


export default ProductsPage;