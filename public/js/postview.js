const postDeleteHandler = async (event) => {
    event.preventDefault();
    let id = parseInt(window.location.pathname.substring(6));
    const response = await fetch(`/api/posts/${id}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
    });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
        alert('Failed to delete.');
        }
}

const postCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    console.log(comment);
    let id = parseInt(window.location.pathname.substring(6));
    const response = await fetch('/api/comments', {
        method: 'post',
        body: JSON.stringify({ comment: comment, post_id: id}),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace(`/post/${id}`);
    } else {
        alert('Failed to comment.');
    }
}

document
    .querySelector('#comment-button')
    .addEventListener('click', postCommentHandler);

const delButton = document.querySelector('#delete');
if (delButton) {
    delButton.addEventListener('click', postDeleteHandler);
}
  