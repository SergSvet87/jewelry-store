    interface dashboardCardStatsProps {
        title : string,
        percentage : string | number,
        totalValue : string | number,
    }
    
    export const dashboardCardStats: dashboardCardStatsProps[] = [
        {
            title : "Загальний дохід",
            percentage : "+9%",
            totalValue : "₴ 245,480"
        },
        {
            title : "Замовлення",
            percentage : "+7%",
            totalValue : "142"
        },
         {
            title : "Товари",
            percentage : "+4",
            totalValue : "87"
        },
         {
            title : "Користувачі",
            percentage : "+5%",
            totalValue : "641"
        },
    ];