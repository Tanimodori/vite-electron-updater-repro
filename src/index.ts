export default async () => {
  const module = await import("electron-updater");
  const autoUpdater = module.autoUpdater || module.default.autoUpdater;
  return autoUpdater.checkForUpdatesAndNotify();
};
