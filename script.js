nrColoane = 9;
nrLinii = 9;
NumarBombe = 10;

var level1 = document.getElementById("level1");
var level2 = document.getElementById("level2");
var level3 = document.getElementById("level3");
var levele = document.getElementById("levele");
var NrBombe = document.getElementById("NrBombe");
var Timp = document.getElementById("Timp");



level1.addEventListener("click", function(){
   clearInterval(TimpInterval);
   nrColoane = 9;
   nrLinii = 9;
   NumarBombe = 10;
   CreareGame();
   
})

level2.addEventListener("click", function(){
   clearInterval(TimpInterval);
   nrColoane = 16;
   nrLinii = 16;
   NumarBombe = 40;
   CreareGame();
})

level3.addEventListener("click", function(){
   clearInterval(TimpInterval);
   nrColoane = 30;
   nrLinii = 16;
   NumarBombe = 99;
   CreareGame();
})

//Functii Game

Hover = function(el){
   el.style.backgroundColor = "rgb(49, 115, 238)";
}

CreareGame = () =>{
AfisareBombe = NumarBombe;
NrBombe.innerHTML = `Numar Bombe :${AfisareBombe }`;
Timp.innerHTML = `Timp :0s`;
var scena = document.getElementById("scena");
scena.innerHTML = ` <div id="over"><h1>Game Over</h1><button id="newgame">New Game</button></div>
                    <div id="win"><h1>Game Win</h1><button id="newgame2">New Game</button></div>`;
marime = 25/nrLinii;
timp = 0;
TimpInterval = setInterval(function () {timp++;Timp.innerHTML = `Timp :${timp}s`;}, 1000);
matrice2 = new Array();
for(i = 0;i<nrColoane;i++)
   matrice2[i] = new Array();

matrice = new Array();
for(i = 0;i<nrColoane;i++)
   matrice[i] = new Array();
scena.style.width = `calc(var(--size) * ${marime * nrColoane})`;
levele.style.width = `calc(var(--size) * ${marime * nrColoane})`;
scena.style.fontSize = `calc(var(--size) * ${marime * 1})`;

for(i = 0;i < nrLinii;i++)
  for(j = 0;j < nrColoane;j++){
   scena.innerHTML +=`<div class="patratel" id= "patratel_${i}_${j}"></div>`;
}

for(i = 0;i<nrLinii;i++){
    for(j = 0;j<nrColoane;j++){
      matrice[i][j] = 0;
      matrice2[i][j] = document.getElementById(`patratel_${i}_${j}`);
      matrice2[i][j].style.width = `calc(var(--size) * ${marime})`;
      matrice2[i][j].style.height = `calc(var(--size) * ${marime})`;
      matrice2[i][j].addEventListener("mouseenter", function()
       { if(!this.presed && !this.steag){
         this.style.backgroundColor = "rgb(108, 159, 252)";
            }
        }
      )  
      matrice2[i][j].addEventListener("mouseleave", function()
       { if(!this.presed){
         this.style.backgroundColor = "rgb(49, 115, 238)";
            }
        }
   )  
 
      matrice2[i][j].presed = false;  
      matrice2[i][j].steag = false;  
    }
}

 gamewin = document.getElementById("win");
 over = document.getElementById("over");
 newgame = document.getElementById("newgame");
 newgame2 = document.getElementById("newgame2");


RandomBomb();
CalculBombe();
Game();

gamewin.style.display = "none";

newgame.addEventListener("click", function(){
  CreareGame();
})

newgame2.addEventListener("click", function(){
   CreareGame();
})


}

RandomBomb = () =>{
    bombe = NumarBombe;
    while(bombe > 0){
     random_i = Math.floor(Math.random() * nrLinii);
     random_j =  Math.floor(Math.random() * nrColoane);
     if(matrice[random_i][random_j] == 0){
         bombe--;
         matrice[random_i][random_j] = `<img src="Bomba.png">`;
     }
    } 
}

CalculBombe = () => {
    for(i = 0;i<nrLinii;i++){
         for(j = 0;j<nrColoane;j++){
            if(matrice[i][j] != `<img src="Bomba.png">`){
             nrBombe = 0;
             if(i+1<nrLinii){
                if(matrice[i+1][j] == `<img src="Bomba.png">`)
                nrBombe ++;
             }
             if(i-1>-1){
                if(matrice[i-1][j] == `<img src="Bomba.png">`)
                nrBombe ++;
             }   
             if(j+1<nrColoane){
                if(matrice[i][j+1] == `<img src="Bomba.png">`)
                nrBombe ++;
             }
             if(j-1>-1){
                if(matrice[i][j-1] == `<img src="Bomba.png">`)
                nrBombe ++;
             }
             if(i+1<nrLinii && j+1 <nrColoane){
                if(matrice[i+1][j+1] == `<img src="Bomba.png">`)
                nrBombe ++;
             }
             if(i-1>-1 && j-1>-1){
                if(matrice[i-1][j-1] == `<img src="Bomba.png">`)
                nrBombe ++;
             }
            if(i+1<nrLinii && j-1>-1){
                if(matrice[i+1][j-1] == `<img src="Bomba.png">`)
                nrBombe ++;
            }
            if(i-1>-1 && j+1<nrColoane){
                if(matrice[i-1][j+1] == `<img src="Bomba.png">`)
                nrBombe ++;
            }
            matrice[i][j] = nrBombe;
         }    
       }
    } 
}

CalculSteaguri = () => {
         if(matrice2[i][j].presed){
          if(i+1<nrLinii){
             if(matrice2[i+1][j].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
          }
          if(i-1>-1){
             if(matrice2[i-1][j].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
          }   
          if(j+1<nrColoane){
             if(matrice2[i][j+1].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
          }
          if(j-1>-1){
             if(matrice2[i][j-1].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
          }
          if(i+1<nrLinii && j+1 <nrColoane){
             if(matrice2[i+1][j+1].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
          }
          if(i-1>-1 && j-1>-1){
             if(matrice2[i-1][j-1].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
          }
         if(i+1<nrLinii && j-1>-1){
             if(matrice2[i+1][j-1].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
         }
         if(i-1>-1 && j+1<nrColoane){
             if(matrice2[i-1][j+1].innerHTML == `<img src="Steag2.png">`)
             nrSteaguri ++;
         }
       }    
}

AfisareVecini = (i,j) => {
   if(i+1<nrLinii && !matrice2[i+1][j].presed){
     Presed(i+1,j);
   }
   if(i-1>-1 && !matrice2[i-1][j].presed ){
      Presed(i-1,j);
   }   
   if(j+1<nrColoane && !matrice2[i][j+1].presed){
      Presed(i,j+1);
   }
   if(j-1>-1 && !matrice2[i][j-1].presed){
      Presed(i,j-1);
   }
   if(i+1<nrLinii && j+1 <nrColoane && !matrice2[i+1][j+1].presed){
      Presed(i+1,j+1);
   }
   if(i-1>-1 && j-1>-1 && !matrice2[i-1][j-1].presed){
      Presed(i-1,j-1);
   }
   if(i+1<nrLinii && j-1>-1 && !matrice2[i+1][j-1].presed){
      Presed(i+1,j-1);
   }
   if(i-1>-1 && j+1<nrColoane && !matrice2[i-1][j+1].presed){
      Presed(i-1,j+1);
   }  
}

CuloareCifra = (i,j) =>{
        if(matrice[i][j] == 1)
        matrice2[i][j].style.color = "var(--color1)";
        if(matrice[i][j] == 2)
        matrice2[i][j].style.color = "var(--color2)";
        if(matrice[i][j] == 3)
        matrice2[i][j].style.color = "var(--color3)";
        if(matrice[i][j] == 4)
        matrice2[i][j].style.color = "var(--color4)";
        if(matrice[i][j] == 5)
        matrice2[i][j].style.color = "var(--color5)";
        if(matrice[i][j] == 6)
        matrice2[i][j].style.color = "var(--color6)";

}

AfiseareVeciniNeapasati = () =>{
   if(matrice2[i][j].presed){
      if(i+1<nrLinii){
         if(matrice2[i+1][j].innerHTML != `<img src="Steag2.png">` && !matrice2[i+1][j].presed)
         {
      matrice2[i+1][j].style.backgroundColor = "rgb(108, 159, 252)";       
      setTimeout(function(){ matrice2[i+1][j].style.backgroundColor = "rgb(49, 115, 238)";
   }, 100);
         }
         
      }
      if(i-1>-1){
         if(matrice2[i-1][j].innerHTML != `<img src="Steag2.png">` && !matrice2[i-1][j].presed)
         {
            matrice2[i-1][j].style.backgroundColor = "rgb(108, 159, 252)";       
            setTimeout(function(){ matrice2[i-1][j].style.backgroundColor = "rgb(49, 115, 238)" }, 100);
               }
      }   
      if(j+1<nrColoane){
         if(matrice2[i][j+1].innerHTML != `<img src="Steag2.png">`&& !matrice2[i][j+1].presed)
         {
            matrice2[i][j+1].style.backgroundColor = "rgb(108, 159, 252)";       
            setTimeout(function(){ matrice2[i][j+1].style.backgroundColor = "rgb(49, 115, 238)" }, 100);
               }
      }
      if(j-1>-1){
         if(matrice2[i][j-1].innerHTML != `<img src="Steag2.png">`&& !matrice2[i][j-1].presed)
         {
            matrice2[i][j-1].style.backgroundColor = "rgb(108, 159, 252)";       
            setTimeout(function(){ matrice2[i][j-1].style.backgroundColor = "rgb(49, 115, 238)" }, 100);
               }
      }
      if(i+1<nrLinii && j+1 <nrColoane){
         if(matrice2[i+1][j+1].innerHTML != `<img src="Steag2.png">`&& !matrice2[i+1][j+1].presed)
         {
            matrice2[i+1][j+1].style.backgroundColor = "rgb(108, 159, 252)";       
            setTimeout(function(){ matrice2[i+1][j+1].style.backgroundColor = "rgb(49, 115, 238)" }, 100);
               }
      }
      if(i-1>-1 && j-1>-1){
         if(matrice2[i-1][j-1].innerHTML != `<img src="Steag2.png">`&& !matrice2[i-1][j-1].presed)
         {
            matrice2[i-1][j-1].style.backgroundColor = "rgb(108, 159, 252)";       
            setTimeout(function(){ matrice2[i-1][j-1].style.backgroundColor = "rgb(49, 115, 238)" }, 100);
               }
      }
     if(i+1<nrLinii && j-1>-1){
         if(matrice2[i+1][j-1].innerHTML != `<img src="Steag2.png">`&& !matrice2[i+1][j-1].presed)
         {
            matrice2[i+1][j-1].style.backgroundColor = "rgb(108, 159, 252)";       
            setTimeout(function(){ matrice2[i+1][j-1].style.backgroundColor = "rgb(49, 115, 238)" }, 100);
               }
     }
     if(i-1>-1 && j+1<nrColoane){
         if(matrice2[i-1][j+1].innerHTML != `<img src="Steag2.png">`&& !matrice2[i-1][j+1].presed)
         {
            matrice2[i-1][j+1].style.backgroundColor = "rgb(108, 159, 252)";       
            setTimeout(function(){ matrice2[i-1][j+1].style.backgroundColor = "rgb(49, 115, 238)" }, 100);
               }
     }
   }    
}
 
Presed = (i,j) => {
   if(!matrice2[i][j].steag){
   if(!matrice2[i][j].presed){
      matrice2[i][j].presed = true;
   if(matrice[i][j] == 0){
      matrice2[i][j].style.backgroundColor = "#fffd";
      AfisareVecini(i,j);
   }else{
      matrice2[i][j].innerHTML = matrice[i][j];
      matrice2[i][j].style.backgroundColor = "#fffd";
      CuloareCifra(i,j);
      GameOver(i,j);
      Win();
   }
 }
 else{
   nrSteaguri = 0;
   CalculSteaguri(i,j);
   if(matrice[i][j] == nrSteaguri){
   AfisareVecini(i,j);
   }
   else{
        AfiseareVeciniNeapasati();
   }
 }
}
}


Steag = () =>{
   matrice2[i][j].steag = true;
   if(matrice2[i][j].innerHTML == `<img src="Steag2.png">`){
      matrice2[i][j].innerHTML = null;
      matrice2[i][j].steag = false;
      AfisareBombe ++;
      NrBombe.innerHTML = `Numar Bombe :${AfisareBombe }`;
   }else{
      matrice2[i][j].innerHTML += `<img src="Steag2.png">`;
      AfisareBombe --;
      NrBombe.innerHTML = `Numar Bombe :${AfisareBombe }`;
      matrice2[i][j].style.backgroundColor = "rgb(49, 115, 238)";
 }
}

GameOver = (i,j) =>{ 
       if(matrice[i][j] == `<img src="Bomba.png">`)
       {
       over.style.display = "flex";
       for(i = 0;i<nrLinii;i++)
       for(j = 0 ;j<nrColoane;j++)
       if(matrice[i][j] == `<img src="Bomba.png">`)
         matrice2[i][j].innerHTML = matrice[i][j];
         clearInterval(TimpInterval);
       }
}  
Win = () =>{
   win = true;
   for(i = 0;i<nrLinii;i++){
      for(j = 0;j<nrColoane;j++){
        if(matrice[i][j] != `<img src="Bomba.png">` && !matrice2[i][j].presed)
        win = false;
     }
   }
    if(win){
      gamewin.style.display = "flex";
      clearInterval(TimpInterval);
    }
}

Game = () => {
for(i = 0;i<nrLinii;i++){
   for(j = 0;j<nrColoane;j++){
       matrice2[i][j].addEventListener("mousedown", function() { 
      if(this.id.slice(9,100).indexOf("_") == 1){
           i = +this.id.slice(9,10);
           j = +this.id.slice(11,13);
      }
      else{
         i = +this.id.slice(9,11);
         j = +this.id.slice(12,14);
      }
    
       if(event.button == 0){
         if(!matrice2[i][j].steag){
           Presed(i,j);
         }
       }
       if(event.button == 2 ){
         if(!matrice2[i][j].presed)
         Steag();
       }
   });
  }
}

}

//Sfarsit Functii Game

CreareGame();


  
 