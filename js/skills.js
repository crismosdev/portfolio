/********************************************************************************
 * File: skills.js
 * Purpose: Manages skills showcase on the About page.
 ********************************************************************************/

/********************************************************************************
 * Skills Data
 ********************************************************************************/
const skills = [
    {
        id: 1,
        name: "HTML",
        category: "Frontend",
        proficiency: 4,
        yearsExperience: 2,
        description: "Started with Scrimba's interactive HTML & CSS course in August 2024 and continued focusing on semantic markup, landmarks, and accessibility at Högskolan Kristianstad."
    },
    {
        id: 2,
        name: "CSS",
        category: "Frontend",
        proficiency: 4,
        yearsExperience: 2,
        description: "Learned layout fundamentals on Scrimba and practiced building responsive Flexbox and CSS Grid layouts with custom properties and keyboard focus styles."
    },
    {
        id: 3,
        name: "JavaScript",
        category: "Frontend",
        proficiency: 2,
        yearsExperience: 1,
        description: "Introduced to programming fundamentals on Scrimba in 2025 and now building DOM manipulation, event handling, and client-side validation skills at HKR."
    },
    {
        id: 4,
        name: "Bootstrap",
        category: "Frameworks",
        proficiency: 2,
        yearsExperience: 1,
        description: "Using pre-built CSS components for rapid prototyping."
    },
    {
        id: 5,
        name: "Tailwind CSS",
        category: "Frameworks",
        proficiency: 2,
        yearsExperience: 1,
        description: "Experimenting with utility-first classes for custom designs."
    },
    {
        id: 6,
        name: "APIs",
        category: "Backend",
        proficiency: 1,
        yearsExperience: 1,
        description: "Fetching and displaying basic data from public APIs."
    },
    {
        id: 7,
        name: "Git & GitHub",
        category: "Tools",
        proficiency: 3,
        yearsExperience: 1,
        description: "Basic version control, committing code to GitHub."
    },
    {
        id: 8,
        name: "Figma",
        category: "Tools",
        proficiency: 2,
        yearsExperience: 1,
        description: "Reading basic wireframes designs and translating them into HTML layouts."
    }
];

/********************************************************************************
 * DOM References
 ********************************************************************************/
// Skills grid
const skillsGrid = document.getElementById('skills-grid');

// Skills filter controls
const skillsControls = document.getElementById('skills-controls');
const filterButtons = document.querySelectorAll('[data-category]');

// Live region for the visible count. Updated whenever the grid is redrawn
// so a filter click and the first page load share the same text.
const skillsCounter = document.getElementById('skills-counter');


/********************************************************************************
 * Functions
 ********************************************************************************/

// Render the skills dynamically. Data taken from the skills array.
function renderSkills(skillsArray) {
    skillsGrid.innerHTML = "";
    // No skills display message
    if (skillsArray.length === 0) {
        skillsGrid.innerHTML = '<p class="card">No skills to display.</p>';
    } else {
        // Render each skill card
        skillsArray.forEach(skill => {
            const skillCard = document.createElement("article");
            skillCard.classList.add("card", "skill-card");

            // Creates filled stars up to proficiency, and fills the rest up to 5 with empty stars
            const starsHTML = generateRatingStars(skill.proficiency);


            skillCard.innerHTML = `
                <div class="skill-heading">
                    <span class="skill-category-badge">${skill.category}</span>
                    <h4>${skill.name}</h4>
                </div>
                <div class="skill-meta">
                    <span class="skill-stars" role="img" aria-label="Proficiency: ${skill.proficiency} out of 5 stars">
                        ${starsHTML}
                    </span>
                    <span class="skill-meta-separator" aria-hidden="true">•</span>
                    <span class="skill-experience">${skill.yearsExperience} ${skill.yearsExperience === 1 ? 'year' : 'years'} exp.</span>
                </div>
                <p class="skill-description">${skill.description}</p>
            `;
            skillsGrid.appendChild(skillCard);
        });
    }

    // Counter text belongs with the grid so it never lags behind the cards.
    updateSkillsCounter(skillsArray);
}

/********************************************************************************/
// Generates the HTML for the rating stars
function generateRatingStars(proficiency) {
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        if (i < proficiency) {
            starsHTML += '<span class="star filled" aria-hidden="true">★</span>';
        } else {
            starsHTML += '<span class="star empty" aria-hidden="true">★</span>';
        }
    }
    return starsHTML;
}

/********************************************************************************/
// Filter State in skills controls. Default is all skills.
let currentCategory = "all";

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // Read the category value from dataset
      const selectedCategory = event.currentTarget.dataset.category;
  
      // Update active visual and aria states
      updateActiveButton(event.currentTarget);
  
      // Filter the data array and re-render
      filterAndRenderSkills(selectedCategory);
    });
  });

/********************************************************************************/
// Updates the active visual and aria states.
function updateActiveButton(button) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

/********************************************************************************/
// Filters the skills based on the category and re-renders.
function filterAndRenderSkills(category) {
    // Create a new array subset without modifying original data
    const filteredSkills = skills.filter(skill => {
      return category === 'all' || skill.category === category;
    });
  
    // Re-render the grid with the filtered collection
    renderSkills(filteredSkills);
  
  }

/********************************************************************************/
// Writes "Showing X of Y skills" so the live region announces the new count
function updateSkillsCounter(filteredSkills) {
    skillsCounter.textContent = `Showing ${filteredSkills.length} of ${skills.length} skills`;
}

/********************************************************************************/

renderSkills(skills);

