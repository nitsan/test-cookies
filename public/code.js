const cookieName = 'server';
function callServer(serverUrl, domain) {
    const value = document.querySelector('#cookieName').value;
    console.log('callServer', serverUrl, value)

    // post server on button click with fetch
    fetch(`${serverUrl}/set-cookie`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value,
            cookieName,
            domain,
        }),
    }).then(() => {
        setCookieValue();
    })
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookieValue() {
    document.getElementById('cookieValue').innerText = getCookie(cookieName);
}

window.onload = function() {
    setCookieValue();
}

async function readCookies(serverUrl) {
    const res = await fetch(`${serverUrl}/get-cookies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch((err) => console.error('error', err));
    const data = await res.json();
    console.log('readCookies', data);
}


