import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CandidateForm from "./CandidateForm";
import adminService from "@/services/adminService";

export default function EditCandidatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await adminService.GetCandidate(id);
        if (res.success) setInitialData(res.data);
      } catch (err) {
        console.error(err);
        alert("Lỗi khi tải thông tin ứng viên");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  if (loading) return <p>Đang tải thông tin ứng viên...</p>;
  if (!initialData) return <p>Ứng viên không tồn tại</p>;

  return (
    <CandidateForm
      mode="edit"
      initialData={initialData}
      onSuccess={() => navigate("/admin/manage/candidates")}
    />
  );
}
