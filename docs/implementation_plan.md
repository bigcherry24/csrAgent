# Implementation Plan - CSR List Automation & Configuration Feature (Completed)

This plan documents the implemented features:
1.  **List Automation:** Automates selecting an unassigned CSR from a list page.
2.  **Form Filling:** Automatically inputs Request Type, Handler, and configurable System Name.
3.  **System Search:** Finds and selects a system (e.g., "HMP") via a search field.
4.  **Configuration:** Allows users to set a default System Name via an Options page.
5.  **Navigation Flow:** Redirects back to the list page after saving.

## User Review Required
> [!NOTE]
> All features listed below have been implemented and verified.

## Implemented Changes

### Web Assets
#### [NEW] [test_itsm_list.html](file:///home/aurakim/workspace/csrAgent/test_itsm_list.html)
- A new HTML file simulating a list of CSR requests.
- Contains a table with rows having "Status" (Assigned/Unassigned).
- Used to test the "Find Unassigned CSR" logic.

#### [MODIFY] [test_itsm_page.html](file:///home/aurakim/workspace/csrAgent/test_itsm_page.html)
- Added a "System Name Search" input field and search button to simulate real-world scenarios.

### Extension Logic
#### [MODIFY] [manifest.json](file:///home/aurakim/workspace/csrAgent/manifest.json)
- Added `storage` permission for saving user preferences.
- Added `options_ui` configuration.
- Updated `host_permissions` to include `test_itsm_list.html`.

#### [MODIFY] [background.js](file:///home/aurakim/workspace/csrAgent/background.js)
- Added "CSR 리스트 접수(자동 할당)" Context Menu.
- Implemented logic to inject `content_list_finder.js`, navigate to the found URL, and then inject `content.js`.

#### [NEW] [content_list_finder.js](file:///home/aurakim/workspace/csrAgent/content_list_finder.js)
- Finds the first unassigned CSR link on the list page.

#### [MODIFY] [content.js](file:///home/aurakim/workspace/csrAgent/content.js)
- Retrieves "System Name" from `chrome.storage.sync` (default: "HMP").
- Automates:
    1.  Select Request Type ("general").
    2.  Select Handler ("user123").
    3.  Enter System Name & Click Search.
    4.  Click Save.
    5.  Redirect back to `test_itsm_list.html` after 1 second.

### Configuration
#### [NEW] [options.html](file:///home/aurakim/workspace/csrAgent/options.html)
- User interface for setting the default System Name.

#### [NEW] [options.js](file:///home/aurakim/workspace/csrAgent/options.js)
- Logic to save and restore the System Name setting using `chrome.storage.sync`.

## Verification Plan
### Manual Verification
1.  **Configure:** Open Extension Options -> Set System Name (e.g., "SAP") -> Save.
2.  **Start:** Open `test_itsm_list.html`.
3.  **Execute:** Right-click -> "CSR 리스트 접수(자동 할당)".
4.  **Verify Flow:**
    - Browser navigates to an unassigned CSR detail page.
    - System Name "SAP" is entered and searched.
    - Form is saved.
    - Browser redirects back to the list page.
