blob.style.display = "none";
document.addEventListener("mouseenter", (event) => {
    blob.style.display = "block";
    centerBlob();
});
function centerBlob() {
    const { innerWidth, innerHeight } = window;
    const blobWidth = blob.offsetWidth;
    const blobHeight = blob.offsetHeight;
    blob.style.top = `${innerHeight / 2 - blobHeight / 2}px`;
    blob.style.left = `${innerWidth / 2 - blobWidth / 2}px`;
}
document.body.onpointermove = (event) => {
    const { clientX, clientY } = event;
    blob.animate(
        {
            left: `${clientX}px`,
            top: `${clientY}px`,
        },
        { duration: 2000, fill: "forwards" }
    );
};

// Blob

const fileInput = document.querySelector("#fileInput");
const submitBtn = document.querySelector("#submitBtn");
const fileContents = document.querySelector("#fileContents");

submitBtn.addEventListener("click", () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Выберите файл!");
        return;
    }

    if (!file.name.endsWith(".txt")) {
        alert("Выберите файл с расширением .txt!");
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        fileContents.textContent = event.target.result;
    };

    reader.readAsText(file);
});

function vigenereEncrypt(message, key) {
    let encryptedMessage = "";
    const keyLength = key.length;

    for (let i = 0; i < message.length; i++) {
        const messageChar = message[i];
        const keyChar = key[i % keyLength];

        const messageCharCodeAt = messageChar.charCodeAt(0);
        const keyCharCodeAt = keyChar.charCodeAt(0);

        let encryptedChar = "";

        if (messageCharCodeAt >= 32 && messageCharCodeAt <= 126) {
            encryptedChar = String.fromCharCode(
                ((messageCharCodeAt - 32 + keyCharCodeAt - 32) % 95) + 32
            );
        } else {
            encryptedChar = messageChar;
        }

        encryptedMessage += encryptedChar;
    }

    return encryptedMessage;
}

const messageInput = document.querySelector("#message");
const keyInput = document.querySelector("#key");
const outputElement = document.querySelector("#output");
const encryptButton = document.querySelector("#encryptButton");

encryptButton.addEventListener("click", function () {
    const message = messageInput.value;
    const key = keyInput.value;

    const encryptedMessage = vigenereEncrypt(message, key);

    outputElement.textContent = `Зашифрованное сообщение: ${encryptedMessage}`;
});

function vigenereDecrypt(encryptedMessage, key) {
    let decryptedMessage = "";
    const keyLength = key.length;

    for (let i = 0; i < encryptedMessage.length; i++) {
        const encryptedChar = encryptedMessage[i];
        const keyChar = key[i % keyLength];

        const encryptedCharCodeAt = encryptedChar.charCodeAt(0);
        const keyCharCodeAt = keyChar.charCodeAt(0);

        let decryptedChar = "";

        if (encryptedCharCodeAt >= 32 && encryptedCharCodeAt <= 126) {
            decryptedChar = String.fromCharCode(
                ((encryptedCharCodeAt - 32 - keyCharCodeAt + 32 + 95) % 95) + 32
            );
        } else {
            decryptedChar = encryptedChar;
        }

        decryptedMessage += decryptedChar;
    }

    return decryptedMessage;
}

const messageInput2 = document.querySelector("#messageInput2");
const keyInput2 = document.querySelector("#keyInput");
const outputMessage = document.querySelector("#outputMessage");
const descriptButton = document.querySelector("#decryptButton");

descriptButton.addEventListener("click", function () {
    const encryptedMessage = messageInput2.value;
    const key = keyInput2.value;

    const decryptedMessage = vigenereDecrypt(encryptedMessage, key);

    outputMessage.textContent = `Расшифровка: ${decryptedMessage}`;
});
