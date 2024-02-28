
document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();


    var formData = new FormData(this); // Get form data
    // var data = {};
    // getting entries in a variable from form data object 
    var formDataObject = Object.fromEntries(formData);

    const arr = JSON.stringify(formDataObject);
    var fDO = JSON.parse(arr);

    console.log(arr);
    console.log(fDO.email);

    console.log(Object.fromEntries(formData));

    // formData.forEach(function (value, key) {
    //     data[key] = value;
    // });
    var table = new DataTable('#collTable');


    if ($.fn.dataTable.isDataTable('#collTable')) {
        table = $('#collTable').DataTable();
    }
    else {
        table = $('#collTable').DataTable({
            autoFill: false
        });
    }

    var firstName = fDO.firstName;
    var startYear = fDO.startYear;
    var graduationYear = fDO.graduationYear;
    var dob = new Date(fDO.dob);
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    var email = fDO.email;

    // Form Handling 

    // First Name Requirec

    if (firstName == "") {
        document.getElementById('firstNameError').textContent = "Please Enter your First Name";
    } else {
        document.getElementById('firstNameError').textContent = "";
    }


    // Email Validation
    var emailValid = validateEmail(email);
    if (!emailValid) {
        document.getElementById('emailError').textContent = "Invalid email";
    } else {
        document.getElementById('emailError').textContent = "";
    }


    // Age Validation
    var ageValid = true;
    if (m < 0 || (m == 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18) {
        document.getElementById('dobError').textContent = "You must be at least 18 years old";
        ageValid = false;
        event.preventDefault();
    } else {
        document.getElementById('dobError').textContent = "";
    }


    // Graduation Year Validation
    var graduationYearValid = true;
    if (graduationYear <= startYear) {
        document.getElementById('graduationYearError').textContent = "Graduation year must be greater than start year";
        graduationYearValid = false;
        event.preventDefault();
    }
    else {
        document.getElementById('graduationYearError').textContent = "";
    }

    if (!emailValid || !ageValid || !graduationYearValid) {
        // If data is not valid, display alert or perform other actions
        document.getElementById('formError').textContent = "Please Fill the Form Correctly";
        return;
    }
    else {
        document.getElementById('formError').textContent = "";
        addDatatoTable(fDO, table);
        $('#exampleModal').modal('hide'); // Hide modal

        this.reset(); // Reset form
    }
});


// Email Validation Function 

function validateEmail(email) {
    // Regular expression pattern for validating email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function addDatatoTable(fDO, table) {
    document.createElement('tr');
    document.getElementById("collTableDiv").style.display = "block";
    table.row
        .add([
            fDO.firstName,
            fDO.lastName,
            fDO.dob,
            fDO.email,
            fDO.address,
            fDO.startYear,
            fDO.graduationYear,
            `<button type="button" class="btn btn-info btn-sm px-3 py-3 mb-3 ms-3 fs-1 d-inline-flex justify-content-center align-items-center" onclick="editEntry(this)"><i class="fas fa-edit"></i></button>
                   <button type="button" class="btn btn-danger btn-sm fs-1 px-3 py-3 me-3 mb-3 d-inline-flex justify-content-center align-items-center" onclick="deleteEntry(this)"><i class="fa-solid fa-trash"></i></button>`
        ])
        .draw().node();

}

// Delete Function

function deleteEntry(button) {
    var row = button.closest('tr');
    row.remove();
    // Check if the table has any remaining rows
    var table = document.getElementById('data-table-body');
    if (table.rows.length == 0) {
        var table = new DataTable('#collTable');

        table.clear().draw();
        document.getElementById("collTableDiv").style.display = "none";       
    }
}





// Edit Function 

function editEntry(button) {
    var rowx = button.closest('tr');
    var cells = rowx.getElementsByTagName('td');

    // Extract data from the selected row
    var firstName = cells[0].innerText;
    var lastName = cells[1].innerText;
    var dob = cells[2].innerText;
    var email = cells[3].innerText;
    var address = cells[4].innerText;
    var startYear = cells[5].innerText;
    var graduationYear = cells[6].innerText;

    // Populate form fields with the extracted data
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('dob').value = dob;
    document.getElementById('email').value = email;
    document.getElementById('address').value = address;
    document.getElementById('startYear').value = startYear;
    document.getElementById('graduationYear').value = graduationYear;

    // Display the modal
    $('#exampleModal').modal('show');
    document.getElementById('myForm').addEventListener('submit', function (event) {
        rowx.remove();
        event.preventDefault();
    });
}





// Logic for adding more rows to a table .......

function function1() {
    var table1 = document.getElementById("table1");
    var row = table1.insertRow(-1);


    // Inserting Data to the Cells
    var degreeCell = row.insertCell(0);
    var collegeCell = row.insertCell(1);
    var startCell = row.insertCell(2);
    var passoutCell = row.insertCell(3);
    var percentageCell = row.insertCell(4)
    var backlogCell = row.insertCell(5)
    var actionCell = row.insertCell(6);

    degreeCell.innerHTML = `<input type="text" name="Degree" class="form-control"
        placeholder="Degree" aria-label="Degree" >`
    collegeCell.innerHTML = ` <input type="text" name="School" class="form-control"
        aria-label="School" >`;
    startCell.innerHTML = `<input type="month" class="form-control" name="Start" aria-label="Start"
        id="Start" value="2024-02" >`;
    passoutCell.innerHTML = ` <input type="month" class="form-control" name="Passout"
        aria-label="Passout" id="Passout" value="2024-02" >`;
    percentageCell.innerHTML = `<input type="number" name="Percentage" class="form-control"
        placeholder="Dont use % sign" aria-label="Percentage" min="0"
        max="100" >`;
    backlogCell.innerHTML = `<input type="number" name="Backlog" class="form-control"
        placeholder="If Any" min="0" max="10" aria-label="Backlog" >`;
    actionCell.innerHTML = '<a href="#" class="btn btn-danger" onclick="deleteEntry(this)">-</a>';
    return false;
}

