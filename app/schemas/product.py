from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    category: Optional[str] = None
    image_url: Optional[str] = None


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    category: Optional[str] = None
    image_url: Optional[str] = None

    class Config:
        from_attributes = True