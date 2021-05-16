/*  
mouse, 0 
cow, 1 
tiger, 2 
rabbit, 3 
dragon, 4 
snake, 5 
horse, 6 
sheep, 7 
monkey, 8
chick, 9 
dog, 10 
pig, 11 
*/

const qnaList = [{
        q: '1. 질문',
        a: [
            { answer: 'a. 열정', type: [1, 2, 4, 9] },
            { answer: 'b. 열망', type: [0, 3, 6, 5, 10, 8] },
            { answer: 'c. 긍정', type: [7, 11] },
        ]
    },
    {
        q: '2. 질문',
        a: [
            { answer: 'a. 열정', type: [0, 3, 2, 8] },
            { answer: 'b. 열망', type: [1, 6, 5, 10] },
            { answer: 'c. 긍정', type: [7, 4, 9, 11] },
        ]
    },
    {
        q: '3. 질문',
        a: [
            { answer: 'a. 열정', type: [1, 3, 2, 10, 8] },
            { answer: 'b. 열망', type: [7, 9, 11] },
            { answer: 'c. 긍정', type: [0, 6, 5, 4] }
        ]
    },
    {
        q: '4. 질문',
        a: [
            { answer: 'a. 열정', type: [1, 2, 4] },
            { answer: 'b. 열망', type: [7, 10, 8, 9, 11] },
            { answer: 'c. 긍정', type: [0, 3, 6, 5] },
        ]
    },
    {
        q: '5. 질문',
        a: [
            { answer: 'a. 열정', type: [1, 7, 10, 4, 9] },
            { answer: 'b. 열망', type: [0, 3, 6, 11] },
            { answer: 'c. 긍정', type: [2, 5, 8] },
        ]
    },

    {
        q: '6. 질문',
        a: [
            { answer: 'a. 열정', type: [4, 9, 11] },
            { answer: 'b. 열망', type: [0, 3, 6, 10] },
            { answer: 'c. 긍정', type: [1, 7, 2, 5, 8] },
        ]
    },
    {
        q: '7. 질문',
        a: [
            { answer: 'a. 열정', type: [1, 7, 11] },
            { answer: 'b. 열망', type: [2, 4, 9] },
            { answer: 'c. 긍정', type: [0, 3, 6, 5, 10, 8] },
        ]
    },
    {
        q: '8. 질문',
        a: [
            { answer: 'a. 열정', type: [0, 4, 9] },
            { answer: 'b. 열망', type: [3, 2, 6, 5, 10, 8] },
            { answer: 'c. 긍정', type: [1, 7, 11] },
        ]
    },
    {
        q: '9. 질문',
        a: [
            { answer: 'a. 열정', type: [7, 0, 5, 9] },
            { answer: 'b. 열망', type: [1, 3, 6, 11] },
            { answer: 'c. 긍정', type: [2, 10, 8, 4] },
        ]
    },
    {
        q: '10. 질문',
        a: [
            { answer: 'a. 열정', type: [4, 9, 11] },
            { answer: 'b. 열망', type: [0, 2, 6, 5] },
            { answer: 'c. 긍정', type: [1, 7, 3, 10, 8] },
        ]
    },
    {
        q: '11. 질문',
        a: [
            { answer: 'a. 열정', type: [1, 4, 9, 11] },
            { answer: 'b. 열망', type: [7, 0, 3, 6, 10] },
            { answer: 'c. 긍정', type: [2, 5, 8] },
        ]
    },
    {
        q: '12. 질문',
        a: [
            { answer: 'a. 열정', type: [3, 6, 4, 9] },
            { answer: 'b. 열망', type: [0, 2, 5, 10, 8] },
            { answer: 'c. 긍정', type: [1, 7, 11] },
        ]
    }
]

const infoList = [{
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
    {
        name: '열정 열정 열정',
        desc: '열정이 없으믄 죽은 것이나 다름없다!'
    },
]