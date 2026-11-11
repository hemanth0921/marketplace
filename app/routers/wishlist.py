from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.wishlist import Wishlist

router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"]
)


@router.post("/")
def add_to_wishlist(
    user_id: int,
    product_id: int,
    db: Session = Depends(get_db)
):

    existing_item = db.query(Wishlist).filter(
        Wishlist.user_id == user_id,
        Wishlist.product_id == product_id
    ).first()

    if existing_item:
        raise HTTPException(
            status_code=400,
            detail="Product Already In Wishlist"
        )

    item = Wishlist(
        user_id=user_id,
        product_id=product_id
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return {
        "message": "Product Added To Wishlist",
        "wishlist_id": item.id
    }


@router.get("/")
def get_wishlist(
    db: Session = Depends(get_db)
):
    return db.query(Wishlist).all()


@router.get("/user/{user_id}")
def get_user_wishlist(
    user_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Wishlist).filter(
        Wishlist.user_id == user_id
    ).all()


@router.delete("/{wishlist_id}")
def remove_from_wishlist(
    wishlist_id: int,
    db: Session = Depends(get_db)
):
    item = db.query(Wishlist).filter(
        Wishlist.id == wishlist_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Wishlist Item Not Found"
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Product Removed From Wishlist"
    }