var spaceId;
var updateId;
var travelspaces;
var sortState;
var searchText;

// local storage
function Upload() {
    console.log("Upload");
    localStorage.setItem('spaceId', spaceId);
    localStorage.setItem('updateId', updateId);
    localStorage.setItem('sortState', sortState);
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('travelspaces', JSON.stringify(travelspaces));
}
function Download() {
    console.log("Download");
    try {
        spaceId = parseInt(localStorage.getItem('spaceId') || 0);
        updateId = parseInt(localStorage.getItem('updateId') || -1);
        sortState = parseInt(localStorage.getItem('sortState') || 0);
        searchText = localStorage.getItem('searchText') || "";
        travelspaces = JSON.parse(localStorage.getItem('travelspaces') || "[]");
    }
    catch (error) {
        console.error(error);
        spaceId = 0;
        updateId = -1;
        sortState = 0;
        searchText = "";
        travelspaces = [];
    }
}

// remove place
function removePlace(id) {
    const index = travelspaces.findIndex(space => space.id == id);
    if (index > -1) {
        console.log("Place removed:", travelspaces[index]);
        travelspaces.splice(index, 1);
    }
    Upload();
}

// search
function searchMatched(placeName) {
    if (searchText == "") return true;

    placeName = placeName.toLowerCase();
    searchText = searchText.toLowerCase();

    const placeWords = placeName.split(" ");
    const searchWords = searchText.split(" ");

    for (let i = 0; i < searchWords.length; i++) {
        if (placeWords.includes(searchWords[i])) {
            return true;
        }
    }
    return placeName.includes(searchText);
}

// clear form fields
function clearForm() {
    console.log("form cleared");
    $("#place-name").val("");
    $("#place-address").val("");
    $("#place-rating").val("");
    $("#place-image").val("");
}

function updateForm() {
    console.log("update place in form: ", updateId);
    if (updateId != -1) {
        const index = travelspaces.findIndex(space => space.id == updateId);
        if (index > -1) {
            $("#place-name").val(travelspaces[index].placeName);
            $("#place-address").val(travelspaces[index].placeAddress);
            $("#place-rating").val(travelspaces[index].placeRating);

            const placeImageFileName = travelspaces[index].placeImageFileName;

            let list = new DataTransfer();
            let file = new File(["content"], placeImageFileName);

            list.items.add(file);
            let myFileList = list.files;

            $("#place-image").prop("files", myFileList);
        }
    }
}

// show to form to add travel places
function showForm() {
    Download();

    const form = $('#form-box');
    const places = $('#travelspace');

    console.log("places.style.display:", places.css('display'));
    console.log("form.style.display:", form.css('display'));

    if (places.css('display') == 'block') places.css('display', 'none');
    if (form.css('display') == 'none') form.css('display', 'block');
}


// show travel places
function showTravelPlaces() {
    console.log("Show Travel Places");
    Download();

    const form = $('#form-box');
    const places = $('#travelspace');

    console.log("places.style.display:", places.css('display'));
    console.log("form.style.display:", form.css('display'));

    if (form.css('display') == 'block') form.css('display', 'none');
    if (places.css('display') == 'none') places.css('display', 'block');

    $('.searchbox').val(searchText);
    console.log("searchText:", searchText);

    let tbody = $('#tbody');
    tbody.html('');

    try {
        if (sortState == 1) {
            travelspaces.sort((a, b) => b.placeRating - a.placeRating);
        }
        else if (sortState == 2) {
            travelspaces.sort((a, b) => a.placeRating - b.placeRating);
        }
        else {
            travelspaces.sort((a, b) => a.id - b.id);
        }
        console.log("sort done with state:", sortState);
    }
    catch (error) {
        console.error(error);
    }

    try {
        console.log(travelspaces);
        console.log("adding place in tbody");
        for (let space of travelspaces) {
            if (searchMatched(space.placeName)) {
                const row = `
                <tr id="${space.id}">
                    <td>${space.placeName}</td>
                    <td>${space.placeAddress}</td>
                    <td>${space.placeRating}</td>
                    <td><img src="${space.placeImageUrl}"</td>
                    <td>
                        <button class="delete-btn">Delete</button>
                        <button class="update-btn">Update</button>
                    </td>
                </tr>`;
                tbody.append(row);
            }
        }
        console.log("places are added in tbody");
    }
    catch (error) {
        console.error(error);
    }
    $('.searchbox').focus();

    // delete place Event listener
    $('table').on('click', '.delete-btn', function (e) {
        const id = $(this).parent().parent().attr('id');
        console.log("delete place: ", id);

        $(this).parent().parent().remove();
        removePlace(id);
    });

    // update place Event listener
    $('.update-btn').click(function (e) {
        updateId = $(this).parent().parent().attr('id');

        console.log("Update button clicked: ", updateId);
        Upload();

        showForm();
        updateForm();
    });
}


// ---------------------------------------------------------------------
// Form Event Listener
// ---------------------------------------------------------------------

// reset form
$(document).ready(function () {
    $('.reset-btn').click(function (e) {
        console.log("form reset");
        updateId = -1;
        Upload();
    });
});

// back to travel places page
$(document).ready(function () {
    $('.backToTravelPlaces').click(function (e) {
        console.log("back to travel places");
        updateId = -1;
        Upload();
        showTravelPlaces();
    });
});

// add travel place
$(document).ready(function () {
    $('form').submit(function (e) {
        e.preventDefault();

        console.log("Form Submitted.");

        id = parseInt(spaceId + 1);
        if (updateId != -1) {
            id = parseInt(updateId);
        }
        else spaceId = parseInt(spaceId + 1);


        const index = travelspaces.findIndex(space => space.id == id);
        console.log("id:", id, "idx:", index);
        console.log("space id:", spaceId);

        console.log("Travel Spaces:", travelspaces);

        const placeName = $('#place-name').val();
        const placeAddress = $('#place-address').val();
        const placeRating = $('#place-rating').val();
        const placeImage = $('#place-image').prop('files')[0];

        const reader = new FileReader();
        reader.readAsDataURL(placeImage);

        reader.onload = () => {
            let imageUrl = reader.result;
            if (updateId != -1 && placeImage.name == travelspaces[index].placeImageFileName) {
                imageUrl = travelspaces[index].placeImageUrl;
            }

            const travelSpace = {
                id: id,
                placeName: placeName,
                placeAddress: placeAddress,
                placeRating: placeRating,
                placeImageUrl: imageUrl,
                placeImageFileName: placeImage.name
            }

            if (index > -1) {
                travelspaces[index] = travelSpace;
                console.log("updated: ", travelSpace);
            }
            else {
                travelspaces.push(travelSpace);
                console.log("added: ", travelSpace);
            }

            clearForm();
            Upload();
            showTravelPlaces();
        }
    });
});
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------


// ---------------------------------------------------------------------
// Travel Places Event listner
// ---------------------------------------------------------------------

// create new tourist place
$(document).ready(function () {
    $('.add-place').click(function (e) {
        console.log("Add travel place");
        updateId = -1;
        Upload();
        showForm();
    });
});

// sort by rating
$(document).ready(function () {
    $('#rating').click(function () {
        console.log("Clicked on rating to sort.");

        sortState = (sortState + 1) % 3;
        console.log("sorting state: ", sortState);

        Upload();
        showTravelPlaces();
    });
});

// searchbox key down
$(document).ready(function () {
    $('.searchbox').keyup(function (e) {
        searchText = e.target.value;
        console.log("searchbox keydown:", searchText);

        console.log(searchText);
        Upload();
        showTravelPlaces();
    });
});
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------



// ---------------------------------------------------------------------
// App start
// ---------------------------------------------------------------------
$(document).ready(function () {
    showForm();
});
// ---------------------------------------------------------------------