export function setToLStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLStorage(key) {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error(error);
    }
    return data;
}

export function removeFromLStorage(key) {
    localStorage.clear(key);
}

export function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}