// Because this is a literal single page application
// we detect a callback from Spotify by checking for the hash fragment
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "1b749a1c84b640d98e7e08b87f41d617";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const id = '6dVIqQ8qmQ5GBnJ9shOYGE';

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const album = await fetchAlbum(accessToken, id);
    populateAlbums(album);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
   
}

async function fetchProfile(code: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });

    console.log(result);


    return await result.json();
}

async function fetchAlbum(code: string, id: string): Promise<Albums> {
    const result = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });

    console.log(result);

    return await result.json();
}

function populateUI(profile: UserProfile) {
    document.getElementById("displayName")!.innerText = profile.display_name;
    document.getElementById("avatar")!.setAttribute("src", profile.images[0].url)
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
    document.getElementById("uri")!.innerText = profile.uri;
    document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url")!.innerText = profile.href;
    document.getElementById("url")!.setAttribute("href", profile.href);
    document.getElementById("imgUrl")!.innerText = profile.images[0].url;
}

function populateAlbums(album: Albums) {
    document.getElementById("albumType")!.innerText = album.album_type;
}
