
let row_setting=document.getElementById('row_setting');
let col_setting=document.getElementById('col_setting');
let mine_setting=document.getElementById('mine_setting');
let apply_button=document.getElementById('apply_button');
let back_button=document.getElementById('back_button');


if(localStorage.getItem('rows')==null)
    localStorage.setItem('rows',20);
if(localStorage.getItem('cols')==null)
    localStorage.setItem('cols',20);
if(localStorage.getItem('mine')==null)
    localStorage.setItem('mine',81);

function setInputs(){
row_setting.value=localStorage.getItem('rows');
col_setting.value=localStorage.getItem('cols');
mine_setting.value=localStorage.getItem('mine');
}

function restoreDefault(){
    localStorage.setItem('rows',20);
    localStorage.setItem('cols',20);
    localStorage.setItem('mine',81);
    setInputs();
}


function checkConditions(){
    return row_setting.value>0 && row_setting.value<=30 && 
    col_setting.value>0 && col_setting.value<=30 &&
    mine_setting.value<col_setting.value*row_setting.value &&
    mine_setting.value>0;
}

setInputs();

apply_button.addEventListener('click',function(){

    if(!checkConditions()){
        alert('Error: Illegal Values!');
        setInputs();
    }
    else{
    localStorage.setItem('rows',row_setting.value);
    localStorage.setItem('cols',col_setting.value);
    localStorage.setItem('mine',mine_setting.value);
    window.location='index.html';
    }
        
    
})

back_button.addEventListener('click',function(){
    window.location='index.html';
});

