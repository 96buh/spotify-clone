// 用client_credentials取得access_token
export async function getAccessToken() {
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
            "grant_type=client_credentials&client_id=" +
            process.env.SPOTIFY_CLIENT_ID +
            "&client_secret=" +
            process.env.SPOTIFY_CLIENT_SECRET,
    });
    const data = await res.json();

    return data;
}
// 用藝術家名字搜尋並回傳藝術家圖片
export async function searchArtists(name: string) {
    const token = await getAccessToken();
    const buh = await fetch(
        `https://api.spotify.com/v1/search?q=${name}&type=artist&market=US&limit=1`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    const data = await buh.json();

    const image_url = data.artists.items[0].images[0].url;
    return image_url;
}
// 用專輯名稱找到專輯名稱、藝術家名稱、專輯封面
export async function searchAlbums(name: string) {
    const token = await getAccessToken();
    const res = await fetch(
        `https://api.spotify.com/v1/search?q=${name}&type=album&market=US&limit=1`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    const data = await res.json();

    const albumName = data.albums.items[0].name;
    let artist = "";
    data.albums.items[0].artists.forEach(
        (a: { name: string }) => (artist += a.name + ", ")
    );
    artist = artist.slice(0, -2);

    const cover = data.albums.items[0].images[0].url;
    return { albumName, artist, cover };
}
