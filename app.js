/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem } from './fetch-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.create-form');
const deletebtn = document.querySelector('#delete-btn');
const listEl = document.querySelector('.list');
const error = document.querySelector('#error');

checkAuth();

/* Events */
window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const quantity = data.get('quantity');
    const item = data.get('item');

    form.reset();

    const newItem = await createListItem(quantity, item);
    if (newItem) {
        fetchAndDisplayList();
    } else {
        error.textContent = 'Something went wrong while adding to your shopping list';
    }

    await fetchAndDisplayList();
});
/* Display Functions */
