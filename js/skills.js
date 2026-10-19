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
 * Functions
 ********************************************************************************/
const skillsGrid = document.getElementById('skills-grid');

// Render the skills dynamically
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

            skillCard.innerHTML = `
                <div class="skill-heading">
                    <h4>${skill.name}</h4>
                    <span class="skill-category-badge">${skill.category}</span>
                </div>
                <div class="skill-meta">
                    <span class="skill-experience">${skill.yearsExperience} ${skill.yearsExperience === 1 ? 'year' : 'years'} exp.</span>
                </div>
                <p class="skill-description">${skill.description}</p>
            `;
            skillsGrid.appendChild(skillCard);
        });
    }
}

renderSkills(skills);