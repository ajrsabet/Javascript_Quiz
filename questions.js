//questions coppied from https://www.geeksforgeeks.org/javascript-quiz-set-1/


var questionArray = [{

        question: 'Inside which HTML element do we put the JavaScript?',
        choices: ['<js>', '<script>', '<javascript>', 'scripting'],
        answer: '<script>',
    },
    {
        question: 'What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>',
        choices: ['#demo.innerHTML = "Hello World!"', 'document.getElement("p").innerHTML = "Hello World!"', 'document.getElementByName("p").innerHTML = "Hello World!"', 'document.getElementById("p").innerHTML = "Hello World!"'],
        answer: 'document.getElementById("p").innerHTML = "Hello World!"',
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choices: ['The <body> section', 'The <head> section', 'Both the <head> section and the <body> section are correct', 'Other', ],
        answer: 'Both the <head> section and the <body> section are correct',
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choices: ['<script src="xxx.js">', '<script name="xxx.js">', '<script href="xxx.js">', 'None of the above', ],
        answer: '<script src="xxx.js">',
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choices: ['alert("Hello World")', 'msgBox("Hello World")', 'alertBox("Hello World")', 'msg("Hello World")', ],
        answer: 'alert("Hello World")',
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choices: ['if i = 5 then', 'if i == 5 then', 'if(i == 5)', 'if i = 5'],
        answer: 'if(i == 5)',
    },

];