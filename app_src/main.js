// Script d'entrée

// importe electron
const electron = require("electron");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
let mainWindow;


app.on("ready", () => {
  let config = {
    width: 800,
    height: 450,
    center: true,
    resizable: false,
    fullscreenable: true
  };
  mainWindow = new BrowserWindow(config);

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  exports.mainWindow = mainWindow;
});
