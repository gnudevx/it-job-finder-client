import React, { useContext } from 'react';
import styles from './Preview.module.scss';
import { CreateJobContext } from '@views/employers/pages/CreateJob/CreateJobContext';

export default function Preview() {
    const { form } = useContext(CreateJobContext);

    return (
        <div className={styles.previewCard}>
            <div className={styles.badge}>Tin cơ bản</div>
            <h3 className={styles.title}>{form.title || 'Cần Intern'}</h3>
            <div className={styles.meta}>{form.level || 'Thực tập sinh'}</div>

            <div className={styles.chips}>
                {form.domainKnowledge && form.domainKnowledge.length ? (
                    form.domainKnowledge.map(k => <span key={k} className={styles.chip}>{k}</span>)
                ) : (
                    <span className={styles.chip}>IT - Phần cứng và máy tính</span>
                )}
            </div>

            <hr />
            <p className={styles.snippet}>{(form.description && form.description.substring(0, 160)) || 'Mô tả ngắn về công việc sẽ hiển thị ở đây.'}</p>

            <button className={styles.viewBtn} onClick={() => alert('Xem chi tiết preview')}>
                Xem trước tin đăng
            </button>
        </div>
    );
}
