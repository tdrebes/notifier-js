/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
 const NOTIFICATION_TITLE = 'Notification'
 const NOTIFICATION_BODY = 'This is the content of a notification.'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  replaceText('notification_title', NOTIFICATION_TITLE);
  replaceText('notification_text', NOTIFICATION_BODY);
})
