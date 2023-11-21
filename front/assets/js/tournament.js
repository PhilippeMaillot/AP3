function updateTownList() {
    fetch('http://localhost:8080/town')
        .then(response => response.json())
        .then(towns => {
            const villeSelect = document.getElementById('villeSelect');
            // Ajouter une option par défaut
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "Choisir la ville";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            villeSelect.appendChild(defaultOption);
            // Ajouter les villes
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
// Appeler la fonction pour mettre à jour la liste des villes
updateTownList();
