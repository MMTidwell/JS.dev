"use strict";

(function() {
	var name = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9", "box10",];	
	var info = ["inside_box1", "inside_box2", "inside_box3", "inside_box4", "inside_box5"];

    // Creates the ul to hold everything
    var main_node = document.createElement("UL");
    main_node.setAttribute("id", "box_name_list");
    document.getElementById("main").appendChild(main_node);

    // CREATES THE BULLET LIST FOR THE NAME ARRAY (1ST LEVEL)
    for (let i = 0; i < name.length; i++) {
        // creates the li
        var name_node = document.createElement("LI");
        name_node.setAttribute("id", "box_" + i);
        // appends the li to the ul
        main_node.appendChild(name_node);
        // creates a button indise of each li 
        var but_node = document.createElement("BUTTON");
        but_node.setAttribute("id", "name_button");

        // displays box name inside the list
        var but_textnode = document.createTextNode(name[i]);
        but_node.appendChild(but_textnode);
        name_node.appendChild(but_node);


        // SHOWS INFO LIST WHEN BOX NAME BUTTON IS CLICKED
        document.getElementById("box_" + i).addEventListener("click", function() {

            // Creates the 2nd level of the view showing the info array
            // name_node is needed to run instead of getElemenetById...
            var info_list_node = document.createElement("UL");
            info_list_node.setAttribute("id", "box_info_list");
            document.getElementById("box_" + i).appendChild(info_list_node);

            // CREATES THE BULLET LIST FOR THE INFO ARRAY (2ND LEVEL)
            for (let j = 0; j < info.length; j++) {
                var info_node = document.createElement("LI");
                info_node.setAttribute("id", "box_" + i + "_info_" + j);

                // creates a button indise of each li 
                var but_info_node = document.createElement("BUTTON");
                but_info_node.setAttribute("id", "info_button");

                info_list_node.appendChild(info_node);
                var but_info_textnode = document.createTextNode(info[j]);
                but_info_node.appendChild(but_info_textnode);
                info_node.appendChild(but_info_node);
            }
        });
    }
})();

