const path = require("path");
const { session, app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      partition: "persist:MyAppSomethingUnique",
    },
  });

  win.on("did-start-navigation", function () {
    session.defaultSession.cookies.flushStore();
  });

  win.on("did-navigate", function () {
    session.defaultSession.cookies.flushStore();
  });

  win.loadURL("https://gmail.com");
}

app.whenReady().then(() => {
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
