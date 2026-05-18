from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    mobile = Column(String, unique=True, index=True)
    password = Column(String)

    user_id = Column(String, unique=True, index=True)

    role = Column(String)

    location = Column(String)
    business_name = Column(String)
    business_type = Column(String)