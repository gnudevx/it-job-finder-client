import React, { useState, useEffect } from "react";
import styles from "./SearchCompany.module.scss";
import PropTypes from "prop-types";
import companyService from '@/services/companyService.js'
// import { Search } from "lucide-react";
import { SearchInput } from "@components/common/inputs/SearchInput.jsx";

export default function SearchCompany({ onSelectCompany }) {
    const [keyword, setKeyword] = useState("");
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await companyService.getCompany(); // gọi API /companies/list
                const list = res.companies.map(c => ({ ...c, _id: c._id || c.id }));
                setCompanies(list);
                console.log(list)
            } catch (err) {
                console.error(err);
            }
        }
        fetchCompanies();
    }, []);

    const filtered = companies.filter(
        (c) =>
            c.name.toLowerCase().includes(keyword.toLowerCase()) ||
            c.taxCode.includes(keyword)
    );

    return (
        <div className={styles.wrapper}>
            <SearchInput hideLeadingIcon onChange={(val) => setKeyword(val)} />
            <h4>Công ty mới tạo</h4>
            <div className={styles.list}>
                {filtered.map((c) => (
                    <div key={c._id} className={styles.card}>
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