import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import companyService from "@/api/companyService";
import CompanyInfo from "@/views/candidates/components/CompanyInfo/CompanyInfo";

export default function CompanyInfoPage() {
    const { id } = useParams();

    const [company, setCompany] = useState(null);
    const [loadingCompany, setLoadingCompany] = useState(true);

    const normalizeCompany = (data) => ({
        id: data?._id,
        name: data?.name || "",
        taxCode: data?.taxCode || "",
        website: data?.website || "",
        field: data?.field || "",
        industry: data?.industry || "",
        size: data?.size || "",
        address: data?.address || "",
        phone: data?.phone || "",
        email: data?.email || "",
        description: data?.description || "",
        logo: data?.logo || "",
    });

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await companyService.getCompanyByIdPublic(id);
                console.log("Company info:", res);

                if (res.success) {
                    setCompany(normalizeCompany(res.data));
                }
            } catch (err) {
                console.error("Lỗi tải company:", err);
            } finally {
                setLoadingCompany(false);
            }
        };

        fetchCompany();
    }, [id]);

    if (loadingCompany) {
        return <div>Đang tải thông tin công ty...</div>;
    }

    if (!company) {
        return <div>Không tìm thấy thông tin công ty</div>;
    }

    return <CompanyInfo company={company} />;
}
