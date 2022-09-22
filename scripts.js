const Pers = { //variables used in the personality test. With a method to assign them values (I chose the name val becaues value was fucking up)
    Ling: {
        val: 0,
        desc: "Lingwistyczna",
        qs: [5, 10, 21, 22]
    },
    Mat: {
        val: 0,
        desc: "Matematyczno logiczna ",
        qs: [7, 12, 24, 31]
    },
    Viz: {
        val: 0,
        desc: "Wizualno przestrzenna ",
        qs: [2, 13, 20, 26]
    },
    Nat: {
        val: 0,
        desc: "Przyrodnicza",
        qs: [6, 14, 30, 32]
    },
    Mus: {
        val: 0,
        desc: "Muzyczna",
        qs: [4, 11, 19, 29]
    },
    IntPer: {
        val: 0,
        desc: "Interpersonalna",
        qs: [3, 9, 15, 25]
    },
    IntPer2: {
        val: 0,
        desc: "Intrapersonalna",
        qs: [8, 17, 18, 28]
    },
    MoKi: {
        val: 0,
        desc: "Ruchowa kinestetyczna",
        qs: [1, 16, 23, 27]
    },
    setVal(per) {
        let temp = eval(`this.${per}`);
        for (x = 0; x < 4; x++) {//4 = qs.length
            temp.val += parseInt(document.querySelector(`input[name="q${temp.qs[x]}"]:checked`).value);
        }
        eval(`this.${per}.val = temp.val`);
        return console.log(temp.val, temp.desc);
        
    },

}

//functions below serve as html element constructors. You can replace, add(as a child) a paragraph, and add a button(as a child node).
function replaceParagraph(newElID, text, targetID) {
    let temp = document.createElement("div");
    temp.appendChild(document.createElement("p"));
    Object.assign(temp, {
        id: `${newElID}`,
    })
    temp.setAttribute("class", "center")
    temp.lastChild.append(`${text}`)
    document.getElementById(`${targetID}`).replaceWith(temp)
}
function addButton(buttonID, buttonText, width, height, locationId) {
    let temp = document.createElement("div")
    temp.setAttribute("class", "container")
    let button = document.createElement("button")
    Object.assign(button, {
        id: `${buttonID}`,
        type: "button",
        style: {}
    })
    Object.assign(button.style, {
        display: "block",
        width: `${width}px`,
        height: `${height}px`,

    })
    button.append(`${buttonText}`)
    temp.appendChild(button)
    document.getElementById(`${locationId}`).appendChild(temp)
}

function createParagraph(newElID, text, targetID) {
    let temp = document.createElement("div");
    temp.appendChild(document.createElement("span"));
    Object.assign(temp, {
        id: `${newElID}`
    })
    temp.lastChild.append(`${text}`)
    document.getElementById(`${targetID}`).appendChild(temp)
}

//this block will contain everything related to Konami code
function isEqual(g, h) { //used to check if the konamiVars.test is equal to the Konami code
    if (Array.isArray(g) && Array.isArray(h) &&
        g.length === h.length &&
        g.every(function (x, index) {
            return x === h[index]
        })
    ) {
        return true
    } else {return false }
}

const konamiVars = {
    test: [],
    check: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
} 

//main code block for the konamiCode
//so basicly I made a keylogger that sends data to Konami function to test, if the test is passed it executes and than it returns stuff
//at the end Konami() delets the event listener from inputTracker and returns a secret sentence and a secret button
function Konami() {
    if (konamiVars.test.length > 10) {
        konamiVars.test.splice(0, 1)
    }
    if (isEqual(konamiVars.test, konamiVars.check)) {
        console.log("we've won!");
        const secretMessage = replaceParagraph("secretDiv", "You've found a secret!", "hiddenOne")
        const secretButton = addButton("konamiButton", "Auto Answer", 120, 85, "secretDiv" )
        document.removeEventListener("keydown", placeholder);
        secretButtonBrain = document.getElementById("konamiButton")
        secretButtonBrain.addEventListener("click", function () {
            AutoBot.bind(this)();
        })
    }
}
function placeholder(e) { // to use removeListener I had to make a callback function instead of writing it directly to inputTracker.
    if (e.repeat) return;
    console.log(e.key);
    konamiVars.test.push(e.key)
    Konami()
}
var inputTracker = document.addEventListener("keydown", placeholder)
// functions below pertains to secret button created by the Konami Code blocks

var secretButtonBrain;
function AutoBot() {
    let array = [0, 1, 2, 3, 4, 5];
    for (c = 1; c <= 32; c++) {
        const randomElement = array[Math.floor(Math.random() * array.length)];
        let temp = document.getElementsByName(`q${c}`);
        temp[randomElement].setAttribute("checked", "true");
    }
}
//functions below pretain to the send button and its functionality
var names = []; // making a variable that I will use later to loop through personality names (MoKi, Viz...)
for (y = 0; y < 8; y++) {
    names.push(Object.entries(Pers)[y][0])
}
function reset() {// function used to reset the values of Pers.name.val //Is no longer used siince update to newer chart.js
    for (x in Pers) {
        Pers[x].val = 0
    }
}

function Validate() { //function used to validate if every question has been answered
    for (x = 1; x <=  32; x++) {
        let temp = 0;
        for (y = 0; y <= 5; y++) {
            if (document.getElementsByName(`q${x}`)[y].checked == true) {
                temp += 1;
            }
        } if (temp == 0) {
            alert(`You have not provided an answer to question ${x}`)
            return false;
            break
        }

    }return true
}
var barChart;
const button = document.getElementById("Sub")
button.onclick = function () {
    try { barChart.destroy() }
    catch { console.log("initiating the first chart") }
    if (Validate() == false) {
        //console.log(validation(failed))
    }
    else {
        for (z = 0; z < 8; z++) {//8 because there are 8 personality types in this test
            Pers.setVal(names[z]);

        }
        let values = []
        for (a = 0; a < 8; a++) {
            let temp = Object.entries(Pers)[a][1].val;
            values.push(temp);
        }
        let descriptions = [];
        for (b = 0; b < 8; b++) {
            descriptions.push(Object.entries(Pers)[b][1].desc)
        }
        let barColors = ["red", "green", "blue", "orange", "brown", "magenta", "pink", "purple"];
        const chartID = document.getElementById("myChart");
        //global options:
        //Chart.defaults.global.defaultFontColor = "Red";
        //Chart.defaults.global.defaultFontFamily = "Arial";
        
        barChart = new Chart(chartID, {
            type: "bar",// bar, horizontalBar, pie, line, donghnut, radar, polarArea
            data: {
                labels: descriptions,
                datasets: [{
                    label: "Oto twoj profil uzdolnien:",
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(111, 160, 50, 1',
                        'rgba(444, 200, 100, 1)'
                    ],
                    borderWidth: 1,
                    borderColor: "#777",
                    hoverBorderWidth: 3,
                    hoverBorderColor: "#000"
                }],



            },
            options: {
                title: {
                    display: true,
                    text: "Oto Twoj profil uzdolnien:",
                    fontSize: 25,
                    fontColor: "#000"
                },
                legend: {
                    display: false,
                    position: "right",
                    labels: {
                        fontColor: "#000"
                    }
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top:0
                    }
                },
                tooltips: {
                    enabled:false
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 20
                    },
                    x: {
                        beginAtZero: true
                    }
                }

            }

        });
        function returnString(targetID) {
            for (h = 0; h < 8; h++) {
                let temp = document.createElement("span");
                temp.innerHTML = `${Object.entries(Pers)[h][1].desc}: ${Object.entries(Pers)[h][1].val} punktow` 
                document.getElementById(targetID).appendChild(temp)
            }

        } try {
            replaceParagraph("persProf", "Twoj profil uzdolnien to:", "outcomeText")
            document.getElementById("persProf").setAttribute("class", "box")
            returnString("persProf")
        } catch {
            let temp = document.getElementById("persProf").children[0]
            document.getElementById("persProf").innerHTML = "";
            document.getElementById("persProf").appendChild(temp);
            returnString("persProf");
        }
        reset()
}
}