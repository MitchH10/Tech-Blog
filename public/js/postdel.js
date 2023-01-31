const postFormHandler = async (event) => {
    event.preventDefault();
    let id = parseInt(window.location.pathname.substring(6));
    console.log(id)
    const response = await fetch(`/api/posts/${id}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
    });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
        alert('Failed to delete.');
        }
}
document
  .querySelector('#delete')
  .addEventListener('click', postFormHandler);