document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/entities';
    const entityForm = document.getElementById('entityForm');
    const entityList = document.getElementById('entityList');
  
    // Fetch and display entities from the API
    async function fetchEntities() {
      try {
        const response = await fetch(apiUrl);
        const entities = await response.json();
        entityList.innerHTML = ''; // Clear the list
        entities.forEach(entity => {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.textContent = `${entity.name}: ${entity.description}`;
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'btn btn-danger btn-sm';
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => deleteEntity(entity.id));
          li.appendChild(deleteBtn);
          entityList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    }
  
    // Add a new entity using the form
    entityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      try {
        await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description })
        });
        entityForm.reset();
        fetchEntities(); // Refresh the list
      } catch (error) {
        console.error('Error adding entity:', error);
      }
    });
  
    // Delete an entity
    async function deleteEntity(id) {
      try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchEntities(); // Refresh the list
      } catch (error) {
        console.error('Error deleting entity:', error);
      }
    }
  
    // Initial fetch to populate the list
    fetchEntities();
  });
  