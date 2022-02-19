var final_word = "";
var cont_letter = cont_row = 0;
var check_test = check_option_open = false;
var column_num = 5;
var set_random_words = set_word_list = [];

function generate_word(){
    index = Math.floor(Math.random() * set_random_words.length);
    final_word = set_random_words[index];
    console.log(final_word);
}

function change_table(){
    col_value = document.getElementById("column-number").value;
    if(col_value >= 4 && col_value <= 7){
        all_row = document.getElementsByClassName("input-row");
        for(var i=0; i<all_row.length; i++){
            all_row[i].innerHTML = "";
        }
        for(var i=0; i<all_row.length; i++){
            for(var index=0; index<col_value; index++){
                var box = document.createElement("div");
                box.classList.add("input-box");
                box.dataset.state="empty";
                all_row[i].append(box);
            }
        }
        column_num = col_value
        if(col_value == 4){
            set_random_words = four_random_words;
            set_word_list = four_word_list;
        }
        else if(col_value == 5){
            set_random_words = five_random_words;
            set_word_list = five_word_list;
        }
        else if(col_value == 6){
            set_random_words = six_random_words;
            set_word_list = six_word_list;
        }
        else if(col_value == 7){
            set_random_words = seven_random_words;
            set_word_list = seven_word_list;
        }
        generate_word()
    }
    else{
        print_error(3)
    }
}

function input(letter){
    if(cont_letter < column_num && cont_row < 6){
        all_row = document.getElementsByClassName("input-row");
        focus_div = all_row[cont_row];
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
    generate_word();
}

function del(){
    if(cont_row < 6){
        all_row = document.getElementsByClassName("input-row");
        focus_div = all_row[cont_row];
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

function print_error(error_num){
    var error_box = document.createElement("div");
    if(error_num < 3){
        all_row = document.getElementsByClassName("input-row");
        focus_div = all_row[cont_row];
        focus_div.classList.add("error");
        setTimeout(function(){
            focus_div.classList.remove("error")
        }, 700);
        if(error_num == 1)
            error_box.innerHTML = "Non abbastanza lettere";
        else
            error_box.innerHTML = "Parola inesistente";
    }
    else
        error_box.innerHTML = "Valore non valido";
    error_box.classList.add("error-box");
    document.getElementsByClassName("error-container")[0].appendChild(error_box);
    setTimeout(function(){
        document.getElementsByClassName("error-container")[0].removeChild(error_box);
    }, 2000);
}

function get_word(){
    all_row = document.getElementsByClassName("input-row");
    focus_div = all_row[cont_row];
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
    all_row = document.getElementsByClassName("input-row");
    focus_div = all_row[cont_row];
    box = focus_div.getElementsByClassName("input-box");

    for(var i=0; i<column_num; i++){
        box_obj[final_word[i]]++;
    }
    for(var i=0; i<column_num; i++){
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
    for(var i=0; i<column_num; i++){
        for(var j=0; j<column_num; j++){
            if(box[i].textContent == final_word[j]){
                if(document.getElementById(box[i].textContent).classList.contains("green") == false){
                    document.getElementById(box[i].textContent).classList.remove("gray");
                    document.getElementById(box[i].textContent).classList.add("yellow")
                }
                if(box_obj[box[i].textContent] != 0 && box[i].classList.contains("green") == false){  //risolto bug
                    box[i].classList.add("yellow");
                    box_obj[box[i].textContent]--;
                }
            }
        }
    }
}

function show_result(result){
    if(result){
        document.getElementById("result-div").style.visibility = "visible";
        document.getElementById("result-div").style.backgroundColor = "#04aa6d";
        document.getElementsByClassName("reload-button")[0].style.backgroundColor = "#04aa6d";
        document.getElementsByClassName("result-message")[0].innerHTML = "HAI VINTO!";
        document.getElementsByClassName("correct-answer")[0].innerHTML = "La parola giusta era "+final_word;
        cont_row = 6;
    }else{
        document.getElementById("result-div").style.visibility = "visible";
        document.getElementById("result-div").style.backgroundColor = "#d63e2d";
        document.getElementsByClassName("reload-button")[0].style.backgroundColor = "#d63e2d";
        document.getElementsByClassName("result-message")[0].innerHTML = "HAI PERSO!";
        document.getElementsByClassName("correct-answer")[0].innerHTML = "La parola giusta era "+final_word;
    }
}

function ent(){
    if(!check_option_open){
        if(cont_row < 6){
            word = get_word();
            if(word == "TESTB" || word == "TESTC"){
                document.getElementById("test-div").style.visibility = "visible";
                check_test = true;
                if(word == "TESTB")
                    check_test_type = "B";
                else
                    check_test_type = "C";
            }
            else if(cont_letter == column_num){
                if(set_word_list.includes(word)){
                    check_word(word);
                    if(check_test)
                        test();
                    if(final_word == word){
                        show_result(true)
                    }else{
                        cont_row++;
                        cont_letter = 0;
                        if(cont_row == 6)
                            show_result(false)
                    }
                }
                else
                    print_error(2); //parola inesistente
            }
            else if(cont_row != 6)
                print_error(1); //non abbastanza lettere
        }
        else{
            if(final_word == word)
                show_result(true)
            else
                show_result(false)
        }
    }
}

window.addEventListener("keydown", function(event){
    ek = event.key;
    invalid_key = ["Unidentified", "Meta", "Control", "Shift", "CapsLock", "Tab", "Alt", "AltGraph", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "NumLock", "Home", "Clear", "PageUp", "PageDown", "End", "Delete", "ScrollLock", "Pause", "F1", "F2", "AudioVolumeMute"];
    if(invalid_key.includes(ek) == false){
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
    document.getElementsByClassName("info-button")[0].onclick = close_info;
    document.getElementsByClassName("options-button")[0].disabled = true;
    document.getElementsByClassName("fa-question-circle")[0].classList.replace("far", "fas")
}

function close_info(){
    document.getElementsByClassName("instructions")[0].style.visibility = "hidden";
    document.getElementsByClassName("info-button")[0].onclick = show_info;
    document.getElementsByClassName("options-button")[0].disabled = false;
    document.getElementsByClassName("fa-question-circle")[0].classList.replace("fas", "far")
}

function show_options(){
    document.getElementsByClassName("options")[0].style.visibility = "visible";
    document.getElementsByClassName("options-button")[0].onclick = close_options;
    document.getElementsByClassName("info-button")[0].disabled = true;
    document.getElementsByClassName("fa-cog")[0].classList.add("options-button-closing");
    document.getElementsByClassName("fa-cog")[0].classList.remove("options-button-opening");
    check_option_open = true
}

function close_options(){
    document.getElementsByClassName("options")[0].style.visibility = "hidden";
    document.getElementsByClassName("options-button")[0].onclick = show_options;
    document.getElementsByClassName("info-button")[0].disabled = false;
    document.getElementsByClassName("fa-cog")[0].classList.remove("options-button-closing");
    document.getElementsByClassName("fa-cog")[0].classList.add("options-button-opening");
    check_option_open = false
}

