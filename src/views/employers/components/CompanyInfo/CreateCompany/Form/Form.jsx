// import react from 'react';

// export default function Form() {
//     return {
//             {/* Form */ }
//     <>
//         <div className={styles.formGrid}>
//             <div>
//                 <label>Mã số thuế người đại diện <span>*</span></label>
//                 <input
//                     value={form.taxCode}
//                     onChange={handleChange("taxCode")}
//                     placeholder="Nhập mã số thuế người đại diện"
//                 />
//             </div>

//             <div>
//                 <label>Tên hộ kinh doanh <span>*</span></label>
//                 <input
//                     value={form.companyName}
//                     onChange={handleChange("companyName")}
//                     placeholder="Nhập tên hộ kinh doanh"
//                 />
//             </div>

//             <div>
//                 <label>Website</label>
//                 <input
//                     value={form.website}
//                     onChange={handleChange("website")}
//                     placeholder="https://"
//                 />
//             </div>

//             <div>
//                 <label>Lĩnh vực hoạt động <span>*</span></label>
//                 <select value={form.field} onChange={handleChange("field")}>
//                     <option value="">Chọn lĩnh vực hoạt động</option>
//                     <option value="it">Công nghệ thông tin</option>
//                     <option value="marketing">Marketing</option>
//                     <option value="finance">Tài chính</option>
//                 </select>
//             </div>

//             <div>
//                 <label>Quy mô <span>*</span></label>
//                 <select value={form.size} onChange={handleChange("size")}>
//                     <option value="">Chọn quy mô công ty</option>
//                     <option value="small">Dưới 50 nhân sự</option>
//                     <option value="medium">Từ 50 - 200 nhân sự</option>
//                     <option value="large">Trên 200 nhân sự</option>
//                 </select>
//             </div>

//             <div>
//                 <label>Địa chỉ <span>*</span></label>
//                 <input
//                     value={form.address}
//                     onChange={handleChange("address")}
//                     placeholder="Nhập địa chỉ công ty"
//                 />
//             </div>

//             <div>
//                 <label>Email <span>*</span></label>
//                 <input
//                     value={form.email}
//                     onChange={handleChange("email")}
//                     placeholder="Nhập email công ty"
//                 />
//                 {form.email === "" && <p className={styles.error}>Email không được để trống</p>}
//             </div>

//             <div>
//                 <label>Số điện thoại <span>*</span></label>
//                 <input
//                     value={form.phone}
//                     onChange={handleChange("phone")}
//                     placeholder="Nhập số điện thoại"
//                 />
//             </div>

//             <div className={styles.full}>
//                 <label>Mô tả công ty</label>
//                 <textarea
//                     value={form.description}
//                     onChange={handleChange("description")}
//                     placeholder="HireIT khuyến khích độ dài tối thiểu 100 từ"
//                 />
//             </div>
//         </div>

//         {/* Save */}
//         <div className={styles.actions}>
//             <button className={styles.btnSave} onClick={handleSave}>
//                 Lưu
//             </button>
//         </div>
//     </>
// };
// }