"use strict";

(function() {
	var name = ["box1.txt", "box2.txt", "box3.txt", "box4.txt", "box5.txt", "box6.txt", "box7.txt", "box8.txt", "box9.txt", "box10.txt",];	
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
        // TOGGLE THE NESTED LIST
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
                    but_info_node.setAttribute("id", "info_button_" + j);

                    // appends the info array as buttons inside of the ul vm_i_info_j
                    info_list_node.appendChild(info_node);
                    var but_info_textnode = document.createTextNode(info[j]);
                    but_info_node.appendChild(but_info_textnode);
                    info_node.appendChild(but_info_node);

                    // creates the obj for the file
                    var xhr = new XMLHttpRequest(),
                        method = "GET",
                        url = "files/" + name[i];

                    xhr.open(method, url, true);

                    // creates ul to hold the detailed info and appends it to the nested list
                    var detail_list_node = document.createElement("UL");
                    detail_list_node.setAttribute("id", "detail_" + j);
                    document.getElementById("vm_" + i + "_info_" + j).appendChild(detail_list_node);

                    // when the page is loaded, and vm is clicked then it will show the detailed list nested inside the nested list
                    xhr.onreadystatechange = function() {
                        // if statement will check if the page is loaded and status is ok
                        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                            // holds the data from the file
                            var notes = xhr.responseText;

                            // creates the li inside of the ul for detailed list node
                            var detail_node = document.createElement("LI");
                            detail_node.setAttribute("id", "details");

                            // appends the notes to the li for details
                            detail_list_node.appendChild(detail_node);
                            var detail_info_textnode = document.createTextNode(notes);
                            detail_node.appendChild(detail_info_textnode);
                        }
                    };
                    // send the file to the DOM
                    xhr.send();
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