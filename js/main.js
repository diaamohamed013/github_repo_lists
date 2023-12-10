let userNameInp = document.getElementById('username');
let userForm = document.getElementById('user-form');
let repoContainer = document.querySelector('.repos');
let searchTerm = document.querySelector('#search-term');
let userError = document.querySelector('.userErr');
let errMsgEl = document.querySelector('.errMsg');

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = userNameInp.value.trim();
    if (user) {
        searchTerm.innerHTML = '';
        errMsgEl.innerHTML = '';
        repoContainer.innerHTML = `<div class='d-flex justify-content-center align-items-center'>
                                        <i class='fas fa-spinner fa-spin fa-4x'></i>
                                    </div>`;
        getUserRepos(user);
    }
    else {
        validateUser();
    }
})

function validateUser() {
    let user = userNameInp.value.trim();
    if (user === "") {
        userError.innerHTML = "please enter user name";
        return false;
    }
    userError.innerHTML = " ";
    return true;
}

function getUserRepos(user) {
    let apiUrl = `https://api.github.com/users/${user}/repos`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayRepos(data, user))
        .catch(err => errMsgEl.innerHTML="Something went wrong!")
}

function displayRepos(repos, searchTermEl) {
    let cartona = ``;
    searchTerm.innerHTML = searchTermEl;
    if (repos.length == 0) {
        repoContainer.innerHTML = "No Repos..!"
        return;
    }

    repos.map(repo => {
        let name = repo.owner.login + '/' + repo.name;
        cartona += `                        
                            <a href='./repo.html?repo=${name}' class="repo-item p-3 shadow">
                                <span>${repo.owner.login} / ${repo.name}</span>
                                <span>
                                    ${repo.open_issues_count > 0 ? `<span>${repo.open_issues_count} Issue/s</span><i class="fas fa-times text-danger ms-2"></i>` : '<i class="fas fa-check text-success"></i>'}
                                </span>
                            </a>
                    `
        
    })
    repoContainer.innerHTML = cartona;

}