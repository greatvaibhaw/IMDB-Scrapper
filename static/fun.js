const url = "https://localhost:3000/"

function getTopMovies(){
    document.getElementById('render').innerHTML =  "<input type= 'textfield' id='movieCount'/> &nbsp;&nbsp;&nbsp;<input type = 'button' onsubmit = 'getTopM()'/>";
}

function getTopM(){
    let m = parseInt(document.getElementById('movieCount').value);
    let serveUrl = url+"getTopMovies?m="+m;
    let request = new XMLHttpRequest();
    request.open('GET',serveUrl);
    request.responseType('json');
    request.onload = function(){
        let response = request.response;
        document.getElementById('render').innerHTML = "<div class = 'table table-striped'> <div class = 'thead'>Movie</div>";
        for(let ob in response){
            document.getElementById('render').innerHTML += "<div class = 'col'>"+ob+"</div></div></div>";
        }
    }
}

function getTopMMoviesofActor() {

}