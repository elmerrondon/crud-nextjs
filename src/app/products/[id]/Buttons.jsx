"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ productId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Estas seguro de eliminar este producto")) {
      try {
        const res = await axios.delete(`/api/products/${productId}`);
        if (res.status === 204 || res.status === 200) {
          router.push("/products");
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditForm = () => {
    router.push(`/products/edit/${productId}`);
  };

  return (
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
        onClick={handleEditForm}
      >
        Edit
      </button>
    </div>
  );
}

export default Buttons;
