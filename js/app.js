const profileQuery = `{
    user(login: "lateef-OG") { 
        avatarUrl,
        bio,
        login,
        repositories(first: 20, isLocked: false, orderBy: {field: CREATED_AT, direction: DESC}){
          nodes{
            id,
            updatedAt,
            description,
            forkCount,
            languages(first: 1, orderBy: {field: SIZE, direction: DESC}){
              nodes{
                color,
                id,
                name,
              }
            },
            name,
            stargazerCount,
            isFork,
            parent{
                nameWithOwner,
            }
          }
          totalCount
        }
      }
}`;

const renderProfile = ({ data }) => {
  const { user } = data;
  const { repositories } = user;
  setAvatars(user.avatarUrl);
  setUsername(user.login);
  setBio(user.bio);
  setCount(repositories.totalCount);
  repositories.nodes.forEach((repo) => renderRepoList(repo));
};

const setAvatars = (url) => {
  let avatars = document.querySelectorAll(".avatar");
  avatars.forEach((avatar) => (avatar.src = url));
};

const setUsername = (username) => {
  let usernameContainers = document.querySelectorAll(".user-name");
  usernameContainers.forEach((container) => (container.textContent = username));
};

const setBio = (bio) => {
  let bioContainer = document.getElementById("bio");
  bioContainer.textContent = bio;
};

const setCount = (count) => {
  let countContainers = document.querySelectorAll(".count");
  countContainers.forEach((container) => (container.textContent = count));
};

const renderRepoList = (repo) => {
  const {
    name,
    description,
    forkCount,
    stargazerCount,
    languages,
    updatedAt,
    parent,
  } = repo;
  const { nodes } = languages;
  const language = nodes[0];

  let repoListContainer = document.getElementById("repo-list");

  let itemContainer = `<div class="item-container repo-item">
    <div class="name-info">
        <a href="#" class="repo-name">
            ${name}
        </a>
        ${
          parent
            ? `<p class="forked-from">Forked from ${parent.nameWithOwner}</p>`
            : ""
        }
        ${description ? `<p class="description">${description}</p>` : ""}
        <div class="info">
            ${
              language
                ? `<div class="info-item">
                    <div class="color" style="background-color:${language.color}"></div>
                    <p class="lang">${language.name}</p>
                </div>`
                : ""
            }
            ${
              stargazerCount
                ? `<div class="info-item">
                    <span class="iconify" data-icon="octicon:star-16" data-inline="false"></span>
                    <p class="lang">${stargazerCount}</p>
                </div>`
                : ""
            }
            ${
              forkCount
                ? `<div class="info-item">
                    <span class="iconify" data-icon="octicon:repo-forked-16" data-inline="false"></span>
                    <p class="lang">${forkCount}</p>
                </div>`
                : ""
            }
            <div class="info-item">
                <p class="lang">updated on ${formatDate(updatedAt)}</p>
            </div>
        </div>
    </div>
    <button class="star-btn">
        <span class="iconify" data-icon="octicon:star-16" data-inline="false"></span>
        Star
    </button>
</div>`;
  repoListContainer.innerHTML += itemContainer;
};

const formatDate = (date) => {
  const formattedDate = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return formattedDate.toLocaleDateString(undefined, options);
};

const loadProfile = () => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer c5b4d37d71e1f85220ddba64452301788d7f835e",
    },
    body: JSON.stringify({
      query: profileQuery,
    }),
  };

  fetch(`https://api.github.com/graphql`, options)
    .then((res) => res.json())
    .then(renderProfile);
};

window.addEventListener("load", loadProfile);
