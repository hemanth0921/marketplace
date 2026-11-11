from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.order import Order

router = APIRouter(
    prefix="/invoice",
    tags=["Invoice"]
)


@router.get("/{order_id}")
def generate_invoice(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order Not Found"
        )

    return {
        "invoice_no": f"INV-{order.id}",
        "order_id": order.id,
        "status": order.status,
        "message": "Invoice Generated Successfully"
    }