window.oncontextmenu = function (event) { event = false };


//Game settings
var n_cell = parseInt(prompt("Une grille de combien par combien ?", "16")), n_mines = parseInt(prompt("Combien de mines dans cette partie ?", "mmmmille"));

//dimensions
var w = 801;
d = (w - 1) / n_cell; //d is declared from cell.js

//Program environnement
var cells = [], flags = [], over = false;

function setup() {
    //Creating the cell objects table
    for (var i = 0; i < n_cell; i++) { //Rows
        cells[i] = [];
        for (var k = 0; k < n_cell; k++) { //Cols
            cells[i][k] = new Cell(k * d, i * d);
        }
    }
    Cell.prototype.lose = function () {
        over = true;
        for (var i = 0; i < n_cell; i++) { //Rows
            for (var k = 0; k < n_cell; k++) { //Cols
                cells[i][k].show(); //"all" parameters equals true - showing all the elements
            }
        }
    }

    createCanvas(w, w);
    background(255);
    stroke(65);

    //Creating the mines
    for (var i = 0; i < n_mines; i++) {
        var n = Math.floor(Math.random() * cells.length);
        cells[n][Math.floor(Math.random() * cells[n].length)].content = -1;
    }

    //Showing the cells + Calculating near mines
    for (var i = 0; i < n_cell; i++) { //Rows
        for (var k = 0; k < n_cell; k++) { //Cols
            var near_mines = 0;
            cells[i][k].draw(d);
            for (var r = ((i == 0) ? 0 : -1); r <= ((i == cells.length - 1) ? 0 : 1); r++) {
                for (var c = ((k == 0) ? 0 : -1); c <= ((k == cells[i].length - 1) ? 0 : 1); c++) {
                    near_mines += (cells[i + r][k + c].content == -1) ? 1 : 0;
                }
            }
            cells[i][k].content = cells[i][k].content == -1 ? -1 : (near_mines > 0 ? near_mines : "");
            // cells[i][k].show();
        }
    }
}

function reveal_empCells(y, x) { //Révélations des suites de case vides environnentes
    var r = y, c = x;
    do {
        cells[r][c].show();
        c++;
    } while (c < cells[r].length && cells[r][c-1].content == ""); //Vers la droite
    r = y; c = x;
    do {
        cells[r][c].show();
        c--;
    } while (c >= 0 && cells[r][c+1].content == ""); //Vers la gauche
    r = y; c = x;
    do {
        cells[r][c].show();
        r++;
    } while (r < cells.length && cells[r-1][c].content == ""); //Vers le bas
    r = y; c = x;
    do {
        cells[r][c].show();
        r--;
    } while (r >= 0 && cells[r+1][c].content == ""); //Vers le haut
}

function check_flags() {
    if(flags.length == n_mines) {
        for(var i = 0; i < flags.length; i++) {
            if(flags[i].content != -1) {
                Cell.prototype.lose();
                return;
            }
        }
        alert("Vous avez gagné !");
    }
}

function mouseReleased() {
    if(over) return;
    for (var i = 0; i < n_cell; i++) { //Rows
        for (var k = 0; k < n_cell; k++) { //Cols
            var c = cells[i][k];
            if (mouseX > c.x && mouseX < c.x + d && mouseY > c.y && mouseY < c.y + d) {
                if (c.content == -1 && mouseButton == LEFT) Cell.prototype.lose();
                
                //Eventually splicing the cell from the flagged cells array
                var index = flags.indexOf(cells[i][k]);
                if(index != -1) {
                    flags[index].draw(d);
                    flags.splice(index, 1);
                }
                if (c.showed == false) {
                    //Eventually executing the cell show function
                    if(mouseButton == LEFT) {
                        cells[i][k].show(mouseButton);
                        reveal_empCells(i, k);
                    }
                    //Eventually adding the cell in the flagged cell array
                    else if(mouseButton == RIGHT) {
                        if(index == -1) {
                            flags[flags.length] = cells[i][k];
                            check_flags();
                            c.show(mouseButton);
                        }
                    }
                }
            }
        }
    }
}