import Link from "next/link";

function Navbar(){
    return(
        <nav className="bg-gray-900 text-white py-4 shadow-lg border-b border-gray-800">
            <div className="container mx-auto flex justify-between items-center px-6"> 
                
                <Link href="/products" className="hover:text-blue-300 transition duration-300">
                    <h3 className="text-2xl font-bold text-blue-400">NextJSMysql</h3>
                </Link>
                
                <ul>
                    <li>
                        <Link 
                            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-lg transition duration-300" 
                            href="/new"
                        >
                            ➕ Crear Producto
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;