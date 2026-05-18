from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite DB (you can later switch to MySQL/PostgreSQL)
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# =========================
# DB SESSION FUNCTION
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()