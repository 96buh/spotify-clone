import type { AlbumData } from "@/lib/types";

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
    // spotify artist id
    const id = data.artists.items[0].id;

    return { image_url, id };
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
    // spotify album id
    const id = data.albums.items[0].id;
    return { albumName, artist, cover, id };
}

// 用專輯id找到專輯名稱、專輯封面、所有歌曲、每首歌曲的藝術家、每首歌曲時間
export async function getAlbum(albumID: string) {
    const token = await getAccessToken();
    const res = await fetch(
        `https://api.spotify.com/v1/albums/${albumID}?market=US`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );

    const data = await res.json();

    // 專輯名稱, 專輯id, 專輯封面, 專輯單曲總數
    let albumData: AlbumData = {
        id: data.id,
        name: data.name,
        artist: data.artists[0].name,
        cover: data.images[0].url,
        totalTracks: data.total_tracks,
        tracks: [],
    };

    // 用陣列儲存 所有歌曲名字和歌曲id 和每首歌曲的藝術家名字和藝術家id 以及歌曲時間
    data.tracks.items.forEach((track: any) => {
        // 藝術家名稱, 藝術家id
        let artist: { name: string; id: string }[] = [];
        track.artists.forEach((a: { name: string; id: string }) => {
            artist.push({ name: a.name, id: a.id });
        });

        // 單曲持續時間, 單曲名稱, 單曲id
        albumData.tracks.push({
            name: track.name,
            id: track.id,
            duration: track.duration_ms,
            artists: artist,
        });
    });

    return albumData;
}
