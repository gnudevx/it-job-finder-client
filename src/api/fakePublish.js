export function fakePublishAPI(form) {
    return new Promise((resolve) => {
        console.log("📌 Gửi form lên server (fake)...", form);

        setTimeout(() => {
            resolve({
                success: true,
                jobId: Math.floor(Math.random() * 100000),
                message: "Lưu thành công!"
            });
        }, 1500);
    });
}