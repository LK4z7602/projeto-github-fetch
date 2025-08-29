import { getUser } from "./services/user.js";
import { getRepos } from "./services/repos.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyInput(userName)) return;
    getUserProfile(userName);
  }
});

async function getUserData(userName) {
  const userResponse = await getUser(userName);

  if(userResponse.message === "Not Found"){
    screen.renderNotFound()
    return
  }

  const reposResponse = await getRepos(userName);

  user.setInfo(userResponse);
  user.setRepos(reposResponse);

  screen.renderUser(user);
}

function validateEmptyInput(userName) {
  if (userName.trim() === "") {
    alert("Preencha o campo com o nome do usuário do GitHub");
    return true;
  }
}