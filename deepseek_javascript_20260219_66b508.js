// Add this helper function
async function triggerSyncAfterChange() {
    if (!DataService.isLinked() || !AppState.currentUser) return;
    
    // Only sync if auto-sync is enabled or user just made a change
    if (localStorage.getItem('rihlatiAutoSync') === '1') {
        // Debounce to avoid multiple syncs
        clearTimeout(window.syncTimeout);
        window.syncTimeout = setTimeout(() => {
            syncDataFromSheets();
        }, 2000);
    }
}

// Then add triggerSyncAfterChange() to these functions:
// - saveUser() (after AppState.users = [...])
// - approveReport(), rejectReport()
// - submitTicket()
// - saveCampaignRequest()
// - approveTicket(), rejectTicket()
// - submitRoleReport()
// - submitFinancialReport()