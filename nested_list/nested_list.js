"use strict";

(function() {
	var name = ["box1.txt", "box2.txt", "box3.txt", "box4.txt", "box5.txt", "box6.txt", "box7.txt", "box8.txt", "box9.txt", "box10.txt"];	
    
    // // ------------------------------------------------------------------------
    // // CREATES THE FIRST UL IN THE MAIN DIV
    // // HOLDS THE LIST OF VMS AS BUTTONS AS LI
    // // ------------------------------------------------------------------------
    var main_node = document.createElement("UL");
    main_node.setAttribute("id", "vm_name_list");
    document.getElementById("main").appendChild(main_node);

    // // ------------------------------------------------------------------------
    // // ITERATES THROUGH THE NAME ARRAY CREATING THE LI AND BUTTONS FOR EACH
    // // ------------------------------------------------------------------------
    for (let i = 0; i < name.length; i++) {
        // Creates the li inside the of the ul vm_name_list
        var name_node = document.createElement("LI");
        name_node.setAttribute("id", "vm_" + i);
        main_node.appendChild(name_node); // appends the li to the ul

        // creates a button inside of each li 
        var btn_node = document.createElement("BUTTON");
        btn_node.setAttribute("id", "btn_" + i);
        btn_node.setAttribute("value", 0);

        // displays vm name inside the list
        var but_textnode = document.createTextNode(name[i]);
        btn_node.appendChild(but_textnode); // appends the text to the button
        name_node.appendChild(btn_node); // appends the button to the li

        // // ------------------------------------------------------------------------
        // // SETS THE TOGGLE FOR EACH VM NAME
        // // ------------------------------------------------------------------------
        btn_node.addEventListener("click", function() {
            var value = parseInt(this.getAttribute("value"));
            if (value == 0) {
                // // ------------------------------------------------------------------------
                // // CREATES THE UL FOR THE NESTED LIST
                // // ------------------------------------------------------------------------
                var info_list_node = document.createElement("UL");
                info_list_node.setAttribute("id", "vm_info_list_" + i);
                document.getElementById("vm_" + i).appendChild(info_list_node); // appends ul to li (name_node)
                // // ------------------------------------------------------------------------
                // // XMLHTTPREQUEST (READS THE FILE)
                // // ------------------------------------------------------------------------
                var xhr = new XMLHttpRequest(),
                    method = "GET",
                    url = "files/" + name[i];
                xhr.open(method, url, true);

                xhr.onreadystatechange = function() {
                    // checks the the page is fully loaded and status is ok
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        var notes = xhr.responseText.split("\n");
console.log(xhr)
                        // // ------------------------------------------------------------------------
                        // // READS THE FILE AND CREATES THE NESTED LIST 
                        // // ------------------------------------------------------------------------
                        for (let j = 0; j < notes.length; j++) {
                            if (notes[j] == "Start**") {
                                // j++ makes the line jump by 1, causing the button to display the title
                                j++;
                                // // ------------------------------------------------------------------------
                                // // PLACES THE TITLE NAME AS BUTTONS
                                // // ------------------------------------------------------------------------
                                var info_node = document.createElement("LI");
                                info_node.setAttribute("id", "vm_" + i + "_info_" + i);
                                info_list_node.appendChild(info_node); // appends the li to the ul
                                
                                var btn_info_node = document.createElement("BUTTON");
                                btn_info_node.setAttribute("id", "info_button_" + i);
                                btn_info_node.setAttribute("value", 0);
                                
                                // j++ is used again here to jump by 1 line, causing the nested li to display the
                                // detailed info only
                                var info_textnode = document.createTextNode(notes[j++]);
                                btn_info_node.appendChild(info_textnode); // appends the text to the button
                                info_node.appendChild(btn_info_node); // appends the button to the li

                                // // ------------------------------------------------------------------------
                                // // SETS THE TOGGLE FOR TITLE LIST (1ST NESTED LEVEL)
                                // // ------------------------------------------------------------------------
                                btn_info_node.addEventListener("click", function() {
                                    var title_value = parseInt(this.getAttribute("value"));
                                    if (title_value == 0) {
                                        // // ------------------------------------------------------------------------
                                        // // CREATES THE NESTED DETAILED INFO (2 NESTED LEVEL)
                                        // // ------------------------------------------------------------------------
                                        var detailed_info = document.createElement("UL");
                                        detailed_info.setAttribute("id", "detailed_vm_info_" + j);
                                        document.getElementById("vm_" + i + "_info_" + i).appendChild(detailed_info); // appends ul to li (info_node)

                                        while (notes[j] != "End**") {
                                            var detailed_info_node = document.createElement("LI");
                                            detailed_info_node.setAttribute("id", "vm_detailed_info_" + j);
                                            detailed_info.appendChild(detailed_info_node); // appends li to ul

                                            var detailed_info_textnode = document.createTextNode(notes[j]);
                                            detailed_info_node.appendChild(detailed_info_textnode); // appends text to li 
console.log("j is in " + notes[j] + "\n" + j)
                                            j++;
                                        }
                                        this.setAttribute("value", 1);
console.log(this)
                                    } else {
                                        var temp = j-1;
                                        var nested_toggle = document.getElementById("detailed_vm_info_" + temp);
console.log("j in nested_toggle" + j)
                                        if (nested_toggle.style.display != 'none') {
                                            nested_toggle.style.display = 'none';
                                        } else {
                                            nested_toggle.style.display = '';
                                        } // closes if inside else inside btn_info_node eventListner
                                    } // closes the if inside the nested toggle
                                }); // closes the nested toggle
                            } // closes the if inside of for inside of if inside of onreadystatechange function
                        } // closes the for loop inside if inside onreadystatechange function
                    } // closes the if statement inside onreadystatechange function
                }; // closes the onreadystatechange function
                xhr.send();

                // allows btn_node to be value of 1 so it will only load the file once and
                // then toggle
                this.setAttribute("value", 1);
console.log(this)
            } else {
                var toggle = document.getElementById("vm_info_list_" + i);
                if (toggle.style.display != 'none') {
                    // hides the vm_info_list
                    toggle.style.display = 'none';
                } else {
                    // shows the vm_info_list
                    toggle.style.display = '';
                } // closes the if statement inside of the toggle
            } // closes the if statement for the toggle
        }); // closes toggle
    } // closes the for loop for name
})(); // closes the main function