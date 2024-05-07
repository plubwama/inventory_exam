import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/products/${params.id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [params.id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">Product Details</h2>
            <h3 className="text-xl font-semibold">{product.productName}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-700">Price: ${product.price}</p>
            <p className="text-gray-700">Quantity: {product.quantity}</p>
            <p className="text-gray-700">Supplier: {product.supplier}</p>
            <p className="text-gray-700">Reorder Level: {product.reorderLevel}</p>
        </div>
    );
}

export default ProductDetails;
