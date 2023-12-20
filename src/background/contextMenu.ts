type ContextMenuItem = {
    id: string;
    title: string;
    contexts: chrome.contextMenus.ContextType[];
};

const menus: ContextMenuItem[] = [
    {
        id: 'open-website',
        title: 'Open website',
        contexts: ['page'],
    },
    {
        id: 'open-website2',
        title: 'Open website2',
        contexts: ['page'],
    },
];

export const createContextMenu = () => {
    menus.forEach((menu) => {
        chrome.contextMenus.create({
            id: menu.id,
            title: menu.title,
            contexts: menu.contexts,
        });
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        console.log(
            '🚀 ~ file: context-menu.ts:31 ~ chrome.contextMenus.onClicked.addListener ~ tab:',
            tab,
        );
        if (info.menuItemId === 'open-website') {
            chrome.tabs.create({
                url: 'https://www.google.com',
            });
        }
    });
};
