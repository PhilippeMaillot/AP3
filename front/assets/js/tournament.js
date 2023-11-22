var selectedSport;
var selectedTown;

function updateTownList() {
    fetch('http://localhost:8080/town')
        .then(response => response.json())
        .then(towns => {
            const townSelect = document.getElementById('villeSelect');
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "Choisir la ville";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            townSelect.appendChild(defaultOption);

            towns.forEach(town => {
                const option = document.createElement('option');
                option.value = town.town_name;
                option.text = town.town_name;
                townSelect.appendChild(option);
            });
            $(townSelect).select2();
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'API : ', error);
        });
}

const sportSelect = document.querySelector('.form-select');
sportSelect.addEventListener('change', function() {
    selectedSport = this.value;
    console.log('Sport choisi : ' + selectedSport);
    updateFieldList();
});

const townSelect = document.querySelector('#villeSelect');
townSelect.addEventListener('change', function() {
    selectedTown = this.value;
    console.log('Ville choisie : ' + selectedTown);
    updateFieldList();
});

const fieldSelect = document.querySelector('#fieldSelect');

function updateFieldList() {
    if (selectedSport && selectedTown) {
        fetch('http://localhost:8080/field')
            .then(response => response.json())
            .then(fields => {
                while (fieldSelect.firstChild) {
                    fieldSelect.removeChild(fieldSelect.firstChild);
                }

                const defaultOption = document.createElement('option');
                defaultOption.value = "";
                defaultOption.text = "Choisir le terrain";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                fieldSelect.appendChild(defaultOption);

                fields.forEach(field => {
                    if (field.field_town === selectedTown && field.sport_type === selectedSport) {
                        const option = document.createElement('option');
                        option.value = field.id_field;
                        option.text = field.field_adress;
                        fieldSelect.appendChild(option);
                    }
                });
                $(fieldSelect).select2();
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des données de l\'API : ', error);
            });
    }
}

updateTownList();
villeSelect.addEventListener('change', updateFieldList);
sportSelect.addEventListener('change', updateFieldList);

//  document.addEventListener("DOMContentLoaded", function () {
//      const addTournamentForm = document.getElementById("TournamentForm");
  
//      addTournamentForm.addEventListener("submit", function (event) {
//        event.preventDefault(); // Prevent the default form submission behavior
  
//        //  Collect form data
//        const tournament_name = document.getElementById("tournament_name").value;
//        const tournament_date = document.getElementById("tournament_date").value;
//        const tournament_sport = sportSelect
//        const tournament_town = document.getElementById("clubSport").value;
//        const tournament_field = document.getElementById("clubMail").value;