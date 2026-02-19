// Add to your script
async function syncDataFromSheets() {
    if (!DataService.isLinked()) return;
    
    try {
        Utils.showLoading(true);
        const counts = await DataService.pullFromSheets();
        AppState.data = DataService.getData();
        
        // Update UI based on current user's permissions
        if (AppState.currentUser) {
            const perms = getEffectivePermissions(AppState.currentUser);
            if (perms.canViewAllReports) loadAdminDashboard();
            if (perms.canViewMyReports) loadMyReports();
            if (perms.canManageTickets) loadAdminTickets();
            if (perms.canViewFinancial) loadFinancialDashboard();
            if (perms.canManageCampaigns) loadSalesDashboard();
            
            // Update pending badge
            updatePendingTicketsBadge();
        }
        
        Utils.showToast(`🔄 Data synced: ${counts.users || 0} users, ${counts.reports || 0} reports, ${counts.tickets || 0} tickets`);
    } catch (error) {
        console.error('Sync failed:', error);
        Utils.showToast('Sync failed: ' + error.message, true);
    } finally {
        Utils.showLoading(false);
    }
}