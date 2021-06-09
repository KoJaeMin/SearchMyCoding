/*  
E, 0 
I, 1 
S, 2 
N, 3 
T, 4 
F, 5 
P, 6 
J, 7 
*/

const qnaList = [{ //E-I
        q: '1. 한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
        a: [
            { answer: 'a. 에너지 충전해야해.. 집콕.. 침대 최고...', type: [1] },
            { answer: 'b. 한 달 동안 못 논 게 한이다! 친구들과 만나 파워 수다!', type: [0] },
        ]
    },
    { //J-P
        q: '2. 밥을 먹고 보니 설거짓거리가 한가득이다.',
        a: [
            { answer: 'a. 유튜브 보면서 하면 금방이니 후딱하고 할 일 해야지!', type: [7] },
            { answer: 'b. 원래 설거지는 밥 먹은 후가 아니라 밥 먹기 전에 하는 것.', type: [6] },
        ]
    },
    { //S-N
        q: '3. 사과하면 떠오르는 것은?🍎',
        a: [
            { answer: 'a. 백설공주! 애플! 비타민C!', type: [3] },
            { answer: 'b. 맛있다! 빨갛다! 동그랗다!', type: [2] },
        ]
    },
    { //T-F
        q: '4. 어느날 갑자기 호빵맨이 됐다. <br/>친한 친구가 머리를 조금 떼 줄 수 있냐고 물어본다.',
        a: [
            { answer: 'a. 응? 왜? 내 머리를 왜? 죽으면 어떡함?', type: [4] },
            { answer: 'b. 친한 친구라면 기꺼이 떼어줄 수 있지! 위험하다면 마음을 나눠줄래!', type: [5] },
        ]
    },
    { //T-F
        q: '5. 팀원과 둘이서 새벽 작업 중 갑자기 정전이 됐다. <br/>아무것도 보이지 않는다. <br/>두꺼비집을 확인해봐야겠다.',
        a: [
            { answer: 'a. (너무 어두워서 가다가 다칠 수 있으니) 내가 가서 확인해볼게.', type: [4] },
            { answer: 'b. (혼자 가면 상대방이 무섭거나 외로울 수 있으니) 같이 가서 확인해보자..!', type: [5] },
        ]
    },

    { //E-I
        q: '6. 자가격리 중 친구가 답답하고 심심하지 않냐고 묻는다.',
        a: [
            { answer: 'a. 나 지금 최고로 좋은데? 심심할 틈이 없어..', type: [1] },
            { answer: 'b. 그러니까.. 끝나자마자 하루에 약속 3개씩 잡을거야', type: [0] },
        ]
    },
    { //P-J
        q: '7. 제주도 여행을 가기로 결정했다.<br/>🌴 호텔과 항공편 예약은 끝냈으니..',
        a: [
            { answer: 'a. 계획을 세워볼까?', type: [7] },
            { answer: 'b. 준비 완료', type: [6] },
        ]
    },
    { //S-N
        q: '8. 아무 생각이 없다.',
        a: [
            { answer: 'a. (광활한 우주)', type: [3] },
            { answer: 'b. (진짜 아무 생각이 없다)', type: [2] },
        ]
    },
    { //E-I
        q: '9. 자주 가는 카페 사장님이 어제부터 말을 걸기 시작했다.',
        a: [
            { answer: 'a. 이 메뉴 진짜 제 최애에요🥰 카페 분위기도 진짜 좋아요! 원두는 어디꺼 쓰세요?', type: [0] },
            { answer: 'b. (카페 옮길까?) ㅎㅎ..네..', type: [1] },
        ]
    },
    { //P-J
        q: '10. 스벅 프리퀀시를 모아 다이어리를 얻었다.',
        a: [
            { answer: 'a. 예쁜 쓰레기', type: [6] },
            { answer: 'b. 완전 꼼꼼히 쓸거야 마테 사러가야지~!', type: [7] },
        ]
    },
    { //T-F
        q: '11. 싫어하는 상사 : OO씨 뒤에서 욕 엄청 먹는 거 알아? <br/>내가 진짜 OO씨 걱정돼서 얘기해주는거야.',
        a: [
            { answer: 'a. (어쩌라고.. 너보단 덜 먹을 듯..) 아.. 그래요..?', type: [4] },
            { answer: 'b. (누구지..? 왜 그렇지..? 실수했나?) 아.. 그래요..?', type: [5] },
        ]
    },
    { //N-S
        q: '12. 친구 집들이를 갔는데 집이 꽤 마음에 든다.',
        a: [
            { answer: 'a. 채광도 괜찮고 옵션도 좋고 수압도 높고 괜찮네.', type: [2] },
            { answer: 'b. 그냥 집 자체 느낌이 좋아 내 느낌이 그래', type: [3] },
        ]
    }
]

const infoList = [{
        name: 'IoT 개발자(ESTP)',
        desc: '◾ 고민이 뭐야? 먹는거야? 인생은 직진!<br/>◾ 자신감 MAX, 사람 만나는 거 재밌는데 나가는 게 귀찮아..<br/>◾ 가만히 앉아서 연구하는 것보다 무엇인가 조작하고 경험하는 게 즐거운 당신은 IoT 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=iot'
    },
    {
        name: 'QA 개발자(ESTJ)',
        desc: '◾ 태어난 김에 사는 사람은 도저히 이해할 수가 없어! 목표를 가지고 살아야해!<br/>◾ 공감을 잘 하는 것으로 보이지만 속에선 분석적으로 판단 중..<br/>◾ 목적, 목표가 누구보다 뚜렷하고 주관이 뚜렷한 당신은 개발된 소프트웨어가 의도, 목적에 따라 알맞게 구동하는 지 확인하는 QA 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=system-automation'
    },
    {
        name: '게임 개발자(ESFP)',
        desc: '◾ 호불호 최고, 좋은 건 끝까지 파고 싫은 건 죽어도 싫어!<br/>◾ YOLO 그 자체. 계획이 뭐지? 진지한 게 뭐지? <br/>◾ 세상에 재밌는 게 너무 많고 내가 좋아하는 건 누구보다 열정 넘치게 할 수 있는 당신은 개임 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=game-dev'
    },
    {
        name: '안드로이드 개발자(ESFJ)',
        desc: '◾ 어딜가도 아는 사람이 있는 나. 인싸죠. 많관부.<br/>◾ 리액션 장인, 고민 상담사, 하나에 꽂힌다? 끝장 본다<br/>◾ 규칙에 얽매이지 않고 실용적인 것을 완벽하게 만들 수 있는 당신은 안드로이드 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=android'
    },
    {
        name: 'iOS 개발자(ENTP)',
        desc: '◾ 같이 노는 거 좋아 근데 관심 없으면 하기 싫어<br/>◾ 머리가 좋고 종종 기발한 아이디어가 떠오른다! 근데 딱히 실천에 옮기긴 귀찮아..<br/>◾ 비상한 머리로 어디서든 능력 발휘할 수 있는 당신은 간죽간살 애플의 iOS 개발자가 안성맞춤!',
        recom: 'https://www.inflearn.com/courses?order=seq&skill=ios'
    },
    {
        name: '아키텍쳐 개발자(ENTJ)',
        desc: '◾ 전 계획적이면서 굉장히 계획적인 사람이에요.<br/>◾ ENTJ - (일, 자기계발) = 0<br/>◾ 논리적이고 배울 의지가 넘치는 당신은 시스템을 끊임없이 연구해야하는 아키텍쳐 개발자가 안성맞춤!',
        recom: 'https://www.inflearn.com/courses?order=seq&skill=architecture'
    },
    {
        name: 'AI 개발자(ENFP)',
        desc: '◾ 골든리트리버가 인간이 된다면 ENFP가 되지 않을까..?<br/>◾ 사람 좋아! 노는 거 좋아! 근데 싫은 건 너무 싫어!<br/>◾ ENFP의 상상은 무궁무진하다 변화를 추구하는 당신은 AI 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=deep-learning'
    },
    {
        name: '프론트엔드 개발자(ENFJ)',
        desc: '◾ 원 투 비 인싸 인싸가 되고싶고 이미 인싸인 유형<br/>◾ 팀플 버스 운전기사를 맡고있죠.<br/>◾ 협업에 능하고 사교성이 좋아 뛰어난 커뮤니케이션 능력을 가진 당신은 프론트엔드 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=front-end'
    },
    {
        name: '임베디드 개발자(ISTP)',
        desc: '◾ 전 그냥 태어난 김에 살아요. 하고 싶은 거 있음 하고 없음 말고~<br/>◾ 간섭 극혐, 욕구에 충실, 노력 절약 최대 효율 중시<br/>◾ 기계를 만지고 탐구하는 것을 좋아하고 안정적인 것을 좋아하는 당신은 하드웨어를 조작해 소프트웨어를 개발하는 임베디드 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=embedded'
    },
    {
        name: '퍼블리셔형 개발자(ISTJ)',
        desc: '◾ 좌우명 : 생각을 가지고 효율적으로 행동하자(이유없는 쓸데없는 짓 절대 금지)<br/>◾ 규칙적이고 반복적인 일? 맡겨만주세요. 전 그런 게 좋아요(정말로)<br/>◾ 원리원칙을 따르고 계획대로 행동하며 반복적인 것을 훌륭히 수행해 낼 수 있는 당신은 웹을 기준에 따라 출판하는 퍼블리셔형 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=web-publish'
    },
    {
        name: '네트워크 개발자(ISFP)',
        desc: '◾ 둥글둥글한 성격의 소유자. 근데 연락은 잘 안 되는 거 같기도?<br/>◾ 상대방이 상처 받으면 어떡해..?(눈치)<br/>◾ 배려심이 높고 프라이버시를 즐기고 중요시하는 당신은 고객과 소통하고 원하는 것을 충족시켜줄 수 있는 네트워크 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=network'
    },
    {
        name: '보안 전문가(ISFJ)',
        desc: '◾ 노잼같아 보이지만 전 만족하는 걸요? 너무 완벽주의자라 게으르긴 하지만..<br/>◾ 배려심 넘치지만 무례한 사람은 너무너무 싫어.. 즉흥적인 것도 싫어..<br/>◾ 책임감 있고 정확성과 완벽함을 추구하는 당신은 시스템을 보호하는 보안 전문가가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=information-security'
    },
    {
        name: '백엔드 개발자(INTP)',
        desc: '◾ 혼자서 상상하는 게 제일 재밌어! 머리 쓰는 거 좋아!<br/>◾ 비효율적인 거 싫어. 내 갈 길 알아서 가야지.<br/>◾ 반복적인 것은 질색이지만 생각을 끊임없이 할 수 있고 효율을 따지는 당신은 눈에 보이지 않는 것들을 개발하는 백엔드 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=back-end'
    },
    {
        name: '데이터 분석가(INTJ)',
        desc: '◾ 효율적이고 합리적이고 계획적인 게 좋아요. \'굳이\'라는 단어 사용 금지<br/>◾ 목표는 매우 높지만 난 할 수 있어! 대신 일단 생각 좀 해보고<br/>◾ 생각이 많고 신중하며 기초와 근본을 중요시하는 당신은 방대한 데이터 속 유의미한 결과를 도출하는 데이터 분석가가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=data-analysis'
    },
    {
        name: '블록체인 개발자(INFP)',
        desc: '◾ 섬세+눈물+무계획+개성의 혼합체<br/>◾ 신념 가치관 so 확고해 바꾸기는 거의 불가능<br/>◾ 올곧은 생각과 완벽을 추구하는 당신은 세계 곳곳에서 다양한 거래를 실현시키는 기술인 블록체인 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=blockchain'
    },
    {
        name: '풀스택 개발자(INFJ)',
        desc: '◾ 생각이 많아.. 싸우는 거 싫어.. 사람 좋은데 혼자 있는 시간이 필요해..<br/>◾ 사소한 것에 감동하기도 서운해하기도 해서 자주 우는 편.<br/>◾ 뛰어난 집중력과 모든 것을 작업할 수 있는 능력을 가진 당신은 풀스택 개발자가 안성맞춤!',
        recom:'https://www.inflearn.com/courses?order=seq&skill=back-end%2Cfront-end'
    },
]