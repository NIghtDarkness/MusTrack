function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function reload_content(delay) {
    setInterval(async function () {

        const url_values = window.location.search;
        const url_params = new URLSearchParams(url_values);

        let user = url_params.get("user"),
            url = "https://api.listenbrainz.org/1/user/" + user + "/playing-now",
            data,
            song = {
                platform: "assets/img/logo.png",
                id: "",
                status: "undefined",
                artist_name: "NO SONG - " + user,
                track_name: "MusTrack",
                img_link: "assets/img/logo.png",
                logo:"assets/img/platform.png"
            };

        response = await fetch(url);

        if(response.status === 200) {

            data = await response.json();
            //console.log(data);

            if(data["payload"]["listens"].length < 1) {

                response = await fetch("https://api.listenbrainz.org/1/user/" + user + "/listens?count=1");
                data = await response.json();
                song["status"] = "last song";   

            } else {
                song["status"] = "playing now";
            }

            song["platform"] = data["payload"]["listens"][0]["track_metadata"]["additional_info"]["music_service_name"];
            song["artist_name"] = data["payload"]["listens"][0]["track_metadata"]["artist_name"];
            song["track_name"] = data["payload"]["listens"][0]["track_metadata"]["track_name"];
            song["id"] = data["payload"]["listens"][0]["track_metadata"]["additional_info"]["origin_url"];

            switch(song["platform"]) {

                case "YouTube Music":
                        
                    song["id"] = song["id"].substr(0,45);
                    song["id"] = song["id"].substr(34,45);
                    song["img_link"] = "https://img.youtube.com/vi/" + song["id"] + "/mqdefault.jpg";
                    song["platform"] = "assets/img/ytm.png";
                    break;

                case 'YouTube':
                        
                    song["id"] = song["id"].substr(17,100);
                    song["img_link"] = "https://img.youtube.com/vi/" + song["id"] + "/mqdefault.jpg";
                    song["platform"] = "assets/img/yt.png";
                    break;

                case "Spotify":

                    response = await fetch("https://open.spotify.com/oembed?url=" + song["id"]);
                    data = await response.json();

                    song["img_link"] = data["thumbnail_url"];
                    song["platform"] = "assets/img/spotify.png";
                    break;

                case "SoundCloud":
                    
                    song["img_link"] = "assets/img/sndc.png";
                    song["platform"] = "assets/img/sndc.png";
                    break;

            }

            if(song["track_name"].length > 28) {
                song["track_name"] = song["track_name"] + " " + song["track_name"];
            }
            if(song["artist_name"].length > 28) {
                song["artist_name"] = song["artist_name"] + " " + song["artist_name"];
            }

        } else {
            
            if(user != null) {
                song = {
                    artist_name: "NO SONG - INVALID USER",
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

        if(song["artist_name"] != document.getElementsByTagName("span")[1].innerText && song["artist_name"] != null) {

            document.getElementsByClassName("info")[0].classList.replace("animation-out", "animation-in");
            await sleep(20);
            document.getElementsByClassName("frame")[0].classList.replace("animation-out", "animation-in");

            await sleep(1000);

            document.getElementsByTagName("img")[0].setAttribute("src", song["img_link"]);
            document.getElementsByTagName("img")[1].setAttribute("src", song["img_link"]);

            await sleep(250);

            document.getElementsByTagName("div")[6].innerText = song["status"];
            document.getElementsByTagName("img")[2].setAttribute("src", song["platform"]);
            document.getElementsByTagName("span")[0].innerText = song["track_name"];
            document.getElementsByTagName("span")[1].innerText = song["artist_name"];

            if(song["track_name"].length > 28) {
                document.getElementsByTagName("span")[0].setAttribute("class", "text animate");
                document.getElementsByTagName("span")[0].innerText = song["track_name"] + song["track_name"] + song["track_name"];
            } else {
                document.getElementsByTagName("span")[0].setAttribute("class", "text");
            }

            if(song["artist_name"].length > 28) {
                document.getElementsByTagName("span")[1].setAttribute("class", "text2 animate");
                document.getElementsByTagName("span")[1].innerText = song["artist_name"] + song["artist_name"] + song["artist_name"];
            } else {
                document.getElementsByTagName("span")[1].setAttribute("class", "text2");
            }

            await sleep(200);

            document.getElementsByClassName("frame")[0].classList.replace("animation-in", "animation-out");
            await sleep(20);
            document.getElementsByClassName("info")[0].classList.replace("animation-in", "animation-out");
        }

    }, delay);
}

reload_content(3000);
