import { useState } from 'react';

export function Login({setPage, handleLogin, ...props}) {
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsernameChange(e) {
        setErrorMessage("");
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setErrorMessage("");
        setPassword(e.target.value);
    }

    async function handleServerLogin() {
        // Make the request to the server
        try {
            const response = await fetch('/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const data = await response.json();

            if (data.success) {
                const user = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    isModerator: data.is_moderator === true,
                    token: data.token,
                };
                handleLogin(user);
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Could not connect to the server. Please try again later.');
        }
    }

    async function handleSubmit(e) {
        // Prevent actual submission
        e.preventDefault();

        // Handle login
        handleServerLogin();
    }

    return (
        <div>    
            <h1 className="text-center" style={{marginTop: "2rem"}}>Fresh Cut Inventory Tracker</h1>
            <div className="p-4 mt-5">
                <form method="POST" data-bs-validate onSubmit={handleSubmit}>
                    <div className="card w-100" style={{height: "min(100%, 250px)"}}>
                        <div className="card-body">
                            <div className={"invalid-feedback " + (errorMessage ? "d-block" : "")}>{errorMessage}</div>
                            <div className="row">
                                <label className="form-label" htmlFor="username">Username</label>
                                <input required type="text" className="form-control" id="username" name="username" autoComplete="username"
                                    onChange={handleUsernameChange}  />
                                <div id="usernameFeedback" className="invalid-feedback">Please enter a username</div>
                            </div>
                            <div className="row">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input required type="password" className="form-control" id="password" name="password" autoComplete="current-password"
                                    onChange={handlePasswordChange} />
                                <div id="passwordFeedback" className="invalid-feedback">Please enter a password</div>
                            </div>
                            <div className="row">
                                <button type="submit" className="btn-solid theme-primary">Log In</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}