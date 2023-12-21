import chrome from './core/chrome';

const shortcutListener = () => {
    chrome.commands.onCommand.addListener((command) => {
        console.log('🚀 ~ file: shortcutListener.ts ~ line 26 ~ command', command);
        if (command === 'toggle-feature') {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id!, { action: 'toggle-feature' });
            });
        }
    });
};

export default shortcutListener;
