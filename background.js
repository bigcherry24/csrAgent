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
      // 0. Get Repeat Count from Options
      chrome.storage.sync.get({ repeatCount: 1 }, (items) => {
        const count = parseInt(items.repeatCount, 10) || 1;
        console.log(`Background: Starting automation loop with count: ${count}`);

        // 1. Initialize Loop State
        chrome.storage.local.set({ automationState: { active: true, remaining: count } }, () => {
          // 2. Reload the page to trigger content_list_router.js
          // Alternatively, we can just inject the router if we don't want to reload, 
          // but reloading ensures a fresh state.
          chrome.tabs.reload(tab.id);
        });
      });
    }
  }
});

// 3. Persistent Listener for Detail Page Injection
// This is needed because content_list_router.js navigates to the detail page,
// and we need to inject content.js when that navigation completes.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith("http://127.0.0.1:5500/test_itsm_page.html")) {
    console.log(`Background: Detected navigation to Detail Page. Injecting content.js...`);
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"]
    });
  }
});