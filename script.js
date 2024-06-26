function unlockGate() {
    var key = document.getElementById("gate").value;
    var new_key = key.toLowerCase().replaceAll(' ', '_').replaceAll('.', '')
    key = btoa(key);
    var keyhole = "RGVhdGggd2lsbCBjb21lLg==";
    if(key === keyhole) {
        window.location.href = "grim_hand/"+new_key+".html";
    } else {
        alert("You have not accepted. Look past reality.");
    }
}

async function embraceDarkness(){
    var key = document.getElementById("gate").value;
    const keyhole = "e81ae6b506c82b3981e2d4745660efde01fa62eebc17767c3d60ee8c814880b6";
    var changed_key = await generateSHA256(key);
    key = key.toLowerCase().replaceAll(' ', '_').replaceAll('.', '')
    if (changed_key === keyhole) {
        window.location.href = "../struggle/"+key+".html";
    } else {
        alert("Four words. Two senses needed.")
    }
}

async function acceptance(){
    var key = document.getElementById("gate").value;
    const keyhole = "c222f701cff59062af75056ce9fde7c25f6faa82a2fc9fed80f2cf1b73842469";
    var changed_key = await generateSHA256(key);
    key = key.toLowerCase().replaceAll(' ', '_').replaceAll('.', '')
    if (changed_key === keyhole) {
        window.location.href = "../finality/"+key+".html";
    } else { 
        alert("Learn from the past. Embrace their words.")
    }
}

async function finalKey(){
    var key = document.getElementById("gate").value;
    const keyhole = "013408980555ca2a77fc375be53306a8fe4e801af6bb289bd51d6e80f52e8f65"
    var changed_key = await generateSHA256(key);
    key = key.split(' ')[1]
    if (changed_key === keyhole) {
        window.location.href = "../secret/main/"+key+".html";
    } else {
        alert("Find the question? Answer It Too")
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