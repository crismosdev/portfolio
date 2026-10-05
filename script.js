
// The form submit and reset listeners attach to this element.
const feedbackForm = document.getElementById("feedback-form");

// Live region that announces the success message after a valid submit.
const feedbackStatus = document.getElementById("feedback-status");

// Controls. Each one is validated on its own and styled from the result.
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("topic");
const commentsInput = document.getElementById("comments");
const websiteInput = document.getElementById("website");

// Error text for each control. Shown or hidden together with that field's state.
const fullNameError = document.getElementById("full-name-error");
const emailError = document.getElementById("email-error");
const topicError = document.getElementById("topic-error");
const commentsError = document.getElementById("comments-error");
const websiteError = document.getElementById("website-error");


/********************************************************************************
 * Field State Helpers
 ********************************************************************************/

// Replaces any previous valid state so a field cannot keep both classes.
function showFieldError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    input.classList.add("invalid");
    input.classList.remove("valid");
}

/********************************************************************************/
// Hides the message without clearing its text; the next error overwrites it.
function clearFieldError(input, errorElement) {
    errorElement.style.display = "none";
    input.classList.remove("invalid");
    input.classList.add("valid");
}

/********************************************************************************/
// Event listener for the form reset event.
feedbackForm.addEventListener("reset", resetForm);

// Puts the form back to its initial state: values, borders, messages, and the counter.
// Clear calls this through the reset event. Submit calls it after reading the name, then writes the thanks message.
function resetForm() {

    fullNameInput.value = "";
    emailInput.value = "";
    topicInput.value = "";
    commentsInput.value = "";
    websiteInput.value = "";

    const fields = [fullNameInput, emailInput, topicInput, commentsInput, websiteInput];
    const errors = [fullNameError, emailError, topicError, commentsError, websiteError];

    // Removes the valid and invalid classes from all fields.
    fields.forEach(function (input) {
        input.classList.remove("valid", "invalid");
    });

    // Hides all error messages.
    errors.forEach(function (errorElement) {
        errorElement.style.display = "none";
    });

    // Leaves the counter hidden and the error message empty.
    feedbackStatus.textContent = "";
    commentsError.textContent = "";
    commentsError.style.color = "";
}

/********************************************************************************
 * Field Validation
 ********************************************************************************/

// Event listener for the full name input event.
fullNameInput.addEventListener("input", function () {
    if (fullNameInput.classList.contains("invalid")) {
        validateFullName();
    }
});

// Checks the full name length.
function validateFullName() {
    // Trim spaces.
    const value = fullNameInput.value.trim(); 
  
    // Check if the trimmed value is shorter than 2 characters.
    if (value.length < 2) {
      showFieldError(
        fullNameInput, 
        fullNameError, 
        "Enter at least 2 characters."
      );
      return false; // Validation failed
    }
  
    // If valid, clear error styling.
    clearFieldError(fullNameInput, fullNameError);
    return true; // Validation passed
  }

/********************************************************************************/
// Event listener for the email input event.
emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("invalid")) {
        validateEmail();
    }
});

// Checks the email for one @ and a domain that contains a dot. Split on @ so a missing or extra @ fails before the domain is inspected.
function validateEmail() {
    const value = emailInput.value.trim();
    
    // Check if value is not empty and includes both '@' and '.'
    if (value === "" || !value.includes('@') || !value.includes('.')) {
      showFieldError(emailInput, emailError, "Enter an email address with @ and a domain.");
      return false;
    }
    
    clearFieldError(emailInput, emailError);
    return true;
  }

/********************************************************************************/
//Event listener for the topic select event.
// Validate immediately as soon as the user selects an option.
topicInput.addEventListener('change', validateTopic);
// Validate if the user tabs past it.
topicInput.addEventListener('blur', validateTopic);

// Checks that a topic other than the placeholder is selected.. An empty value is the only failure; the option list itself is not re-checked here.
function validateTopic() {
    if (topicInput.value === "") {
        showFieldError(topicInput, topicError, "Select a topic.");
        return false;
    }

    clearFieldError(topicInput, topicError);
    return true;
}

/********************************************************************************/
// Checks the comments length. The counter will read the same minimum later.
// Trimmed length matches validateFullName, so spaces alone cannot satisfy the minimum.
function validateComments() {
    // Trim whitespace.
    const value = commentsInput.value.trim(); 
  
    // Check if fewer than 15 characters.
    if (value.length < 15) {
      showFieldError(commentsInput, commentsError, "Enter at least 15 characters.");
      return false; // Validation failed.
    }
  
    // If 15+ characters, clear error styling & mark as valid.
    clearFieldError(commentsInput, commentsError);
    return true; // Validation passed
  }

/********************************************************************************/
// Event listener for the comments input event.
commentsInput.addEventListener('input', updateCommentsCount);

// Updates the comments counter and the border together.
// Submit adds invalid on its own, so a later keystroke that reaches 15 would leave the red border unless this removes that class.
function updateCommentsCount() {
    const currentLength = commentsInput.value.trim().length;

    if (currentLength < 15) {
      commentsError.textContent = `${currentLength} characters entered — Enter at least 15.`;
      commentsError.style.color = "red";
      commentsError.style.display = "block";
      commentsInput.classList.add("invalid");
      commentsInput.classList.remove("valid");
    } else {
      commentsError.textContent = `${currentLength} characters entered.`;
      commentsError.style.color = "green";
      commentsError.style.display = "block";
      commentsInput.classList.remove("invalid");
      commentsInput.classList.add("valid");
    }
}

/********************************************************************************/
// Checks the optional website with the browser's URL rules. type="url" already defines a valid URL, including the https:// requirement in the message.
function validateWebsite() {
    const value = websiteInput.value.trim();

    if (value !== "" && !websiteInput.validity.valid) {
        showFieldError(websiteInput, websiteError, "Enter a valid URL, including https://.");
        return false;
    }

    clearFieldError(websiteInput, websiteError);
    return true;
}

/********************************************************************************
 * Form Events
 ********************************************************************************/
// Event listener for the form submit event.
feedbackForm.addEventListener("submit", handleFeedbackSubmit);

/********************************************************************************/

// Required and minlength would block this event and show the browser tooltip, so the written messages would stay hidden.
// Every validator runs so one invalid field does not hide the errors on the fields after it.
function handleFeedbackSubmit(event) {
    event.preventDefault();

    validateFullName();
    validateEmail();
    validateTopic();
    validateComments();
    validateWebsite();
}

/********************************************************************************/

