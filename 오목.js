let dolCont = document.getElementById('dolContainer');
let i,j;
let dol;
let fBlack = 0;

for(i=0;i<19;i++){
    for(j=0;j<18;j++){
        dolCont.children[i].children[j].onclick=(e)=>{
            colorChange(event.target.parentNode.id,event.target.id )
            blackAttack(event.target.parentNode.id,event.target.id )
            giveId()
            whiteWin()
            setTimeout(()=>{
                blackWin()
            },20)
        }
    }
}

function check(numx,numy){
    let Y = numx*1;
    let X = numy*1;
    if((Y > 18 || X>17)||(Y<0||X<0)){
        console.log('안됨')
        return 1;
    }
}

function colorChange(e,j){ // 흰 돌의 색상 변화를 위한 함수
    console.log(e, j);
    event.target.style.backgroundColor = 'white'
    event.target.style.opacity = '1'
    event.target.addEventListener('mouseover',function(e){
        event.target.style.opacity = "1"
    })
}

function colorBlack(blackY, blackX){
    dolCont.children[blackY].children[blackX].style.backgroundColor = "black"
    dolCont.children[blackY].children[blackX].className = "button black"
    dolCont.children[blackY].children[blackX].addEventListener('mouseover',function(){
        dolCont.children[blackY].children[blackX].style.opacity = "1"
    })
}

function giveId(){ // 중복 방지 함수
    event.target.className = "button yes" // 돌 중복을 방지하기 위함
}

function whiteWin(){ // 흰돌이 이기는 경우
    for (i = 0; i < 19; i++) {
        for (j = 0; j < 18; j++) {
            if (dolCont.children[i].children[j].className == "button yes" && dolCont.children[i].children[j + 1].className == "button yes") {
                if (dolCont.children[i].children[j + 2].className == "button yes" && dolCont.children[i].children[j + 3].className == "button yes") {
                    if (dolCont.children[i].children[j + 4].className == "button yes") {
                        setTimeout(() => {
                            alert('white win')
                            i=19;
                            j=18;
                            return 0;
                        }, 100)
                        break;
                    }
                }
            }
            if (dolCont.children[i + 0].children[j + 0].className == "button yes") {
                if (dolCont.children[i + 1].children[j + 1].className == "button yes") {
                    if (dolCont.children[i + 2].children[j + 2].className == "button yes") {
                        if (dolCont.children[i + 3].children[j + 3].className == "button yes") {
                            if (dolCont.children[i + 4].children[j + 4].className == "button yes") {
                                setTimeout(() => {
                                    alert('white win')
                                    i=19;
                                    j=18;
                                    return 0;
                                }, 100)
                                break;
                            }
                        }
                    }
                }
            }

            if (dolCont.children[i - 0].children[j + 0].className == "button yes") {
                if (dolCont.children[i - 1].children[j + 1].className == "button yes") {
                    if (dolCont.children[i - 2].children[j + 2].className == "button yes") {
                        if (dolCont.children[i - 3].children[j + 3].className == "button yes") {
                            if (dolCont.children[i - 4].children[j + 4].className == "button yes") {
                                setTimeout(() => {
                                    alert('white win')
                                    i=19;
                                    j=18;
                                    return 0;
                                }, 100)
                                break;
                            }
                        }
                    }
                }
            }
            if (dolCont.children[i + 0].children[j].className == "button yes") {
                if (dolCont.children[i + 1].children[j].className == "button yes") {
                    if (dolCont.children[i + 2].children[j].className == "button yes") {
                        if (dolCont.children[i + 3].children[j].className == "button yes") {
                            if (dolCont.children[i + 4].children[j].className == "button yes") {
                                setTimeout(() => {
                                    alert('white win')
                                    i=19;
                                    j=18;
                                    return 0;
                                }, 100)
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}
function blackWin(){ // 검돌이 이기는 경우
    for (i = 0; i < 19; i++) {
        for (j = 0; j < 18; j++) {
            if (dolCont.children[i].children[j].className == "button black" && dolCont.children[i].children[j + 1].className == "button black") {
                if (dolCont.children[i].children[j + 2].className == "button black" && dolCont.children[i].children[j + 3].className == "button black") {
                    if (dolCont.children[i].children[j + 4].className == "button black") {
                        setTimeout(() => {
                            alert('black win')
                            i=19;
                            j=18;
                        }, 100)
                        break;
                    }
                }
            }
            if (dolCont.children[i + 0].children[j + 0].className == "button black") {
                if (dolCont.children[i + 1].children[j + 1].className == "button black") {
                    if (dolCont.children[i + 2].children[j + 2].className == "button black") {
                        if (dolCont.children[i + 3].children[j + 3].className == "button black") {
                            if (dolCont.children[i + 4].children[j + 4].className == "button black") {
                                setTimeout(() => {
                                    alert('black win')
                                    i=19;
                                    j=18;
                                }, 100)
                                break;
                            }
                        }
                    }
                }
            }

            if (dolCont.children[i - 0].children[j + 0].className == "button black") {
                if (dolCont.children[i - 1].children[j + 1].className == "button black") {
                    if (dolCont.children[i - 2].children[j + 2].className == "button black") {
                        if (dolCont.children[i - 3].children[j + 3].className == "button black") {
                            if (dolCont.children[i - 4].children[j + 4].className == "button black") {
                                setTimeout(() => {
                                    alert('black win')
                                    i=19;
                                    j=18;
                                }, 100)
                                break;
                            }
                        }
                    }
                }
            }
            if (dolCont.children[i + 0].children[j].className == "button black") {
                if (dolCont.children[i + 1].children[j].className == "button black") {
                    if (dolCont.children[i + 2].children[j].className == "button black") {
                        if (dolCont.children[i + 3].children[j].className == "button black") {
                            if (dolCont.children[i + 4].children[j].className == "button black") {
                                setTimeout(() => {
                                    alert('black win')
                                    i=19;
                                    j=18;
                                }, 100)
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}

function horizonGard(y,x){ // 가로 3개일 때 방어
    let Y = y*1;
    let X = x*1;
        for(i=0;i<19;i++){
            for(j=0;j<18;j++){
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y].children[X - 1].className == "button yes")&&(dolCont.children[Y].children[X - 2].className == "button yes")){
                    return 1;
                } 
                else 
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y].children[X + 1].className == "button yes")&&(dolCont.children[Y].children[X + 2].className == "button yes")){
                    return 1;
                } 
                else
                if((dolCont.children[Y].children[X+1].className == "button yes" && dolCont.children[Y].children[X].className == "button yes")&&(dolCont.children[Y].children[X -1].className == "button yes")){
                    return 1;
                } 
            }
        }
}

function verticalGard(y,x){ // 세로 3개일 때 방어
    let Y = y*1;
    let X = x*1;
        for(i=0;i<19;i++){
            for(j=0;j<18;j++){
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y-1].children[X].className == "button yes")&&(dolCont.children[Y-2].children[X].className == "button yes")){
                    return 1;
                } 
                else 
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y+1].children[X].className == "button yes")&&(dolCont.children[Y+2].children[X].className == "button yes")){
                    return 1;
                } 
                else
                if((dolCont.children[Y+1].children[X].className == "button yes" && dolCont.children[Y].children[X].className == "button yes")&&(dolCont.children[Y-1].children[X].className == "button yes")){
                    return 1;
                } 
            }
        }
}

function diaUp(y,x){ // 대각선 위쪽으로 3개일 때
    let Y = y*1;
    let X = x*1;
        for(i=0;i<19;i++){
            for(j=0;j<18;j++){
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y-1].children[X-1].className == "button yes")&&(dolCont.children[Y-2].children[X-2].className == "button yes")){
                    return 1;
                } 
                else 
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y+1].children[X-1].className == "button yes")&&(dolCont.children[Y+2].children[X-2].className == "button yes")){
                    return 1;
                } 
                else
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y+1].children[X+1].className == "button yes")&&(dolCont.children[Y+2].children[X+2].className == "button yes")){
                    return 1;
                } 
                else 
                if((dolCont.children[Y].children[X].className == "button yes" && dolCont.children[Y-1].children[X+1].className == "button yes")&&(dolCont.children[Y-2].children[X+2].className == "button yes")){
                    return 1;
                } 
            }
        }
}

function blackSuccess(y,x){
    let Y = y*1;
    let X = x*1;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            // 대각선 3개
            console.log();
            if (dolCont.children[i].children[j].className == "button black") {
                if(dolCont.children[i+1].children[j - 1].className == "button black"){
                    if(dolCont.children[i+2].children[j - 2].className == "button black"){
                        if(dolCont.children[i+3].children[j - 3].className == "button black"){
                            if(dolCont.children[i-1].children[j + 1].className != "button black" && dolCont.children[i-1].children[j + 1].className != "button yes"){
                                console.log('대각선 4개')
                                colorBlack(i-1,j+1)
                                return 1;
                            }
                        }
                        if(dolCont.children[i-1].children[j + 1].className != "button black" && dolCont.children[i-1].children[j + 1].className != "button yes"){
                            console.log('대각선 3개')
                            colorBlack(i-1,j+1)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

function blackUp(y,x){ // 검은 돌 공격
    let Y = y*1;
    let X = x*1;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
                         // 처음
                         if(fBlack == 0){
                             console.log('sdf')
                            colorBlack(Y+1,X+1)
                            fBlack = 1;
                            return 0;
                        }
                        //대각선 3개
                        if (dolCont.children[i].children[j].className == "button black") {
                            if(dolCont.children[i+1].children[j - 1].className == "button black"){
                                if(dolCont.children[i+2].children[j - 2].className == "button black"){
                                    if(dolCont.children[i-1].children[j + 1].className != "button black" && dolCont.children[i-1].children[j + 1].className != "button yes"){
                                        console.log('대각선 3개')
                                        colorBlack(i-1,j+1)
                                        return 1;
                                    }
                                }
                            }
                        }
                // 가로 4개로 만들기
                console.log();
                if (dolCont.children[i].children[j].className == "button black") {
                    if(dolCont.children[i-1].children[j + 1].className == "button black" && dolCont.children[i-1].children[j + 1].className == "button black"){
                        if(dolCont.children[i-2].children[j + 2].className == "button black" && dolCont.children[i-2].children[j + 2].className == "button black"){
                            if(dolCont.children[i-3].children[j + 3].className == "button black" && dolCont.children[i-3].children[j + 3].className == "button black"){
                                colorBlack(i-3,j+3)
                            }
                        }
                    }
                    if (dolCont.children[i].children[j + 1].className != "button black" && dolCont.children[i].children[j + 1].className != "button yes") {
                        colorBlack(i, j + 1)
                        console.log('가로 1개')
                        return 0;
                    }
                    else if (dolCont.children[i].children[j - 1].className != "button black" && dolCont.children[i].children[j - 1].className != "button yes") {
                        colorBlack(i, j - 1)
                        console.log('가로 1개')
                        return 0;
                    }
                }
                //가로 3개로 만들기
                console.log()
                if ((dolCont.children[i].children[j].className == "button black"&&dolCont.children[i].children[j+1].className == "button black")&&(dolCont.children[i].children[j+2].className != "button black"&&dolCont.children[i].children[j+2].className != "button yes")){
                    check(i,j+2)
                    colorBlack(i,j+2)
                    console.log('가로 2개')
                    return 0;
                }
             //  대각선 2개
                console.log()
                if(dolCont.children[i].children[j].className == "button black"&&(dolCont.children[i-1].children[j+1].className != "button black" &&dolCont.children[i-1].children[j+1].className != "button yes" )){
                    console.log('대각선 1개')
                    colorBlack(i-1,j+1)
                    return 0;
                }
        }
    }
} 

function diagard(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(dolCont.children[i].children[j].className == "button yes"){
                console.log(dolCont.children[i].children[j])
                if(dolCont.children[i+1].children[j-1].className == "button yes" && dolCont.children[i+2].children[j-2].className == "button yes"){     
                    if(dolCont.children[i-1].children[j+1].className != "button yes" && dolCont.children[i-1].children[j+1].className != "button black"){
                        colorBlack(i-1,j+1);
                        return 1;
                    }                
                }
               if(dolCont.children[i+1].children[j+1].className == "button yes" && dolCont.children[i+2].children[j+2].className == "button yes"){
                    if(dolCont.children[i-1].children[j-1].className != "button yes" && dolCont.children[i-1].children[j-1].className != "button black"){
                        colorBlack(i-1,j-1);
                        return 1;
                    }                
                } 
            }
        }
    }
}

function blackAttack(e, b){
    let a = b*1;
    let k = e*1;
    setTimeout(()=>{
        if(diagard()){ // 대각선 검사
            return 0;
        }
        if(blackSuccess(e,b)){ // 검은 돌이 이기는 경우
            return 0;
        }
        else if(horizonGard(e,b)){ // 가로 3개
            if(dolCont.children[e].children[a+1].className != "button yes"){
                colorBlack(e, a+1)
            }else if(dolCont.children[e].children[a-3].className != "button yes"){
                if(dolCont.children[e].children[a-1].className != "button yes"){
                    colorBlack(e, a-1)
                }
                else if(dolCont.children[e].children[a-2].className != "button yes"){
                    colorBlack(e, a-2)
                }
                else if(dolCont.children[e].children[a-1].className != "button yes"){
                    colorBlack(e,a-3)
                }
                else if(dolCont.children[e].children[a+2].className != "button yes"){
                    colorBlack(e,a+2)
                }
            }
        }


        else if(verticalGard(e,b)){ // 세로 3개
            if(dolCont.children[k+1].children[b].className != "button yes"){
                colorBlack(k+1, b)
            }else if(dolCont.children[k-3].children[b].className != "button yes"){
                if(dolCont.children[k-1].children[b].className != "button yes"){
                    colorBlack(k-1,b)
                }
                else if(dolCont.children[k-2].children[b].className != "button yes"){
                    colorBlack(k-2, b)
                }
                else if(dolCont.children[k-1].children[b].className != "button yes"){
                    colorBlack(k-1,b)
                }
                else if(dolCont.children[k+2].children[b].className != "button yes"){
                    colorBlack(k+2,b)
                }
            }
        }

        else if(diaUp(e,b)){ // 대각선 3개
            if((dolCont.children[k+1].children[a+1].className != "button yes" && dolCont.children[k-1].children[a-1].className == "button yes")&&dolCont.children[k-2].children[a-2].className == "button yes"){
                colorBlack(k+1, a+1)
            }
            else
            if(dolCont.children[k-1].children[a+1].className != "button yes" && dolCont.children[k+1].children[a-1].className == "button yes"){
                colorBlack(k-1, a+1)
            }
            else 
            if(dolCont.children[k+1].children[a-1].className != "button yes" && dolCont.children[k-1].children[a+1].className == "button yes"){
                colorBlack(k+1, a-1)
            }
            else
            if(dolCont.children[k-1].children[a-1].className != "button yes"){
                colorBlack(k-1, a-1)
            }
        }

        else {
            blackUp(e,b);
        }
    },10)
}