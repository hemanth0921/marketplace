from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.vendor import Vendor
from app.schemas.vendor import (
    VendorCreate,
    VendorUpdate
)

router = APIRouter(
    prefix="/vendors",
    tags=["Vendors"]
)


@router.post("/")
def create_vendor(
    vendor: VendorCreate,
    db: Session = Depends(get_db)
):

    existing_vendor = db.query(Vendor).filter(
        Vendor.email == vendor.email
    ).first()

    if existing_vendor:
        raise HTTPException(
            status_code=400,
            detail="Vendor Email Already Exists"
        )

    new_vendor = Vendor(
        shop_name=vendor.shop_name,
        owner_name=vendor.owner_name,
        email=vendor.email,
        phone=vendor.phone
    )

    db.add(new_vendor)
    db.commit()
    db.refresh(new_vendor)

    return {
        "message": "Vendor Created Successfully",
        "vendor_id": new_vendor.id
    }


@router.get("/")
def get_vendors(
    db: Session = Depends(get_db)
):
    return db.query(Vendor).all()


@router.get("/{vendor_id}")
def get_vendor(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    vendor = db.query(Vendor).filter(
        Vendor.id == vendor_id
    ).first()

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor Not Found"
        )

    return vendor


@router.put("/{vendor_id}")
def update_vendor(
    vendor_id: int,
    vendor_data: VendorUpdate,
    db: Session = Depends(get_db)
):

    vendor = db.query(Vendor).filter(
        Vendor.id == vendor_id
    ).first()

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor Not Found"
        )

    update_data = vendor_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(vendor, key, value)

    db.commit()
    db.refresh(vendor)

    return {
        "message": "Vendor Updated Successfully"
    }


@router.delete("/{vendor_id}")
def delete_vendor(
    vendor_id: int,
    db: Session = Depends(get_db)
):
    vendor = db.query(Vendor).filter(
        Vendor.id == vendor_id
    ).first()

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor Not Found"
        )

    db.delete(vendor)
    db.commit()

    return {
        "message": "Vendor Deleted Successfully"
    }