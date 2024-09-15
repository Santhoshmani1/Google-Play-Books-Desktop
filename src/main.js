// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        icon: "../assets/play-books-icon.png",
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Remove the MenuBar, maximize the window
    mainWindow.setMenuBarVisibility(false)
    mainWindow.maximize()

    // Load the Google Play Books website in the browser window
    mainWindow.loadURL("https://play.google.com/books")
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()


    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

