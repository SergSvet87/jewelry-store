import axiosInstance from "@/api/axiosInstance";    
import axios from 'axios'; 

interface uploadReviewData {
    author: string;
    text: string;
    score: string;
    images: File[];
    productId: string;
    orderItemId : number;
}

export const uploadReview = async (reviewData: uploadReviewData) => {
    try {
        const body = new URLSearchParams();
        body.append("author", reviewData.author);
        body.append("text", reviewData.text);
        body.append("score", String(reviewData.score));

        // Відправляємо без спеціальних заголовків, axios сам виставить 'application/x-www-form-urlencoded'
        const response = await axiosInstance.post("/api/reviews/upload", body);
        
        console.log("Відгук успішно відправлено!");
        return response.data;
    } catch (error) {
        console.error("Помилка при відправці відгуку:", error);
        throw error;
    }
}


export const getReviews = async (orderItemId: number) => {
    try {
        const response = await axiosInstance.get(`/api/reviews/${orderItemId}`);
        return response.data;
    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;

                if (status === 404) {
                    console.log(`ℹ️ Відгук для ${orderItemId} відсутній.`);
                } else if (status === 500) {
                    console.error(`🔥 Помилка сервера для ${orderItemId}.`);
                } else {
                    console.error(`⚠️ Непередбачена помилка ${status} для ${orderItemId}.`);
                }
            } else if (error.request) {
                console.error("🌐 Проблема з мережею або сервер не відповідає.");
            } else {
                console.error("🛠️ Помилка конфігурації запиту:", error.message);
            }
        } else if (error instanceof Error) {
            console.error("🛠️ Виникла помилка:", error.message);
        } else {
            console.error("🧬 Невідомий тип помилки.");
        }

        return null;
    }
}