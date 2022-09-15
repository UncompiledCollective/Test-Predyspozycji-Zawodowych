const Pers = {
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
        return console.log(temp.val);
        
    },

}
var names = []; // making a variable that I will use later to loop through personality names (MoKi, Viz...)
for (y = 0; y < 8; y++) {
    names.push(Object.entries(Pers)[y][0])
}
let test = []
function Validate() {
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

const button = document.getElementById("Sub")
button.onclick = function () {
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

        new Chart("myChart", {
            type: "bar",
            data: {
                labels: descriptions,
                datasets: [{
                    backgroundColor: barColors,
                    data: values
                }]
            },
            options: {}
        });
        //Pers.MoKi.val += parseInt(document.querySelector(`input[name="q1"]:checked`).value);





        return document.getElementById("output").innerHTML = `
<p>This are the results:<p>
<p><p>
`}
}

