from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.models.user import User
from app.models.vendor import Vendor
from app.models.product import Product
from app.models.order import Order
from app.models.payment import Payment

router = APIRouter()


@router.get("/admin/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    total_users = db.query(User).count()

    total_vendors = db.query(Vendor).count()

    total_products = db.query(Product).count()

    total_orders = db.query(Order).count()

    total_payments = db.query(Payment).count()

    pending_orders = db.query(Order).filter(
        Order.status == "Pending"
    ).count()

    delivered_orders = db.query(Order).filter(
        Order.status == "Delivered"
    ).count()

    cancelled_orders = db.query(Order).filter(
        Order.status == "Cancelled"
    ).count()

    total_revenue = db.query(
        func.sum(Payment.amount)
    ).scalar()

    if total_revenue is None:
        total_revenue = 0

    return {

        "total_users": total_users,

        "total_vendors": total_vendors,

        "total_products": total_products,

        "total_orders": total_orders,

        "total_payments": total_payments,

        "pending_orders": pending_orders,

        "delivered_orders": delivered_orders,

        "cancelled_orders": cancelled_orders,

        "total_revenue": total_revenue

    }