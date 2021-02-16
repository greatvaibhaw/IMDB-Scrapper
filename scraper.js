const cheerio =   require('cheerio');
const request  =   require('request');

let knowledgeDB = [];
let actorName = {}, actorMovies = {};

const url = 'https://www.imdb.com/chart/top/';
const movieUrl = 'https://www.imdb.com/filmosearch/?sort=user_rating&explore=title_type&title_type=movie&ref_=nm_flmg_shw_3&role='
const actorUrl = 'https://www.imdb.com/find?ref_=nv_sr_sm&q=';

async function getTopMovies(req, res){
    if(req.query.m<=knowledgeDB.length){
        return responses(res,knowledgeDB.slice(0,req.query.m));
    }
    let option = {
        url,
        method : 'GET',
    }
    let body = await requestPromise(option);
    const $ = cheerio.load(body);
    $('.lister-list').find('tr td.titleColumn a').each(function(i,element) {
        const $element = $(element);
        if(!req.query.m){
            responses(res,knowledgeDB);
            return false;
        }
        if(knowledgeDB.length <= i){
            knowledgeDB.push($element.text()); 
        }                   
        req.query.m--;
    });
    return;
}

async function getTopMMoviesOfActor(req, res){
try {
    let actor = req.query.actor;
    let m = req.query.m || 10;
    let option = {
        url : actorUrl+actor,
        method : 'GET'
    };
    let body = await requestPromise(option);
    let $ = cheerio.load(body);
    let $name = $($('.result_text').find('a')[0]);
    actor = $name.text().replace(/ /g,'_');
    if(actorName[actor] && actorMovies[actorName[actor]].length >= m){
        return responses(res, actorMovies[actorName[actor]].slice(0,m));
    }
    actorName[actor] = $name.attr('href').match(/name\/(.*)\//)[1];
    option = {
        url : movieUrl+actorName[actor],
        method : 'GET'
    }
    body = await requestPromise(option);
    $ = cheerio.load(body);
    if(m>50){
        let page = Math.ceil(parseInt($($('.desc')[0]).text().match(/of (.*)/)[0].match(/\d+/)[0])/50);
        let pageNum = 1;
        while(--page){
            option.url += '&page='+(++pageNum);
            body += await requestPromise(option);
        }
    }
    $ = cheerio.load(body);
    $('.lister-item-header').find('a').each(function(i, element) {
        const $element = $(element);
        if(!actorMovies[actorName[actor]]){
            actorMovies[actorName[actor]] = [$element.text()];
        }
        else if(actorMovies[actorName[actor]].length <= i)
            actorMovies[actorName[actor]].push($element.text());
        if(i==m-1)
            return false;
    });
    return responses(res, actorMovies[actorName[actor]]);
    }catch(error){
        console.log("Error: " + error);
        res.json({
            message : error,
            status  : 404,
            data    : {}
        });
    }
}

function requestPromise(option){
    return new Promise((resolve, reject) => {
        request(option, function(error, resp, body) {
            if(error){
                return reject(error.message);
            }
            return resolve(body);
        });
    });
}

function responses(res,data){
    return res.json({
        message : "Action Complete",
        status  : 200,
        data    : data
    });
}

module.exports = {
    getTopMovies,
    getTopMMoviesOfActor
}