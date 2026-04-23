import axiosInstance from "@/api/axiosInstance"

export const getTotalRevenue = async (period : string) => {
    try {
        const response = await axiosInstance.get("/api/orders/revenue", {
            params : {
                period
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return "Помилка . Не вдалось завантажити кількість прибутку"
    }
}

export const getTotalOrders = async (period : string, page : number , pageSize : number) => {
    try {
        const response = await axiosInstance.get("/api/orders/by-period", {
            params : {
                period,
                page,
                pageSize
            },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return "Помилка . Не вдалось завантажити кількість замовлень"
    }
}

export const getTotalProducts = async () => {
    try {
        const response = await axiosInstance.get("/api/products");
        return response.data
    } catch (error) {
        console.error(error)
        return "Помилка . Не вдалось завантажити кількість продуктів"
    }
}

export const getTotalUsers = async () => {
    try {
        const response = await axiosInstance.get("/api/users")
        return response.data
    } catch (error) {
        console.log(error)
        return "Помилка . Не вдалось завантажити кількість користувачів"
    }
}