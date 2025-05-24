import { useState } from 'react';
import cn from 'classnames';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Input } from './ui/input';

import { MessageSquareIcon, MessageQuestionIcon, X, SendIcon, SupportIcon } from '@/assets';

export const SupportDrawer = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isInputText, setIsInputText] = useState(false);
  const [inputText, setInputText] = useState('');

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const formattedTime = `${currentHours}:${currentMinutes}`;

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsInputText(true)
  };

  return (
    <div className="fixed lg:bottom-15 lg:right-15 bottom-4 right-4 z-100 flex align-center gap-1">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <button
            className="relative bg-[color:var(--button)] rounded-[20px] w-[36px] h-[36px] cursor-pointer flex items-center justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <MessageQuestionIcon
              classname={cn(
                isHovering ? 'block' : 'hidden',
                'absolute top-[0px] right-[40px] z-10',
              )}
            />
            <MessageSquareIcon stroke="var(--main)" />
          </button>
        </DrawerTrigger>

        <DrawerContent className="!p-0 fixed lg:bottom-15 lg:right-15 bottom-4 right-0 z-1000 w-full lg:w-[360px] h-[500px] bg-[var(--main)] lg:rounded-[6px] lg:shadow-xl rounded-none shadow-none flex flex-col justify-between border border-[var(--accent)] ::after-none">
          <DrawerHeader className="w-full flex flex-row items-center justify-between px-4 py-2 border-b-2 border-[var(--accent)]">
            <DrawerTitle className="flex flex-row items-center gap-2">
              <span>
                <SupportIcon />
              </span>
              <span className="font-[family-name:var(--font-main)] text-[var(--brown-dark)] text-[length:var(--text-second)] tracking-[1.3]">
                Відділ підтримки
              </span>
            </DrawerTitle>

            <DrawerClose asChild>
              <button className="btn">
                <X />
              </button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 flex items-end gap-2 overflow-y-auto p-4 border-b-2 border-[var(--accent)]">
            <MessageSquareIcon stroke="var(--accent)" />

            <div className="w-[217px] flex flex-col gap-1 bg-[var(--accent)] text-[length:var(--text-second)] p-2">
              <p className="text-[12px] text-[var(--brown-dark)]">Сьогодні, {formattedTime}</p>
              <p className=" text-[var(--main)] rounded-[4px] w-fit">
                Вітаємо в Jemma. Чим можемо вам допомогти?
              </p>
            </div>
          </div>

          <DrawerFooter>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={inputText}
                onChange={(e) => handleInputText(e)}
                placeholder="Введіть ваше повідомлення"
                className="flex-1 px-3 py-2 text-[14px] border-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0"
              />

              <button className="btn-send" disabled={!isInputText}>
                <SendIcon />
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
