import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateCompany.module.scss';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import companyService from '@/api/companyService';
export default function CreateCompany({ selectedCompany, onSaveComplete }) {
  const [form, setForm] = useState({
    taxCode: '',
    companyName: '',
    website: '',
    size: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    type: '',
    field: '',
  });

  useEffect(() => {
    if (selectedCompany) {
      setForm({
        taxCode: selectedCompany.taxCode || '',
        companyName: selectedCompany.name || '',
        website: selectedCompany.website || '',
        size: selectedCompany.size || '',
        field: selectedCompany.field || '',
        address: selectedCompany.address || '',
        phone: selectedCompany.phone || '',
        email: selectedCompany.email || '',
        description: selectedCompany.description || '',
        type: selectedCompany.type || '',
      });
    }
  }, [selectedCompany]);

  const handleChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.companyName || !form.email) {
      alert('Vui lòng nhập Tên công ty và Email!');
      return;
    }

    const payload = {
      taxCode: form.taxCode,
      companyName: form.companyName,
      website: form.website,
      field: form.field,
      size: form.size,
      address: form.address,
      phone: form.phone,
      email: form.email,
      description: form.description,
      type: form.type,
    };

    try {
      let res;
      if (selectedCompany?._id) {
        // UPDATE
        res = await companyService.update(selectedCompany._id, payload);
      } else {
        // CREATE
        res = await companyService.create(payload);
      }

      if (onSaveComplete) onSaveComplete(res.company);
      alert(selectedCompany ? 'Cập nhật thành công!' : 'Tạo công ty thành công!');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Lỗi khi lưu dữ liệu');
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logoPlaceholder}>
          <div className={styles.logoIcon}>🏢</div>
          <div className={styles.logoText}>Logo công ty</div>
        </div>
      </div>

      <div className={styles.typeSwitch}>
        <button
          className={`${styles.typeBtn} ${form.type === 'enterprise' ? styles.activeType : ''}`}
          onClick={() => setForm((f) => ({ ...f, type: 'enterprise' }))}
        >
          Doanh nghiệp
        </button>
        <button
          className={`${styles.typeBtn} ${form.type === 'business' ? styles.activeType : ''}`}
          onClick={() => setForm((f) => ({ ...f, type: 'business' }))}
        >
          Hộ kinh doanh
        </button>
      </div>

      <div className={styles.warning}>
        ⚠️ Để tài khoản được xác thực nhanh chóng, vui lòng nhập <b>Mã số thuế</b> và{' '}
        <b>{form.type === 'business' ? 'Tên hộ kinh doanh' : 'Tên công ty'}</b> trùng khớp với dữ
        liệu doanh nghiệp theo Trang thông tin điện tử của Cục Thuế.{' '}
        <a
          href="https://tracuunnt.gdt.gov.vn/tcnnt/mstdn.jsp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tại đây
        </a>
        .
      </div>

      {/* FORM */}
      <div className={styles.formGrid}>
        {/* Mã số thuế */}
        <div>
          <label>
            Mã số thuế{form.type === 'enterprise' ? '' : ' người đại diện'} <span>*</span>
          </label>
          <input
            value={form.taxCode}
            onChange={handleChange('taxCode')}
            placeholder={
              form.type === 'enterprise' ? 'Nhập mã số thuế' : 'Nhập mã số thuế người đại diện'
            }
          />
        </div>

        {/* Tên hộ kinh doanh / công ty */}
        <div>
          <label>
            {form.type === 'enterprise' ? 'Tên công ty' : 'Tên hộ kinh doanh'} <span>*</span>
          </label>
          <input
            value={form.companyName}
            onChange={handleChange('companyName')}
            placeholder={form.type === 'enterprise' ? 'Nhập tên công ty' : 'Nhập tên hộ kinh doanh'}
          />
        </div>

        {/* Website */}
        <div>
          <label>Website</label>
          <input value={form.website} onChange={handleChange('website')} placeholder="https://" />
        </div>

        {/* Lĩnh vực */}
        <div>
          <label>
            Lĩnh vực hoạt động <span>*</span>
          </label>
          <select value={form.field} onChange={handleChange('field')}>
            <option value="">Chọn lĩnh vực hoạt động</option>
            <option value="it">Công nghệ thông tin</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Tài chính</option>
          </select>
        </div>

        {/* Quy mô */}
        <div>
          <label>
            Quy mô <span>*</span>
          </label>
          <select value={form.size} onChange={handleChange('size')}>
            <option value="">Chọn quy mô công ty</option>
            <option value="small">Dưới 50 nhân sự</option>
            <option value="medium">Từ 50 - 200 nhân sự</option>
            <option value="large">Trên 200 nhân sự</option>
          </select>
        </div>

        {/* Địa chỉ */}
        <div>
          <label>
            Địa chỉ <span>*</span>
          </label>
          <input
            value={form.address}
            onChange={handleChange('address')}
            placeholder="Nhập địa chỉ công ty"
          />
        </div>

        {/* Email */}
        <div>
          <label>
            Email <span>*</span>
          </label>
          <input
            value={form.email}
            onChange={handleChange('email')}
            placeholder="Nhập email công ty"
          />
          {form.email === '' && <p className={styles.error}>Email không được để trống</p>}
        </div>

        {/*  SĐT */}
        <div>
          <label>
            Số điện thoại <span>*</span>
          </label>
          <input
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/*  Mô tả */}
        <div className={styles.full}>
          <label>Mô tả công ty</label>
          <ReactQuill
            theme="snow"
            value={form.description}
            onChange={(value) => handleChange('description')({ target: { value } })}
            placeholder="HireIT khuyến khích độ dài tối thiểu 100 từ"
          />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className={styles.actions}>
        <button className={styles.btnSave} onClick={handleSave}>
          Lưu
        </button>
      </div>
    </div>
  );
}

CreateCompany.propTypes = {
  selectedCompany: PropTypes.object,
  onSaveComplete: PropTypes.func,
};
