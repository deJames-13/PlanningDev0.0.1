// Get modal element
var modal = document.getElementById("pdfModal");

// Get all links with class "openModal"
var openModalBtns = document.querySelectorAll(".openModal");

// Get close button
var closeBtn = document.getElementsByClassName("close")[0];

// Attach click event to all open modal buttons
openModalBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        var googleDriveLink = this.getAttribute("data-pdf"); // Get the Google Drive link from the data-pdf attribute
        document.getElementById("pdfFrame").src = googleDriveLink;
        modal.style.display = "block";
    });
});

// When the user clicks the close button, close the modal
closeBtn.onclick = function () {
    modal.style.display = "none";
    document.getElementById("pdfFrame").src = ""; // Clear the src to stop loading
}

// When the user clicks outside the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("pdfFrame").src = ""; // Clear the src to stop loading
    }
}
