from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.review import Review

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


@router.post("/")
def add_review(
    user_id: int,
    product_id: int,
    rating: int,
    comment: str,
    db: Session = Depends(get_db)
):
    if rating < 1 or rating > 5:
        raise HTTPException(
            status_code=400,
            detail="Rating must be between 1 and 5"
        )

    review = Review(
        user_id=user_id,
        product_id=product_id,
        rating=rating,
        comment=comment
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return {
        "message": "Review Added Successfully",
        "review_id": review.id
    }


@router.get("/")
def get_reviews(
    db: Session = Depends(get_db)
):
    return db.query(Review).all()


@router.get("/product/{product_id}")
def get_product_reviews(
    product_id: int,
    db: Session = Depends(get_db)
):
    reviews = db.query(Review).filter(
        Review.product_id == product_id
    ).all()

    return reviews

@router.put("/{review_id}")
def update_review(
    review_id: int,
    rating: int,
    comment: str,
    db: Session = Depends(get_db)
):
    review = db.query(Review).filter(
        Review.id == review_id
    ).first()

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review Not Found"
        )

    if rating < 1 or rating > 5:
        raise HTTPException(
            status_code=400,
            detail="Rating must be between 1 and 5"
        )

    review.rating = rating
    review.comment = comment

    db.commit()

    return {
        "message": "Review Updated Successfully"
    }


@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db)
):
    review = db.query(Review).filter(
        Review.id == review_id
    ).first()

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review Not Found"
        )

    db.delete(review)
    db.commit()

    return {
        "message": "Review Deleted Successfully"
    }