const url = 'http://ec2-107-20-248-84.compute-1.amazonaws.com/';

function setShare() {
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = 'MBTI 개발자 유형 결과'
    const shareDes = infoList[resultAlt].name;
    const shareImage = url + 'MBTI/image/' + resultAlt;
    const shareURL = url + 'MBTI/result/' + resultAlt;

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: shareTitle,
            description: shareDes,
            imageUrl: shareImage,
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
            },
        },
        buttons: [{
            title: '결과확인하기',
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
            },
        }, ]
    });
}