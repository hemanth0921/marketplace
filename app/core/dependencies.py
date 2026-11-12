from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.core.security import (
    SECRET_KEY,
    ALGORITHM
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/users/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise credentials_exception

        return payload

    except JWTError:
        raise credentials_exception


def admin_required(
    current_user=Depends(get_current_user)
):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user


def vendor_required(
    current_user=Depends(get_current_user)
):
    if current_user.get("role") != "vendor":
        raise HTTPException(
            status_code=403,
            detail="Vendor access required"
        )

    return current_user


def customer_required(
    current_user=Depends(get_current_user)
):
    if current_user.get("role") != "customer":
        raise HTTPException(
            status_code=403,
            detail="Customer access required"
        )

    return current_user