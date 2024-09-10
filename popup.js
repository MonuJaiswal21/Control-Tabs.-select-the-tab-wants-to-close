document.addEventListener('DOMContentLoaded', () => {
    // Request tabs from the background script
    chrome.runtime.sendMessage({ action: 'getTabs' }, (tabs) => {
      const tabsContainer = document.getElementById('tabs');
      tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.className = 'tab';
        tabElement.innerHTML = `
          <span>${tab.title}</span>
          <button data-tab-id="${tab.id}">Close</button>
        `;
        tabsContainer.appendChild(tabElement);
      });
  
      // Add event listeners to close buttons
      tabsContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          const tabId = parseInt(event.target.getAttribute('data-tab-id'), 10);
          chrome.runtime.sendMessage({ action: 'closeTab', tabId });
          // Remove the tab element from the DOM
          event.target.parentElement.remove();
        }
      });
    });
  });
  