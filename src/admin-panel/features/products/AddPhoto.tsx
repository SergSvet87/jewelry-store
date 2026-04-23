import { UploadFileIcon } from "@/admin-panel/icons/UploadFileIcon"
import PlusIcon from "../../icons/PlusIcon"
import { PhotoSquare } from "./PhotoSquare";

interface AddPhotoProps {
    id : string;
    isMain : boolean;
    disable : boolean;
}

export const AddPhoto = ({id, isMain, disable} : AddPhotoProps) => {
    return (
        <div className="w-[427px]">
            <p className={`${disable ? "text-[#727272]" : ""} text-[20px] mb-6`}>Фотографії товару</p>
            <p className={`${disable ? "text-[#727272]" : "text-[#5B242A]"}`}>Головне фото</p>

            <PhotoSquare
                title="Натисніть для завантаження"
                subTitle="PNG, JPG (макс. 5 MB)"
                img={<UploadFileIcon/>}
                disable={disable}
                id={id}
                isMain={isMain}
            />
            <p className={`${disable ? "text-[#727272]" : "text-[#5B242A]"} mt-6 mb-3`}>Додаткові фото</p>

            <div className="flex flex-row gap-5 w-full">
                <PhotoSquare
                    img={<PlusIcon/>}
                    disable={disable}
                    id={`${id}-extra-1`}
                    isMain={false}
                />
                <PhotoSquare
                    img={<PlusIcon/>}
                    disable={disable}
                    id={`${id}-extra-2`}
                    isMain={false}
                />
            </div>
        </div>
    )
}