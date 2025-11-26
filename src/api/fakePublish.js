export function fakePublishAPI(form) {
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve({
                success: true,
                jobId: Math.floor(Math.random() * 100000),
                message: "Lưu thành công!"
            });
        }, 1500);
    });
}