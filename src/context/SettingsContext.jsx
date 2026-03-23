import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SETTINGS_KEY = "appSettings";

const defaultSettings = {
  darkMode: false,
  censorImages: false,
  hideInstallButton: false,
};

const SettingsContext = createContext({
  settings: defaultSettings,
  updateSetting: () => {},
});

function getInitialSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return { ...defaultSettings, ...parsed };
  } catch (error) {
    console.error("Erro ao ler configurações:", error);
    return defaultSettings;
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(getInitialSettings);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.body.classList.toggle("app-dark-mode", settings.darkMode);
    document.body.classList.toggle("app-censor-images", settings.censorImages);
  }, [settings.darkMode, settings.censorImages]);

  const value = useMemo(
    () => ({
      settings,
      updateSetting: (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
      },
    }),
    [settings]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
