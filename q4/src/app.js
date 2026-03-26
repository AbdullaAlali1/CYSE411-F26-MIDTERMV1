// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

    let profile;

    try {
        profile = JSON.parse(text);
    } catch (e) {
        alert("Invalid JSON input");
        return;
    }

    if (
        !profile ||
        typeof profile !== "object" ||
        Array.isArray(profile) ||
        typeof profile.username !== "string" ||
        !Array.isArray(profile.notifications)
    ) {
        alert("Invalid profile data");
        return;
    }

    for (let n of profile.notifications) {
        if (typeof n !== "string") {
            alert("Invalid notifications data");
            return;
        }
    }

    currentProfile = {
        username: profile.username,
        notifications: profile.notifications
    };

    renderProfile(currentProfile);
}


/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {

    if (
        !profile ||
        typeof profile.username !== "string" ||
        !Array.isArray(profile.notifications)
    ) {
        return;
    }

    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for (let n of profile.notifications) {

        if (typeof n !== "string") {
            continue;
        }

        const li = document.createElement("li");

        li.textContent = n;

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {

    if (
        !currentProfile ||
        typeof currentProfile.username !== "string" ||
        !Array.isArray(currentProfile.notifications)
    ) {
        alert("No valid session to save");
        return;
    }

    const safeProfile = {
        username: currentProfile.username,
        notifications: currentProfile.notifications
    };

    try {
        localStorage.setItem("profile", JSON.stringify(safeProfile));
        alert("Session saved");
    } catch (e) {
        alert("Could not save session");
    }
}


function loadSession() {

    let stored;

    try {
        stored = localStorage.getItem("profile");
    } catch (e) {
        alert("Could not read saved session");
        return;
    }

    if (stored) {

        let profile;

        try {
            profile = JSON.parse(stored);
        } catch (e) {
            alert("Saved session is corrupted");
            return;
        }

        if (
            !profile ||
            typeof profile !== "object" ||
            Array.isArray(profile) ||
            typeof profile.username !== "string" ||
            !Array.isArray(profile.notifications)
        ) {
            alert("Saved session is invalid");
            return;
        }

        for (let n of profile.notifications) {
            if (typeof n !== "string") {
                alert("Saved session is invalid");
                return;
            }
        }

        currentProfile = {
            username: profile.username,
            notifications: profile.notifications
        };

        renderProfile(currentProfile);
    } else {
        alert("No saved session found");
    }
}
