function NavBarItem({currentPage, content, pageLabel, setPage, ...props}) {
    function onClick() {
        // Set the new page
        setPage(pageLabel);

        // Close the navbar popup if on mobile
        document.getElementById("dismiss-navbar-btn").click();
    }

    const isActive = currentPage == pageLabel;

    // Get the className based on active
    let className = "nav-link";
    if (isActive) {
        className = "nav-link active";
    }

    return (
        <>
            <li className="nav-item">
                <a onClick={onClick} className={className} href="#" {...props}>{content}</a>
            </li>
        </>
    )
}

export function NavBar({page, setPage, ...props}) {
    return (
        <nav className="navbar md:navbar-expand bg-1 fg-2 mb-5">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Fresh Cut Inventory</a>
                <button className="btn-icon navbar-toggler" type="button" data-bs-toggle="drawer" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" aria-hidden="true"></span>
                </button>
                <dialog className="drawer drawer-end" tabIndex={-1} id="navbarText" aria-labelledby="navbarTextLabel">
                    <div className="drawer-header">
                        <h5 className="drawer-title" id="navbarTextLabel">Fresh Cut</h5>
                        <button id="dismiss-navbar-btn" type="button" className="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
                    </div>
                    <div className="drawer-body">
                        <ul className="navbar-nav me-auto mb-2 md:mb-0">
                            <NavBarItem currentPage={page} setPage={setPage} content="Home" pageLabel="HomePage" />
                            <NavBarItem currentPage={page} setPage={setPage} content="Products" pageLabel="ProductsPage" />
                            <NavBarItem currentPage={page} setPage={setPage} content="Order List" pageLabel="OrderListPage" />
                            <NavBarItem currentPage={page} setPage={setPage} content="Past Orders" pageLabel="PastOrdersPage" />
                            <NavBarItem currentPage={page} setPage={setPage} content="Log Out" pageLabel="LogoutPage" />
                        </ul>
                    </div>
                </dialog>
            </div>
        </nav>
    )
}