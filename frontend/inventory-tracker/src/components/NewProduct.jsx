import { useState } from 'react';

export function NewProduct({user, id, reloadProducts, ...props}) {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function onNameChange(event) {
        setName(event.target.value);
    }

    async function onSubmit(event) {
        event.preventDefault();

        // Verify the input
        if (name.trim().length == 0) {
            setErrorMessage("Please enter the product name");
            return;
        }

        // Create the product
        const postData = {
            name: name,
            department: "Produce"
        };
        try {
            const response = await fetch('/product/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + user.token
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();

            if (data.success) {
                // Close dialog and add product
                document.getElementById(id).querySelector("*[data-bs-dismiss=\"dialog\"]").click();
                reloadProducts();
            } else {
                setErrorMessage('Could not load items to order');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Could not connect to the server. Please try again later.');
        }
    }

    return (
        <dialog className="dialog" id={id} {...props}>
            <form className="container" onSubmit={onSubmit}>
                <div className="dialog-header">
                    <h1 className="dialog-title">Dialog title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="dialog" aria-label="Close"></button>
                </div>
                <div className="dialog-body">
                    <div className="row">
                        <label className="form-label" htmlFor="name">Product Name</label>
                        <input required type="text" className="form-control" id="name" name="name"
                            onChange={onNameChange}  />
                        <div className={"invalid-feedback " + (errorMessage ? "d-block" : "")}>{errorMessage}</div>
                    </div>
                </div>
                <div className="dialog-footer">
                    <button type="button" className="btn-solid theme-secondary" data-bs-dismiss="dialog">Close</button>
                    <button type="submit" className="btn-solid theme-primary">Create Product</button>
                </div>
            </form>
        </dialog>
    );
}