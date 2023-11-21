var selectedSport;
var selectedTown;

function updateTownList() {
    fetch('http://localhost:8080/town')
        .then(response => response.json())
        .then(towns => {
            const villeSelect = document.getElementById('villeSelect');
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "Choisir la ville";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            villeSelect.appendChild(defaultOption);

            towns.forEach(town => {
                const option = document.createElement('option');
                option.value = town.town_name;
                option.text = town.town_name;
                villeSelect.appendChild(option);
            });
            $(villeSelect).select2();
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'API : ', error);
        });
}

var sportSelect = document.querySelector('.form-select');
sportSelect.addEventListener('change', function() {
    selectedSport = this.value;
    console.log('Sport choisi : ' + selectedSport);
    updateFieldList();
});

var villeSelect = document.querySelector('#villeSelect');
villeSelect.addEventListener('change', function() {
    selectedTown = this.value;
    console.log('Ville choisie : ' + selectedTown);
    updateFieldList();
});

var fieldSelect = document.querySelector('#fieldSelect');

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
