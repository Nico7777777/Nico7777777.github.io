let n = Number(prompt("Dimensiune joc", 12));

let canvas1 = document.getElementById("canvas1");
let ctx = canvas1.getContext("2d"); 
let len_cell = 30, space_between = 6, x, y;

let matrix = new Array;
let players_round = 1;

let player_info = document.getElementById("show_the_player");
let cul1 = "yellow", cul2 = "purple";

function display_player()
{
    let nr = players_round==1?("1"):("2");
    player_info.innerHTML = "Player " + nr + " turn";
    player_info.style.color = players_round==1?(cul1):(cul2);
}

class cell
{
    constructor( x, y, valoare, pozi, pozj )
    {
        this.x = x;
        this.y = y;
        this.valoare = valoare;
        this.pozi = pozi;
        this.pozj = pozj;
        this.centrux = x/2;
        this.centruy = y/2;
    }
    print_the_square()
    {
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 2;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, 30, 30);
    }

    fill_red()
    {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        
        if(players_round == 1) ctx.fillStyle = cul1;
        else ctx.fillStyle = cul2;

        ctx.fillRect(this.x, this.y, 30, 30);
        ctx.fillStyle = "red";
        let dist = len_cell + space_between;
        if(this.pozi < n) ctx.fillRect(this.x,       this.y + dist, 30, 30);
        if(this.pozi > 1) ctx.fillRect(this.x,       this.y - dist, 30, 30);
        if(this.pozj < n) ctx.fillRect(this.x + dist, this.y,       30, 30);
        if(this.pozj > 1) ctx.fillRect(this.x - dist, this.y,       30, 30);
        players_round *= -1;

        this.valoare = 1;
           
    }
}

for(var i=1; i<=n; i++) 
{
    matrix[i] = [];
    x = 10;
    if( i == 1 ) y = 10;
    for(var j=1; j<=n; j++) 
    {
        d = new cell(x, y, 0, i, j);
        d.print_the_square();
        
        x = x + len_cell + space_between;
        matrix[i][j] = d;
    }
    y = y + len_cell + space_between;
}

const coordonate = (event)=>{
    const container = canvas1.getBoundingClientRect();
    const x_click = Number(event.clientX - container.left);
    const y_click = Number(event.clientY - container.top);

    for( i = 1 ; i<=n; i++)
        for( j = 1; j <= n; j++)
            if((x_click <= matrix[i][j].x + 30 && x_click >= matrix[i][j].x) && (y_click >= matrix[i][j].y && y_click <= matrix[i][j].y + 30 ))
                if( matrix[i][j].valoare == 0)
                {
                    //let cul=(players_round==1)?("galben"):("mov");
                    //console.log("avem matrix[" + i +"][" + j + "] in care se incadreaza clickul; iar la rand e " + cul);
                    matrix[i][j].fill_red();
                    display_player();
                    if( i > 1 ) matrix[i-1][ j ].valoare = 1;
                    if( i < n ) matrix[i+1][ j ].valoare = 1;
                    if( j > 1 ) matrix[ i ][j-1].valoare = 1;
                    if( j < n ) matrix[ i ][j+1].valoare = 1;
                }
                else alert("NU E VOIE MA MAMAIE ACOLO!");
}

canvas1.addEventListener("click", coordonate);