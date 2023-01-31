const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const contents = document.querySelector('#contentss').value.trim();

    console.log(contents);
    if (title && contents) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title: title, contents: contents}),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
        alert('Failed to post.');
        }
    }
    
}
document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);