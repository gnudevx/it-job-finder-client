import { useState, useEffect, useContext } from 'react';
import { checkJobLimit } from '@/utils/jobUtils';
import { CreateJobContext } from "./CreateJobContext";
import styles from './JobLimitStatus.module.scss';

export default function JobLimitStatus() {
    const { jobLimitVersion } = useContext(CreateJobContext);

    const [limit, setLimit] = useState(null);

    const fetchLimit = async () => {
        const data = await checkJobLimit();
        setLimit(data);
    };

    useEffect(() => {
        fetchLimit();
    }, []);

    useEffect(() => {
        fetchLimit();
    }, [jobLimitVersion]);

    if (!limit) return null;

    return (
        <div className={styles.wrapper}>
            {limit.limitReached ? (
                <p className={styles.limitReached}>
                    Hạn mức tin đăng đã <strong>đầy</strong>. Bạn đã đăng
                    <span className={styles.count}> {limit.postedThisMonth}/{limit.maxPosts} </span>
                    tin tháng này.
                </p>
            ) : (
                <p className={styles.status}>
                    Bạn đã đăng
                    <span className={styles.count}> {limit.postedThisMonth}/{limit.maxPosts} </span>
                    tin tháng này. <br />
                    Bạn còn đăng được
                    <span className={styles.remaining}> {limit.remaining} </span>
                    tin.
                </p>
            )}
        </div>
    );
}