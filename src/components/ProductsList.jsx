import React, { useEffect, useMemo, useState } from 'react'
import Filters from './Filters';
import ProductCard from './ProductCard';
import { useOutletContext } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [rating, setRating] = useState(0);
    const { cart, setCart } = useOutletContext();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(res => { setProducts(res); setProductsToShow(res) })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])


    const filterProductsMemo = useMemo(() => {
        if (loading) {
            return [];
        }

        let filteredProds = [...products];

        if (searchTerm) {
            filteredProds = filteredProds.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (selectedCategory !== 'All' && selectedCategory) {
            filteredProds = filteredProds.filter(product => product.category === selectedCategory);
        }

        if (priceRange && priceRange.max !== 0) {
            if (priceRange.min <= priceRange.max) {
                filteredProds = filteredProds.filter(product => product.price >= priceRange.min && product.price <= priceRange.max);
            }
        }

        if (rating) {
            filteredProds = filteredProds.filter(product => product.rating.rate >= rating);
        }

        return filteredProds;
    }, [products, searchTerm, loading, selectedCategory, priceRange, rating]);

    useEffect(() => {
        setProductsToShow(filterProductsMemo);
    }, [filterProductsMemo]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    }

    const handleFilterByCategory = (category) => {
        setSelectedCategory(category);
    }

    const handleFilterByPrice = (priceRange) => {
        let min = parseInt(priceRange.min);
        let max = parseInt(priceRange.max);
        setPriceRange({ min, max })
    }

    const handleFilterByRating = (rating) => {
        setRating(rating);
    }

    const handleAddToCart = (product) => {
        let prods = [...cart];
        let findProduct = prods.find(prod => prod.id === product.id);
        if (findProduct) {
            findProduct.quantity += 1;
        } else {
            product.quantity = 1;
            prods.push(product);
        }
        setCart(prods);
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-2 border-end'>
                        <Filters categories={products.map(product => product.category)} onSearch={handleSearch}
                            onCategoryFilter={handleFilterByCategory} onPriceFilter={handleFilterByPrice} onRatingFilter={handleFilterByRating} />
                    </div>
                    <div className='col-10'>
                        <div className='row py-3'>
                            {loading && <h5 className='text-center'>Loading...</h5>}
                            {!loading && productsToShow.length > 0 && productsToShow.map(product => {
                                return (
                                    <div className='col-lg-3 col-md-3 col-sm-6' key={product.id}>
                                        <ProductCard product={product} addToCart={handleAddToCart} />
                                    </div>
                                )
                            })}

                            {!loading && productsToShow.length === 0 && <h5 className='text-center'>No products found!</h5>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsList