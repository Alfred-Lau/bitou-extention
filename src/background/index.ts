import { createContextMenu } from './contextMenu';

console.log('This is background page!');

chrome.runtime.onInstalled.addListener(async (details) => {
    console.log('-- runtime installed');
    console.log('🚀 ~ file: index.ts:11 ~ details:', details);

    createContextMenu();
});
