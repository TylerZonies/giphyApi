var btnArray = ['monkeys', 'dogs', 'kittens', 'mice', 'tigers'];

$(document).ready(function() {
    loadButtons();
    function loadButtons(){
        const btnArea = $("#buttonArea");
        btnArea.empty();
        for(let i=0; i < btnArray.length; i++){
            const newButton = $("<button>").addClass('btn btn-primary searchBtn');
            newButton.attr(`data-query`, btnArray[i]).text(btnArray[i]);
            btnArea.append(newButton);
        }
    }
    function loadImages(images) {
        const gifs = images.data;
        const imageArea = $('#imageArea')
        imageArea.empty();
        for(let i=0; i < gifs.length; i++){
            const gifDiv = $('<div>').addClass('row imageDiv');
            const gifCol = $('<div>').addClass('col-lg-12');
            const newGif = $('<img>').attr('src', gifs[i].images.original.url)
            gifCol.append(newGif);
            gifDiv.append(gifCol);
            imageArea.append(gifDiv);
        }
    }
    $('#addBtn').on('click', event => {
        event.preventDefault();
        const userInput = $('#userInput').val().trim();
        if(userInput){
            btnArray.push(userInput);
            loadButtons();
            $('#userInput').val('');
        }
    });
    $('#buttonArea').on('click', '.searchBtn', function(){
        const searchTerm = $(this).attr('data-query')
        console.log(searchTerm);
        const URL = `https://api.giphy.com/v1/gifs/search?api_key=4wEsHbodhs7yBK27DN2CGQGo8IDcxYsi&q=${searchTerm}&limit=25`
        $.ajax({
            method: 'GET',
            url: URL
        }).then(res => loadImages(res));
    })
    
})
