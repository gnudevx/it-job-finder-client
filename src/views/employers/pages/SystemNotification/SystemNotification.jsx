import React, { useState } from "react";
import styles from "./SystemNotification.module.scss";
import NotificationList from "../../components/SystemNotification/NotificationList/NotificationList";
import { NotificationDetail } from "../../components/SystemNotification/NotificationDetail/NotificationDetail";

export default function SystemNotification() {
    const [selected, setSelected] = useState(null);

    return (
        <div className={styles.container}>
            {!selected ? (
                <NotificationList onSelect={(n) => setSelected(n)} />
            ) : (
                <NotificationDetail
                    notification={selected}
                    onBack={() => setSelected(null)}
                />
            )}
        </div>
    );
}
