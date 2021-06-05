const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0];
//['ESTP', 'ESTJ', 'ESFP', 'ESFJ', 'ENTP', 'ENTJ', 'ENFP', 'ENFJ', 'ISTP', 'ISTJ', 'ISFP', 'ISFJ', 'INTP', 'INTJ', 'INFP', 'INFJ'];

function calcResult() {
    console.log(select);

    var result = 0
    if (select[1] > select[0]) { //I
        result = 8
    }
    if (select[3] > select[2]) { //N
        result += 4
    }
    if (select[5] > select[4]) { //F
        result += 2
    }
    if (select[7] > select[6]) { //J
        result += 1
    }

    return result;
}

function setResult() {
    let point = calcResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = '../image/mbti/image-' + point + '.jpg';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');

    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 0.5s";
    qna.style.animation = "fadeOut 0.5s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 0.5s";
        result.style.animation = "fadeIn 0.5s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 200)
    });

    setResult();
}

function addAnswer(answerText, qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener("click", function() {
        var children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            main.style.WebkitAnimation = "fadeOut 0.3s";
            main.style.animation = "fadeOut 0.3s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 250);
    }, false);
}

function goNext(qIdx) {
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100 / endPoint) * (qIdx) + '%';
}

function begin() {
    main.style.WebkitAnimation = "fadeOut 0.5s";
    main.style.animation = "fadeOut 0.5s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 0.5s";
        qna.style.animation = "fadeIn 0.5s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 200)
        let qIdx = 0;
        goNext(qIdx);
    }, 200);
}