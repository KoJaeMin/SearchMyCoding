const url = 'https://musing-bardeen-a0dec4.netlify.app/';

function setShare() {
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = 'MBTI 개발자 유형 결과'
    const shareDes = infoList[resultAlt].name;
    const shareImage = url + 'image/image-' + resultAlt + '.jpg';
    const shareURL = url + 'page/result-' + resultAlt + '.html';

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