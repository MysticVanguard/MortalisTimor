function unlockGate() {
    var key = document.getElementById("gate").value;
    key = btoa(key);
    var keyhole = "RGVhdGggd2lsbCBjb21lLg==";

    if(key === keyhole) {
        window.location.href = "grim_hand/index.html";
    } else {
        alert("You have not accepted.");
    }
}

async function embraceDarkness(){
    var key = document.getElementById("gate").value;
    const keyhole = "e81ae6b506c82b3981e2d4745660efde01fa62eebc17767c3d60ee8c814880b6";
    key = await generateSHA256(key);
    if (key === keyhole) {
        window.location.href = "../struggle/index.html";
    } else {
        alert("Embrace the darkness.")
    }
}

async function acceptance(){
    var key = document.getElementById("gate").value;
    const keyhole = "c222f701cff59062af75056ce9fde7c25f6faa82a2fc9fed80f2cf1b73842469";
    key = await generateSHA256(key);
    if (key === keyhole) {
        window.location.href = "../index.html";
    } else {
        alert("Prepare.")
    }
}


async function generateSHA256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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