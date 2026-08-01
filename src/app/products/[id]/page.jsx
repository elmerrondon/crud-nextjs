import Buttons from "./Buttons.jsx";
import { conn } from "@/libs/mysql";

async function loadProduct(id) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id = ?", [id]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    return null;
  }
}

async function ProductPage({ params }) {
  const { id } = await params;
  const product = await loadProduct(id);

  if (!product) {
    return (
      <section className="flex justify-center items-center py-10">
        <h1 className="text-3xl text-white">Producto no encontrado</h1>
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center py-10">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="p-8 md:p-10 bg-gray-800 text-white md:w-1/2">
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            {product.name}
          </h1>
          <h2 className="text-5xl font-extrabold text-blue-400 mb-6">
            {product.price}$
          </h2>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            {product.description}
          </p>
          <Buttons productId={id}></Buttons>
        </div>
        <div className="md:w-1/2 flex items-center justify-center p-4 bg-gray-900">
          <img
            className="w-full max-h-96 object-contain rounded-lg shadow-inner"
            src={product.image}
            alt={product.name}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
