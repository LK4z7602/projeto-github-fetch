import { getUser } from "/src/scripts/services/user.js";
import { getRepos } from "/src/scripts/services/repos.js";

import { user } from "/src/scripts/objects/user.js";
import { screen } from "/src/scripts/objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    getUserProfile(userName);
  }
});

async function getUserData(userName) {
  const userResponse = await getUser(userName);
  const reposResponse = await getRepos(userName);

  user.setInfo(userResponse);
  user.setRepos(reposResponse)

  screen.renderUser(user);
}
