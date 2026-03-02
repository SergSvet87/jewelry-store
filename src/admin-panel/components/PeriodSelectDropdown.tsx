import * as Select from '@radix-ui/react-select';
import { Icons } from '../icons';
import { FILTER_BY_DATA } from "../constants/filterByDate";

interface PeriodSelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const PeriodSelectDropdown = ({ value, onChange }: PeriodSelectDropdownProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger 
        className="group text-[16px] flex items-center justify-between gap-15 bg-white pl-2 pr-3 py-3 min-w-[200px] cursor-pointer outline-none hover:border-gray-400 transition-colors data-[state=open]:border-b-2 data-[state=open]:border-[#5B242A]"
      >
        <div className="flex items-center gap-3">
          <Icons.calendar />
          <Select.Value />
        </div>
        <Select.Icon>
         <div className="transition-transform duration-300 group-data-[state=open]:rotate-180 ">
          <Icons.arrowDown />
        </div>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content 
          position="popper" 
          sideOffset={5}
          className="bg-white border border-[#E2E2E2]  shadow-lg overflow-hidden min-w-[var(--radix-select-trigger-width)] z-50"
        >
          <Select.Viewport>
            {FILTER_BY_DATA.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="flex items-center px-9 py-2 text-[16px] cursor-pointer outline-none hover:bg-[#A76F53] active:bg-[#5B242A] hover:text-white data-[state=checked]:bg-button data-[state=checked]:text-white"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};