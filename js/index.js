// Saqlangan kontaktlarni arrayga saqlash uchun
var contacts = [];

// HTML elementlarni JSga chaqirib olish
var elNewContactForm = $_(".js-new-contact-form");
var elNewContactNameInput = $_(
  ".js-new-contact-form__name-input",
  elNewContactForm
);

var elNewContactSurnameInput = $_(
  ".js-new-contact-form__surname-input",
  elNewContactForm
);

var elNewContactNumberInput = $_(
  ".js-new-contact-form__contact-input",
  elNewContactForm
);

var elNewContactRelationshipInput = $_(
  ".js-new-contact-form__relationship-input",
  elNewContactForm
);

var elContacts = $_(".contacts");

var createContactObject = function (name, surname, number, relationship) {
  return {
    name,
    surname,
    number,
    relationship,
  };
};

var renderContactsList = function () {

  elContacts.innerHTML = "";

  contacts.forEach(function (contact, i) {
    var newLiContact = createElement("li", "contact__item list-group-item mt-1");

    var newDivFullname = createElement(
      "div",
      "contact__fullname",
      `${contact.name} ${contact.surname}`
    );

    var newDivRelationship = createElement(
      "div",
      "contact__relationship small",
      contact.relationship
    );

    var newDivNumber = createElement(
      "a",
      "contact__phone-number",
      contact.number
    );

    newDivNumber.href = `tel:${contact.number}`;

    var newElBtn = createElement('button', 'contacts__remove-button');
    newElBtn.textContent = 'x';
    newElBtn.value = i;

    newLiContact.appendChild(newDivFullname);
    newLiContact.appendChild(newDivRelationship);
    newLiContact.appendChild(newDivNumber);
    newLiContact.appendChild(newElBtn);

    elContacts.appendChild(newLiContact);

    newElBtn.addEventListener('click', function() {

      contacts.splice(parseInt(this.value), 1);
      renderContactsList();
    });
  });
};

var clearInputFields = function () {
  elNewContactNameInput.value = "";
  elNewContactSurnameInput.value = "";
  elNewContactNumberInput.value = "";
  elNewContactRelationshipInput.value = "";

  elNewContactNameInput.focus();
};

elNewContactNameInput.focus();

// =====================================================

elNewContactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var name = elNewContactNameInput.value.trim();
  var surname = elNewContactSurnameInput.value.trim();
  var number = elNewContactNumberInput.value.trim();
  var relationship = elNewContactRelationshipInput.value.trim();

  contacts.push(createContactObject(name, surname, number, relationship));

  clearInputFields();
  renderContactsList();
});