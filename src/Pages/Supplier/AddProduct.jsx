import React, { useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.stock) {
      toast.error("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...form,
    };

    setProducts([newProduct, ...products]);
    toast.success("Product added successfully");

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  const layoutContainerStyle = {
    display: "flex",
    gap: "32px",
    width: "100%",
    alignItems: "flex-start",
    boxSizing: "border-box",
    flexWrap: "wrap"
  };

  const formContainerStyle = {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
  };

  const rightSideContainerStyle = {
    flex: 1,
    minWidth: "320px",
    boxSizing: "border-box"
  };

  const listScrollStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxHeight: "480px",
    overflowY: "auto",
    paddingRight: "8px",
    boxSizing: "border-box"
  };

  return (
    <PageContainer>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ margin: "0 0 4px 0", fontSize: "24px", fontWeight: "700", color: "#0f172a" }}>
          Add Product
        </h2>
        <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
          Create and catalog new inventory items into the warehouse systems.
        </p>
      </div>

      <div style={layoutContainerStyle}>
        {/* LEFT COLUMN: FORM */}
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit}>
            <Input
              label="Product Name"
              name="name"
              placeholder="Enter product name..."
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Category"
              name="category"
              placeholder="Enter category..."
              value={form.category}
              onChange={handleChange}
            />

            <Input
              label="Price"
              name="price"
              type="number"
              placeholder="₹ 0.00"
              value={form.price}
              onChange={handleChange}
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              placeholder="Enter stock quantity..."
              value={form.stock}
              onChange={handleChange}
            />

            <Button type="submit" variant="primary" style={{ width: "100%", marginTop: "12px", height: "42px" }}>
              Add Product Item
            </Button>
          </form>
        </div>

        {/* RIGHT COLUMN: RECENTLY ADDED */}
        <div style={rightSideContainerStyle}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>
            Recently Added
          </h3>
          
          {products.length > 0 ? (
            <div style={listScrollStyle}>
              {products.map((p) => (
                <Card
                  key={p.id}
                  title={`${p.category} • ${p.stock} Units`}
                  value={`₹${Number(p.price).toLocaleString("en-IN")}`}
                  icon={
                    <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", display: "block" }}>
                        {p.name}
                      </span>
                    </div>
                  }
                />
              ))}
            </div>
          ) : (
            <div 
              style={{
                border: "2px dashed #e2e8f0",
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "14px"
              }}
            >
              No products added during this session yet.
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
