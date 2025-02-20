import App from './App';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

const routes = [
    {
        path: '/', element: <App />, children: [
            { index: true, element: <ProductsList /> },
            { path: '/products', element: <ProductsList /> },
            { path: '/products/details/:id', element: <ProductDetails /> },
            { path: '/cart', element: <Cart /> }
        ]
    },
]

export default routes;