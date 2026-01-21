// Background service worker for Dev-OC Accessibility Auditor
// Handles extension lifecycle and potential future background tasks

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Dev-OC Accessibility Auditor installed");
  } else if (details.reason === "update") {
    console.log(
      `Dev-OC Accessibility Auditor updated to version ${chrome.runtime.getManifest().version}`
    );
  }
});

// Keep service worker alive for message passing
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "getVersion") {
    sendResponse({ version: chrome.runtime.getManifest().version });
  }
  return true;
});

export {};
