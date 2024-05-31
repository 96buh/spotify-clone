"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import puppeteer from "puppeteer";
import { getAccessToken } from "@/apis/spotify";

export async function login(user: unknown) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = user as { email: string; password: string };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: error.message };
    }
    // revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(user: unknown) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = user as { email: string; password: string };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        console.log(error);

        redirect("/error");
    }
    console.log("User signed up successfully!");
    // revalidatePath("/", "layout");
    redirect("/");
}

export async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    return redirect("/");
}
// 爬取每周受歡迎的十個歌曲, 專輯, 藝術家
export async function getWeeklyData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.SPOTIFY_CHART_URL!);

    // 等待一些時間以確保頁面完全加載
    await page.waitForSelector("#__next");
    // 找到按鈕
    const buttons = await page.$$(".Button-sc-1dqy6lx-0");

    const buttonTypes: { [key: string]: string } = {
        3: "songs",
        4: "albums",
        5: "artists",
    };
    const albumData: { [key: string]: string[] } = {};

    for (const index in buttonTypes) {
        const buttonIndex = parseInt(index);
        const type = buttonTypes[index];
        // chart.spotify.com
        // index 3:songs, 4:albums, 5:artists
        await buttons[buttonIndex].click();

        // 使用evaluate函數從網頁中提取專輯名稱
        const albumNames = await page.evaluate(() => {
            const albumElements = document.querySelectorAll(
                "#__next > div > div > main > div > div > section > div > ol > div > li > div > p"
            );
            const albums = Array.from(albumElements).map((album) =>
                album.textContent?.trim()
            );
            return albums.filter((album) => album !== undefined) as string[];
        });

        albumData[type] = albumNames;
    }

    await browser.close();
    // 處理數據寫入database
    const supabase = createClient();
    const { songs, albums, artists } = albumData;

    for (let i = 0; i < songs.length; i++) {
        const { error } = await supabase.from("weeklyTopData").insert({
            songs: `${songs[i]}`,
            albums: `${albums[i]}`,
            artists: `${artists[i]}`,
        });
    }
}
// 獲得目前登入的用戶 如果沒有登入會返回null
export async function getUser() {
    const supabase = createClient();
    // check if user is logged in
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

// 儲存spotifyID到supabase
export async function addLikedTrack(userID: string, trackID: string) {
    const supabase = createClient();
    console.log(userID);

    const { data, error } = await supabase
        .from("user_favorite")
        .insert({ user_id: userID, track_id: trackID })
        .select();

    if (error) {
        console.log(error);
    }
}

// 從supabase刪除喜歡的歌曲
export async function removeLikedTrack(userID: string, trackID: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("user_favorite")
        .delete()
        .match({ user_id: userID, track_id: trackID });

    if (error) {
        console.log(error);
    }
}
// 檢查歌曲是否已經被添加到喜歡列表 如果已經添加返回true 否則返回false
export async function checkTrackLiked(userID: string, trackID: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("user_favorite")
        .select("user_id, track_id")
        .match({ user_id: userID, track_id: trackID });

    if (error) {
        console.log(error);
        return false;
    }
    return data.length > 0;
}

// 獲取用戶喜歡的歌曲
export async function getLikedTracks(userID: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("user_favorite")
        .select("track_id, created_at")
        .match({ user_id: userID });

    if (error) {
        console.log(error);
    }
    // 什麼時候添加喜歡歌曲
    let created_at: string[] = [];
    // query是一個用逗號分隔的字符串 (ID1,ID2,ID3 ...)
    let query = "";
    if (data) {
        data.forEach((content) => {
            query += content.track_id + ",";
            created_at.push(content.created_at);
        });
    }
    // 刪除最後一個逗號, 避免spotifyAPI返回多一個空值
    query = query.slice(0, -1);
    // 使用query搜尋歌曲
    const token = await getAccessToken();
    const res = await fetch(
        `https://api.spotify.com/v1/tracks/?market=US&ids=${query}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    const tracksData = await res.json();
    // 將數據轉換為我們需要的格式
    let playlistData: {
        tracks: {
            name: string;
            id: string;
            duration: number;
            addedAt: string;
            artists: { name: string; id: string }[];
            album?: { name: string; id: string };
        }[];
    } = {
        tracks: [],
    };

    tracksData.tracks.forEach((track: any, index: number) => {
        // 創建一個空array來存儲藝術家
        let artists: { name: string; id: string }[] = [];

        track.artists.forEach((a: { name: string; id: string }) => {
            artists.push({ name: a.name, id: a.id });
        });

        playlistData.tracks.push({
            name: track.name,
            id: track.id,
            duration: track.duration_ms,
            addedAt: created_at[index],
            album: { name: track.album.name, id: track.album.id },
            artists: artists,
        });
    });

    return playlistData;
}
