from sqlalchemy import Column, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(String(20), unique=True, index=True)

    mobile = Column(String(15), unique=True, index=True, nullable=False)

    location = Column(String(100))
    business_name = Column(String(100))
    business_type = Column(String(100))

    role = Column(String(20), nullable=False)

    password = Column(String(100), nullable=False)