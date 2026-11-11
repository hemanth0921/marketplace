from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.routers import user
from app.routers import vendor
from app.routers import product
from app.routers import cart
from app.routers import order
from app.routers import payment
from app.routers import admin
from app.routers import wishlist
from app.routers import review
from app.routers import invoice
from app.routers import analytics

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)

app.include_router(user.router)
app.include_router(vendor.router)
app.include_router(product.router)
app.include_router(cart.router)
app.include_router(order.router)
app.include_router(payment.router)
app.include_router(admin.router)
app.include_router(wishlist.router)
app.include_router(review.router)
app.include_router(invoice.router)
app.include_router(analytics.router)


@app.get("/", response_class=HTMLResponse)
def home():
    return Path("app/templates/home.html").read_text(
        encoding="utf-8"
    )


@app.get("/register", response_class=HTMLResponse)
def register_page():
    return Path("app/templates/register.html").read_text(
        encoding="utf-8"
    )


@app.get("/login", response_class=HTMLResponse)
def login_page():
    return Path("app/templates/login.html").read_text(
        encoding="utf-8"
    )


@app.get("/cart-page", response_class=HTMLResponse)
def cart_page():
    return Path("app/templates/cart.html").read_text(
        encoding="utf-8"
    )


@app.get("/orders-page", response_class=HTMLResponse)
def orders_page():
    return Path("app/templates/orders.html").read_text(
        encoding="utf-8"
    )


@app.get("/vendor-dashboard", response_class=HTMLResponse)
def vendor_dashboard():
    return Path("app/templates/vendor_dashboard.html").read_text(
        encoding="utf-8"
    )


@app.get("/profile", response_class=HTMLResponse)
def profile_page():
    return Path("app/templates/profile.html").read_text(
        encoding="utf-8"
    )


@app.get("/admin-dashboard", response_class=HTMLResponse)
def admin_dashboard():
    return Path("app/templates/admin_dashboard.html").read_text(
        encoding="utf-8"
    )


@app.get("/wishlist-page", response_class=HTMLResponse)
def wishlist_page():
    return Path("app/templates/wishlist.html").read_text(
        encoding="utf-8"
    )


@app.get("/invoice-page", response_class=HTMLResponse)
def invoice_page():
    return Path("app/templates/invoice.html").read_text(
        encoding="utf-8"
    )


@app.get("/checkout", response_class=HTMLResponse)
def checkout_page():
    return Path("app/templates/checkout.html").read_text(
        encoding="utf-8"
    )

@app.get("/payment-page", response_class=HTMLResponse)
def payment_page():
    return Path("app/templates/payment.html").read_text(
        encoding="utf-8"
    )

@app.get("/reviews-page", response_class=HTMLResponse)
def reviews_page():
    return Path("app/templates/reviews.html").read_text(
        encoding="utf-8"
    )

@app.get("/vendor-products", response_class=HTMLResponse)
def vendor_products():
    return Path(
        "app/templates/vendor_products.html"
    ).read_text(
        encoding="utf-8"
    )