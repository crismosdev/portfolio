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
const sortSelect = document.getElementById('sort-select');

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

// Remembers which sort option is selected. Starts as name because that is the first choice in the dropdown.
let currentSort = "name";

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // Store the category on shared state for sort and filter.
      currentCategory = event.currentTarget.dataset.category;

      // Update active visual and aria states
      updateActiveButton(event.currentTarget);

      applyFiltersAndSort();
    });
  });

// The dropdown only saves the sort choice. applyFiltersAndSort still does the real work.
sortSelect.addEventListener('change', (event) => {
    currentSort = event.currentTarget.value;
    applyFiltersAndSort();
});

/********************************************************************************/
// Updates the active visual and aria states.
function updateActiveButton(button) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

/********************************************************************************/
// Filters first, then sorts, then shows the cards. I put both steps here so the buttons and the dropdown always use the same list.
function applyFiltersAndSort() {
    const filteredSkills = skills.filter(skill => {
        return currentCategory === 'all' || skill.category === currentCategory;
    });

    // names are lowercased
    if (currentSort === "name") {
        filteredSkills.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            // alpahbetical order is determined by the return values
            if (nameA < nameB) return -1; // nameA comes first
            if (nameA > nameB) return 1; // nameB comes first
            return 0; // names are equal
        });
    } else if (currentSort === "proficiency") {
        // Highest rating first so the strongest skills show at the top.
        filteredSkills.sort((a, b) => {
            if (a.proficiency < b.proficiency) return 1;
            if (a.proficiency > b.proficiency) return -1;
            return 0;
        });
    } else if (currentSort === "experience") {
        // Highest years first. The dropdown value is experience but the field is yearsExperience.
        filteredSkills.sort((a, b) => {
            if (a.yearsExperience < b.yearsExperience) return 1;
            if (a.yearsExperience > b.yearsExperience) return -1;
            return 0;
        });
    }
    // The counter and the cards both need this same final list.
    updateSkillsCounter(filteredSkills);
    renderSkills(filteredSkills);
}

/********************************************************************************/
// Writes "Showing X of Y skills" so the live region announces the new count
function updateSkillsCounter(filteredSkills) {
    skillsCounter.textContent = `Showing ${filteredSkills.length} of ${skills.length} skills`;
}

/********************************************************************************/

applyFiltersAndSort();

