document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const postBtn = document.getElementById('post-btn');
    const userDashboard = document.getElementById('user-dashboard');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const userUsernameSpan = document.getElementById('user-username');
    const postContent = document.getElementById('post-content');
    const postList = document.getElementById('post-list');
    const loginError = document.getElementById('login-error');
    const postError = document.getElementById('post-error');

    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            userUsernameSpan.textContent = username;
            loginForm.classList.add('hidden');
            userDashboard.classList.remove('hidden');
            loginError.classList.add('hidden');
        } else {
            loginError.classList.remove('hidden');
        }
    });

    postBtn.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (content) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${userUsernameSpan.textContent}: ${content}
                <button class="like-btn">Like</button>
                <span class="like-count">0</span>
            `;
            postList.appendChild(listItem);
            postContent.value = '';
            postError.classList.add('hidden');
        } else {
            postError.classList.remove('hidden');
        }
    });

    // Delegate event listener for dynamically added like buttons
    postList.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-btn')) {
            const likeBtn = event.target;
            const likeCountSpan = likeBtn.nextElementSibling;
            let likeCount = parseInt(likeCountSpan.textContent);
            
            // Toggle "liked" class and update like count
            if (likeBtn.classList.contains('liked')) {
                likeBtn.classList.remove('liked');
                likeCount--;
            } else {
                likeBtn.classList.add('liked');
                likeCount++;
            }

            likeCountSpan.textContent = likeCount;
        }
    });
});
