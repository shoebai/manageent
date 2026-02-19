// Add to Utils
const debouncedSync = Utils.debounce(async () => {
    if (DataService.isLinked() && AppState.currentUser) {
        await syncDataFromSheets();
    }
}, 5000);