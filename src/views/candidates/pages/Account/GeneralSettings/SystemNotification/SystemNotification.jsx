import React, { useState } from "react";
import styles from "./SystemNotification.module.scss";
import NotificationList from "@/views/candidates/pages/Account/GeneralSettings/SystemNotification/NotificationList/NotificationList.jsx";
import NotificationDetail from "@/views/candidates/pages/Account/GeneralSettings/SystemNotification/NotificationDetail/NotificationDetail.jsx";

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
