import React, { useState } from "react";
import { useAdmin } from "../../Context/AdminContext";

export default function Products() {
  const { products, loading, logActivity } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null); 
  const [localStatuses, setLocalStatuses] = useState({});
  const [hiddenProducts, setHiddenProducts] = useState(new Set());

  const visibleProducts = products?.filter((p) => !hiddenProducts.has(p.id)) || [];
  const filteredProducts = visibleProducts.filter((p) => {
    const matchString = `${p.name} ${p.category} ${p.supplier_id}`.toLowerCase();
    return matchString.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div style={{ padding: "32px", textAlign: "center", color: "#64748b", fontFamily: "Inter, sans-serif" }}>
        <p style={{ fontSize: "16px", fontWeight: "500" }}>
          Loading system product database registry...
        </p>
      </div>
    );
  }

  const openActionModal = (product, type) => {
    setSelectedProduct(product);
    setModalType(type);
  };

  const closeActionModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  const handleConfirmAction = () => {
    if (!selectedProduct || !modalType) return;

    const pId = selectedProduct.id;
    const pName = selectedProduct.name;

    if (modalType === "approve") {
      setLocalStatuses((prev) => ({ ...prev, [pId]: "Approved" }));
      logActivity(`Catalog Registry: Admin APPROVED item catalog listing for "${pName}" (ID: ${pId}).`, "Catalog", false);
    } else if (modalType === "reject") {
      setLocalStatuses((prev) => ({ ...prev, [pId]: "Rejected" }));
      logActivity(`Catalog Registry: Admin REJECTED marketplace item catalog request for "${pName}" (ID: ${pId}).`, "Catalog", true);
    } else if (modalType === "delete") {
      setHiddenProducts((prev) => {
        const next = new Set(prev);
        next.add(pId);
        return next;
      });
      logActivity(`Data Purge: Admin DELETED product entry "${pName}" from global system tables.`, "Security", true);
    }

    closeActionModal();
  };

  return (
    <div style={{ padding: "32px", fontFamily: "'Inter', -apple-system, sans-serif", width: "100%", boxSizing: "border-box" }}>
      
      <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
            Product Monitoring
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            Track across global supply catalogs, approve batch stock listings, or moderate inventory compliance.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search items, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 16px",
              width: "280px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
              outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
            }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto", width: "100%" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Product Image</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Product Name</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Supplier Name</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Category</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Stock</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Price</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const currentStatus = localStatuses[product.id] || "Pending Verification";

                  return (
                    <tr key={product.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 24px" }}>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "8px",
                              objectFit: "cover",
                              border: "1px solid #e2e8f0"
                            }}
                          />
                        ) : (
                          <div style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "8px",
                            backgroundColor: "#f1f5f9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#94a3b8",
                            fontSize: "11px",
                            fontWeight: "600"
                          }}>
                            NO IMG
                          </div>
                        )}
                      </td>

                      <td style={{ padding: "16px 24px", fontWeight: "600" }}>{product.name}</td>
                      <td style={{ padding: "16px 24px" }}>{product.supplier_id || "Global Supplier"}</td>
                      <td style={{ padding: "16px 24px" }}>{product.category}</td>
                      <td style={{ padding: "16px 24px" }}>
                        {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                      </td>
                      <td style={{ padding: "16px 24px", fontWeight: "600" }}>
                        ₹{Number(product.price).toFixed(2)}
                      </td>

                      <td style={{ padding: "16px 24px" }}>
                        <span style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          backgroundColor: currentStatus === "Approved"
                            ? "#ecfdf5"
                            : currentStatus === "Rejected"
                            ? "#fee2e2"
                            : "#fffbeb",
                          color: currentStatus === "Approved"
                            ? "#10b981"
                            : currentStatus === "Rejected"
                            ? "#ef4444"
                            : "#f59e0b"
                        }}>
                          {currentStatus}
                        </span>
                      </td>

                      <td style={{ padding: "16px 24px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                          <button onClick={() => openActionModal(product, "view")}>View</button>
                          <button onClick={() => openActionModal(product, "approve")}>Approve</button>
                          <button onClick={() => openActionModal(product, "reject")}>Reject</button>
                          <button onClick={() => openActionModal(product, "delete")}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: "48px", textAlign: "center" }}>
                    No product entries found inside system master inventory listing database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalType && selectedProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", width: "460px", padding: "28px" }}>
            <h3>
              {modalType === "view"
                ? "Catalog Product Specification View"
                : `${modalType} Item Record`}
            </h3>

            {modalType === "view" ? (
              <div>
                <div>ID: {selectedProduct.id}</div>
                <div>Name: {selectedProduct.name}</div>
                <div>Category: {selectedProduct.category}</div>
                <div>Supplier: {selectedProduct.supplier_id}</div>
                <div>Stock: {selectedProduct.stock}</div>
                <div>Price: ₹{Number(selectedProduct.price).toFixed(2)}</div>
                <div>Status: {localStatuses[selectedProduct.id] || "Pending Verification"}</div>
              </div>
            ) : (
              <div>
                <button onClick={() => handleConfirmAction("approve")}>Approve</button>
                <button onClick={() => handleConfirmAction("reject")}>Reject</button>
                <button onClick={() => handleConfirmAction("delete")}>Delete</button>
              </div>
            )}

            <button onClick={closeActionModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}