"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams} from "next/navigation";

function ProductForm(){

    const [product, setProduct] = useState({name: "", price: 0, description: ""});
    const [file, setFile] = useState(null);

    const form = useRef(null);

    const router = useRouter();

    const params = useParams();

    useEffect(() => {
        if(params.id) {
            axios.get(`/api/products/` + params.id)
            .then(res => {
                setProduct({
                    name: res.data.name,
                    price: res.data.price,
                    description: res.data.description
                })
            })
        }
    }, []);
    
    const handleChnage = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
         const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            

            if(file){
                formData.append('image', file);
            }


        if(!params.id){
             const res = await axios.post(`/api/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
             });
             console.log(res);
        } else {
            const res = await axios.put(`/api/products/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
        }
        
          form.current.reset();
          router.push("/products");
    }

    return(
       <div>
         <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit} ref={form}>
                <label htmlFor="name" className="block text-gray-700  text-sm font-bold mb-2">Product Name: </label>
                <input type="text" required className="text-gray-800 shadow appearance-none border rounded w-full py-2 px-3" autoFocus id="name" name="name" placeholder="name" onChange={handleChnage} value={product.name}/>
                <label htmlFor="price" className="block text-gray-700  text-sm font-bold mb-2">Product Price: </label>
                <input type="text" className="text-gray-800 shadow appearance-none border rounded w-full py-2 px-3" id="price" name="price" placeholder="price" onChange={handleChnage} value={product.price}/>
                <label htmlFor="description" className="block text-gray-700  text-sm font-bold mb-2">Product Description: </label>
                <textarea rows={3} className="text-gray-800 shadow appearance-none border rounded w-full py-2 px-3" id="description" name="description" placeholder="description" onChange={handleChnage} value={product.description}/>
                <label htmlFor="productImage" className="block text-gray-700  text-sm font-bold mb-2">Product Image: </label>
                <input type="file" className="text-gray-800 shadow appearance-none border rounded w-full py-2 px-3 mb-2" onChange={(e) => setFile(e.target.files[0])}/>
                {file && <img className="w-96 object-contain mx-auto my-4" src={URL.createObjectURL(file)} alt={file.name} />}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">{params.id ? "Edit Product" : "Save Product"}</button>
        </form>
       </div>
    );
}


export default ProductForm;