from pydantic import BaseModel
from typing import Optional


class CartCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int


class CartUpdate(BaseModel):
    quantity: int


class CartResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int

    class Config:
        from_attributes = True