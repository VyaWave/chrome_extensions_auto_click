console.info('root background.js loaded successfully');
//// background.js ////

console.info('=========  onClicked tab  =========');

chrome.action.onClicked.addListener(tab => {
  console.info('=========  onClicked tab  =========', tab);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('=========  Middle Check passed  =========', request);

  if (request.action == 'complete') {
    console.log('=========  Middle Check passed  =========');
    // sendResponse('我收到了你的消息！');

    chrome.runtime.sendMessage(
      {
        action: 'complete',
      },
      // function (response) {
      //   console.log('========= 收到来自后台的回复：' + response + '=========');
      // },
    );
    return;
  }
});
