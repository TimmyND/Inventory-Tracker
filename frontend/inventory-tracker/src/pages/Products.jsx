import { useState } from 'react';
import { NewProduct } from '../components/NewProduct.jsx';

function Product({name, description, placeholder=false, ...props}) {
    function onClick(event) {
        event.preventDefault();
    }

    if (placeholder) {
        return (
            <details className="accordion-item placeholder-wave" onClick={onClick}>
                <summary className="accordion-header placeholder">
                    <svg className="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"
                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2 5 6 6 6-6" />
                    </svg>
                </summary>
            </details>
        )
    }

    return (
        <details className="accordion-item" name="to-order-list">
            <summary className="accordion-header">{name}
                <svg className="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m2 5 6 6 6-6" />
                </svg>
            </summary>
            <div className="accordion-body">{description}</div>
        </details>
    )
}

export function Products({user, ...props}) {
    const [products, setProducts] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Get the items to order
    async function getProducts() {
        // Get the items from the server
        let products = [];
        try {
            const response = await fetch('/products/', {
                headers: { Authorization: "Token " + user.token },
            });
            const data = await response.json();

            if (data.success) {
                products = data.products;
            } else {
                setErrorMessage('Could not load items to order');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Could not connect to the server. Please try again later.');
        }

        // Create the product elements
        let productElements = [];
        for (const product of products) {
            productElements.push(<Product key={product.id} name={product.name} description={product.name} />);
        }

        setProducts(productElements);
    }

    if (products === null) {
        getProducts();
    }

    let displayProducts = [];
    if (products === null) {
        displayProducts = [
            <Product key="placeholder1" placeholder={true} name="Item 1" description="Description 1" />,
            <Product key="placeholder2" placeholder={true} name="Item 2" description="Description 2" />,
            <Product key="placeholder3" placeholder={true} name="Item 3" description="Description 3" />,
            <Product key="placeholder4" placeholder={true} name="Item 4" description="Description 4" />
        ];
    } else {
        displayProducts = products;
    }

    return (
        <div className="container-fluid">
            <h3>Products</h3>
            <div>
                <button className="btn-solid theme-success ms-auto d-block" data-bs-toggle="dialog" data-bs-target="#new-product-dialog">New Product</button>
                <NewProduct id="new-product-dialog" user={user} reloadProducts={getProducts} />
            </div>
            <div className="accordion mt-5">
                {...displayProducts}
            </div>
        </div>
    );
}