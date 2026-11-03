# CrisDev Portfolio — Lab 2

Personal portfolio for the JavaScript for Web Development course at Högskolan Kristianstad. Lab 2 extends the Lab 1 site with vanilla JavaScript: a validated feedback form and a data-driven skills showcase.

**Target grade:** 4

**Repository:** [github.com/crismosdev/portfolio](https://github.com/crismosdev/portfolio)

## Implemented features

### Grade 3 — Feedback form (`feedback.html`, `js/feedback.js`)

### Grade 4 — Skills showcase (`about.html`, `js/skills.js`)

### Extra site behaviour: Responsive burger menu (`js/nav.js`)

## How to run

This is a static site. No install or build step is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/crismosdev/portfolio.git
   cd portfolio
   ```

2. Open `index.html` in Chrome, Firefox, or Edge.

Alternatively, serve the folder with a local server (for example Live Server in VS Code) so relative paths and scripts load as they would on a host.

The site is responsive and is intended to work in the latest Chrome, Firefox, and Edge.

## Pages

| Page | File | What it shows |
| --- | --- | --- |
| Home | `index.html` | Intro and featured projects |
| About | `about.html` | Bio, skills showcase, timeline |
| Projects | `projects.html` | Project cards |
| Gallery | `gallery.html` | Travel playground photos |
| Feedback | `feedback.html` | Validated feedback form |
| Contact | `contact.html` | Contact form (mailto) |

## Project structure

```
portfolio/
├── index.html
├── about.html
├── projects.html
├── gallery.html
├── feedback.html
├── contact.html
├── styles.css
├── js/
│   ├── nav.js       
│   ├── feedback.js   
│   └── skills.js     
└── images/
```

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)
