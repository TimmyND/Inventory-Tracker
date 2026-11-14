<nav class="navbar md:navbar-expand bg-1 fg-2 mb-5">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Fresh Cut Inventory</a>
        <button class="btn-icon navbar-toggler" type="button" data-bs-toggle="drawer" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" aria-hidden="true"></span>
        </button>
        <dialog class="drawer drawer-end" tabindex="-1" id="navbarText" aria-labelledby="navbarTextLabel">
            <div class="drawer-header">
                <h5 class="drawer-title" id="navbarTextLabel">Fresh Cut</h5>
                <button type="button" class="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
            </div>
            <div class="drawer-body">
                <ul class="navbar-nav me-auto mb-2 md:mb-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Order List</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Past Orders</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout.php">Log Out</a>
                    </li>
                </ul>
            </div>
        </dialog>
    </div>
</nav>
<!-- TODO: setup active links -->