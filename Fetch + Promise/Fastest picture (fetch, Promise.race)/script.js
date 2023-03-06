const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
const photosIds = [60, 12, 55];

const createPhotoElement = (url, title) => {
    const newPhoto = document.createElement('li');
    newPhoto.className = 'photo-item';

    const image = document.createElement('img');
    image.className = 'photo-item__image';
    image.src = url;

    const photoTitle = document.createElement('h3');
    photoTitle.className = 'photo-item__title';
    photoTitle.textContent = title;

    newPhoto.append(image, photoTitle)

    return newPhoto;
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

const getFastestLoadedPhoto = (ids) => {
    toggleLoader();
    const requests = ids.map(id => fetch(`${PHOTOS_URL}/${id}`));
    Promise.race(requests)
        .then(response => response.json())
        .then(photo => {
            const newPhotoHTML = createPhotoElement(photo.url, photo.title);
            container.append(newPhotoHTML);
        })
        .catch((error) => {
            console.log('error', error);
        })
        .finally(() => {
            toggleLoader();
        });
}

getFastestLoadedPhoto(photosIds);