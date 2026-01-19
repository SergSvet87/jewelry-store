export interface IOrderDetails {
    id : number,
    orderNumber : string,
    userId : number,
    guestUserId : number | null,
    createdAt : string,
    totalPrice : number,
    items : {
        id : number,
        orderId : number,
        priceAtPurchase : number,
        productId : number,
        quantity : number,
    }
    orderDetails : {
        deliveryMethod : string,
        email : string,
        fatherName : string,
        firstName : string,
        lastName : string,
        paymentMethod : string,
        phone : string,
    }
}