// Saves options to chrome.storage
const saveOptions = () => {
    const systemName = document.getElementById('systemName').value;

    chrome.storage.sync.set(
        { systemName: systemName },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { systemName: 'HMP' }, // Default value
        (items) => {
            document.getElementById('systemName').value = items.systemName;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
