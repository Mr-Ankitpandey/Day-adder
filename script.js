let data = document.getElementById('description');
let date = document.getElementById('date');
let add_btn = document.getElementById('submit');
let delete_btn = document.getElementById('delete');
let info = document.getElementById('info');

// Load stored data from localStorage on page load
window.addEventListener('load', function() {
    let storedData = JSON.parse(localStorage.getItem('storedData'));
    if (storedData) {
        storedData.forEach(entry => {
            addEntryToDOM(entry.data, entry.date);
        });
    }
});

add_btn.addEventListener("click", function(){

  if(data.value == ''){
    alert('Please enter Description');
  }
  else if(date.value == ''){
    alert('Please Select Date');
  }
  let description = data.value;
  let dateValue = date.value;

  if (description && dateValue) {
    addEntryToDOM(description, dateValue);

    // Store the data in localStorage
    let storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    storedData.push({data: description, date: dateValue});
    localStorage.setItem('storedData', JSON.stringify(storedData));

    data.value = '';
    date.value = '';
  }
});

delete_btn.addEventListener("click", function(){
  info.innerHTML = ''; // Clear all content inside the info div

  // Clear stored data from localStorage
  localStorage.removeItem('storedData');
});

function addEntryToDOM(description, dateValue) {
  let entryDiv = document.createElement('div');
  entryDiv.classList.add('entry');

  let datadiv = document.createElement('p');
  let datediv = document.createElement('p');
  let deleteEntryBtn = document.createElement('button');

  datadiv.textContent = description;
  datediv.textContent = dateValue;
  deleteEntryBtn.textContent = 'X';

  deleteEntryBtn.addEventListener('click', function() {
    entryDiv.remove();
    // Remove the entry from localStorage
    let storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    storedData = storedData.filter(entry => !(entry.data === description && entry.date === dateValue));
    localStorage.setItem('storedData', JSON.stringify(storedData));
  });

  entryDiv.appendChild(datadiv);
  entryDiv.appendChild(datediv);
  entryDiv.appendChild(deleteEntryBtn);
  info.appendChild(entryDiv);
}
