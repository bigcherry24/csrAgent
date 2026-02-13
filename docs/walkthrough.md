# CSR Auto-Assigner - Usage Walkthrough

This guide explains how to use the new features of the **CSR Auto-Assigner** extension.

## 1. Installation / Reloading
1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode**.
3.  Click **Load unpacked** and select the project folder (`/home/aurakim/workspace/csrAgent`).
4.  If already installed, click the **Reload** (circular arrow) icon on the extension card.

## 2. Configuration (Options Page)
1.  Right-click the extension icon in the toolbar.
2.  Select **Options** (설정).
3.  Enter your desired **System Name** (e.g., `SAP`, `HMP`).
4.  Click **Save Settings**.
    > The default value is `HMP`.

## 3. Testing Automation
### Scenario: Auto-Assign from List
1.  Open the test list page:
    [http://127.0.0.1:5500/test_itsm_list.html](http://127.0.0.1:5500/test_itsm_list.html)
2.  Right-click anywhere on the page.
3.  Select **CSR 리스트 접수(자동 할당)**.
4.  **Observe the automation flow:**
    - The extension will find the first **"접수대기" (Unassigned)** item.
    - It will navigate to the detail page (`test_itsm_page.html`).
    - It will automatically:
        - Select **Request Type** (`General`).
        - Select **Handler** (`user123`).
        - Enter and Search for the **System Name** (configured in Options).
        - Click **Save**.
    - After 1 second, it will **redirect back** to the list page.

## 4. Expected Results
- The detail page form should be filled correctly.
- The "System Name" field should match what you set in the Options page.
- The process should loop back to the list page, ready for the next assignment (if you were to run it again).
