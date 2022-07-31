// Spotify API credentials

const spotifyClientID = '0d56ba1ca5b844b7886a93fe3c371e20';
const spotifyClientSecret = '4a910c568b2b4f9796426f7749a3065f';

const getToken = async () => {
    const request = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Autorization' : 'Basic' + btoa(spotifyClientID + ':' + spotifyClientSecret),
        },
        body: 'grant_type=client_credentials'
    });

    const data = await request.json();
    console.log(data);
    return data.access_token;
}

const getTrack = async (token, id) => {

    const request = await fetch('https://api.spotify.com/v1/tracks/'+ id, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    });

    const data = await request.json();
    return data;

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function reload_content(delay){

    setInterval(async function(){

        let user = await (await fetch('../../account.dat')).text();
        //console.log(user);
        let url = 'https://api.listenbrainz.org/1/user/' + user + '/playing-now';

        let payload = new Map();
        let song = {'artist_name':'NO SONG', 'track_name':'Music Tracker', 'img_link':'assets/img/logo.png', 'img_id':'none'};
        let link;
        let id;
        let response = await fetch(url);
        let data;
        let jsonRAW;
        let jsonFile;
            
        if(response.status === 200){
            document.getElementsByTagName('p')[2].innerText = 'user: ✅';
            data = await response.text();
            jsonRAW = JSON.parse(data);
            jsonFile = new Map(Object.entries(jsonRAW));

            //console.log(getTrack(token, '5HCyWlXZPP0y6Gqq8TgA20'));
            //console.log(jsonFile);
            //console.log(getToken());
            getToken();

            /*try{
                console.log(jsonFile.get('payload')['listens'][0]['track_metadata']);
            }catch{
                console.log(jsonFile.get('payload')['listens'][0]);
            }*/

            if(jsonFile.get('payload')['listens'].length > 0){

                payload = jsonFile.get('payload');

                if(payload['listens'][0]['track_metadata']['additional_info']['music_service_name'] === 'Spotify'){

                    id = payload['listens'][0]['track_metadata']['additional_info']['origin_url'];
                    id = id.substr(31,100);
                    link = '/assets/img/logo.png';

                    console.log(id)
                    //console.log(getTrack(getToken(), id));

                }else{

                    id = payload['listens'][0]['track_metadata']['additional_info']['origin_url'];
                    id = id.substr(0,45);
                    id = id.substr(34,45);
                    link = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';

                }
                
                song = payload['listens'][0]['track_metadata'];
                song['img_id'] = id;
                song['img_link'] = link;
                data = '';

                //getTrack(token, '5HCyWlXZPP0y6Gqq8TgA20');

                //console.log(data);
                
            }
        }else{
            document.getElementsByTagName('p')[2].innerText = 'user: ❌';
        }
        //console.log(response.status);

        if(song['img_id'] != document.getElementsByTagName('img')[0].getAttribute('id')){
            
            document.getElementsByTagName('div')[3].setAttribute('class', 'info animation-in');
            document.getElementsByTagName('div')[2].setAttribute('class', 'frame animation-in');

            await sleep(1000);

            document.getElementsByTagName('img')[0].setAttribute('src',song['img_link']);
            document.getElementsByTagName('img')[0].setAttribute('id',song['img_id']);
            document.getElementsByTagName('img')[1].setAttribute('src',song['img_link']);

            await sleep(250);

            document.getElementsByTagName('p')[0].innerText = song['track_name'];
            document.getElementsByTagName('p')[1].innerText = song['artist_name'];

            if(song['track_name'].length > 28){
                document.getElementsByTagName('p')[0].setAttribute('class', 'text');
            }else{
                document.getElementsByTagName('p')[0].setAttribute('class', '');
            }
            if(song['artist_name'].length > 28){
                document.getElementsByTagName('p')[1].setAttribute('class', 'text');
            }else{
                document.getElementsByTagName('p')[1].setAttribute('class', '');
            }

            document.getElementsByTagName('div')[2].setAttribute('class', 'frame animation-out');
            document.getElementsByTagName('div')[3].setAttribute('class', 'info animation-out');

        }

    },delay);

}



reload_content(3000);
