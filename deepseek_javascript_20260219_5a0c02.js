// Add to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Listen for storage events from other tabs
    window.addEventListener('storage', function(e) {
        if (e.key === 'fleetManagementData' && AppState.currentUser) {
            // Data changed in another tab, refresh if auto-sync is on
            if (localStorage.getItem('rihlatiAutoSync') === '1') {
                AppState.data = JSON.parse(e.newValue);
                // Refresh UI
                const perms = getEffectivePermissions(AppState.currentUser);
                if (perms.canViewAllReports) loadAdminDashboard();
                if (perms.canViewMyReports) loadMyReports();
                if (perms.canManageTickets) loadAdminTickets();
                if (perms.canViewFinancial) loadFinancialDashboard();
                if (perms.canManageCampaigns) loadSalesDashboard();
            }
        }
    });
});