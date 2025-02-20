import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { IoBagRemoveOutline } from "react-icons/io5";
import styles from '../styles/common.module.css';

const Cart = () => {
    const { cart, setCart } = useOutletContext();

    const handleRemoveProduct = (id) => {
        let prods = [...cart];
        let updatedProds = prods.filter(p => p.id !== id);
        setCart(updatedProds);
    }

    return (
        <>
            <div className='container p-5'>
                <h5>Cart</h5>
                {cart.length === 0 && <p className='text-center' style={{ maxWidth: '540px' }}>Your cart is empty.</p>}
                {cart && cart.length > 0 && cart.map(product => {
                    return (
                        <div className="card mb-3 position-relative" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4 p-2">
                                    <img src={product.image} className="img-fluid rounded-start" alt={product.title} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description.slice(0, 100)}</p>
                                        <div className='d-flex justify-content-between align-items-center border-bottom pb-1'>
                                            <span>Quantity: <b>{product.quantity}</b></span>
                                            <span>Price: <b> {product.price}$</b></span>
                                        </div>
                                        <div className='text-end'>
                                            <b> Total: {product.price * product.quantity}$</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <IoBagRemoveOutline className={`${styles.removeProductIcon}`} onClick={() => handleRemoveProduct(product.id)} />
                        </div>
                    )
                })}

                <div className='text-end border-top pt-2' style={{ maxWidth: '540px' }}>
                    <b>Total: {cart && cart.length > 0 && (cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2) ?? 0)}$</b>
                </div>
            </div >
        </>
    )
}

export default Cart