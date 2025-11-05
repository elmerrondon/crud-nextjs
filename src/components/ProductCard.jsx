import Link from "next/link";

function ProductCard({product}){
    return(
        <Link 
            className="bg-gray-800 rounded-xl shadow-lg mb-4 transition duration-300 hover:bg-gray-700 hover:shadow-2xl border border-gray-700 block" 
            href={`/products/${product.id}`}
        >
            {product.image && 
                <div className="w-full h-40 flex items-center justify-center bg-gray-600 rounded-t-xl border-b border-gray-700"> 
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain p-4" 
                    />
                </div>
            }
            
            <div className="p-4">
                <h1 className="text-xl font-bold text-white mb-1">{product.name}</h1>
                
                <h2 className="text-2xl font-extrabold text-blue-400 mb-2">{product.price}$</h2>
                
                <p className="text-sm text-gray-400 truncate">{product.description}</p>
            </div>
        </Link>
    );
}

export default ProductCard;