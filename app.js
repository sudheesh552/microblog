document.addEventListener('DOMContentLoaded', function () {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        createPost(post.content, post.image, post.likes, post.dislikes, post.comments);
    });
    updatePostCount(posts.length); // Update post count correctly after rendering posts
});

document.getElementById('login-btn').addEventListener('click', function () {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        document.getElementById('user-username').textContent = username;
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('user-dashboard').classList.remove('hidden');
        document.getElementById('feed').classList.remove('hidden');
        document.getElementById('post-error').classList.add('hidden');
        document.getElementById('login-error').classList.add('hidden');
        usernameInput.value = '';
        passwordInput.value = '';
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

document.getElementById('post-btn').addEventListener('click', function () {
    const postContent = document.getElementById('post-content').value.trim();
    const postImage = document.getElementById('post-image').files[0];

    if (postContent || postImage) {
        createPost(postContent, postImage ? URL.createObjectURL(postImage) : '', 0, 0, []);
        document.getElementById('post-content').value = '';
        resetImageInput(); // Function to reset the file input field
        document.getElementById('post-error').classList.add('hidden');
    } else {
        document.getElementById('post-error').classList.remove('hidden');
    }
});

function resetImageInput() {
    const postImageInput = document.getElementById('post-image');
    const newInput = postImageInput.cloneNode();
    postImageInput.replaceWith(newInput);
}

function createPost(content, image, likes, dislikes, comments) {
    const postList = document.getElementById('post-list');
    const li = document.createElement('li');

    li.innerHTML = `
        <p>${content}</p>
        ${image ? `<img src="${image}" alt="Post Image" class="post-image"/>` : ''}
        <div class="reaction-buttons">
            <button class="like-btn">Like</button>
            <button class="dislike-btn">Dislike</button>
            <span class="like-count">${likes}</span> Likes
            <span class="dislike-count">${dislikes}</span> Dislikes
        </div>
        <div class="comment-section">
            <input type="text" class="comment-input" placeholder="Add a comment..." />
            <button class="comment-btn">Comment</button>
            <span class="comment-count">0 Comments</span>
            <ul class="comments-list"></ul>
        </div>
    `;

    postList.appendChild(li);

    const likeBtn = li.querySelector('.like-btn');
    const dislikeBtn = li.querySelector('.dislike-btn');
    const likeCount = li.querySelector('.like-count');
    const dislikeCount = li.querySelector('.dislike-count');
    const commentInput = li.querySelector('.comment-input');
    const commentBtn = li.querySelector('.comment-btn');
    const commentsList = li.querySelector('.comments-list');
    const commentCount = li.querySelector('.comment-count');

    likeBtn.addEventListener('click', function () {
        likes++;
        likeCount.textContent = likes;
        savePosts();
    });

    dislikeBtn.addEventListener('click', function () {
        dislikes++;
        dislikeCount.textContent = dislikes;
        savePosts();
    });

    commentBtn.addEventListener('click', function () {
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
            commentInput.value = '';

            const currentCommentCount = parseInt(commentCount.textContent) + 1;
            commentCount.textContent = `${currentCommentCount} Comments`;

            initializeCommentReactions(commentLi);
            savePosts();
        }
    });

    comments.forEach(comment => {
        const commentLi = document.createElement('li');
        commentLi.innerHTML = `
            ${comment.text}
            <div class="comment-reactions">
                <button class="like-comment-btn">Like</button>
                <button class="dislike-comment-btn">Dislike</button>
                <span class="comment-like-count">${comment.likes}</span> Likes
                <span class="comment-dislike-count">${comment.dislikes}</span> Dislikes
            </div>
        `;
        commentsList.appendChild(commentLi);
        const currentCommentCount = parseInt(commentCount.textContent) + 1;
        commentCount.textContent = `${currentCommentCount} Comments`;
        initializeCommentReactions(commentLi);
    });

    savePosts();
    updatePostCount(document.getElementById('post-list').children.length); // Correct post count update
}

function initializeCommentReactions(commentLi) {
    const likeCommentBtn = commentLi.querySelector('.like-comment-btn');
    const dislikeCommentBtn = commentLi.querySelector('.dislike-comment-btn');
    const commentLikeCount = commentLi.querySelector('.comment-like-count');
    const commentDislikeCount = commentLi.querySelector('.comment-dislike-count');

    likeCommentBtn.addEventListener('click', function () {
        const currentCommentLikes = parseInt(commentLikeCount.textContent);
        commentLikeCount.textContent = currentCommentLikes + 1;
        savePosts();
    });

    dislikeCommentBtn.addEventListener('click', function () {
        const currentCommentDislikes = parseInt(commentDislikeCount.textContent);
        commentDislikeCount.textContent = currentCommentDislikes + 1;
        savePosts();
    });
}

function savePosts() {
    const posts = [];
    document.querySelectorAll('#post-list > li').forEach(postLi => {
        const content = postLi.querySelector('p').textContent;
        const image = postLi.querySelector('.post-image') ? postLi.querySelector('.post-image').src : '';
        const likes = parseInt(postLi.querySelector('.like-count').textContent);
        const dislikes = parseInt(postLi.querySelector('.dislike-count').textContent);
        
        const comments = [];
        postLi.querySelectorAll('.comments-list > li').forEach(commentLi => {
            const commentText = commentLi.childNodes[0].textContent.trim();
            const commentLikes = parseInt(commentLi.querySelector('.comment-like-count').textContent);
            const commentDislikes = parseInt(commentLi.querySelector('.comment-dislike-count').textContent);
            comments.push({ text: commentText, likes: commentLikes, dislikes: commentDislikes });
        });

        posts.push({ content, image, likes, dislikes, comments });
    });
    localStorage.setItem('posts', JSON.stringify(posts));
}

function updatePostCount(count) {
    document.getElementById('post-count').textContent = `Total Posts: ${count}`;
}

document.getElementById('logout-btn').addEventListener('click', function () {
    document.getElementById('user-dashboard').classList.add('hidden');
    document.getElementById('feed').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});
