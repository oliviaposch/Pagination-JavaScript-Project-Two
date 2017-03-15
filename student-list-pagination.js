/*
*PROJECT 2
*PROBLEM: the student list is quite long and the user has has to scroll down a lot 
*SOLUTION: create dynamically pages to show the students list. maximum student items per page are 10.
*/
const listParentDiv = document.getElementsByClassName('page')[0];
/*CREATE BLOCK DIV AND UL AT THE BOTTOM FROM THE STUDENTS LIST DIV FOR THE PAGINATIONS*/

//create a div element and giving a class
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
//create a Ul child for the new Div element  
const paginationUl = document.createElement('ul');
paginationUl.className = 'pagination-list';
//append the ul element list to the div element with class pagination
paginationDiv.appendChild(paginationUl);
//append the new div element with class pagination to the div parent with the class page
listParentDiv.appendChild(paginationDiv);


/*GETTING A STUDENTS LIST AND STORING IN A VARIABLE*/
const studentList = document.getElementsByClassName('student-item');
/*SHOW THE FIRST 10 STUDENTS (CHILDREN) OF THE LIST ON THE PAGE*/
for (let i = 0; i < studentList.length; i++) {
    if (i >= 0 && i < 10){
        studentList[i].style.display = '';
    } else {
        studentList[i].style.display = 'none';
    }
}

//ARRAY VARIABLE TO STORE THE INDEX OF STUDENT ITEM
let indexOfStudentItems = [];
for (let i = 0; i < studentList.length; i++) {
    indexOfStudentItems.push(i);
}
/*CREATE PAGINATIONS LI NAVIGATION*/
const createPagination = function(numberOfStudentsToDisplay, activePage){
	let numberOfPages = Math.ceil( numberOfStudentsToDisplay / 10);
		if (numberOfPages !== 1) {
			for (var i = 0; i < numberOfPages; i++) {
				const pageListLi = document.createElement('li');
				const pageLinkA = document.createElement('a');
				pageLinkA.setAttribute('href', '#'); //element.setAttribute(name, value);
				pageLinkA.textContent = i + 1; //element.textContent = "this is some sample text";
				
				 //adding click listener to the links using the function displayingTenStudents
            	pageLinkA.addEventListener('click', displayingTenStudents);
            	/*setting the active page to site when dom complete */
	            if (i === activePage-1) {
	                pageLinkA.className = 'active';
	            }
	            pageListLi.appendChild(pageLinkA);
				paginationUl.appendChild(pageListLi);
			}
		}
}
/**
 * add Active class to our active Link Pages
 */
const displayingTenStudents = function () {
    actPag = this.innerText;

    //store pagination-list class in a variable(currentlyActivePage) to set an active class
    let currentlyActivePage = document.getElementsByClassName('pagination-list')[0].children;
    for (let i = 0; i < currentlyActivePage.length; i++) {
        if (currentlyActivePage[i].children[0].textContent === actPag) { 
            currentlyActivePage[i].children[0].className = 'active';
        } else {
            currentlyActivePage[i].children[0].className = '';
        }
    }//console.log(currentlyActivePage);

    //hide students list
    for (let i = 0; i < studentList.length; i++) {
        studentList[i].style.display = 'none';
    }

    //limit the number of students for display
    for (let i = 0; i < indexOfStudentItems.length; i++) {
        let index = indexOfStudentItems[i];
        
        if (i >= (actPag-1) * 10 && i < actPag * 10){
            //here we set the index to our student list
            studentList[index].style.display = '';
        }//console.log(actPag);
    }
}

createPagination(indexOfStudentItems.length, 1);