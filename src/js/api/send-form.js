import { IsAllFieldsFilled, ClearIputFields } from "./validation";

let cantSendAgain = false;

const GenerateDataForSend = () => {
  const inputBoxes = document.querySelectorAll(".input-box");
  const data = [];
  inputBoxes.forEach(element => {
    const input = element.children[0];
    data.push({
      id: input.id,
      value: input.value
    });
  });
  return data;
}

const ShowResponseWindow = (response) => {
  const messageWindow = document.querySelector('.popup-window');
  const status = response.status == "error" ? "fail" : "success";
  console.log('status', status);
  messageWindow.innerHTML = response.msg;
  messageWindow.classList.add('popup-window--show');
  messageWindow.classList.add(`popup-window--${status}`);
  setTimeout(() => {
    messageWindow.classList.remove('popup-window--show');
    messageWindow.classList.remove(`popup-window--${status}`);
    cantSendAgain = false;
  }, 6000);
}

function submitHandler(e) {
  e.preventDefault();

  if (cantSendAgain) return console.error('Error: timeout before another sending');
  if (!IsAllFieldsFilled()) return console.error('Error: some field not filled');

  const request = new XMLHttpRequest();
  try {
    request.onreadystatechange = function () {
      // console.log("readyState=", this.readyState, "status=", this.status);
      if (this.readyState == XMLHttpRequest.DONE && this.responseText) {
        ClearIputFields();
        cantSendAgain = true;
        const response = JSON.parse(this.responseText);
        ShowResponseWindow(response);
      }
    }
  } catch (e) { console.error(e) }

  const data = JSON.stringify(GenerateDataForSend());
  request.open(this.method, this.action, true);
  request.setRequestHeader('Content-Type', this.action);
  request.send(data);
}

document.querySelector("form").addEventListener("submit", submitHandler);