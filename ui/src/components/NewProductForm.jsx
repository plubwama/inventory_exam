import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const NewProductForm = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productName: '',
        SKU: '',
        price: '',
        quantity: '',
        supplier: '',
        reorderLevel: '',
        comments: ''
    });
    const [saving, setSaving] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            let response = await fetch('http://localhost:4000/products/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product), // Send the product data in the request body
            });
            // Handle response here

            navigate('/')
        } catch (error) {
            // Handle error here
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    return (
        <>
            <div className='container' style={{ marginTop: '100px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className='mb-2'>
                            <h1>Add New Product</h1>
                            <p>Enter new product information.</p>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="sku">Product SKU:</label>
                                <input type="text" className="form-control" id="sku" name="SKU" value={product.SKU} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="productName">Product Name:</label>
                                <input type="text" className="form-control" id="productName" name="productName" value={product.productName} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price:</label>
                                <input type="number" className="form-control" id="price" name="price" step="0.01" value={product.price} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantity">Quantity:</label>
                                <input type="number" className="form-control" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="supplier">Supplier:</label>
                                <input type="text" className="form-control" id="supplier" name="supplier" value={product.supplier} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reorderLevel">Reorder Level:</label>
                                <input type="text" className="form-control" id="reorderLevel" name="reorderLevel" value={product.reorderLevel} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="comment">Comment:</label>
                                <input type="text" className="form-control" id="comment" name="comment" value={product.comment} onChange={handleChange} required />
                            </div>

                            <button type="submit" className="btn btn-primary mt-4">Save Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewProductForm;
