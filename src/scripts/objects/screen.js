const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(userData) {
    this.userProfile.innerHTML = `    <div class="info">
                            <img src="${
                              userData.avatarUrl
                            }" alt="Foto de perfil do user"/>
                            <div class="data">
                                <h1>${
                                  userData.name ??
                                  "Não possui nome cadastrado 😅"
                                }</h1>
                                <p>${
                                  userData.bio ?? "Não possui bio cadastrada 😅"
                                }</p>
                            </div>
                        </div>`;

    let reposItens = "";
    userData.repos.forEach(
      (repo) =>
        (reposItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)
    );

    if(userData.repos.length > 0){
        this.userProfile.innerHTML += `<div class="repositories section">
        <h2>Repositórios</h2>
        <ul>${reposItens}</ul>
        </div>`
    }
  },
  renderNotFound(){
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
  }
};

export { screen };
