import React, { useState } from 'react'
import styles from '../styles/common.module.css';

const Filters = ({ categories, onSearch, onCategoryFilter, onPriceFilter, onRatingFilter }) => {

    let categoriesList = [...new Set(categories)];
    const [selectedCategory, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [rating, setRating] = useState(0);

    const handleCategoryFilter = (category) => {
        setCategory(category);
        onCategoryFilter(category);
    }

    const handlePriceRangeChange = (e) => {
        const { name, value } = e.target;
        setPriceRange(prevState => ({
            ...prevState,
            [name]: value
        }));

        onPriceFilter(priceRange);
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
        onRatingFilter(e.target.value);
    }


    return (
        <>
            <div className='py-3'>
                <input type='search' className='form-control' placeholder='Search products...' onChange={(e) => onSearch(e.target.value)} />

                <div className='mt-3'>
                    <label>Categories</label>
                    <ul className='list-group'>
                        <li className={`${'list-group-item'} ${styles.cursorPointer} ${selectedCategory === 'All' && 'active'}`} onClick={() => handleCategoryFilter('All')}>All</li>
                        {categoriesList && categoriesList.map(category => {
                            return (
                                <li className={`${'list-group-item'} ${styles.cursorPointer} ${selectedCategory === category && 'active'} ${styles.textCamelCase}`} key={category} onClick={() => handleCategoryFilter(category)}>{category}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className='mt-3'>
                    <label>Price: {priceRange.min} - {priceRange.max} </label>
                    <div className='row'>
                        <div className='col-6'>
                            <input type='range' className='form-range' step={5} name='min' min={0} max={1000} value={priceRange.min} onChange={(e) => handlePriceRangeChange(e)} />
                        </div>
                        <div className='col-6'>
                            <input type='range' className='form-range' step={5} name='max' min={0} max={1000} value={priceRange.max} onChange={(e) => handlePriceRangeChange(e)} />
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <label>Rating:{rating}</label>
                    <input type='range' className='form-range' step={0.1} min={0} max={5} value={rating} onChange={(e) => handleRatingChange(e)} />
                </div>
            </div>
        </>
    )
}

export default Filters