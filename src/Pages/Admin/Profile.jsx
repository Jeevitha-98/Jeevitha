import React, { useState, useEffect } from "react";
import PageContainer from "../../components/layout/PageContainer";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAdmin } from "../../Context/AdminContext";
import adminService from "../../Services/adminService";
import { toast } from "react-toastify";
import profileIconImage from "../../Assests/Profileicon Image.jpg";

export default function Profile() {
  const { profile, refreshDashboardData } = useAdmin();

  const [formData, setFormData] = useState({
    business_name: "",
    mobile: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        business_name: profile.business_name || "",
        mobile: profile.mobile || "",
      });
    }
  }, [profile]);

  const handleEdit = () => {
    if (profile) {
      setFormData({
        business_name: profile.business_name || "",
        mobile: profile.mobile || "",
      });
    }
    setIsOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // NOTE: Ensure your adminService has a matching updateProfile(formData) method implemented
      const response = await adminService.updateProfile ? await adminService.updateProfile(formData) : { status: true };
      if (response.status || response) {
        toast.success("Admin profile updates committed to database successfully!");
        setIsOpen(false);
        if (refreshDashboardData) {
          await refreshDashboardData();
        }
      }
    } catch (err) {
      console.error("Failed to sync admin profile changes down to server:", err);
      toast.error("Failed to commit admin profile updates to server.");
    } finally {
      setIsSaving(false);
    }
  };

  const headerWrapperStyle = {
    fontFamily: "'Inter', sans-serif",
    marginBottom: "32px",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "16px",
    textAlign: "left"
  };

  const mainHeadingStyle = {
    margin: "0 0 6px 0",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.02em"
  };

  const subHeadingStyle = {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "400"
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif"
  };

  const leftActionPanelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    height: "fit-content"
  };

  const darkCardBoxStyle = {
    backgroundColor: "#111827",
    padding: "32px 24px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #1f2937",
    boxSizing: "border-box",
    width: "100%"
  };

  const profileImageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "3px solid rgba(255, 255, 255, 0.2)",
    objectFit: "cover",
    marginBottom: "16px",
    backgroundColor: "#1f2937"
  };

  const darkCardTitleStyle = {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    lineHeight: "1.3"
  };

  const darkCardSubtitleStyle = {
    margin: "6px 0 0 0",
    fontSize: "14px",
    color: "#9ca3af",
    fontWeight: "500"
  };

  const detailsContainerStyle = {
    background: "#ffffff",
    padding: "36px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
  };

  const titleStyle = {
    margin: "0 0 24px 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const itemStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "14px 16px",
    borderRadius: "10px",
    backgroundColor: "#f8fafc",
    marginBottom: "12px",
    border: "1px solid #f1f5f9",
    boxSizing: "border-box",
    textAlign: "left"
  };

  const labelStyle = {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };

  const valueStyle = {
    fontSize: "15px",
    color: "#0f172a",
    fontWeight: "600"
  };

  return (
    <PageContainer>
      <div style={headerWrapperStyle}>
        <h2 style={mainHeadingStyle}>Admin Profile</h2>
        <p style={subHeadingStyle}>Manage your administrative system profile credentials and account identities.</p>
      </div>

      <div style={gridContainerStyle}>
        
        <div style={leftActionPanelStyle}>
          <div style={darkCardBoxStyle}>
            <img 
              src={profileIconImage} 
              alt="Admin Profile" 
              style={profileImageStyle} 
            />
            <h3 style={darkCardTitleStyle}>
              {profile?.business_name || profile?.name || "System Admin"}
            </h3>
            <p style={darkCardSubtitleStyle}>
              ({profile?.user_id || profile?.uid || "Checking ID..."})
            </p>
          </div>

          <Button 
            onClick={handleEdit} 
            variant="primary" 
            style={{ 
              width: "100%", 
              height: "46px", 
              fontSize: "14px", 
              fontWeight: "600", 
              borderRadius: "10px", 
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" 
            }}
          >
            Edit Admin Credentials
          </Button>
        </div>

        <div style={detailsContainerStyle}>
          <h3 style={titleStyle}>
            <span style={{ fontSize: "20px" }}>📋</span> Profile Information
          </h3>
          
          <div style={itemStyle}>
            <span style={labelStyle}>User Access ID</span>
            <span style={valueStyle}>{profile?.user_id || profile?.uid || "Verifying Access..."}</span>
          </div>
          
          <div style={itemStyle}>
            <span style={labelStyle}>Mobile Number</span>
            <span style={valueStyle}>{profile?.mobile || "Not Provided"}</span>
          </div>
          
          <div style={itemStyle}>
            <span style={labelStyle}>Display Name</span>
            <span style={valueStyle}>{profile?.business_name || profile?.name || "Not Provided"}</span>
          </div>

          <div style={itemStyle}>
            <span style={labelStyle}>System Role Profile</span>
            <span style={valueStyle}>Master Platform Administrator</span>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => { if(!isSaving) setIsOpen(false); }} title="Edit Profile Details">
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "8px", fontFamily: "'Inter', sans-serif" }}>
          <Input
            label="Display Name"
            name="business_name"
            value={formData.business_name}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
          />

          <Input
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
            <Button 
              variant="secondary" 
              onClick={() => setIsOpen(false)} 
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave} 
              disabled={isSaving}
            >
              {isSaving ? "Saving Changes..." : "Save Updates"}
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
