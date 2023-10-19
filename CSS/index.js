
let arr=[];
for(let i=0;i<9;i++)
{
    for(let j=0;j<9;j++)
    {
        arr[i]=[];
    }
}
var startGame=0;
var Filled=0;
const solveButton = document.getElementById("Solve");
solveButton.addEventListener("click",MyFunction);

const ResetBtn = document.getElementById("reset");
ResetBtn.addEventListener("click",ResetFunction);

const startBtn = document.getElementById("start");
startBtn.addEventListener("click",StartGameFunction);

function initialise(){
    var table=document.getElementById("SudokuTable");
    var flag=1;
    for (let i = 0; i < 9; i++) {
        for(let j=0;j<9;j++)
        {
            var val=parseInt(table.rows[i].cells[j].innerHTML);
            if(val>0 && val<10)
            {
                if(isSafe(i,j,val))
                {
                    arr[i][j]=val;
                    table.rows[i].cells[j].setAttribute("contenteditable", false);
                    table.rows[i].cells[j].style.backgroundColor = "grey";
                    Filled=1;
                }
                else{
                    alert("You cannot enter same value in same row and column and also in 3*3 matrix")
                    ResetFunction();
                }
            }
            else if((table.rows[i].cells[j].innerHTML)=='')
            {
                arr[i][j]=0;
            }
            else{
                table.rows[i].cells[j].style.backgroundColor = "red";
                flag=0;
                break;
            }
        }
        if(flag==0)
        {
            alert("Please Enter Value between 1 to 9");
            startBtn.disabled=true;
            break;
        }
    } 
}

function isSafe(row,col,value){  
    for(var i=0;i<9;i++)
    {
        if(arr[i][col]==value)
        {
            return false;
        }   
        if(arr[row][i]==value)
        {
            return false;
        }
    }
    var sr=Math.floor((row/3))*3;
    var sc=Math.floor((col/3))*3;
    for(var i=sr;i<sr+3;i++)
    {
        for(var j=sc;j<sc+3;j++)
        {
            if(arr[i][j]==value)
            {
                return false;
            }   
        }
    }
    return true;
}
function SolveSudoku(row,col)
{
   if(row==9)
   {
    return true;
   }

   var nrow=0;
   var ncol=0;

   if(col!=8)
   {
    nrow=row;
    ncol=col+1;
   }
   else{
    nrow=row+1;
    ncol=0;
   }
   if(arr[row][col]!=0)
   {
        if(SolveSudoku(nrow,ncol))
        {
            return true;
        }
   }
   else{
    
    for(var i=1;i<=9;i++)
    {
        if(isSafe(row,col,i))
        {
            arr[row][col]=i;
            if(SolveSudoku(nrow,ncol))
            {
                return true;
            }
            else{
                arr[row][col]=0;
            }
        }
    }
   }
   return false;
}

function MyFunction(){
    if(startGame==0)
    {
        alert("Fisrt Start The game");
    }
    else{
        if(SolveSudoku(0,0))
        {
            var table=document.getElementById("SudokuTable");
            for(var i=0;i<9;i++)
            {
                for(var j=0;j<9;j++)
                {
                    if(!(table.rows[i].cells[j].contenteditable))
                    {
                        table.rows[i].cells[j].innerHTML=arr[i][j];
                        table.rows[i].cells[j].style.backgroundColor = "green";
                    }
                }
            }
        }
        else{
            alert("No Solution Exitst For this Problem");
            ResetFunction();
        }
    }
}

function ResetFunction(){
    window.location.reload();
}

function StartGameFunction(){
    initialise();
    if(Filled==0)
    {
        alert("Please fill some cells first");
    }
    else{
        startGame=1;
        startBtn.disabled=true;
    }
}


