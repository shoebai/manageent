// Add to loadInterface() function where you build nav items
// After building navMenu.innerHTML, add this:

// Add sync button to top bar for all users (not just admin)
const topBarActions = document.getElementById('topBarActions');
if (topBarActions && DataService.isLinked() && AppState.currentUser) {
    topBarActions.innerHTML = `
        <button class="btn btn-secondary" onclick="manualSync()" style="padding: 8px 16px; min-height: 40px;">
            🔄 Sync
        </button>
    `;
}

// Add this function
async function manualSync() {
    if (!DataService.isLinked()) {
        Utils.showToast('Google Sheets not connected', true);
        return;
    }
    
    await syncDataFromSheets();
}