const trial_info = [
    [
        "7c03e5da45dd4e750b71cdcf5921ad81e09f67f44650fbe4cce674cfd7cf7cdc",
        "4e4cbf5fbeca82a45fe826b382aaec249aac38010bc2050c2b278c00bf324977",
        "ed534f8d278b5ad722f03cb1fa8bcf690faaf34b1924fad0c8c3363a03461d45",
        "62fefbbd97373163dd8f6c4fa1cbc0805f089e8e34e63add516f625e7e3de89d",
    ],
    [
        "You have not accepted. Look past reality.",
        "Four words. Two senses needed.",
        "Learn from the past. Embrace their words.",
        "Repeat the question? Answer"
    ],
    [
        "./grim_hand/",
        "../struggle/",
        "../finality/",
        "../secret/main/"
    ]
];


const accounts = [
    // Usernames
    [
        "d77b208067b7e70d8cad013173c33803328785d328138600abda9ae31fabab0b"
    ],

    // Passwords
    [
        "311c576321f5d106c75a36f6ab91755cc6857a34a226b63e379326632d5a673e"
    ]
]
async function compareKey(trial) {
    var key = document.getElementById("gate").value;
    const keyhole = trial_info[0][trial];
    const hint = trial_info[1][trial];
    key = key.toLowerCase().replaceAll(' ', '').replaceAll('.', '').replaceAll('?', '');
    var changed_key = await generateComplexHash(key);
    if (changed_key === keyhole) {
        window.location.href = trial_info[2][trial] + key + ".html";
    } else {
        alert(hint);
    }
}

async function generateComplexHash(input) {
    const encoder = new TextEncoder();
    let data = encoder.encode(input);
    let initialHash = await crypto.subtle.digest('SHA-256', data);
    let complexSalt = new Uint8Array(initialHash);
    let iterations = 1;

    for (let i = 0; i < complexSalt.length; i++) {
        complexSalt[i] = complexSalt[i] ^ (data[i % data.length] + i) & 0xff;
    }

    for (let i = 0; i < iterations; i++) {
        let combinedData = new Uint8Array(complexSalt.length + data.length);
        combinedData.set(complexSalt);
        combinedData.set(data, complexSalt.length);
        data = await crypto.subtle.digest('SHA-256', combinedData);
        data = new Uint8Array(data);
        if (iterations == 1) {
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += data[i];
            }
            iterations = (sum % 500) + 500;
        }
    }

    const hashHex = Array.from(new Uint8Array(data)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function letItPour() {
    var asciiArt = document.getElementById("asciiArt");
    if (document.querySelector('.toggle').checked) {
        asciiArt.style.color = "#8707ff";
    } else {
        asciiArt.style.color = "black";
    }
}

async function logIn() {
    var username = document.getElementById("username").value;
    console.log(username)
    username = username.toLowerCase().replaceAll(' ', '').replaceAll('.', '').replaceAll('?', '');
    var changed_username = await generateComplexHash(username);
    console.log(changed_username)
    if (accounts[0].includes(changed_username)) {
        var password = document.getElementById("password").value;
        console.log(password)
        password = password.toLowerCase().replaceAll(' ', '').replaceAll('.', '').replaceAll('?', '');
        var changed_password = await generateComplexHash(password);
        console.log(changed_password)
        if (accounts[1].includes(changed_password)) {
            window.location.href = "../accounts/" + username + ".html";
        }
    }
}