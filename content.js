document.body.style.backgroundColor = 'pink';
console.info('wrapper body', document.body);

const sendMessage = () => {
  console.info('==== B captcha emit =====');
  chrome.runtime.sendMessage(
    {
      action: 'complete',
    },
    function (response) {
      console.log('========= 收到来自后台的回复：' + response + '=========');
    },
  );
};

const onMessage = () => {
  console.info('==== A captcha RECEIVE =====');

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == 'complete') {
      console.log('=========  Check passed  =========');
      sendResponse('我收到了你的消息！');
    }
  });
};

const interval = setInterval(() => {
  let checkPass = false;
  const checkBox = document.getElementById('checkbox');

  if (checkBox) {
    checkPass = checkBox.getAttribute('aria-checked') == 'true';
  }

  console.log('=========  checking  =========', checkBox, checkPass);

  if (checkPass) {
    document.body.style.backgroundColor = 'green';
    console.info('pass body', document.body);

    console.log('=========  Check passed  =========');

    sendMessage();
    clearInterval(interval);
  }
}, 3000);

onMessage();

// 1O minutes clean timer
setTimeout(() => {
  clearInterval(interval);
}, 1000 * 60 * 10);
