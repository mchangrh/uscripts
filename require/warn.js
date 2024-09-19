function displayWarning(text, id) {
  const cont = document.querySelector("ytd-masthead#masthead");
  const spanEl = document.createElement("span");
  spanEl.id = id;
  spanEl.textContent = `!!!!! ${text} !!!!!`;
  spanEl.style = `
    font-size: 16px;
    text-align: center;
    padding-top: 5px;
    display: block;
    color: #fff;
    background: #f00;
    width: 100%;
    height: 30px;`;
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "X";
  closeBtn.style = `
    position: absolute;
    right: 5px;
    border: none;
    background: #f00;
    color: #fff;
    font-weight: bold;
    cursor: pointer;`;
  cont.prepend(spanEl);
  spanEl.append(closeBtn);
  closeBtn.onclick = () => spanEl.remove();
}
