
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
