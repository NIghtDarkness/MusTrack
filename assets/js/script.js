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
