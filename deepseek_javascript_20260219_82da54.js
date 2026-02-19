// Replace the toggleAutoSync function
function toggleAutoSync(enabled) {
    updateAutoSyncSlider(enabled);
    localStorage.setItem('rihlatiAutoSync', enabled ? '1' : '0');
    
    if (enabled) {
        if (!DataService.isLinked()) {
            Utils.showToast('Please connect Google Sheets first', true);
            document.getElementById('autoSyncToggle').checked = false;
            updateAutoSyncSlider(false);
            return;
        }
        
        // Clear existing interval if any
        if (autoSyncInterval) clearInterval(autoSyncInterval);
        
        // Set up interval for ALL users
        autoSyncInterval = setInterval(async () => {
            // Only sync if user is logged in
            if (AppState.currentUser) {
                await syncDataFromSheets();
            }
        }, 2 * 60 * 1000); // Sync every 2 minutes for real-time updates
        
        Utils.showToast('Auto-sync enabled (every 2 minutes)');
    } else {
        if (autoSyncInterval) {
            clearInterval(autoSyncInterval);
            autoSyncInterval = null;
        }
    }
}