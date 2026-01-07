import { useState, useEffect } from 'react';
import {
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Card,
  CardContent,
  Button,
} from '@/components/ui';
import { useUserStore } from '@/store/useUserStore';
import { updateUser } from '@/services/userService';
import { useAuthStore } from '@/store/useAuthStore';

export const UserData = () => {
  const user = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setUser);
  const token = useAuthStore((state) => state.accessToken);

  const [editMain, setEditMain] = useState(false);
  const [editAdditional, setEditAdditional] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    birthdate: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        email: user.email || '',
        gender: user.gender || '',
        birthdate: user.birthdate || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(formData, token);
      setUser(updatedUser);
      setEditMain(false);
      setEditAdditional(false);
    } catch (error) {
      console.error('Помилка при оновленні:', error);
    } finally {
      setIsLoading(false);
    }
  };

const handleCancelMain = () => {
  if (user) {
    setFormData((prev) => ({
      ...prev,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      email: user.email || '', 
    }));
  }
  setEditMain(false);
};

  if (!user) return null;

  return (
    <div className=" hidden md:flex flex-wrap gap-4 w-full h-auto justify-between ">
      <Card className="flex-1 min-w-[350px]">
        <CardContent className="flex flex-col gap-7 p-6 h-full">
          <h4 className="font-semibold text-lg">Основні дані</h4>

          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-wrap gap-4 w-full">
              <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                <Label className="opacity-70">Ім'я</Label>
                <Input
                  name="firstName"
                  readOnly={!editMain}
                  value={formData.firstName}
                  onChange={handleChange}
                  className={!editMain ? "bg-gray-50 cursor-default" : ""}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                <Label className="opacity-70">Прізвище</Label>
                <Input
                  name="lastName"
                  readOnly={!editMain}
                  value={formData.lastName}
                  onChange={handleChange}
                  className={!editMain ? "bg-gray-50 cursor-default" : ""}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label className="opacity-70">Номер телефону</Label>
              <Input
                name="phone"
                readOnly={!editMain}
                value={formData.phone}
                onChange={handleChange}
                className={!editMain ? "bg-gray-50 cursor-default" : ""}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label className="opacity-70">Електронна пошта</Label>
              <Input
                name="email"
                type="email"
                readOnly={!editMain}
                value={formData.email}
                onChange={handleChange}
                className={!editMain ? "bg-gray-50 cursor-default" : ""}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-auto pt-4">
            {!editMain ? (
              <Button variant="outline" className="w-full" onClick={() => setEditMain(true)}>
                Редагувати
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="flex-1" onClick={handleCancelMain}>
                  Скасувати
                </Button>
                <Button className="flex-1" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? 'Збереження...' : 'Зберегти'}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Картка додаткових даних */}
      <Card className="flex-1 min-w-[350px] bg-main/10">
        <CardContent className="flex flex-col justify-between h-full p-6">
          <div className="flex flex-col gap-7">
            <h4 className="font-semibold text-lg">Додаткові дані</h4>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label className="opacity-70">Стать</Label>
                {!editAdditional ? (
                  <div className="h-10 flex items-center px-3 bg-gray-50 rounded-md border text-sm capitalize">
                    {formData.gender || 'Не вказано'}
                  </div>
                ) : (
                  <RadioGroup
                    value={formData.gender}
                    className="flex gap-6 h-10 items-center"
                    onValueChange={handleGenderChange}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">Жіноча</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">Чоловіча</Label>
                    </div>
                  </RadioGroup>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="opacity-70">День народження</Label>
                {!editAdditional ? (
                  <div className="h-10 flex items-center px-3 bg-gray-50 rounded-md border text-sm">
                    {formData.birthdate || '-'}
                  </div>
                ) : (
                  <Input
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            {!editAdditional ? (
              <Button variant="outline" className="w-full" onClick={() => setEditAdditional(true)}>
                Редагувати
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="flex-1" onClick={() => setEditAdditional(false)}>
                  Скасувати
                </Button>
                <Button className="flex-1" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? 'Збереження...' : 'Зберегти'}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};