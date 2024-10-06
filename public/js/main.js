// main.js

// Event Listener for Form Submission (Example: Create New File)
document.addEventListener('DOMContentLoaded', function() {
    const createForm = document.querySelector('form[action="/create"]');
    
    if (createForm) {
        createForm.addEventListener('submit', function(event) {
            const titleInput = document.getElementById('title');
            const detailsInput = document.getElementById('details');

            // Basic validation
            if (titleInput.value.trim() === '' || detailsInput.value.trim() === '') {
                event.preventDefault(); // Prevent form submission
                alert('Both title and content are required!'); // Alert user
            }
        });
    }
});

// Function to handle delete file action (optional)
function deleteFile(filename) {
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
        // Here, you can send a request to delete the file
        fetch(`/delete/${filename}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert(`${filename} has been deleted.`);
                    window.location.reload(); // Reload the page
                } else {
                    alert('Error deleting file.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting file.');
            });
    }
}
