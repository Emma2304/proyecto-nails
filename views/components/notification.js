const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
    if (isError) {
        div.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 flex justify-end">
                <p class="bg-red-500 text-yellow-50 p-4 w-2/4 rounded-lg font-normal md:w-1/4">${message}</p>
            </div>
        `
    } else {
        div.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex justify-end">
            <p class="bg-pink-400 text-yellow-50 p-4 w-2/4 rounded-lg font-normal md:w-1/4">${message}</p>
        </div>
    `
    }
}