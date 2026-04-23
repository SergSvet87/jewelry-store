interface PhotoSquareProps {
    title? : string;
    subTitle? : string;
    img: React.ReactNode;
    disable : boolean;
    id : string;
    isMain : boolean;
}

export const PhotoSquare = ({ title, subTitle, img, disable, id, isMain} : PhotoSquareProps) => {

    const sizeClasses = {
        main: "w-[427px] h-[407px]",
        extra: "w-[204px] h-[204px]"
    };

    return (
        <label 
            htmlFor={id}
            className={`${disable ?
                "text-[#727272] cursor-default" 
                : "cursor-pointer"} 
                ${sizeClasses[isMain ? 'main' : 'extra']} flex flex-col border-dashed border-1 mt-3`}
        >
            <div className="flex flex-col m-auto text-center items-center">
                {img}
                <span className={`${disable ? "text-[#727272]" : ""}`}>{title}</span>
                <span className={`${disable ? "text-[#727272]" : ""}`}>{subTitle}</span>
                <input type="file" id={id} disabled={disable} className={`${disable ? "text-[#727272]" : ""} hidden`}/>
            </div>
        </label>
    )
}