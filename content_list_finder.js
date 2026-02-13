// content_list_finder.js
(function () {
    console.log("CSR Auto-Assigner: Searching for unassigned CSRs...");

    // Find all rows in the table
    const rows = document.querySelectorAll("table tbody tr");
    let targetUrl = null;

    for (const row of rows) {
        // Check if the row contains "접수대기" or "Unassigned" status
        // Adjust the selector based on the actual structure of test_itsm_list.html
        const statusCell = row.querySelector(".status-unassigned");

        if (statusCell && (statusCell.textContent.includes("접수대기") || statusCell.textContent.includes("Unassigned"))) {
            // Found an unassigned CSR, get the link
            const link = row.querySelector("a");
            if (link) {
                targetUrl = link.href;
                console.log(`CSR Auto-Assigner: Found unassigned CSR. URL: ${targetUrl}`);
                break; // Stop after finding the first one
            }
        }
    }

    return targetUrl; // returns to the callback in executeScript
})();
