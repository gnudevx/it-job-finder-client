import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/slices/globalSlice';
import styles from './BusinessLicense.module.scss';
import FormLabel from '@components/common/FormLabel/FormLabel.jsx';
import FileUpload from '@components/common/FileUpload/FileUpload.jsx';
import sampleLicense from '@assets/gpkd.jpg';
import { useEmployerProgress } from '@/contexts/EmployerProgressContext.jsx';
import { Dot } from 'lucide-react';
import axios from '@/services/axiosClient';
export default function BusinessLicense() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [license, setLicense] = useState({
    fileUrl: null,
    status: null,
    uploadedAt: null,
    reviewedAt: null,
  });
  const { fetchSteps } = useEmployerProgress();
  const dispatch = useDispatch();
  // const handleFileChange = (e) => {
  //     const selected = e.target.files[0];
  //     if (selected) setFile(selected);
  // };
  const handleUpload = async () => {
    if (files.length === 0) {
      dispatch(setNotification({ message: 'Vui lòng chọn file trước khi lưu', type: 'info' }));
      return;
    }
    const formData = new FormData();
    formData.append('license', files[0]); // lấy file đầu tiên

    setLoading(true);
    try {
      const res = await axios.post(`/employer/account/settings/license`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload thành công:', res);
      console.log('upload', res);
      dispatch(setNotification({ message: 'Upload thành công!', type: 'success' }));
      console.log(res.data); // có license mới
      setFiles([files[0]]);
      setLicense(res.license);
      await fetchSteps();
    } catch (err) {
      console.error(err);
      dispatch(setNotification({ message: 'Upload thất bại!', type: 'error' }));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchLicense = async () => {
      try {
        const res = await axios.get('/employer/account/settings/license-info');
        console.log('License info:', res);
        if (res.license) {
          setLicense(res.license);
        }
      } catch (err) {
        console.error(err);
        // Không cần set lại vì đã có default value
      }
    };
    fetchLicense();
  }, []);
  const handleCancel = () => {
    setFiles([]);
    setLoading(false);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.statusRow}>
        <p>📌 Giấy phép của bạn </p>

        {license.status === 'pending' && (
          <span className={styles.statusPending}>đang chờ xét duyệt.</span>
        )}

        {license.status === 'approved' && (
          <span className={styles.statusApproved}>đã được phê duyệt.</span>
        )}
      </div>

      <h3>Thông tin Giấy đăng ký doanh nghiệp</h3>

      <p className={styles.guide}>
        Vui lòng lựa chọn phương thức đăng tải, xem hướng dẫn đăng tải <a href="#">Tại đây</a>
      </p>

      {/* Cột trái: Upload */}
      <div className={styles.uploadSection}>
        {/* Cột trái */}
        <div className={styles.left}>
          <FormLabel text="Giấy đăng ký doanh nghiệp hoặc Giấy tờ tương đương khác" required />

          <FileUpload
            files={files}
            onChange={setFiles}
            accept=".jpg,.png"
            note="Dung lượng tối đa 5MB, định dạng: jpeg, jpg, png, pdf"
          />

          <div className={styles.warning}>
            <span className={styles.icon}>⚠️</span>

            <div className={styles.warningContent}>
              <div className={styles.warningItem}>
                <Dot />
                Các văn bản đăng tải cần đầy đủ các mặt và không có dấu hiệu chỉnh sửa/ che/ cắt
                thông tin
              </div>

              <div className={styles.warningItem}>
                <Dot />
                Vui lòng đăng tải Giấy đăng ký doanh nghiệp có thông tin trùng khớp với dữ liệu của
                doanh nghiệp theo Trang thông tin điện tử của Cục Thuế
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <div className={styles.sample}>
          <h4>Minh họa</h4>
          <div className={styles.sampleBox}>
            <img
              src={sampleLicense}
              alt="Giấy đăng ký doanh nghiệp mẫu"
              style={{ width: '150px', height: 'auto', borderRadius: '4px' }}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.cancel} onClick={handleCancel}>
          Hủy
        </button>

        {/* NEW -> Người dùng chưa có license */}
        {!license || !license.status ? (
          <button
            className={styles.save}
            type="button"
            disabled={files.length === 0 || loading}
            onClick={handleUpload}
          >
            {loading ? 'Đang tải...' : 'Tải lên giấy phép'}
          </button>
        ) : null}

        {/* APPROVED -> Show nút cập nhật */}
        {license?.status === 'approved' && (
          <button className={styles.save} type="button" disabled={loading} onClick={handleUpload}>
            {loading ? 'Đang cập nhật...' : 'Cập nhật giấy phép'}
          </button>
        )}
        {/* REJECTED -> Cho phép upload lại */}
        {license?.status === 'rejected' && (
          <button
            className={styles.save}
            type="button"
            disabled={files.length === 0 || loading}
            onClick={handleUpload}
          >
            {loading ? 'Đang tải...' : 'Tải lên lại'}
          </button>
        )}

        {/* PENDING -> Không cho upload */}
        {license?.status === 'pending' && (
          <button className={styles.save} disabled>
            Đang chờ xét duyệt
          </button>
        )}
      </div>
    </div>
  );
}
