from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional


class VendorCreate(BaseModel):
    shop_name: str = Field(..., min_length=3, max_length=100)
    owner_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    phone: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):
        if not value.isdigit():
            raise ValueError("Phone number must contain only digits")

        if len(value) != 10:
            raise ValueError("Phone number must be 10 digits")

        return value


class VendorUpdate(BaseModel):
    shop_name: Optional[str] = Field(
        None,
        min_length=3,
        max_length=100
    )

    owner_name: Optional[str] = Field(
        None,
        min_length=3,
        max_length=100
    )

    email: Optional[EmailStr] = None

    phone: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):
        if value is None:
            return value

        if not value.isdigit():
            raise ValueError(
                "Phone number must contain only digits"
            )

        if len(value) != 10:
            raise ValueError(
                "Phone number must be 10 digits"
            )

        return value


class VendorResponse(BaseModel):
    id: int
    shop_name: str
    owner_name: str
    email: EmailStr
    phone: str

    class Config:
        from_attributes = True