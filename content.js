// This script runs in the context of the ITSM page.

(function () {
  console.log("CSR Auto-Assigner: Attempting to auto-assign...");

  // Retrieve the target system name from storage (default to 'HMP')
  chrome.storage.sync.get({ systemName: 'HMP' }, (items) => {
    const targetSystemName = items.systemName;
    console.log(`CSR Auto-Assigner: Using System Name '${targetSystemName}'`);

    // 1. Select "요청 유형" (Request Type) dropdown
    const requestTypeDropdown = document.getElementById("requestType");
    if (requestTypeDropdown) {
      requestTypeDropdown.value = "general"; // Set to the desired value (e.g., 'general', 'feature', 'bug')
      console.log("CSR Auto-Assigner: Selected Request Type.");
      // Dispatch a change event if the site uses JavaScript to react to changes
      requestTypeDropdown.dispatchEvent(new Event('change'));
    } else {
      console.error("CSR Auto-Assigner: Request Type dropdown (id='requestType') not found.");
    }

    // 2. Select "처리 담당자" (Processing Handler) dropdown
    const handlerDropdown = document.querySelector("select[name='handler']");
    if (handlerDropdown) {
      // IMPORTANT: Replace "user123" with the actual value for the handler you want to assign.
      // This value usually corresponds to the 'value' attribute of an <option> tag.
      handlerDropdown.value = "user123";
      console.log("CSR Auto-Assigner: Selected Processing Handler.");
      // Dispatch a change event
      handlerDropdown.dispatchEvent(new Event('change'));
    } else {
      console.error("CSR Auto-Assigner: Processing Handler dropdown (name='handler') not found.");
    }

    // 2.5. Search "시스템 명" (System Name)
    const systemInput = document.getElementById("systemSearch");
    const searchBtn = document.getElementById("searchSystemBtn");

    if (systemInput && searchBtn) {
      systemInput.value = targetSystemName;
      console.log(`CSR Auto-Assigner: Entered System Name '${targetSystemName}'.`);
      searchBtn.click();
      console.log("CSR Auto-Assigner: Clicked Search System button.");
    } else {
      console.warn("CSR Auto-Assigner: System Search field or button not found.");
    }

    // 3. Click the "저장" (Save) button
    const saveButton = document.getElementById("saveButton");
    if (saveButton) {
      saveButton.click();
      console.log("CSR Auto-Assigner: Clicked Save button.");
    } else {
      console.error("CSR Auto-Assigner: Save button (id='saveButton') not found.");
    }

    // 4. Redirect to list page
    setTimeout(() => {
      console.log("CSR Auto-Assigner: Redirecting to list page...");
      window.location.href = "http://127.0.0.1:5500/test_itsm_list.html";
    }, 3000); // 1 second delay
  });
})();