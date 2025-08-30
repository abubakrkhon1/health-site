"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Bell,
  Globe,
  Shield,
  User,
  Palette,
  Volume2,
  Mail,
  Smartphone,
  Key,
  Database,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [language, setLanguage] = useState("ru");
  const [timezone, setTimezone] = useState("Europe/Moscow");
  const [theme, setTheme] = useState("system");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const doctor = useAuthStore((s) => s.doctor);
  const [name, setName] = useState("");

  useEffect(() => {
    if (doctor?.full_name) {
      setName(doctor.full_name);
    }
  }, [doctor?.full_name]);

  const Switch = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        checked
          ? "bg-neutral-900 dark:bg-neutral-100"
          : "bg-neutral-200 dark:bg-neutral-800"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white dark:bg-neutral-900 transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );

  const SettingRow = ({ icon: Icon, title, description, children, action }) => (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3 flex-1">
        <Icon className="h-4 w-4 mt-0.5 text-neutral-500" />
        <div className="space-y-1 flex-1">
          <p className="text-sm font-medium leading-none">{title}</p>
          {description && (
            <p className="text-xs text-neutral-500 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );

  const Select = ({ value, onChange, options, placeholder }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full max-w-xs h-8 px-2 text-xs border border-neutral-200 dark:border-neutral-800 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const Input = ({
    type = "text",
    value,
    onChange,
    placeholder,
    className = "",
  }) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`mt-2 w-full max-w-xs h-8 px-2 text-xs border border-neutral-200 dark:border-neutral-800 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent ${className}`}
    />
  );

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Настройки приложения
          </h1>
          <p className="text-sm text-neutral-500">
            Измените настройки вашего приложения
          </p>
        </div>

        <div className="space-y-6">
          {/* Account */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Профиль</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800">
              <SettingRow
                icon={User}
                title="Имя пользователя"
                description="Это имя будет отображаться в интерфейсе"
              >
                <Input
                  value={name}
                  onChange={(e:any) => setName(e.target.value)}
                  placeholder="Введите имя"
                />
              </SettingRow>

              <SettingRow
                icon={Mail}
                title="Email адрес"
                description="Основной email для уведомлений и входа в систему"
              >
                <Input
                  type="email"
                  value="ivan@company.com"
                  onChange={() => {}}
                  placeholder="email@example.com"
                />
              </SettingRow>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">
                Уведомления
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800">
              <SettingRow
                icon={Bell}
                title="Email уведомления"
                description="Получать уведомления о важных событиях на email"
                action={
                  <Switch
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                }
              />

              <SettingRow
                icon={Smartphone}
                title="Push уведомления"
                description="Уведомления в браузере о новых событиях"
                action={
                  <Switch
                    checked={pushNotifications}
                    onChange={setPushNotifications}
                  />
                }
              />

              <SettingRow
                icon={Mail}
                title="Маркетинговые рассылки"
                description="Информация о новых функциях и обновлениях"
                action={
                  <Switch
                    checked={marketingEmails}
                    onChange={setMarketingEmails}
                  />
                }
              />
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">
                Предпочтения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800">
              <SettingRow
                icon={Globe}
                title="Язык интерфейса"
                description="Выберите предпочитаемый язык"
              >
                <Select
                  value={language}
                  onChange={setLanguage}
                  options={[
                    { value: "ru", label: "Русский" },
                    { value: "en", label: "English" },
                    { value: "de", label: "Deutsch" },
                  ]}
                />
              </SettingRow>

              <SettingRow
                icon={Globe}
                title="Часовой пояс"
                description="Используется для отображения времени"
              >
                <Select
                  value={timezone}
                  onChange={setTimezone}
                  options={[
                    { value: "Europe/Moscow", label: "Москва (UTC+3)" },
                    { value: "Europe/London", label: "Лондон (UTC+0)" },
                    { value: "America/New_York", label: "Нью-Йорк (UTC-5)" },
                  ]}
                />
              </SettingRow>

              <SettingRow
                icon={Palette}
                title="Тема оформления"
                description="Настройте внешний вид интерфейса"
              >
                <Select
                  value={theme}
                  onChange={setTheme}
                  options={[
                    { value: "light", label: "Светлая" },
                    { value: "dark", label: "Темная" },
                    { value: "system", label: "Системная" },
                  ]}
                />
              </SettingRow>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">
                Безопасность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800">
              <SettingRow
                icon={Shield}
                title="Двухфакторная аутентификация"
                description="Дополнительная защита вашего аккаунта"
                action={<Switch checked={twoFactor} onChange={setTwoFactor} />}
              />

              <SettingRow
                icon={Key}
                title="Тайм-аут сессии"
                description="Автоматический выход из системы через"
              >
                <Select
                  value={sessionTimeout}
                  onChange={setSessionTimeout}
                  options={[
                    { value: "15", label: "15 минут" },
                    { value: "30", label: "30 минут" },
                    { value: "60", label: "1 час" },
                    { value: "480", label: "8 часов" },
                  ]}
                />
              </SettingRow>
            </CardContent>
          </Card>

          {/* Data & Storage */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">
                Данные и хранение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800">
              <SettingRow
                icon={Database}
                title="Экспорт данных"
                description="Скачать копию всех ваших данных"
                action={
                  <button className="text-xs px-3 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                    Экспорт
                  </button>
                }
              />

              <SettingRow
                icon={Database}
                title="Удаление аккаунта"
                description="Безвозвратно удалить аккаунт и все данные"
                action={
                  <button className="text-xs px-3 py-1.5 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                    Удалить
                  </button>
                }
              />
            </CardContent>
          </Card>

          {/* Save Actions */}
          <div className="flex gap-2 pt-4">
            <button className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
              Сохранить изменения
            </button>
            <button className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 text-sm rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
