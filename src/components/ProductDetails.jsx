import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(res => setProduct(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id]);

    return (
        <>
            {product && <div className='container d-flex align-items-center justify-content-center pt-5'>
                <div id="webcrumbs">
                    <div className="w-[800px] bg-white rounded-2xl shadow-2xl p-8">
                        <header className="flex justify-between items-center mb-10 border-b pb-6">
                            <div className="flex items-center gap-6">
                                <img src={product?.image} alt={product?.title} className="w-24 h-24 object-cover rounded-xl hover:scale-105 transition-transform duration-300" />
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">{product?.title?.slice(0, 30)}</h1>
                                    <p className="text-gray-500 mt-2">{product?.description?.slice(0, 100)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <span className="material-symbols-outlined text-yellow-400">star</span>
                                    <span className="ml-1 text-gray-600">{product?.rating?.rate} ({product?.rating?.count} reviews)</span>
                                </div>
                                {/* <span className="material-symbols-outlined text-3xl text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">share</span> */}
                            </div>
                        </header>

                        <main className="grid grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-gray-600">category</span>
                                            <p style={{ textTransform: 'capitalize' }}>{product?.category}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-gray-600">inventory_2</span>
                                            <p>ID: #{product?.id}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-gray-600">verified</span>
                                            <p>Quality Assured</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Colors</h2>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-amber-700 cursor-pointer hover:scale-110 transition-transform"></div>
                                        <div className="w-12 h-12 rounded-full bg-slate-700 cursor-pointer hover:scale-110 transition-transform"></div>
                                        <div className="w-12 h-12 rounded-full bg-emerald-700 cursor-pointer hover:scale-110 transition-transform"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-800">${product?.price}</h2>
                                            <p className="text-green-500 mt-1">In Stock</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-white rounded-lg border border-gray-300">
                                                <button className="px-3 py-2 text-xl hover:bg-gray-100 transition-colors rounded-l-lg" onclick="this.parentElement.querySelector('input').stepDown()">-</button>
                                                <input type="number" className="w-16 text-center border-x border-gray-300 py-2" value="1" min="1" max="99" />
                                                <button className="px-3 py-2 text-xl hover:bg-gray-100 transition-colors rounded-r-lg" onclick="this.parentElement.querySelector('input').stepUp()">+</button>
                                            </div>
                                            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-gray-600">local_shipping</span>
                                        <p className="text-gray-600">Free shipping on orders over $100</p>
                                    </div>
                                </div>

                                <details className="group bg-gray-50 rounded-xl">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-gray-100 transition-colors duration-300">
                                        <h2 className="text-xl font-semibold text-gray-800">Product Specifications</h2>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-gray-600 group-open:rotate-180 transition-transform">expand_more</span>
                                            <span className="text-sm text-gray-500">Click to expand product specifications</span>
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6 space-y-3">
                                        <p>Material: Premium Quality</p>
                                        <p>Usage: Perfect for everyday</p>
                                    </div>
                                </details>
                            </div>
                        </main>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ProductDetails