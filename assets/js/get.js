// api url 
const api_url =  
      "https://auto-api-dev.guiadoautomovel.pt/api/v1/carversioninformationsviews/reviews/carmaker/permalink/bmw/carmodel/permalink/serie-3"; 
  
// Function to hide the loader 
function hideloader() { 
    document.getElementById('loading').style.display = 'none'; 
} 

// Defining async function 
async function getapi(url) { 
    // Storing response 
    const response = await fetch(url); 
    // Storing data in form of JSON 
    var data = await response.json();
    data.forEach(element => {
        $('#NomeCarro').html(element['carMakerName'] + ' ' + element['carModelName']);
        $('#PositiveVotes').html(element['PositiveVotes'] + ' votos');
        $('#NegativeVotes').html(element['NegativeVotes'] + ' votos');
        $('#TotalVotes').html(element['TotalVotes']);
        $('#ImgCarro').attr('src', element['carModelFlickrAsset']['large1600Url']);
    });

    // POST Vote
    $(document)
        .off('click', '[data-remote="true"]')
        .on('click', '[data-remote="true"]', (e) => {
            e.preventDefault();
            // Check for vote value 
            const value = {
                "car_model_id": 324,
                "weight": ($(e.currentTarget).attr('data-method') === 'like') ? 1 : 0
            };
            fetch("https://auto-api-dev.guiadoautomovel.pt/api/v1/carmodels/vote", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            })
                .then((response) => response.json())
                //Then with the data from the response in JSON...
                .then((data) => {
                    $('#PositiveVotes').html(data['PositiveVotes']);
                    $('#NegativeVotes').html(data['NegativeVotes']);
                    $('#TotalVotes').html(data['TotalVotes']);
                })
                //Then with the error genereted...
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
}
// Calling that async function 
getapi(api_url); 
