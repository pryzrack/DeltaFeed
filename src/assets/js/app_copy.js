const BOTS = {
    nv: [ // navigation bots
        "adb_bot1@testrun.org",
        "simplebot@systemli.org"
    ],
    fd: [ // feed bots
        "feedsbot@hispanilandia.net"
    ],
    tr: [ // translate bots
        "translator@hispanilandia.net"
    ]
};
function $(id){
    return document.getElementById(id);
};
DEFAULT = {
    nv: BOTS.nv[0], // navigation
    fd: BOTS.fd[0], // feeds
    tr: BOTS.tr[0] // translator
};
if window.localStorage.getItem('deltafeed'){
    DEFAULT = JSON.parse(window.localStorage.getItem('deltafeed-config'))
};
function setBot(){
    window.localStorage.setItem('deltafeed', true);
    window.localStorage.setItem(
        'deltafeed-config',
        JSON.stringify(
            {
                nv: document.getElementById('nv').value,
                fd: document.getElementById('fd').value,
                tr: document.getElementById('tr').value
            }
        )
    );
};
function mailto(dest, body){
    return `mailto:${dest}?body=/${encodeURI(body)}`;
};
function translate(from="es", to="en", text){
    return mailto(DEFAULT.tr, `/tr ${from} ${to} ${text}`);
};
function subscribe(feed, unsub=true) {
    return mailto(DEFAULT.fd, `${unsub?'': 'un'}sub ${feed}`);
};
function main(data) {
    for (let feed of data.feeds){
        document.getElementById('feeds').innerHTML += `<div class="card">
        <header>
        <a href=""><h3>${feed.name}</h3></a>
        </header>
        <div class="container">
        <p>${feed.description?feed.description:''}</p>
        </div>
        <br>
        </div>`
    };
    for (let lang of data.languages){
        document.getElementById('langs').innerHTML += `<option value="${lang[1]}">${lang[0]}</option>`;
    };
    for (let console of data.consoles){
        document.getElementById('consoles').innerHTML += `<option value="${console}">${console}</option>`;
    };
    for (let i of DEFAULT.nv){
        document.getElementById('nv').innerHTML += `<option value="${i}">${i}</option>`;
    };
    for (let i of DEFAULT.fd){
        document.getElementById('fd').innerHTML += `<option value="${i}">${i}</option>`;
    }
    for (let i of DEFAULT.tr){
        document.getElementById('tr').innerHTML += `<option value="${i}">${i}</option>`;
    }
}
onload = () => {
    fetch("assets/json/prototype.json")
        .then(res => res.json())
        .then(json => main(json));
}