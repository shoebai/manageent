// Modify initSheetsUI() to show sync status for all users
function initSheetsUI() {
    const url = DataService.getSheetsUrl();
    if (url) {
        document.getElementById('sheetsUrlInput').value = url;
        validateSheetsUrl(document.getElementById('sheetsUrlInput'));
        document.getElementById('syncActions').style.display = 'flex';
        
        // Show connected status for all users if Sheets is linked
        setSyncStatus('connected', 'Connected');
        
        // Test connection in background
        testSheetsConnection().catch(() => {
            setSyncStatus('offline', 'Unreachable');
        });
    } else {
        setSyncStatus('not-linked', 'Not linked');
    }
    
    updateLastSyncLabel();
    const autoOn = localStorage.getItem('rihlatiAutoSync') === '1';
    document.getElementById('autoSyncToggle').checked = autoOn;
    updateAutoSyncSlider(autoOn);
    
    if (autoOn && url) {
        // Set up auto-sync for current user (if logged in)
        autoSyncInterval = setInterval(async () => {
            if (AppState.currentUser) {
                await syncDataFromSheets();
            }
        }, 2 * 60 * 1000);
    }
    
    updatePinStatusDisplay();
    const codeEl = document.getElementById('appsScriptCode');
    if (codeEl) codeEl.value = getAppsScriptCode();
}