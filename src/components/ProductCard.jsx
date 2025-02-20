import React from 'react'
import styles from '../styles/common.module.css';
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(product);
    }

    const handleOnView = () => {
        navigate(`/products/details/${product.id}`)
    }
    return (
        <>
            <div className="card mb-2 position-relative">
                <img src={product.image} className={`${'card-img-top p-2'} ${styles.image}`} alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product.title.slice(0, 15)}</h5>
                    <p className="card-text">{product.description.slice(0, 35)}</p>
                    <div className='d-flex justify-content-between align-items-center'>
                        <b>{product.price}$</b>
                        <b>{product.rating.rate}</b>
                    </div>
                </div>
                <TbShoppingBagPlus className={`${styles.cartIcon}`} onClick={(e) => handleAddToCart(e)} />
                <FaRegEye className={`${styles.viewIcon}`} onClick={(e) => handleOnView(e)} />
            </div>
        </>
    )
}

export default ProductCard