// "C:\\", ".cache", "ProgramFiles", "ProgramFiles (x86)", "Users", "Windows"
const numFormatter = new Intl.NumberFormat("en-US")

let locs = [
    [
    "C:\\",
    createFile("2025-03-12", "08:30 PM", "dir", "0", "ProgramFiles"),
    createFile("2023-01-12", "03:15 AM", "file", "308", "test.txt"),
    createFile("2021-03-31", "06:12 PM", "text", "16493869", "test1.txt"),
    createFile("2021-03-31", "06:12 PM", "text", "164938693", "test2.txt")
    ],
    [
    "D:\\"
    ],
    [
    "E:\\"
    ]
]

function createFile(year, time, type, size, name) {
    data = {
        1: year,
        2: time,
        3: type,
        4: size,
        5: name
    };
    if (data['3'] != "dir") {
        data['3'] = "     ";
    } else {
        data['3'] = "&lt;DIR&gt;"
        data['4'] = "        ";
        return data;
    }
    data['4'] = numFormatter.format(data['4']);
    size = data['4']
    if (size.length > 8) {
        console.log(`Size: ${size.length}`)
        for (var i = 0; i < (size.length - 8); i++) {
            console.log("Removing a space from file " + name)
            data['3'] = data['3'].slice(0, -1)
        }
    }
    for (var i = 0; i < 8 - size.length; i++) {
        data['4'] = " " + data['4'];
    }
    return data;
}

let currentLoc = locs[0][0]
var addContentTo = document.getElementById("prevContent");
var writeLoc = document.getElementById("currentLine");

document.addEventListener('keydown', (event) => {
  if (event.key != 'Backspace' && event.key != 'Shift' && event.key != 'Alt' && event.key != 'Control' && event.key != 'ContextMenu' && event.key != 'Enter' && event.key != 'CapsLock' && event.key != 'Tab' && event.key != 'Meta') {
    writeLoc.innerHTML += `${event.key}`;
    // Only write if it's A-Z (or the other keys i didn't disable)
  } else if (event.key == 'Backspace') {
    // Remove if backspacing.
    writeLoc.innerHTML = writeLoc.innerHTML.slice(0, -1)
  }
  //console.log(event.key)

  if (event.key == 'Enter') {
    cmdChecker(writeLoc.innerHTML)
  }
});


function cmdChecker(text) {
    addContentTo.innerHTML += "<br>"
    addContentTo.innerHTML += `${currentLoc} ${text}<br>`;
    writeLoc.innerHTML = "";
    if (text == "dir") {
        console.log("querying directory...");
        if (currentLoc == locs[0][0]) {
            for (var i = 1; i < locs[0].length; i++) {
                let data = locs[0][i]
                addContentTo.innerHTML += `${data[1]}  ${data[2]}    ${data[3]}${data[4]} ${data[5]}`;
                if (locs[0].length > i) {addContentTo.innerHTML += "<br>";}
                console.log(data)
                console.log("INDEX: " + i)
            }
        }
    } else if (text.includes("cd")) {
        console.log("moving directories...")
    }
    addContentTo.innerHTML += "<br>";
}
function moveDrive() {
}



function where() {
    console.log(currentLoc);
}
