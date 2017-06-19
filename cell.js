/* %%%%%%%%%%%%%%%%%%%%%%%
        IMPORTANT
%%%%%%%%%%%%%%%%%%%%%%%%%%%

The variable "d" has to be defined (like in sktech.js) before using this script.
This varialbe isn't defined here !

*/
var d;

function Cell(x, y) {
    this.y = y;
    this.x = x;

    this.form = null;
    this.content = "";
    this.showed = false;
    
    this.draw = function(d) { //Draws the cell
        fill(255);
        this.form = rect(this.x, this.y, d, d);
        this.showed = false;
    };
    this.show = function(btn, state) {  //Shows the cell's content - all : boolean (parameter used when the function is used to show all the elements)
        btn = btn === undefined ? 'left' : btn;

        //Draws a number
        if(btn == "left") {
            fill(165);
            this.showed = true;
        }
        else fill(105, 165, 255);

        this.form = rect(this.x, this.y, d, d);
        
        if(btn == "right") return;


        if(this.content < 0) {
            fill(255,105,105);
            this.form = ellipse(this.x + d/2, this.y + d/2, d, d);
            fill(165);
        } else {
            textSize(32);
            textAlign(CENTER);
            fill(65);
            text(this.content, this.x, this.y, d, d);
        }
    };
}