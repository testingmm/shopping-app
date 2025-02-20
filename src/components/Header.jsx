import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBagShopping } from 'react-icons/fa6';

const Header = ({ cartItems }) => {
    const cartIconStyle = {
        fontSize: '22px',
        cursor: 'pointer'
    }

    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    }

    return (
        <div className="container-fluid">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <b>Shopping App</b>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    {/* <li><Link to='/' className="nav-link px-2 link-secondary">Home</Link></li> */}
                    <li><Link to='/products' className="nav-link px-2">Products</Link></li>
                </ul>

                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <FaBagShopping style={cartIconStyle} onClick={handleCartClick} /> <sup>
                        <span className='badge bg-primary'>{cartItems || 0}</span>
                    </sup>
                </div>
            </header>
        </div>
    )
}

export default Header