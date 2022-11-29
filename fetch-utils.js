const SUPABASE_URL = 'https://uuxnounuxbgphldtwpld.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1eG5vdW51eGJncGhsZHR3cGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwNjksImV4cCI6MTk4MzY4NDA2OX0.X0has-XP8I6mpbJtyM-bfmgJBZ7Iy0neL2xNIHEyxJc';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function fetchItems() {
    const response = await client.from('shopping_list').select().match({ user_id: getUser().id });

    return checkError(response);
}

export async function createListItem(quantity, item) {
    const response = await client
        .from('shopping_list')
        .insert({ quantity, item, user_id: client.auth.user().id });
    return response.data;
}

export async function getListItems() {
    const response = await client.from('shopping_list').select().match({ user_id: getUser().id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function deleteAllItems() {
    const response = await client.from('shopping_list').delete().match({ user_id: getUser().id });
    return checkError(response);
}

export async function buyItem(id) {}
