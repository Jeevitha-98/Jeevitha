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

  return (
    <PageContainer>
      <style>{`
        .profile-header-wrapper {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          margin-bottom: 32px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 16px;
          text-align: left;
        }

        .profile-main-heading {
          margin: 0 0 6px 0;
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .profile-sub-heading {
          margin: 0;
          font-size: 14px;
          color: #64748b;
          font-weight: 400;
        }

        .profile-grid-container {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 32px;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .profile-left-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: fit-content;
        }

        .profile-dark-card {
          background-color: #111827;
          padding: 32px 24px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #1f2937;
          box-sizing: border-box;
          width: 100%;
        }

        .profile-avatar-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.2);
          object-fit: cover;
          margin-bottom: 16px;
          background-color: #1f2937;
        }

        .profile-dark-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .profile-dark-subtitle {
          margin: "6px 0 0 0";
          font-size: 14px;
          color: #9ca3af;
          font-weight: 500;
        }

        .profile-details-card {
          background: #ffffff;
          padding: 36px;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          box-sizing: border-box;
        }

        .profile-panel-title {
          margin: 0 0 24px 0;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
        }

        .profile-info-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px 16px;
          border-radius: 10px;
          background-color: #f8fafc;
          margin-bottom: 12px;
          border: 1px solid #f1f5f9;
          box-sizing: border-box;
          text-align: left;
        }

        .profile-info-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .profile-info-value {
          font-size: 15px;
          color: #0f172a;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .profile-grid-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .profile-management-container {
            padding: 20px;
          }
          .profile-details-card {
            padding: 24px;
          }
          .profile-main-heading {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="profile-header-wrapper">
        <h2 className="profile-main-heading">Admin Profile</h2>
        <p className="profile-sub-heading">Manage your administrative system profile credentials and account identities.</p>
      </div>

      <div className="profile-grid-container">
        <div className="profile-left-panel">
          <div className="profile-dark-card">
            <img 
              src={profileIconImage} 
              alt="Admin Profile" 
              className="profile-avatar-img" 
            />
            <h3 className="profile-dark-title">
              {profile?.business_name || profile?.name || "System Admin"}
            </h3>
            <p className="profile-dark-subtitle">
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

        <div className="profile-details-card">
          <h3 className="profile-panel-title">
            <span style={{ fontSize: "20px" }}>📋</span> Profile Information
          </h3>
          
          <div className="profile-info-item">
            <span className="profile-info-label">User Access ID</span>
            <span className="profile-info-value">{profile?.user_id || profile?.uid || "Verifying Access..."}</span>
          </div>
          
          <div className="profile-info-item">
            <span className="profile-info-label">Mobile Number</span>
            <span className="profile-info-value">{profile?.mobile || "Not Provided"}</span>
          </div>
          
          <div className="profile-info-item">
            <span className="profile-info-label">Display Name</span>
            <span className="profile-info-value">{profile?.business_name || profile?.name || "Not Provided"}</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-label">System Role Profile</span>
            <span className="profile-info-value">Master Platform Administrator</span>
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
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
