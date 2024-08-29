document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

      // Function to fetch and display contacts
      function fetchContacts() {
        fetch('http://localhost:3000/contacts')  // Endpoint to retrieve contacts
            .then(response => response.json())
            .then(data => {
                contactsList.innerHTML = '';  // Clear the existing list
                data.data.forEach(contact => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('collection-item');
                    listItem.innerHTML = `<strong>${contact.fname} ${contact.lname}</strong> - ${contact.contno} <br> ${contact.description}`;
                    contactsList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = {
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        contno: document.getElementById('contno').value,
        description: document.getElementById('description').value
      };
      
      fetch('http://localhost:3000/submit', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())  
      .then(data => {
        alert(data.message);  // Display the message from server response
        form.reset();
        fetchContacts();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

    const contactsList = document.getElementById('contactsList');

  

    // Fetch contacts on page load
    fetchContacts();

  });


  
  