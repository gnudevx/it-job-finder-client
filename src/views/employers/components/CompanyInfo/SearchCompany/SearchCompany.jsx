import React, { useState } from "react";
import styles from "./SearchCompany.module.scss";
import PropTypes from "prop-types";
// import { Search } from "lucide-react";
const MOCK_COMPANIES = [
    { id: 1, name: "Công ty TNHH ABC", taxCode: "0312345678", address: "TP. Hồ Chí Minh", website: "abc.vn", size: "50-100" },
    { id: 2, name: "Công ty Cổ phần XYZ", taxCode: "0108765432", address: "Hà Nội", website: "xyz.com", size: "100-200" },
    { id: 3, name: "HireIT Vietnam", taxCode: "0909988776", address: "Đà Nẵng", website: "hireit.vn", size: "10-50" },
    { id: 4, name: "HireIT Vietnam", taxCode: "0909988776", address: "Đà Nẵng", website: "hireit.vn", size: "10-50" },
    { id: 5, name: "HireIT Vietnam", taxCode: "0909988776", address: "Đà Nẵng", website: "hireit.vn", size: "10-50" },
    { id: 6, name: "HireIT Vietnam", taxCode: "0909988776", address: "Đà Nẵng", website: "hireit.vn", size: "10-50" },
];
import { SearchInput } from "@components/common/inputs/SearchInput.jsx";
export default function SearchCompany({ onSelectCompany }) {
    const [keyword, setKeyword] = useState("");
    const filtered = MOCK_COMPANIES.filter((c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase()) ||
        c.taxCode.includes(keyword)
    );
    return (
        <div className={styles.wrapper}>
            <SearchInput
                hideLeadingIcon={true}
                onChange={(val) => setKeyword(val)}
            />
            <h4>
                Công ty mới tạo
            </h4>
            <div className={styles.list}>
                {filtered.map((c) => (
                    <div key={c.id} className={styles.card}>
                        <div>
                            <h4>{c.name}</h4>
                            <p>MST: {c.taxCode}</p>
                            <p>Địa chỉ: {c.address}</p>
                        </div>
                        <button onClick={() => onSelectCompany(c)}>Chọn</button>
                    </div>
                ))}
                {filtered.length === 0 && <p>Không tìm thấy công ty phù hợp.</p>}
            </div>
        </div>
    );
}
SearchCompany.propTypes = {
    onSelectCompany: PropTypes.func.isRequired,
};
