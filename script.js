const trial_info = [
    [
        "ecdb807053a1fcb25bf15e41af4d1e544a61a652e58abbb1739dfcb3c8d0d5ee",
        "10ba1e169c7f3389e279c07b3dc19d62dd2954619423467ce05e5eb5dce83625",
        "ec0eb5c14d9fb5e854ace3ea640f8d27f9e0f3778929287679dc9fd6eeb196e7",
        "61feb6b300a1d2691d15f8c11f20108dfa829386a14074cc4b30a1a884529e82",
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