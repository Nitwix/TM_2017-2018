// Script d'entrée

const path = require("path");

// importe electron
const electron = require("electron");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;
app.on("ready", () => {
    // l'icon ne s'affiche pas correctement (sur ubuntu en tout cas)
    let config = {
        width: 800,
        height: 450,
        center: true,
        resizable: true,
        icon: `${__dirname}/assets/sprites/preload/earth_large.png`
    };
    // console.log(__dirname);


    mainWindow = new BrowserWindow(config);

    if(process.platform == "win32"){
      mainWindow.setMenu(null);
      mainWindow.setSize(816, 489);
    }

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

});
