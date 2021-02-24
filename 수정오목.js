let dolCont = document.getElementById('dolContainer');
let say = document.getElementById('say');
let winCont = document.getElementById('winCont')
let result = document.getElementById('result')
let closeButton = document.getElementById('close')
let i,j;
let min=100;
let curY, curX;
let ai = 0;
let human = 0;
const test = Array.from(Array(19), () => new Array(18))
let num, num2;

closeButton.addEventListener('click',function(){
    winCont.style.display = "none"
})

// 상대방의 체크 이벤트
for(i=0;i<19;i++){
    for(j=0;j<18;j++){
        dolCont.children[i].children[j].onclick=(e)=>{
            if(event.target.className == "button yes" || event.target.className == "button black"){
                alert('중복된 곳에 놓을 수 없습니다.')
                return 0;
            }
            if((event.target.parentNode.id == 0 || event.target.parentNode.id == 18)||(event.target.id==0||event.target.id==17)){
                alert('끝에 둘 수 없습니다.')
                return 0;
            } 
            check(event.target.parentNode.id,event.target.id)    
            setTimeout(()=>{
                if(whiteWin()){
                    console.log('백 승')
                    result.innerHTML = "YOU LOSE..."
                    winCont.style.display = "flex"
                    ai++;
                    window.localStorage.setItem('ai', ai)
                    return 0;
                }else if(blackWin()){
                    result.innerHTML = "YOU WIN!!!"
                    winCont.style.display = "flex"
                    human++;
                    window.localStorage.setItem('human', human)
                    return 0;
                }
            },100)                 
        }
    }
}

function percent(e,b){
    return (e / e+b) * 100; 
}

// 배열 초기화
window.onload = function(){
    console.log(percent())
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            test[i][j] = 0;
        }
    }    
}
// 검은 돌  색상
function black(e, b){
    dolCont.children[e].children[b].style.opacity = "1"
    dolCont.children[e].children[b].style.background = "radial-gradient(black,rgb(61, 61, 61))"
    dolCont.children[e].children[b].addEventListener('mouseover',function(){
        dolCont.children[e].children[b].style.opacity = "1";
    })
    dolCont.children[e].children[b].className = "button yes"
}
// 흰 돌 색상
function white(e, b){
    test[e][b] = 300;
    console.log(dolCont.children[e].children[b])
    dolCont.children[e].children[b].className = "button black"
    dolCont.children[e].children[b].addEventListener('mouseover',function(){
        dolCont.children[e].children[b].style.opacity = "1";
    })
    dolCont.children[e].children[b].style.background = "radial-gradient(white,whitesmoke,rgb(221, 221, 221))"
/*     checkWhite(e,b); */
}
// 흰 돌 둔 곳 가중치 1 부여
 function checkWhite(y,x){
    let Y = y*1;
    let X = x*1;
    for(let num=0;num<3;num++){
        for(let num2=0;num2<3;num2++){
            test[Y+num-1][X+num2] += -1;
        }
    }
} 
// 검은 돌 둔 곳을 -1 가중치 부여
function check(y,x){
    let Y = y*1;
    let X = x*1;
    for(let num=0;num<3;num++){
        for(let num2=0;num2<3;num2++){
            test[Y+num-1][X+num2] += -1;
        }
    } 
    black(Y,X);
    setTimeout(()=>{
        blackUp(Y,X)
   },19) 
} 
// 검은돌 공격
function blackUp(e,b){
    let max = 0;
    let min = 50;
    test[e][b] = 100;
        // 가장 마지막 수
        if(sucessDolHorizon()){ // 최후의 수
            console.log('최후')
            say.innerHTML = "마지막 수입니다."
            return 0;
        }
    if(diaJustOneNo()){
        return 0;
    }
    if(diaUnderJustOneNo()){
        return 0;
    }
    if(horJustOneNo()){
        console.log('가로 채우고 이김 ㅅㄱ')
        return 0;
    }
    // 지기 한수 전부터 다 막기
    if(diagardUpFull()){
        console.log('대각선 위쪽으로 급함')
        say.innerHTML = "이번에도 질 뻔 했어요."
        return 0;   
    }
    if(verNoOne()){
        console.log('세로 5개 하나 전')
        say.innerHTML = "질뻔 했네요."
        return 0;
    }
    if(diagardUpFull()){
        console.log('대각선 위쪽으로 급함')
        say.innerHTML = "이번에도 질 뻔 했어요."
        return 0;   
    }
    // 다시 막아야 하는 수들
    if(diaUpNoOne3()){
        console.log('대각선 위로 하나 빔 2')
        say.innerHTML = "대각선은 줄 수 없습니다."
        return 0;
    }
    if(diaUpNoOne2()){
        console.log('대각선 위로 하나 빔');
        say.innerHTML = "힘들게 두시는군요."
        return 0;
    }
    if(diaUnderNoOne()){
        console.log('대각선 아래로 하나 빔')
        say.innerHTML = "꽤나 하시는군요."
        return 0;
    }
    if(fullHorizon2()){
        console.log('가로 4개 연속')
        say.innerHTML = "당할 뻔 했네요."
        return 0;
    }
    if(fullHorizon()){
        console.log('가로 4개 막음');
        say.innerHTML = "휴우."
        return 0;
    }
    if(diaUpDanger()){
        console.log('대각선 위에 하나 빔')
        say.innerHTML = "잘하시는군요"
        return 0;
    }
    if(diaCenNoOne()){
        console.log('대각선 정확히 중간 하나 빔')
        say.innerHTML = "머리를 쓰시는군요."
        return 0;
    }
    if(verCenNoOne()){
        console.log('세로 정확히 중간 하나 빔')
        say.innerHTML = "좋습니다."
        return 0;
    }
    if(verNoOne()){
        console.log('세로 5개 하나 전')
        say.innerHTML = "질뻔 했네요."
        return 0;
    }
    // 여기서부터 공격 수
    console.log('여기부터')
    if(horizonNoOneSuccess()){
        console.log('가로 한칸 빈거 채우고 이기는 수')
        return 0;
    }
    if(diaUpNoOneSuccess()){
        console.log('대각선 위로 한칸 빈거 채우고 이기는 수')
        return 0;
    }
    if(diaUnderNoOneSuccess()){
        console.log('대각선 아래로 한칸 빈 거 채우고 이기는 수')
    }
        if(whiteGod()){
            console.log('가로 신의한수')
            say.innerHTML = "신의 한수."
            white(i,j-1);
            return 0;
        }
        if(diaUpSuccess()){
            say.innerHTML = "ㅎㅎㅎ"
            return 0;
        }
        if(diaUnderSuccess()){
            say.innerHTML = "ㅎㅎㅎ"
            return 0;
        }
        // 여기가 최 우선순위
        if(diaUnderGod()){
            say.innerHTML = "신의 한수다."
            return 0;
        }
        if(diaUpGod()){
            say.innerHTML = "이것도 막아보던가"
            return 0;
        }
        if(diaDanger()){
            console.log('대각선 위로 중간에 빔')
            say.innerHTML = "대각선으로 이기려고?"
            return 0;
        }
        if(diagardFull()){
            say.innerHTML = "대각선 안 줄건데"
            console.log('대각선 급함');
            return 0;
        }
        if(verFull()){
            say.innerHTML = "세로로 이기려구?"
            console.log('세로 급함')
            return 0;
        }
    if(horizonGard(e,b)){ // 가로 3개
        say.innerHTML = "가로는 막기 제일 쉬워"
        console.log('가로 체크')
        return 0;
    }
    // 세로 3개
    if(verticalGard(e,b)){
        say.innerHTML = "세로도 막기 쉬워"
        console.log('세로 방어');
        return 0;
    }
     // 대각선 위쪽으로 3개이면
    if(diaUp(e,b)){
        say.innerHTML = "대각선으로 이길건가"
        console.log('대각선 방어')
        return 0;
    }
    // 대각선 3개이면
    if(diagard()){
        say.innerHTML = "대각선을 좋아하는군"
        console.log('대각선 위 3개')
        return 0;
    }
    // 혹시 모를 경우
    if(oneNoVer()){
        say.innerHTML = "막아줄겡"
        console.log('세로 하나 빔')
        return 0;
    }
    if(oneNo()){
        say.innerHTML = "ㅎㅎㅎ"
        console.log('가로 하나 빔')
        return 0;
    }
    if(oneNoDiaUp()){
        say.innerHTML = "막았다~"
        console.log('대긱선 하나 빔')
        return 0;
    }
    if(oneNoDiaUnder()){
        say.innerHTML = "대각선 막았으"
        console.log('대각선 아래로 하나 빔')
        return 0;
    }
    if(square()){
        say.innerHTML = "머리를 꽤 쓰네"
        console.log('사각형 중앙')
        return 0;
    }
    if(blackHor()){
        say.innerHTML = "ㅎㅎㅎ"
        console.log('가로 공격')
        return 0;
    }
    if(blackDiaUp()){
        say.innerHTML = "ㅎㅎㅎ"
        console.log('대각선 위 공격')
        return 0;
    }
    if(blackDiaDown()){

        console.log('대각선 아래 공격')
        return 0;
    }
    if(blackVer()){
        console.log('아래로 공격')
        say.innerHTML = "ㅎㅎㅎ"
        return 0;
    }
    // 3개가 안 걸리면
   /*  if(bestDol()){
        console.log('최선')
        say.innerHTML = "흐헤헿"
        return 0;
    }
    if(bestDolDia()){
        console.log('대각선 아래 최선');
        say.innerHTML = "꽤 하는데?"
        return 0;
    }
    if(bestDolDiaUp()){
        console.log('대각선 위 최선')
        say.innerHTML = "히히헤헤꼴꼴"
        return 0;
    } */
    else
    console.log('가중치에 따라')
    say.innerHTML = "난 여기에 둘게"
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j] > max){
                max = test[i][j]
            }
            if(test[i][j] < min){            // 최소값 설정
                min = test[i][j];
                curY = i;
                curX = j;
            }
        }
    }
    white(curY,curX);
}

// 대각선 위쪽으로 3개일 때 방어
function diaUp(y,x){
        for(i=0;i<19;i++){
            for(j=0;j<18;j++){
                if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j-1] > 90 && test[i+1][j-1] < 200) ){
                    if(test[i+2][j-2] > 90 && test[i+2][j-2] < 200){
                        if(test[i-1][j+1] < 90 && test[i+3][j-3]<90){
                            white(i+3,j-3)
                            return 1;
                        }
                    }
                }
            }
        }
}

// 가로 3개일 때 방어
function horizonGard(y,x){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i][j+1] > 90 && test[i][j+1] < 200) ){
                if(test[i][j+2] > 90 && test[i][j+2] < 200){
                    if(test[i][j-1] < 90 && test[i][j+3]<90){
                        white(i,j+3)
                        return 1;
                    }
                }
            }
        }
    }
}

// 대각선 3개일 때 방어
function diagard(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j+1] > 90 && test[i+1][j+1] < 200) ){
                if(test[i+2][j+2] > 90 && test[i+2][j+2] < 200){
                    if(test[i-1][j-1] < 90 && test[i-3][j-3]<90){
                        white(i-1,j-1)
                        return 1;
                    }
                }
            }
        }
    }
}

// 대각선 4개일 때 방어
function diagardFull(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j+1] > 90 && test[i+1][j+1] < 200) ){
                if(test[i+2][j+2] > 90 && test[i+2][j+2] < 200){
                    if(test[i+3][j+3] > 90 && test[i+3][j+3] < 200){
                        if(test[i-1][j-1] < 90){
                            white(i-1,j-1)
                            return 1;
                        }
                        if(test[i+4][j+4] < 90 && test[i-3][j-3]<90){
                            white(i+4,j+4)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}
function diagardUpFull(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j-1] > 90 && test[i+1][j-1] < 200) ){
                if(test[i+2][j-2] > 90 && test[i+2][j-2] < 200){
                    if(test[i+3][j-3] > 90 && test[i+3][j-3] < 200){
                        if(test[i-1][j+1] < 90){
                            white(i-1,j+1)
                            return 1;
                        }
                        if(test[i+4][j-4] < 90 && test[i-3][j-3]<90){
                            white(i+4,j-4)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

function verticalGard(y,x){ // 세로 3개일 때 방어
        for(i=0;i<19;i++){
            for(j=0;j<18;j++){
                if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j] > 90 && test[i+1][j] < 200) ){
                    if(test[i+2][j] > 90 && test[i+2][j] < 200){
                        if(test[i-1][j] < 90 && test[i+3][j]<90){
                            white(i-1,j)
                            return 1;
                        }
                    }
                }
            }
        }
}

function verFull(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j] > 90 && test[i+1][j] < 200) ){
                if(test[i+2][j] > 90 && test[i+2][j] < 200&&(test[i+3][j] > 90 && test[i+3][j] < 200)){
                    if(test[i-1][j] < 90){
                        white(i-1,j)
                        return 1;
                    }
                    if(test[i+4][j] < 90){
                        white(i+4,j)
                        return 1;
                    }
                }
            }
        }
    }
}




function whiteWin(){ // 흰돌이 이기는 경우
    for (i = 0; i < 19; i++) {
        for (j = 0; j < 18; j++) {
            if (dolCont.children[i].children[j].className == "button yes" && dolCont.children[i].children[j + 1].className == "button yes") {
                if (dolCont.children[i].children[j + 2].className == "button yes" && dolCont.children[i].children[j + 3].className == "button yes") {
                    if (dolCont.children[i].children[j + 4].className == "button yes") {
                        setTimeout(() => {
                            result.innerHTML = "YOU WIN!!!"
                            winCont.style.display = "flex"
                            i=19;
                            j=18;
                            return 1;
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
                                    result.innerHTML = "YOU WIN!!!"
                                    winCont.style.display = "flex"
                                    i=19;
                                    j=18;
                                    return 1;
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
                                    result.innerHTML = "YOU WIN!!!"
                                    winCont.style.display = "flex"
                                    i=19;
                                    j=18;
                                    return 1;
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
                                    result.innerHTML = "YOU WIN!!!"
                                    winCont.style.display = "flex"
                                    i=19;
                                    j=18;
                                    return 1;
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
                            console.log('백 승')
                            result.innerHTML = "YOU LOSE..."
                            winCont.style.display = "flex"
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
                                    console.log('백 승')
                                    result.innerHTML = "YOU LOSE..."
                                    winCont.style.display = "flex"
                                    i=19;
                                    j=18;
                                    return 1;
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
                                    console.log('백 승')
                                    result.innerHTML = "YOU LOSE..."
                                    winCont.style.display = "flex"
                                    i=19;
                                    j=18;
                                    return 1;
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
                                    console.log('백 승')
                                    result.innerHTML = "YOU LOSE..."
                                    winCont.style.display = "flex"
                                    i=19;
                                    j=18;
                                    return 1;
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

function sucessDolHorizon(){
// 
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i][j+1]>200){
                    if(test[i][j+2]>200){    
                        if(test[i][j+3]>200){
                            if(test[i][j-1] < 90){
                                console.log('이기는 수')
                                white(i,j-1)
                                return 1;
                            }
                            if(test[i][j+4]<90){
                                console.log('이기는 수')
                                white(i,j+4)
                                return 1;
                            }
                        }
                    }
                }
            }
        }
    }
//대각선
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i+1][j-1]>200){
                    if(test[i+2][j-2]>200){
                        if(test[i+3][j-3]>200){    
                            if(test[i-1][j+1] < 90){
                                console.log('이기는 수')
                                white(i-1,j+1)
                                return 1;
                            }else
                            if(test[i+4][j-4] < 90){
                                console.log('이기는 수')
                                white(i+4,j-4)
                                return 1;
                            }
                        }
                    }
                }
            }
        }
    }
// 대각선
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i+1][j+1]>200){
                    if(test[i+2][j+2]>200){
                        if(test[i+3][j+3]>200){    
                            if(test[i-1][j-1] < 90){
                                console.log('이기는 수')
                                white(i-1,j-1)
                                return 1;
                            }else
                            if(test[i+4][j+4] < 90){
                                console.log('이기는 수')
                                white(i+4,j+4)
                                return 1;
                            }
                        }
                    }
                }
            }
        }
    }

    
}

function whiteGod(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i][j+1]>200){
                    if(test[i][j+2]>200){   
                        if(test[i][j-1] < 90 && test[i][j+3] < 90){
                            return 1;
                        } 
                    }
                }
            }
    }
}
}

function diaUnderGod(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i+1][j+1]>200){
                    if(test[i+2][j+2]>200){  
                        if(test[i-1][j-1] < 90 && test[i+3][j+3] < 90){
                            console.log('대각선 신의 한수')
                            white(i-1, j-1)  
                            return 1;
                        }
                    }
                }
            }
    }
}   
}

function diaUnderSuccess(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i+1][j+1]>200){
                    if(test[i+2][j+2]>200){  
                        if(test[i+3][j+3] > 200){
                            if(test[i-1][j-1]<90){
                                console.log('대각선 이김')
                                white(i-1, j-1)  
                                return 1;
                            }
                            else if(test[i+4][j+4]<90){
                                console.log('대각선 이김')
                                white(i+4, j+4)  
                                return 1;
                            }
                        }
                    }
                }
            }
    }
} 
}

function diaUpGod(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i+1][j-1]>200){
                    if(test[i+2][j-2]>200){  
                        if(test[i-1][j+1] < 90 && test[i+3][j-3] < 90){
                            console.log('대각선 위에로 신의 한수')
                            white(i-1, j+1)  
                            return 1;
                        }
                    }
                }
            }
    }
}   
}

function diaUpSuccess(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i+1][j-1]>200){
                    if(test[i+2][j-2]>200){  
                        if(test[i+3][j-3] > 200){
                            if(test[i-1][j+1]<90){
                                console.log('대각선 이김')
                                white(i-1, j+1)  
                                return 1;
                            }
                            else if(test[i+4][j-4]<90){
                                console.log('대각선 이김')
                                white(i+4, j-4)  
                                return 1;
                            }
                        }
                    }
                }
            }
    }
} 
}

function oneNo(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200)&&(test[i][j+1] > 90 && test[i][j+1] < 200)){
                if((test[i][j+3] > 90 && test[i][j+3] < 200)||(test[i][j-2] > 90 && test[i][j-2] < 200)){
                    if(test[i][j-1] < 90){
                        white(i,j-1);
                        return 1;
                    }else
                    if(test[i][j+2] < 90){
                        white(i,j+2)
                        return 1;
                    }
                }
            }
        }
    }
}

function oneNoDiaUp(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200)&&(test[i-1][j+1] > 90 && test[i-1][j+1] < 200)){
                if(test[i-3][j+3] > 90 && test[i-3][j+3] < 200 || test[i+3][j-3] > 90 && test[i+3][j-3] < 200){
                    if(test[i-2][j+2] < 90){
                        white(i-2,j+2);
                        return 1;
                    }else
                    if(test[i+1][j-1] < 90){
                        white(i+1,j-1)
                        return 1;
                    }
                }
            }
        }
    }
}

function oneNoDiaUnder(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200)&&(test[i+1][j+1] > 90 && test[i+1][j+1] < 200)){
                if(test[i+3][j+3] > 90 && test[i+3][j+3] < 200 || test[i-2][j-2] > 90 && test[i-2][j-2] < 200){
                    if(test[i+2][j+2] < 90){
                        white(i+2,j+2);
                        return 1;
                    }else
                    if(test[i-1][j-1] < 90){
                        white(i-1,j-1)
                        return 1;
                    }
                }
            }
        }
    }
}

function oneNoVer(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j] > 90 && test[i+1][j] < 200) ){
                if((test[i-2][j] > 90 && test[i-2][j] < 200) || (test[i+3][j] > 90 && test[i+3][j] < 200) ){
                    if(test[i-1][j] < 90 && test[i+2][j] < 90){
                        console.log('세로 방지')
                        white(i+2,j)
                        return 1;
                    }
                }
            }
        }
    }
}

function blackHor(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j] > 200 && test[i][j+1] > 200){
                if(test[i][j-1] < 90 && test[i][j+2] < 90){
                    white(i,j-1);
                    return 1;
                }
            }
        }
    }
}

function blackDiaUp(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j] > 200 && test[i+1][j-1] > 200){
                if(test[i+2][j-2] < 90 && test[i-1][j+1] < 90){
                    white(i+2,j-2)
                    return 1;
                }
            }
        }
    }
}

function blackDiaDown(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j] > 200 && test[i+1][j+1] > 200){
                if(test[i-1][j-1] < 90 && test[i+2][j+2] < 90){
                    white(i+2,j+2)
                    return 1;
                }
            }
        }
    }
}

function blackVer(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j] > 200 && test[i+1][j] > 200){
                if(test[i+2][j] < 90 && test[i-1][j] < 90){
                    white(i+2,j)
                    return 1;
                }
            }
        }
    }
}

function diaDanger(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j-1] > 90 && test[i+1][j-1] < 200) ){
                if(test[i+3][j-3] > 90 && test[i+3][j-3] < 200){
                    if(test[i+2][j-2] < 90 && test[i-1][j+1]<90){
                        if(test[i+4][j-4]<90){
                            white(i+2,j-2)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

function diaUpDanger(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+2][j-2] > 90 && test[i+2][j-2] < 200) ){
                if(test[i+3][j-3] > 90 && test[i+3][j-3] < 200){
                    if(test[i+1][j-1] < 90 && test[i-1][j+1]<90){
                        if(test[i+4][j-4]<90){
                            white(i+1,j-1)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

function verNoOne(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j] > 90 && test[i+1][j] < 200) ){
                if(test[i+2][j] > 90 && test[i+2][j] < 200){
                    if(test[i+4][j] > 90 && test[i+4][j]<200){
                        if(test[i+3][j]<90){
                            white(i+3,j)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

function verCenNoOne(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j] > 90 && test[i+1][j] < 200) ){
                if(test[i+3][j] > 90 && test[i+3][j] < 200){
                        if(test[i+2][j]<90){
                            white(i+2,j)
                            return 1;
                        }
                    }
                }
            }
        }
    }


function diaCenNoOne(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j+1] > 90 && test[i+1][j+1] < 200) ){
                if(test[i+3][j+3] > 90 && test[i+3][j+3] < 200){
                    if(test[i+4][j+4] > 90 && test[i+4][j+4]<200){
                        if(test[i+2][j+2]<90){
                            white(i+2,j+2)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}
function diaUnderNoOne(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j+1] > 90 && test[i+1][j+1] < 200) ){
                if(test[i+2][j+2] > 90 && test[i+2][j+2] < 200){
                    if(test[i+4][j+4] > 90 && test[i+4][j+4]<200){
                        if(test[i+3][j+3]<90){
                            white(i+3,j+3)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}
function diaUpNoOne2(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+2][j-2] > 90 && test[i+2][j-2] < 200) ){
                if(test[i+3][j-3] > 90 && test[i+3][j-3] < 200){
                    if(test[i+4][j-4] > 90 && test[i+4][j-4]<200){
                        if(test[i+1][j-1]<90){
                            white(i+1,j-1)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

function diaUpNoOne3(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i+1][j-1] > 90 && test[i+1][j-1] < 200) ){
                if(test[i+3][j-3] > 90 && test[i+3][j-3] < 200){
                    if(test[i+4][j-4] > 90 && test[i+4][j-4]<200){
                        if(test[i+2][j-2]<90){
                            white(i+2,j-2)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}




function fullHorizon(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i][j+1] > 90 && test[i][j+1] < 200) ){
                if(test[i][j+3] > 90 && test[i][j+3] < 200){
                    if(test[i][j+4] > 90 && test[i][j+4]<200){
                        if(test[i][j+2]<90){
                            white(i,j+2)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}
function fullHorizon2(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if((test[i][j] > 90 && test[i][j] < 200) &&(test[i][j+1] > 90 && test[i][j+1] < 200) ){
                if(test[i][j+2] > 90 && test[i][j+2] < 200){
                    if(test[i][j+3] > 90 && test[i][j+3]<200){
                        if(test[i][j-1]<90){
                            white(i,j-1)
                            return 1;
                        }
                        else
                        if(test[i][j+4]<90){
                            white(i,j+4)
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

function bestDol(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>90&&test[i][j]<200){
                if(test[i][j+1]>90&&test[i][j+1]<200){
                    if(test[i][j-1]<90){
                        white(i,j-1)
                        return 1;
                    }
                    else
                    if(test[i][j+2]<90){
                        white(i,j+2)
                        return 1;
                    }
                }
            }
        }
    }
}

function bestDolDia(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>90&&test[i][j]<200){
                if(test[i+1][j+1]>90&&test[i+1][j+1]<200){
                    if(test[i-1][j-1]<90){
                        white(i-1,j-1)
                        return 1;   
                    }
                    else
                    if(test[i+2][j+2]<90){
                        white(i+2,j+2)
                        return 1;
                    }
                }
            }
        }
    }
}

function bestDolDiaUp(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>90&&test[i][j]<200){
                if(test[i+1][j-1]>90&&test[i+1][j-1]<200){
                    if(test[i-1][j+1]<90){
                        white(i-1,j+1)
                        return 1;
                    }
                    else
                    if(test[i+2][j-2]<90){
                        white(i+2,j-2)
                        return 1;
                    }
                }
            }
        }
    }
}

function square(){
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>90&&test[i][j]<200){
                if(test[i+2][j]>90&&test[i+2][j]<200){
                    if(test[i+1][j-1]>90&&test[i+1][j-1]<200){
                        if(test[i+1][j+1]>90&&test[i+1][j+1]<200){
                            if(test[i+1][j] < 90){
                                white(i+1,j)
                                return 1;
                            }
                        }
                    }
                }
            }
        }
    }
}

function horizonNoOneSuccess(){
    console.log('호출')
    let d = 0;
    let inX;
    let inY;
    let winNum=0;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                console.log(i,j)
                if(test[i][j+3]>200){ // -o-oo-
                    if(test[i][j-1] < 90 && test[i][j+4]<90){ // 양 끝 비었는지 확인
                        for(d=1; d<3;d++){
                            if(test[i][j+d]>200){
                                winNum++;
                                console.log(i,j+d)
                                console.log(winNum)
                            }
                            if(test[i][j+d]<90){
                                inY = i;
                                inX = j+d;
                                if(winNum == 1){
                                    if(inX!=0){
                                        white(inY,inX)
                                        return 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            inY=0;
            inX=0;
            winNum = 0;
        }
    }
}

function diaUpNoOneSuccess(){
    let winNum = 0;
    let inX = 0;
    let inY = 0;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){ // 만약 제일 처음 흰색
                if(test[i+3][j-3]>200){ // 만약 제일 끝도 흰색
                    if(test[i-1][j+1]<90 && test[i+4][j-4]<90){  // 양 옆이 둘 다 비었을 때
                        for(let d=1;d<3;d++){
                            if(test[i+d][j-d] > 200){
                                winNum++;
                            }
                            if(test[i+d][j-d]<90){
                                inY = i+d;
                                inX = i-d;
                                if(winNum == 1){
                                    if(inX!=0){
                                        white(inY,inX)
                                        return 1;
                                    }
                                }
                            }
                        }
                    }
                    inY=0;
                    inX=0;
                    winNum = 0;
                }
            }
        }
    }
}

function diaUnderNoOneSuccess(){
    let winNum = 0;
    let inX = 0;
    let inY = 0;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                if(test[i+3][j+3]>200){
                    if(test[i-1][j-1]<90 && test[i+4][j+4]<90){
                        for(let d=1;d<3;d++){
                            if(test[i+d][j+d] > 200){
                                winNum++;
                            }
                            if(test[i+d][j+d]<90){
                                inY = i+d;
                                inX = i-d;
                                if(winNum == 1){
                                    if(inX!=0){
                                        white(inY,inX)
                                        return 1;
                                    }
                                }
                            }
                        }
                    }
                    inY=0;
                    inX=0;
                    winNum = 0;
                }
            }
        }
    }
}


function horJustOneNo(){
    let d = 0;
    let inX=0, inY=0;
    let winNum=0;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){
                for(d=1;d<5;d++){
                    if(test[i][j+d]>200){
                        console.log(i,j+d)
                        winNum++;
                    }
                    if(test[i][j+d]<90){
                        inY = i; inX = j+d;
                    }
                    if(winNum == 3){
                        if(inX!=0){
                            white(inY,inX)
                            return 1;
                        }
                    }
                }
                inY=0;
                inX=0;
                winNum = 0;
            }
        }
    }
}

function diaJustOneNo(){
    let d = 0;
    let inX;
    let inY;
    let winNum=0;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){ // 대각선 끝에가 0
                if(test[i+4][j-4]>200){
                    for(d=1;d<4;d++){
                        if(test[i+d][j-d]>200){
                            winNum++;
                        }
                        if(test[i+d][j-d]<90){
                            inY = i+d;
                            inX = j-d;
                        }
                        if(winNum == 2){
                            if(inX!=0){
                                console.log('대각선 위로 하나 빈거 채우고 이기는 수')
                                white(inY,inX)
                                return 1;
                            }
                        }
                    }
                    inY=0;
                    inX=0;
                    winNum = 0;
                }
            }
        }
    }
}

function diaUnderJustOneNo(){
    let d = 0;
    let inX;
    let inY;
    let winNum=0;
    for(i=0;i<19;i++){
        for(j=0;j<18;j++){
            if(test[i][j]>200){ // 대각선 끝에가 0
                if(test[i+4][j+4]>200){
                    for(d=1;d<4;d++){
                        if(test[i+d][j+d]>200){
                            winNum++;
                        }
                        if(test[i+d][j+d]<90){
                            inY = i+d;
                            inX = j+d;
                        }
                        if(winNum == 2){
                            if(inX!=0){
                                console.log('대각선 아래로 하나 빈거 채우고 이기는 수')
                                white(inY,inX)
                                return 1;
                            }
                        }
                    }
                    winNum = 0;
                }
            }
        }
    }
}