import { useState } from 'react';

import {
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Card,
  CardContent,
  Button,
} from '@/components/ui';
import { useUserStore } from '@/store/user/useUserStore';
import { updateUser } from '@/services/userService';
import { useAuthStore } from '@/store/auth/useAuthStore';

export const UserData = () => {
  const user = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setUser);
  const token = useAuthStore((state) => state.accessToken);

  const [editMain, setEditMain] = useState(false);
  const [editAdditional, setEditAdditional] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    gender: user?.gender || '',
    birthdate: user?.birthdate || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(formData, token);
      setUser(updatedUser);
      setEditMain(false);
      setEditAdditional(false);
    } catch (error) {
      console.error('Помилка при оновленні:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex gap-4 w-full h-auto justify-between">
      <Card className="flex-1 min-w-[350px]">
        <CardContent className="flex flex-col gap-7 p-2 h-full">
          <h4 className="mt-2">Основні дані</h4>

          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-wrap justify-between gap-4 w-full">
              <div className="flex flex-col gap-1 min-w-[100px] flex-1">
                <Label className="label mb-1">Ім&apos;я</Label>
                <Input
                  name="firstName"
                  className="h-10"
                  readOnly={!editMain}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1 min-w-[180px] flex-1">
                <Label className="label mb-1">Прізвище</Label>
                <Input
                  name="lastName"
                  className="h-10"
                  readOnly={!editMain}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label className="label mb-1">Номер телефону</Label>
              <Input
                name="phone"
                className="h-10"
                readOnly={!editMain}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label className="label mb-1">Електронна пошта</Label>
              <Input
                name="email"
                type="email"
                className="h-10"
                readOnly={!editMain}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-[212px]"
              onClick={() => setEditMain((prev) => !prev)}
            >
              {editMain ? null : 'Редагувати'}
            </Button>
            {editMain && (
              <Button variant="outline" className="w-[212px]" onClick={handleSave}>
                Зберегти
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-[300px] bg-main">
        <CardContent className="flex flex-col justify-between h-full p-2">
          <div className="flex flex-col gap-7">
            <h4 className="mt-2">Додаткові дані</h4>

            <div className="flex flex-col gap-7 pl-3">
              <div className="flex flex-col gap-1">
                <Label className="label mb-1">Стать</Label>
                {!editAdditional ? (
                  <Input className="h-10" readOnly value={formData.gender} />
                ) : (
                  <RadioGroup
                    defaultValue={formData.gender}
                    className="flex justify-between h-10 items-center"
                    onValueChange={handleGenderChange}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="female"
                        id="female"
                        className="w-5 h-5"
                      />
                      <Label htmlFor="female">Жіноча</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="male"
                        id="male"
                        className="w-5 h-5"
                      />
                      <Label htmlFor="male">Чоловіча</Label>
                    </div>
                  </RadioGroup>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="label mb-1">День народження</Label>
                {!editAdditional ? (
                  <div>{formData.birthdate || '-'}</div>
                ) : (
                  <Input
                    name="birthdate"
                    type="date"
                    className="h-10"
                    value={formData.birthdate}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button variant="outline" className="w-[212px]" onClick={() => setEditAdditional((prev) => !prev)}>
              {editAdditional ? null : 'Редагувати'}
            </Button>
            {editAdditional && (
              <Button variant="outline" className="w-[212px]" onClick={handleSave}>
                Зберегти
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
