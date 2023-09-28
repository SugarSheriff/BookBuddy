const newBookHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const author = document.querySelector('#post-author').value.trim();
  const description = document.querySelector('#post-content').value.trim();

  if (title && author && description) {
    const response = await fetch('api/books', {
      method: 'POST',
      body: JSON.stringify({ title, author, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create a book');
    }
  }
};

const deletebuttonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete the book');
    }
  }
};

document.querySelector('.new-post-form')
.addEventListener('submit', newBookHandler);

document.querySelector('.post-list')
addEventListener('click', deletebuttonHandler);

