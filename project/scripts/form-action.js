// Form action page script
document.addEventListener('DOMContentLoaded', () => {
    const submittedData = document.querySelector('.submitted-data');
    const params = new URLSearchParams(window.location.search);
    
    if (params.toString()) {
        let html = '<ul>';
        
        params.forEach((value, key) => {
            if (key !== 'submit') {
                html += `<li><strong>${key}:</strong> ${decodeURIComponent(value)}</li>`;
            }
        });
        
        html += '</ul>';
        submittedData.innerHTML = html;
    } else {
        submittedData.innerHTML = '<p>No form data was submitted.</p>';
    }
});