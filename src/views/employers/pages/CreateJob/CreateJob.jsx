import React from 'react';
import styles from './CreateJob.module.scss';
import Preview from '@views/employers/components/Createjob/Preview/Preview.jsx';
import Sidebar from '@views/employers/components/Createjob/Sidebar/Sidebar.jsx';
import StepForms from '@views/employers/components/Createjob/StepForms/StepForms.jsx';
import { CreateJobProvider } from './CreateJobContext';

export default function CreateJob() {
    const steps = [
        'Thông tin chung',
        'Mô tả công việc',
        'Kỳ vọng về ứng viên',
        'Thông tin nhận hồ sơ',
    ];

    return (
        <CreateJobProvider>
            <div className={styles.pageWrap}>
                <div className={styles.container}>
                    <aside className={styles.leftSidebar}>
                        <Sidebar steps={steps} />
                    </aside>

                    <main className={styles.body}>
                        <div className={styles.header}></div>

                        <div className={styles.formArea}>
                            <StepForms steps={steps} />
                        </div>
                    </main>

                    <aside className={styles.rightPreview}>
                        <Preview />
                    </aside>
                </div>
            </div>
        </CreateJobProvider>
    );
}
