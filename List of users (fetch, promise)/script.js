const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const createUserNameElement = (name) => {
    const newName = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = name;
    newName.append(link);

    return newName;
}

const container = document.querySelector('#data-container');

const toggleLoader = () => {
    const loader = document.querySelector('#loader');
    const isHidden = loader.getAttribute('hidden') !== null;

    if (isHidden) {
        loader.removeAttribute('hidden');
    } else {
        loader.setAttribute('hidden', '');
    }
}

const getAllUsers = () => {
    toggleLoader();
    const result = fetch(USERS_URL, {
        method: 'GET',
        headers: {},
    });

    result
        .then(response => {
            if (!response.ok) {
                throw new Error('Request error');
            }
            return response.json();
        })
        .then(users => {
            users.forEach(user => {
                const element = createUserNameElement(user.name);
                container.append(element);
            });
        })
        .catch((error) => {
            console.log('error', error);
        })
        .finally(() => {
            toggleLoader();
        });
}

getAllUsers();