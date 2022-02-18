var final_word = "";
var cont_letter = cont_row = 0;
var green_color = "#04aa6d";
var yellow_color = "#e3c642";
var gray_color = "#494949";
var check_test = false;

function generate_word(){
    index = Math.floor(Math.random() * random_words.length);
    final_word = random_words[index];
    console.log(final_word);
}

function input(letter){
    if(cont_letter < 5 && cont_row < 6){
        all_div = document.getElementsByClassName("input-row");
        focus_div = all_div[cont_row];
        all_focus_div = focus_div.getElementsByClassName("input-box");
        for(var i=0, len=all_focus_div.length; i<len; i++){
            var div = all_focus_div[i];
            if(div.dataset.state == "empty"){
                div.innerHTML = letter.toUpperCase();
                cont_letter++;
                div.dataset.state = "full";
                break;
            }
        }
    }
}

function reset(){
    all_row = document.getElementsByClassName("input-row");
    for(var i=0; i<all_row.length; i++){
        box_div = all_row[i].getElementsByClassName("input-box");
        for(var j=0; j<box_div.length; j++){
            var div = box_div[j];
            if(div.dataset.state == "full"){
                div.innerHTML = "";
                div.dataset.state = "empty";
                div.classList.remove("green");
                div.classList.remove("yellow");
            }
        }
    }
    all_key = document.getElementsByClassName("input-key");
    for(var i=0; i<all_key.length; i++){
        all_key[i].classList.remove("green");
        all_key[i].classList.remove("yellow");
        all_key[i].classList.remove("gray");
    }
    document.getElementById("result-div").style.visibility = "hidden";
    cont_letter = cont_row = 0;
    generate_word()
}

function del(){
    if(cont_row < 6){
        all_div = document.getElementsByClassName("input-row");
        focus_div = all_div[cont_row];
        all_focus_div = focus_div.getElementsByClassName("input-box");
        for(var i=all_focus_div.length-1; i>=0; i--){
            var div = all_focus_div[i];
            if(div.dataset.state == "full"){
                div.innerHTML = "";
                cont_letter--;
                div.dataset.state = "empty";
                break;
            }
        }
    }
}

function row_error(error_num){
    all_div = document.getElementsByClassName("input-row");
    focus_div = all_div[cont_row];
    focus_div.classList.add("error");
    setTimeout(function(){
        focus_div.classList.remove("error")
    }, 700);
    var error_box = document.createElement("div");
    if(error_num == 1)
        error_box.innerHTML = "Non abbastanza lettere";
    else
        error_box.innerHTML = "Parola inesistente";
    error_box.classList.add("error-box");
    document.getElementsByClassName("error-container")[0].appendChild(error_box);
    setTimeout(function(){
        document.getElementsByClassName("error-container")[0].removeChild(error_box);
    }, 2000);
}

function get_word(){
    all_div = document.getElementsByClassName("input-row");
    focus_div = all_div[cont_row];
    return focus_div.textContent.replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,"");
}

function check_word(word){
    box_obj = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0,
        G: 0,
        H: 0,
        I: 0,
        J: 0,
        K: 0,
        L: 0,
        M: 0,
        N: 0,
        O: 0,
        P: 0,
        Q: 0,
        R: 0,
        S: 0,
        T: 0,
        U: 0,
        V: 0,
        W: 0,
        X: 0,
        Y: 0,
        Z: 0
    };
    gray_letters = word.split("");
    all_div = document.getElementsByClassName("input-row");
    focus_div = all_div[cont_row];
    box = focus_div.getElementsByClassName("input-box");

    for(var i=0; i<5; i++){
        box_obj[final_word[i]]++;
    }
    for(var i=0; i<5; i++){
        if(document.getElementById(box[i].textContent).classList.contains("green") == false)
            document.getElementById(gray_letters[i]).classList.add("gray");
        if(box[i].textContent == final_word[i]){
            box[i].classList.add("green")
            document.getElementById(box[i].textContent).classList.remove("gray");
            document.getElementById(box[i].textContent).classList.remove("yellow");
            document.getElementById(box[i].textContent).classList.add("green");
            box_obj[box[i].textContent]--;
        }
    }
    
    for(var i=0; i<5; i++){
        for(var j=0; j<5; j++){
            if(box[i].textContent == final_word[j]){
                if(document.getElementById(box[i].textContent).classList.contains("green") == false){
                    document.getElementById(box[i].textContent).classList.remove("gray");
                    document.getElementById(box[i].textContent).classList.add("yellow")
                    if(box_obj[box[i].textContent] != 0){
                        box[i].classList.add("yellow");
                        box_obj[box[i].textContent]--;
                    }
                }
            }
        }
    }
}


function ent(){
    word = get_word();
    if(word == "TESTB" || word == "TESTC"){
        document.getElementById("test-div").style.visibility = "visible";
        check_test = true;
        if(word == "TESTB")
            check_test_type = "B";
        else
            check_test_type = "C";
    }
    else if(cont_letter == 5 && cont_row < 6){
        if(words_list.includes(word)){
            check_word(word);
            if(check_test)
                test();
            if(final_word == word){
                document.getElementById("result-div").style.visibility = "visible";
                document.getElementById("result-div").style.backgroundColor = "#04aa6d";
                document.getElementsByClassName("reload-button")[0].style.backgroundColor = "#04aa6d";
                document.getElementsByClassName("result-message")[0].innerHTML = "HAI VINTO!";
                document.getElementsByClassName("correct-answer")[0].innerHTML = "La parola giusta era "+final_word;
                cont_row = 6;
            }else{
                cont_row++;
                cont_letter = 0;
                if(cont_row == 6){
                    document.getElementById("result-div").style.visibility = "visible";
                    document.getElementById("result-div").style.backgroundColor = "#d63e2d";
                    document.getElementsByClassName("reload-button")[0].style.backgroundColor = "#d63e2d";
                    document.getElementsByClassName("result-message")[0].innerHTML = "HAI PERSO!";
                    document.getElementsByClassName("correct-answer")[0].innerHTML = "La parola giusta era "+final_word;
                }
            }
        }
        else
            row_error(2); //parola inesistente
    }
    else if(cont_row != 6)
        row_error(1); //non abbastanza lettere
}

window.addEventListener("keydown", function(event){
    ek = event.key;
    invalid_ley = ["Unidentified", "Meta", "Control", "Shift", "CapsLock", "Tab", "Alt", "AltGraph", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "NumLock", "Home", "Clear", "PageUp", "PageDown", "End", "Delete", "ScrollLock", "Pause", "F1", "F2", "AudioVolumeMute"];
    if(invalid_ley.includes(ek) == false){
        if(ek == "Enter")
            ent();
        else if(ek == "Backspace")
            del();
        else if(ek.match(/^[A-Za-z]+$/))
            input(ek);
    }
}, true);

function close_result(){
    document.getElementById("result-div").style.visibility = "hidden";
}

function show_info(){
    document.getElementsByClassName("instructions")[0].style.visibility = "visible";
    document.getElementsByClassName("info-button")[0].onclick = close_info
}

function close_info(){
    document.getElementsByClassName("instructions")[0].style.visibility = "hidden";
    document.getElementsByClassName("info-button")[0].onclick = show_info
}