from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.models.product import Product
from app.models.order import Order
from app.models.payment import Payment
from app.models.user import User
from app.models.vendor import Vendor

router = APIRouter()


@router.get("/analytics")
def analytics(
    db: Session = Depends(get_db)
):

    total_users = db.query(User).count()

    total_vendors = db.query(Vendor).count()

    total_products = db.query(Product).count()

    total_orders = db.query(Order).count()

    total_revenue = db.query(
        func.sum(Payment.amount)
    ).scalar() or 0

    return {
        "total_users": total_users,
        "total_vendors": total_vendors,
        "total_products": total_products,
        "total_orders": total_orders,
        "total_revenue": total_revenue
    }