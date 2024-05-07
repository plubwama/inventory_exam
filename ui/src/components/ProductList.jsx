import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import { Link, useLocation } from 'react-router-dom';

const ProductList = () => {

    const location = useLocation();

    const { products, setProducts } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchError, setSearchError] = useState('');

    const getProducts = async () => {
        try {
            let response;
            if (searchQuery) {
                response = await fetch(`http://localhost:4000/products/search?name=${searchQuery}`);
            } else {
                response = await fetch('http://localhost:4000/products');
            }
            const result = await response.json();

            if (result.status === 'SUCCESS') {
                setProducts(result.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setSearchError('Error fetching products');
        }
    };

    useEffect(() => {
        getProducts();
    }, [searchQuery, setProducts]);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Product List</h1>
                        <Link to="/add" state={{ background: location }} className="btn btn-primary">
                            Add New Product
                        </Link>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Product"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {searchError && <p>{searchError}</p>}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Supplier</th>
                                <th>Reorder Level</th>
                                <th>Comment</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.productName}</td>
                                    <td>{product.SKU}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.supplier}</td>
                                    <td>{product.reorderLevel}</td>
                                    <td>{product.comment}</td>
                                    {/* <td>
                                        <Link to={`/details/${product._id}`}>Details</Link>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
