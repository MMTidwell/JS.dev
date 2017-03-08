"use strict";

(function() {
	var name = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9", "box10",];	
	var info = ["inside_box1", "inside_box2", "inside_box3", "inside_box4", "inside_box5"];

    // Creates the ul to hold everything
    var main_node = document.createElement("UL");
    main_node.setAttribute("id", "vm_name_list");
    // appends the ul to the main div
    document.getElementById("main").appendChild(main_node);

    // CREATES THE BULLET LIST FOR THE NAME ARRAY (1ST LEVEL)
    for (let i = 0; i < name.length; i++) {
        // Creates the li inside the of the ul vm_name_list
        var name_node = document.createElement("LI");
        name_node.setAttribute("id", "vm_" + i);
        main_node.appendChild(name_node);

        // creates a button inside of each li 
        var but_node = document.createElement("BUTTON");
        but_node.setAttribute("id", "btn" + i);

        // displays vm name inside the list
        var but_textnode = document.createTextNode(name[i]);
        but_node.appendChild(but_textnode);
        name_node.appendChild(but_node);

        // this will allow the but_node to toggle
        but_node.setAttribute("value", 0);

        // toggling the but_node
        but_node.addEventListener("click", function() {
            var value = parseInt(this.getAttribute("value"));
            if (value == 0) {
                // CREATES THE NESTED BULLETED LIST FOR THE INFO ARRAY (2ND LEVEL)
                // creates the ul to hold the nested list
                var info_list_node = document.createElement("UL");
                info_list_node.setAttribute("id", "vm_info_list_" + i);
                document.getElementById("vm_" + i).appendChild(info_list_node);

                for (let j = 0; j < info.length; j++) {
                    // creates the li for the info array
                    var info_node = document.createElement("LI");
                    info_node.setAttribute("id", "vm_" + i + "_info_" + j);

                    // creates a button inside of each li 
                    var but_info_node = document.createElement("BUTTON");
                    but_info_node.setAttribute("id", "info_button");

                    // appends the info array as buttons inside of the ul vm_i_info_j
                    info_list_node.appendChild(info_node);
                    var but_info_textnode = document.createTextNode(info[j]);
                    but_info_node.appendChild(but_info_textnode);
                    info_node.appendChild(but_info_node);
                }
                // sets the attributes value to 1 for but_node
                this.setAttribute("value", 1);
            // runs if the value is anything other than 1 for but_node
            } else {
                // the added i in toggle makes each vm_info_list different and identifiable and not null
                var toggle = document.getElementById("vm_info_list_" + i);
                if (toggle.style.display != 'none') {
                    // hides the vm_info_list_i if it is showing
                    toggle.style.display = 'none';
                } else {
                    // shows the vm_info_i if it is not showing
                    toggle.style.display = '';
                }
            }
        });
    }
})();