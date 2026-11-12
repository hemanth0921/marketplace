from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.cart import Cart
from app.schemas.cart import CartCreate

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


@router.post("/")
def add_to_cart(
    cart: CartCreate,
    db: Session = Depends(get_db)
):
    existing_cart = db.query(Cart).filter(
        Cart.user_id == cart.user_id,
        Cart.product_id == cart.product_id
    ).first()

    if existing_cart:
        existing_cart.quantity += cart.quantity
        db.commit()

        return {
            "message": "Cart Updated",
            "cart_id": existing_cart.id
        }

    new_cart = Cart(
        user_id=cart.user_id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )

    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)

    return {
        "message": "Product Added To Cart",
        "cart_id": new_cart.id
    }


@router.get("/")
def get_all_cart_items(
    db: Session = Depends(get_db)
):
    return db.query(Cart).all()


@router.get("/")
def get_all_cart_items(
    db: Session = Depends(get_db)
):
    try:
        carts = db.query(Cart).all()
        return carts
    except Exception as e:
        return {"error": str(e)}


@router.put("/{cart_id}")
def update_cart_quantity(
    cart_id: int,
    quantity: int,
    db: Session = Depends(get_db)
):
    cart = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not cart:
        raise HTTPException(
            status_code=404,
            detail="Cart Item Not Found"
        )

    cart.quantity = quantity

    db.commit()

    return {
        "message": "Cart Updated"
    }


@router.delete("/{cart_id}")
def delete_cart_item(
    cart_id: int,
    db: Session = Depends(get_db)
):
    cart = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not cart:
        raise HTTPException(
            status_code=404,
            detail="Cart Item Not Found"
        )

    db.delete(cart)
    db.commit()

    return {
        "message": "Item Removed From Cart"
    }