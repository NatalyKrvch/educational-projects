const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const dataContainer = document.querySelector('.data-container');

const createAlbumElement = (title) => {
    const newAlbum = document.createElement('li');
    newAlbum.textContent = title;
    dataContainer.append(newAlbum);

    return newAlbum;
}

const toggleLoader = () => {
    const loader = document.querySelector('#loader');
    const isHidden = loader.getAttribute('hidden') !== null;

    if (isHidden) {
        loader.removeAttribute('hidden');
    } else {
        loader.setAttribute('hidden', '');
    }
}

const renderAlbums = async () => {
    try {
        toggleLoader();
        const responses = await fetch(ALBUMS_URL);
        if (!responses.ok) {
            throw new Error('Fetching error');
        } else {
            const albums = await responses.json();
            albums.forEach((album) => {
                createAlbumElement(album.title);
            })
        }
    } catch (error) {
        console.error(error);
        dataContainer.textContent = "Error in getting the album's data.";
    } finally {
        toggleLoader()
    }
}

renderAlbums();