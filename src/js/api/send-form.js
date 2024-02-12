import { IsAllFieldsFilled, ClearIputFields, toggleValidationError } from "./validation";

let cantSendAgain = false;

const GenerateDataForSend = () => {
  const inputBoxes = document.querySelectorAll(".input-box");
  const data = [];
  inputBoxes.forEach(element => {
    const input = element.children[0];
    data.push({
      id: element.id,
      value: input.value
    });
  });
  return data;
}

const ShowResponseWindow = (response) => {
  const messageWindow = document.querySelector('.popup-window');
  const status = response.status === "error" ? "fail" : "success";
  console.log('status', status);
  messageWindow.innerHTML = response.msg;
  messageWindow.classList.add('popup-window--show');
  messageWindow.classList.add(`popup-window--${status}`);

  cantSendAgain = true;
  setTimeout(() => {
    messageWindow.classList.remove('popup-window--show');
    messageWindow.classList.remove(`popup-window--${status}`);
    cantSendAgain = false;
  }, 6000);

  if (status === "fail") {
    const fields = response.fields;
    if (fields) {
      console.log('fields', fields);
      for (const id in fields) {
        toggleValidationError(id);
      }
    }
  } else ClearIputFields();
}

function submitHandler(e) {
  e.preventDefault();

  if (cantSendAgain) return console.error('Error: timeout before another sending');
  if (!IsAllFieldsFilled()) return console.error('Error: some field not filled');

  const request = new XMLHttpRequest();
  try {
    request.onreadystatechange = function () {
      // console.log("readyState=", this.readyState, "status=", this.status);
      if (this.readyState == XMLHttpRequest.DONE) {

        if (this.responseText.length !== 0) {
          const response = JSON.parse(this.responseText);
          ShowResponseWindow(response);
        } else {
          ShowResponseWindow({
            status: 'error',
            msg: 'Ошибка подключения к серверу...'
          });
        }
      }
    }
  } catch (e) { console.error(e) }

  const data = JSON.stringify(GenerateDataForSend());
  const action = "http://localhost:9000/api/registration";
  request.open('POST', action, true);
  request.setRequestHeader('Content-Type', action);
  request.send(data);
}

document.querySelector("form").addEventListener("submit", submitHandler);