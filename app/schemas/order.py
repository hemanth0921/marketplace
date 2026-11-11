from pydantic import BaseModel
from typing import Optional


class OrderCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int


class OrderResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    status: str
    total_amount: float

    class Config:
        from_attributes = True