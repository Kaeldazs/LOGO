/* A FAIRE:

- gestion des variables des fonctions custom
- gestion des animation avec Kaylee en fonction de la liste d'attente du buffer

*/

var canvas = new Canvas();

var render = function() {
    canvas.clear();
};

var animLoop = Kaylee.add(function() {
    render();
}, {
    prepare: true
});

(function() {
    canvas.create();
})();