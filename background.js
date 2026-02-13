// Called when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "assignCsr",
    title: "CSR 접수 (자동 할당)",
    contexts: ["page"],
    documentUrlPatterns: ["http://127.0.0.1:5500/test_itsm_page.html*"]
  });

  chrome.contextMenus.create({
    id: "assignCsrFromList",
    title: "CSR 리스트 접수(자동 할당)",
    contexts: ["page"],
    documentUrlPatterns: ["http://127.0.0.1:5500/test_itsm_list.html*"]
  });
});

// Called when the user clicks on a context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "assignCsr") {
    if (tab.url && tab.url.startsWith("http://127.0.0.1:5500/test_itsm_page.html")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
    }
  } else if (info.menuItemId === "assignCsrFromList") {
    if (tab.url && tab.url.startsWith("http://127.0.0.1:5500/test_itsm_list.html")) {
      // 1. Inject Finder Script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content_list_finder.js"]
      }, (results) => {
        if (results && results[0] && results[0].result) {
          const targetUrl = results[0].result;
          console.log(`Background: Navigating to ${targetUrl}`);

          // 2. Navigate to the found URL
          chrome.tabs.update(tab.id, { url: targetUrl }, (updatedTab) => {
            // 3. Listen for the update to complete
            const listener = (listenTabId, changeInfo, listenTab) => {
              if (listenTabId === tab.id && changeInfo.status === 'complete' && listenTab.url === targetUrl) {
                // Remove listener to avoid multiple injections
                chrome.tabs.onUpdated.removeListener(listener);

                console.log("Background: Navigation complete. Injecting content script...");
                // 4. Inject the form filling script
                chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  files: ["content.js"]
                });
              }
            };
            chrome.tabs.onUpdated.addListener(listener);
          });
        } else {
          console.log("Background: No unassigned CSR found.");
          // Optional: Verify alert is possible in this context, or just log
        }
      });
    }
  }
});