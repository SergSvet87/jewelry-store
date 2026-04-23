interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export const ConfirmationModal = ({onClose, onConfirm, title} : ConfirmationModalProps) => {
    return (
        <div className="flex flex-col justify-center text-center border-1 w-1/5 py-5">
            <h3 className="text-[16px]">{title}</h3>
            <div className="flex gap-7 m-auto px-5 mt-5">
                <button 
                    className="p-2 rounded-[5px] bg-[#5B242A] text-white"
                    onClick={onConfirm}
                >
                    Видалити
                </button>
                <button
                    className="border-1 p-2 rounded-[5px]"
                    onClick={onClose}
                >
                    Відмінити
                </button>
            </div>
        </div>
    )
}