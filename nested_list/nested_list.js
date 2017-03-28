"use strict";

(function() {
	var name = ["box1.txt", "box2.txt", "box3.txt", "box4.txt", "box5.txt", "box6.txt", "box7.txt", "box8.txt", "box9.txt", "box10.txt"];	
    
        // // ------------------------------------------------------------------------
    // // CREATE THE UL LI BUTTONS AND TEXTNODES
    // // create_element -> this will create the element and append it to the parent, sets the value to 0 until we read the file, then turning the value to 1 once the file is read
    // // create_wo_append -> crates the element without appending it, sets the value to 0 until we read the file, then turning the value to 1 once the file is read
    // // create_textnode -> places the text in the parent
    // // ------------------------------------------------------------------------
    function create_element(element, id_value, parent) {
        element = document.createElement(element);
        element.setAttribute("id", id_value);
        element.setAttribute("value", 0);
        document.getElementById(parent).appendChild(element);
        return element;
    }

    function create_wo_append(element, id_value) {
        element = document.createElement(element);
        element.setAttribute("id", id_value);
        element.setAttribute("value", 0);
        return element;
    }

    function create_textnode(content, parent) {
        var textnode = document.createTextNode(content);
        document.getElementById(parent).appendChild(textnode);
        return textnode;
    }

    // // ------------------------------------------------------------------------
    // // CREATE THE VM NAME LIST WITH BUTTONS AND TEXTNODES
    // // create the ul, li, and button for the vm's name list
    // // ------------------------------------------------------------------------
    function vm_name() {
        create_element("ul", "vm_name_list", "main"); // (element, id_value, parent)

        // creates the li, button, and textnode for the vm's name list
        // then uses the event listener function to read the file and toggle the element
        for (let i = 0; i < name.length; i++) {
            create_element("li", "vm_" + i, "vm_name_list"); // (element, id_value, parent)
            create_element("button", "btn_" + i, "vm_" + i); // (element, id_value, parent)
            create_textnode(name[i], "btn_" + i); // (content, parent)
            event_listener("btn_", i, name[i]); // (element, i)
        }
    }

    // // ------------------------------------------------------------------------
    // // EVENT LISTENER
    // // event_listener -> used for the nested list of titles
    // // nested_event_listener -> used for the detailed info on the vm's
    // // ------------------------------------------------------------------------
    function event_listener(element, i, name) {
        var button = document.getElementById(element + i);
        button.addEventListener("click", function() {
            // checks the value of the element
            var value = parseInt(this.getAttribute("value"));
            if (value === 0) {
                create_element("ul", "nested_title_list_" + i, "vm_" + i);

                read_file(name, i);

                this.setAttribute("value", 1);
            } else {
                toggle_element("nested_title_list_" + i);
            }
        });
    }

    function nested_event_listener(button_id, ul_id) {
        var button = document.getElementById(button_id);
        button.addEventListener("click", function() {
            toggle_element(ul_id);
        });
    }

    // // ------------------------------------------------------------------------
    // // TOGGLE
    // // ------------------------------------------------------------------------
    function toggle_element(li) {
        var toggle = document.getElementById(li);
        if (toggle.style.display != "none") {
            toggle.style.display = "none";
        } else {
            toggle.style.display = "";
        }
    }

    // // ------------------------------------------------------------------------
    // // READ FILE
    // // reads the file once the page is loaded and status is ok
    // // ------------------------------------------------------------------------
    function read_file(name, i) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // splits the file on each new line
                var notes = this.responseText.split("\n");

                for (let j = 0; j < notes.length; j++) {
                    if (notes[j] == "Start**") {
                        j++;
                        // CREATES LI, BUTTON, AND TEXTNODE FOR NESTED TITLE
                        // j and i are used here in order to keep the right file under the right vm 
                        create_element("li", "nested_title_" + j + "_vm_" + i, "nested_title_list_" + i); // (element, id_value, parent)
                        create_element("button", "nested_title_btn_" + j + "_vm_" + i, "nested_title_" + j + "_vm_" + i); // (element, id_value, parent)
                        create_textnode(notes[j], "nested_title_btn_" + j + "_vm_" + i); // (content, parent)  
                            
                        // CREATES THE UL AND LI FOR THE DETAILED NOTES
                        // j and i are used here in order to keep the right file under the right vm 
                        // set detailed_ul style to none so it will not show it until clicked
                        create_element("ul", "detailed_notes_" + j + "_vm_" + i, "nested_title_" + j + "_vm_" + i); // (element, id_value, parent)
                        var detailed_ul = document.getElementById("detailed_notes_" + j + "_vm_" + i);   
                        detailed_ul.setAttribute("style", "display: none;");
                        nested_event_listener("nested_title_btn_" + j + "_vm_" + i, "detailed_notes_" + j + "_vm_" + i);
                        j++;

                        var result = "";

                        // &lt and <pre> is used to keep the true format of the file that is read
                        while (notes[j] != "End**") {
                            var detailed_notes = notes[j].replace("<", "&lt");
                            result += "<li><pre>" + detailed_notes + "</pre></li>";
                            j++;
                        }
                        detailed_ul.innerHTML = result;
                    }
                }
            }
        };
        xhttp.open("GET", "files/" + name, true);
        xhttp.send();
    }

vm_name();
})();
