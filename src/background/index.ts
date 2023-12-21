import { createContextMenu } from './contextMenu';
import shortcutListener from './shortcutListener';

// 创建右键事件
chrome.runtime.onInstalled.addListener(async (details) => {
    console.log('-- runtime installed');
    console.log('🚀 ~ file: index.ts:11 ~ details:', details);

    createContextMenu();
});

// 监听快捷键
shortcutListener();
