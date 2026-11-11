from app.database.database import engine, Base

from app.models.user import User
from app.models.vendor import Vendor
from app.models.product import Product
from app.models.cart import Cart
from app.models.order import Order
from app.models.payment import Payment
from app.models.wishlist import Wishlist
from app.models.review import Review

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully")