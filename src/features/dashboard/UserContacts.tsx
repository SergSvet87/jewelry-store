import { UserIcon } from '@/assets';
import { useUserStore } from '@/store/useUserStore';

export const UserContacts = () => {
  const user = useUserStore((state) => state.currentUser);

  return (
    <div className="flex items-center gap-5 pl-2 w-full mb-5">
      <UserIcon classname="text-[var(--brown-dark)]" />

      <div className="flex flex-col items-start justify-center gap-3">
        <div className="text-[var(--button)] text-[length:var(--text)] font-[500] ">
          {user?.firstName} {user?.lastName}
        </div>

        <div className="text-[var(--grey)] space-x-1">{user?.phone}</div>
      </div>
    </div>
  );
};
