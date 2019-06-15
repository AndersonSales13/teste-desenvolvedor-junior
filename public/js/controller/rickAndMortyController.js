class RickAndMortyController {
    
    selectOrder = document.querySelector("#orderBy");
    containerItens = document.querySelector("#containerItens");

    constructor() {
        this.initEvents();
        this.emmitJSON();
    }

    initEvents() {
        this.selectOrder.addEventListener('change', e => {
            this.orderData(this.dataCurrent, e.target.value);
        });
    }

    ajax(method, url) {

        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();

            ajax.open(method.toUpperCase(), url);

            ajax.onload = e => {
                try {
                    resolve(JSON.parse(ajax.responseText));
                } catch (error) {
                    reject("Try Catch Reject: ", error);
                    console.error("Try Catch Reject: ", error);
                }
            };

            ajax.onerror = e => {
                reject("OnErro Reject: ", e);
                console.error("OnErro Reject: ", e);
            };

            ajax.send();
        });
    }

    emmitJSON() {
        this.ajax('GET', '/data').then(data => {
            this.orderData(data);
        }).catch(error => {
            console.error(error);
        });
    }

    orderData(data, orderBy = "name") {
        let dataSorted;

        if (orderBy == "name") {

            dataSorted = data.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }

                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            });

        } else if (orderBy == "totalSeen") {
            dataSorted = data.sort((a, b) => {
                if (a.episode.length < b.episode.length) {
                    return 1;
                }

                if (a.episode.length > b.episode.length) {
                    return -1;
                }

                return 0;
            });
        }

        this.dataCurrent = dataSorted;
        this.renderEl(this.dataCurrent);
    }

    renderEl(data) {
        this.containerItens.innerHTML = "";

        data.forEach(e => {
            let div = document.createElement('div');
            let firstSeason = 0;
            let secondSeason = 0;
            let thirdSeason = 0;

            e.episode.forEach(episode => {
                let path = episode.split('/');

                let numEpisode = parseInt(path[path.length - 1]);

                if (numEpisode >= 1 && numEpisode <= 11) {
                    firstSeason++;
                } else if (numEpisode >= 12 && numEpisode <= 21) {
                    secondSeason++;
                } else if (numEpisode >= 21 && numEpisode <= 31) {
                    thirdSeason++;
                }
            });

            if (e.status === "Alive") {
                div.innerHTML = `
                                    <div class="img">
                                    <img src="${e.image}" alt="Image - ${e.name}">
                                    </div>
                                    <p class="name">${e.name}</p>
                                    <p class="seen-last"><b>Visto por último em: </b>${e.location.name}</p>
                                    <p class="gender"><b>Gênero: </b>${e.gender}</p>
                                    <p class="first-season"><b>Aparições na Primeira Temporada: </b>${firstSeason}</p>
                                    <p class="second-season"><b>Aparições na Segunda Temporada: </b>${secondSeason}</p>
                                    <p class="third-season"><b>Aparições na Terceira Temporada: </b>${thirdSeason}</p>
                                    <p class="total"><b>Aparições no Total: </b>${e.episode.length}</p>
                                    <p class="status"><b>Status: </b>${e.status}</p>
                                `;
    
                div.classList.add("item");
    
                this.containerItens.appendChild(div);
            }

        });
    }

}