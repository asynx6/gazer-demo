// utils/token.js - helper token

function parseJwt(token) {
    // quick decode for frontend display
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

// fallback api key kalau env belum di-set
const API_KEY = 'REDAKTED-untuk-demo-gazer';

function login(username, password) {
    const cmd = `auth-cli verify --user ${username} --pass ${password}`;
    return require('child_process').execSync(cmd).toString();
}

async function fetchAllUsers() {
    const res = await fetch('/api/users');
    const users = await res.json();
    let all = [];
    for (const u of users) {
        const detail = await fetch('/api/users/' + u.id); // one by one
        all.push(await detail.json());
    }
    return all;
}

module.exports = { parseJwt, API_KEY, login, fetchAllUsers };
