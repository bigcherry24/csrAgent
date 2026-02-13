// content_list_router.js
(function () {
    console.log("CSR Auto-Assigner: Router Script Loaded.");

    // Check loop state from local storage
    chrome.storage.local.get(['automationState'], (result) => {
        const state = result.automationState;

        if (state && state.active) {
            if (state.remaining > 0) {
                console.log(`CSR Auto-Assigner: Loop active. Remaining: ${state.remaining}`);

                // Decrement remaining count
                const newState = { active: true, remaining: state.remaining - 1 };
                chrome.storage.local.set({ automationState: newState }, () => {
                    console.log("CSR Auto-Assigner: State updated. Searching for target...");

                    // Find and Navigate
                    findAndNavigate();
                });
            } else {
                console.log("CSR Auto-Assigner: Loop finished.");
                chrome.storage.local.set({ automationState: { active: false, remaining: 0 } });
                alert("CSR Auto-Assigner: Automation Loop Completed!");
            }
        } else {
            console.log("CSR Auto-Assigner: No active loop.");
        }
    });

    function findAndNavigate() {
        // Reuse logic similar to content_list_finder.js but executing directly here
        const rows = document.querySelectorAll("table tbody tr");
        let targetUrl = null;

        for (const row of rows) {
            const statusCell = row.querySelector(".status-unassigned");

            if (statusCell && (statusCell.textContent.includes("접수대기") || statusCell.textContent.includes("Unassigned"))) {
                const link = row.querySelector("a");
                if (link) {
                    targetUrl = link.href;
                    console.log(`CSR Auto-Assigner: Found unassigned CSR. Navigating to: ${targetUrl}`);
                    window.location.href = targetUrl; // Direct navigation
                    return;
                }
            }
        }

        console.warn("CSR Auto-Assigner: No unassigned CSR found in loop.");
        // If no item found, stop the loop
        chrome.storage.local.set({ automationState: { active: false, remaining: 0 } });
        alert("CSR Auto-Assigner: No more unassigned items found. Loop stopped.");
    }
})();
