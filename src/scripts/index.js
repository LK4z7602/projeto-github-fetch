document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  getUserProfile(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    getUserProfile(userName);
  }
});

async function user(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return await response.json();
}

async function repos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  return await response.json();
}

function getUserProfile(userName) {
  user(userName).then((userData) => {
    console.log(userData);
    let userInfo = `    <div class="info">
                            <img src="${userData.avatar_url}" alt="Foto de perfil do user"/>
                            <div class="data">
                                <h1>${
                                userData.name ?? "Não possui nome cadastrado 😅"
                                }</h1>
                                <p>${
                                userData.bio ?? "Não possui bio cadastrada 😅"
                                }</p>
                            </div>
                        </div>`;

    document.querySelector(".profile-data").innerHTML = userInfo;

    getUserRepos(userName);
  });
}

function getUserRepos(userName) {
  repos(userName).then((reposData) => {
    let reposItens = "";

    reposData.forEach((repo) => {
      reposItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a> </li>`;
    });

    document.querySelector(
      ".profile-data"
    ).innerHTML += `<div class="repositories section"
                                                            <h2>Repositórios</h2>
                                                            <ul>${reposItens}</ul>
                                                        </div>`;

    console.log(reposData);
  });
}
