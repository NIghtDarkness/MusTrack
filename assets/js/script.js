function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function reload_content(delay) {
    setInterval(async function () {
        let user = document.getElementsByTagName("input")[0].value,
            key = document.getElementsByTagName("input")[1].value,
            url = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + user + "&api_key=" + key + "&limit=1&format=json",
            link,
            data,
            song = {
                artist_name: "NO SONG - " + user,
                track_name: "MusTrack",
                img_link: "assets/img/logo.png"
            };

        let play = { "recenttracks": { "track": [{ "artist": { "mbid": "", "#text": "古泉一樹 (CV.小野大輔)" }, "streamable": "0", "image": [{ "size": "small", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/34s\/2a96cbd8b46e442fc41c2b86b821562f.png" }, { "size": "medium", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/64s\/2a96cbd8b46e442fc41c2b86b821562f.png" }, { "size": "large", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/174s\/2a96cbd8b46e442fc41c2b86b821562f.png" }, { "size": "extralarge", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/300x300\/2a96cbd8b46e442fc41c2b86b821562f.png" }], "mbid": "", "album": { "mbid": "", "#text": "涼宮ハルヒの憂鬱 キャラクターソングVol.8 古泉一樹" }, "name": "まっがーれ↓スペクタクル", "@attr": { "nowplaying": "true" }, "url": "https:\/\/www.last.fm\/music\/%E5%8F%A4%E6%B3%89%E4%B8%80%E6%A8%B9+(CV.%E5%B0%8F%E9%87%8E%E5%A4%A7%E8%BC%94)\/_\/%E3%81%BE%E3%81%A3%E3%81%8C%E3%83%BC%E3%82%8C%E2%86%93%E3%82%B9%E3%83%9A%E3%82%AF%E3%82%BF%E3%82%AF%E3%83%AB" }, { "artist": { "mbid": "9e190e5d-3612-43c6-9381-d4972efca5c3", "#text": "Eir Aoi" }, "streamable": "0", "image": [{ "size": "small", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/34s\/c8668650b0b81d976bccafdef0b44818.jpg" }, { "size": "medium", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/64s\/c8668650b0b81d976bccafdef0b44818.jpg" }, { "size": "large", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/174s\/c8668650b0b81d976bccafdef0b44818.jpg" }, { "size": "extralarge", "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/300x300\/c8668650b0b81d976bccafdef0b44818.jpg" }], "mbid": "6868aaed-fa54-4228-be26-684b1d06abb6", "album": { "mbid": "", "#text": "D’AZUR" }, "name": "IGNITE", "url": "https:\/\/www.last.fm\/music\/Eir+Aoi\/_\/IGNITE", "date": { "uts": "1660882415", "#text": "19 Aug 2022, 04:13" } }], "@attr": { "user": "Nightdarkness62", "totalPages": "423", "page": "1", "perPage": "1", "total": "423" } } };

        let response = await fetch(url);

        if (response.status === 200) {
            document.getElementsByTagName("div")[18].innerText = "✅";
            document.getElementsByTagName("div")[25].innerText = "PASS!";
            document.getElementsByTagName("div")[25].style.color = "green";

            data = await response.json();

            song["artist_name"] = data["recenttracks"]["track"][0]["artist"]["#text"];
            song["track_name"] = data["recenttracks"]["track"][0]["name"];
            song["img_link"] = data["recenttracks"]["track"][0]["image"][3]["#text"];

            if (song["img_link"] === "https://lastfm.freetls.fastly.net//i//u//300x300//2a96cbd8b46e442fc41c2b86b821562f.png" || song["img_link"] === "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png") {

                response = await fetch("http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" + user + "&api_key=" + key + "&format=json");
                data = await response.json();
                song["img_link"] = data["user"]["image"][3]["#text"];
            }

            if (song["track_name"].length > 28) {
                song["track_name"] = song["track_name"] + " " + song["track_name"];
            }
            if (song["artist_name"].length > 28) {
                song["artist_name"] = song["artist_name"] + " " + song["artist_name"];
            }

        } else {
            document.getElementsByTagName("div")[18].innerText = "❌";
            if (user != "") {
                song = {
                    artist_name: "NO SONG - " + user,
                    track_name: "MusTrack",
                    img_link: "assets/img/logo.png"
                };
            } else {
                song = {
                    artist_name: "NO SONG - NO USER",
                    track_name: "MusTrack",
                    img_link: "assets/img/logo.png"
                };
            }
        }

        if (
            song["artist_name"] !=
            document.getElementsByTagName("div")[9].innerText &&
            song["artist_name"] != null
        ) {
            document
                .getElementsByTagName("div")[3]
                .setAttribute("class", "info animation-in");
            document
                .getElementsByTagName("div")[2]
                .setAttribute("class", "frame animation-in");

            await sleep(1000);

            document
                .getElementsByTagName("img")[0]
                .setAttribute("src", song["img_link"]);
            document
                .getElementsByTagName("img")[1]
                .setAttribute("src", song["img_link"]);

            await sleep(250);

            document.getElementsByTagName("div")[7].innerText = song["track_name"];
            document.getElementsByTagName("div")[9].innerText = song["artist_name"];

            if (song["track_name"].length > 28) {
                document
                    .getElementsByTagName("div")[7]
                    .setAttribute("class", "text-animation");
            } else {
                document.getElementsByTagName("div")[7].innerText = song["track_name"];
                document.getElementsByTagName("div")[7].setAttribute("class", "");
            }

            if (song["artist_name"].length > 28) {
                document
                    .getElementsByTagName("div")[9]
                    .setAttribute("class", "text-animation");
            } else {
                document.getElementsByTagName("div")[9].setAttribute("class", "");
            }

            await sleep(200);

            document
                .getElementsByTagName("div")[2]
                .setAttribute("class", "frame animation-out");
            document
                .getElementsByTagName("div")[3]
                .setAttribute("class", "info animation-out");
        }
    }, delay);
}

function Image(delay) {
    setInterval(async function () {

        let key = "b4e00a95f01f3d08b3b05fd96a0c5708",
            response = await fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + user + "&api_key=" + key + "&limit=1&format=json");

        let info = await response.json();
        console.log(info['recenttracks']['track'][0]['album']['#text']);
        console.log(info)


    }, delay);
}

reload_content(3000);
