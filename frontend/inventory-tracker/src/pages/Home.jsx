import { useState } from 'react';

function Item({name, description, placeholder=true, ...props}) {
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
                    stroke="currentColor" stroke-linecap="round" strokeLinejoin="round">
                    <path d="m2 5 6 6 6-6" />
                </svg>
            </summary>
            <div className="accordion-body">{description}</div>
        </details>
    )
}

export function Home({user, ...props}) {
    const [itemsToOrder, setItemsToOrder] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Get the items to order
    async function getItemsToOrder() {
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

        // Create the item elements
        let items = [];
        for (const product of products) {
            items.push(<Item key={product.id} name={product.name} description={product.name} />);
        }

        setItemsToOrder(items);
    }

    // Get the upcoming Sunday
    function getNextSunday() {
        let date = new Date();
        do {
            date.setDate(date.getDate() + 1)
        } while (date.getDay() != 0);

        return date;
    }

    function getArrivingDate(orderedDate) {
        let newDate = new Date(orderedDate);
        newDate.setDate(newDate.getDate() + 10);

        return newDate;
    }

    if (itemsToOrder === null) {
        getItemsToOrder();
    }

    let displayItems = [];
    if (itemsToOrder === null) {
        displayItems = [
            <Item key="placeholder1" name="Item 1" description="Description 1" />,
            <Item key="placeholder2" name="Item 2" description="Description 2" />,
            <Item key="placeholder3" name="Item 3" description="Description 3" />,
            <Item key="placeholder4" name="Item 4" description="Description 4" />
        ];
    } else {
        displayItems = itemsToOrder;
    }

    return (
        <div className="container-fluid">
            <h3>To Order</h3>
            <div className="row row-cols-2 mb-3">
                <span className="fs-5 d-block">{getNextSunday().toLocaleDateString("en-US", {})}</span>
                <span className="fs-5 d-block">Arriving: {getArrivingDate(getNextSunday()).toLocaleDateString("en-US", {})}</span>
            </div>
            <div className="accordion mt-5">
                {...displayItems}
            </div>
        </div>
    );
}