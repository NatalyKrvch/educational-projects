const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const usersIds = [5, 6, 2, 1];

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

const getUsersByIds = (ids) => {
    toggleLoader();
    const requests = ids.map(id => fetch(`${USERS_URL}/${id}`));
    Promise.all(requests)
        .then(responses => {
            const results = responses.map(response => response.json());
            return Promise.all(results);
        })
        .then(users => {
            users.forEach(user => {
                const newUser = createUserNameElement(user.name);
                container.append(newUser);
            });
        })
        .catch((error) => {
            console.log('error', error);
        })
        .finally(() => {
            toggleLoader();
        });
}

getUsersByIds(usersIds);