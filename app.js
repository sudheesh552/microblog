document.getElementById('login-btn').addEventListener('click', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        document.getElementById('user-username').textContent = username;
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('user-dashboard').classList.remove('hidden');
        document.getElementById('post-error').classList.add('hidden');
        document.getElementById('login-error').classList.add('hidden');
        usernameInput.value = ''; // Clear input
        passwordInput.value = ''; // Clear input
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

document.getElementById('post-btn').addEventListener('click', function() {
    const postContent = document.getElementById('post-content').value.trim();
    const postImage = document.getElementById('post-image').files[0];

    if (postContent || postImage) {
        const postList = document.getElementById('post-list');
        const li = document.createElement('li');
        
        li.innerHTML = `
            <p>${postContent}</p>
            ${postImage ? `<img src="${URL.createObjectURL(postImage)}" alt="Post Image" class="post-image"/>` : ''}
            <div class="reaction-buttons">
                <button class="like-btn">Like</button>
                <button class="dislike-btn">Dislike</button>
                <span class="like-count">0</span> Likes
                <span class="dislike-count">0</span> Dislikes
            </div>
            <div class="comment-section">
                <input type="text" class="comment-input" placeholder="Add a comment..." />
                <button class="comment-btn">Comment</button>
                <ul class="comments-list"></ul>
            </div>
        `;
        postList.appendChild(li);
        
        document.getElementById('post-content').value = ''; // Clear textarea
        document.getElementById('post-image').value = ''; // Clear file input
        document.getElementById('post-error').classList.add('hidden');

        // Show the feed now that there's at least one post
        document.getElementById('feed').classList.remove('hidden');

        // Add event listeners for like, dislike, and comment buttons
        const likeBtn = li.querySelector('.like-btn');
        const dislikeBtn = li.querySelector('.dislike-btn');
        const likeCount = li.querySelector('.like-count');
        const dislikeCount = li.querySelector('.dislike-count');
        const commentInput = li.querySelector('.comment-input');
        const commentBtn = li.querySelector('.comment-btn');
        const commentsList = li.querySelector('.comments-list');

        likeBtn.addEventListener('click', function() {
            const currentLikes = parseInt(likeCount.textContent);
            likeCount.textContent = currentLikes + 1;
        });

        dislikeBtn.addEventListener('click', function() {
            const currentDislikes = parseInt(dislikeCount.textContent);
            dislikeCount.textContent = currentDislikes + 1;
        });

        commentBtn.addEventListener('click', function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentLi = document.createElement('li');
                commentLi.innerHTML = `
                    ${commentText}
                    <div class="comment-reactions">
                        <button class="like-comment-btn">Like</button>
                        <button class="dislike-comment-btn">Dislike</button>
                        <span class="comment-like-count">0</span> Likes
                        <span class="comment-dislike-count">0</span> Dislikes
                    </div>
                `;
                commentsList.appendChild(commentLi);
                commentInput.value = ''; // Clear input

                // Add event listeners for like and dislike on the comment
                const likeCommentBtn = commentLi.querySelector('.like-comment-btn');
                const dislikeCommentBtn = commentLi.querySelector('.dislike-comment-btn');
                const commentLikeCount = commentLi.querySelector('.comment-like-count');
                const commentDislikeCount = commentLi.querySelector('.comment-dislike-count');

                likeCommentBtn.addEventListener('click', function() {
                    const currentCommentLikes = parseInt(commentLikeCount.textContent);
                    commentLikeCount.textContent = currentCommentLikes + 1;
                });

                dislikeCommentBtn.addEventListener('click', function() {
                    const currentCommentDislikes = parseInt(commentDislikeCount.textContent);
                    commentDislikeCount.textContent = currentCommentDislikes + 1;
                });
            }
        });
    } else {
        document.getElementById('post-error').classList.remove('hidden');
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('user-dashboard').classList.add('hidden');
    document.getElementById('feed').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('username').value = ''; // Clear input
    document.getElementById('password').value = ''; // Clear input
});
