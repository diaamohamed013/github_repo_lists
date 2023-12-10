let reposEl = document.querySelector(".repos");
let errMsgEl = document.querySelector('.errMsg');

function getRepoName() {
    let qurStr = document.location.search;

    let repoName = qurStr.split("=")[1]; // ["?repo", "reponame"]

    if (repoName) {
        getIssues(repoName)
    }
}

function getIssues(repoName) {
    let apiUrl = "https://api.github.com/repos/" + repoName + "/issues";

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => dispalayIssues(data))
        .catch(err => errMsgEl.innerHTML = "Something went wrong!")
}


function dispalayIssues(issues) {
    // console.log(issues);
    if (issues.length == 0) {

        reposEl.innerHTML = "No issues..!"
        return;
    }
    issues.forEach(issue => {
        reposEl.innerHTML += `
            <a href='${issue.html_url}' target="_b" class="repo-item p-3 shadow">
                <span>${issue.title}</span>
            </a>
        `
    })

}


getRepoName();