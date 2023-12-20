type ContextMenuItem = {
    id: string;
    title: string;
    contexts: chrome.contextMenus.ContextType[];
    onClick?: (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void;
};

const menus: ContextMenuItem[] = [
    {
        id: 'click-count',
        title: '查看数据',
        contexts: ['page', 'selection'],
        onClick: (info, tab) => {
            console.log(
                '🚀 ~ file: context-menu.ts:31 ~ chrome.contextMenus.onClicked.addListener ~ tab:',
                tab,
                info,
            );
        },
    },
    {
        id: 'change-text',
        title: '更换文案',
        contexts: ['page', 'selection'],
        onClick: (info, tab) => {
            console.log(
                '🚀 ~ file: context-menu.ts:31 ~ chrome.contextMenus.onClicked.addListener ~ tab:',
                tab,
                info,
            );
        },
    },
    {
        id: 'edit-page',
        title: '编辑页面',
        contexts: ['page', 'selection'],
        onClick: (info, tab) => {
            console.log(
                '🚀 ~ file: context-menu.ts:31 ~ chrome.contextMenus.onClicked.addListener ~ tab:',
                tab,
                info,
            );
        },
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
