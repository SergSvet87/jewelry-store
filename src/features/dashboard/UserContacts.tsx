import { UserIcon } from '@/assets';
import { useUserStore } from '@/store/useUserStore';

export const UserContacts = () => {
  const user = useUserStore((state) => state.currentUser);

  return (
    <div className="text-[20px] flex items-center gap-5 pl-2 md:pl-0 w-full mb-5 leading-[130%]">
      <UserIcon classname="text-[#5B242A] text-20px" />

      <div className="flex flex-col items-start justify-center gap-3 ">
        <div className="text-[#5B242A] font-medium ">
          {user?.firstName} {user?.lastName}
        </div>

        <div className="text-[16px] text-[#727272]">{user?.phone}</div>
      </div> 
    </div>
  );
};