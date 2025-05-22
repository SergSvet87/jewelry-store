import { UserIcon } from '@/assets';

export const UserContacts = () => {
  return (
    <div className="flex items-center gap-5 pl-2 w-full mb-5">
      <UserIcon classname="text-[var(--brown-dark)]" />

      <div className="flex flex-col items-start justify-center gap-3">
        <div className="text-[var(--button)] text-[length:var(--text)] font-[500] ">
          Олена Залуцька
        </div>

        <div className="text-[var(--grey)]">
          + 38 (066) 965 23 23
        </div>
      </div>
    </div>
  );
};
