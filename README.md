# Community Baptist Church of West Covina — Website

The church website. It is built with [Eleventy](https://www.11ty.dev/) (a simple
static site generator) and hosted for free on [Netlify](https://www.netlify.com/).

## Updating the website (no coding needed)

Almost everything that changes lives in **one file**: `src/_data/church.json`.

| To change... | Edit this |
|---|---|
| Service times | `services` in `src/_data/church.json` |
| Phone, email, office hours | `phone`, `email`, `officeHours` in `src/_data/church.json` |
| Pastor's name, title, photo, welcome message | `pastor` in `src/_data/church.json` |
| Staff names, roles, and photos | `src/_data/staff.json` (see below) |
| Upcoming events | `src/_data/events.json` (see below) |
| Ministries | `src/_data/ministries.json` |

Sections that depend on missing information hide themselves until it is filled in
(for example, the phone number and email).

The church does not accept online giving, by the pastor's request, so the site has
no Give page or giving buttons. Please don't add one without the pastor's approval.

### Adding staff photos

1. Put each photo in `src/assets/img/staff/` (for example `deacon-smith.jpg`).
   Portrait (tall) photos work best; the site crops them to a 4:5 shape.
2. In `src/_data/staff.json`, fill in the person's `name`, `role`, and
   `"photo": "/assets/img/staff/deacon-smith.jpg"`. A short `bio` is optional.
3. To add another person, copy one `{ ... }` block, separated by a comma.
   Staff appear on the Our Staff page in the order listed.

The roles currently in `staff.json` are placeholders; replace them with the
church's real staff.

### Adding an event

Add an entry to `src/_data/events.json`. Dates use the format `YYYY-MM-DD`.
Past events disappear from the site automatically.

```json
[
  {
    "title": "Fellowship Dinner",
    "date": "2026-12-06",
    "time": "5:00 PM",
    "location": "Fellowship Hall",
    "description": "Join us for food and fellowship after service."
  }
]
```

### Adding the pastor's photo

Put the photo in `src/assets/img/` (for example `pastor.jpg`) and set
`"photo": "/assets/img/pastor.jpg"` in `church.json`. A square photo works best.

## Before launch checklist

The build prints a reminder of anything still missing. Collect from the church:

- [ ] Correct service times (the current times are placeholders)
- [ ] Church phone number and email
- [ ] Pastor's name, title, photo, and approval of the welcome message
- [ ] Pastor's approval of the "What We Believe" list on the About page
- [ ] The church's history for the "Our Story" section on the About page
- [ ] Names, roles, and photos of the church staff
- [ ] Domain name, then set `url` in `church.json` (for example `https://cbcwestcovina.org`)
- [ ] Photos of the church and congregation (optional, but they help)

## Running it on your computer

```bash
npm install
npm start
```

Then open http://localhost:8080. Changes appear automatically when you save.

## Publishing

Netlify builds and publishes the site automatically every time changes are
pushed to the `main` branch on GitHub. Build settings live in `netlify.toml`.

Messages sent from the Contact page are collected by Netlify Forms. Set up email
notifications in the Netlify dashboard under **Forms → Form notifications** so
new messages and prayer requests go to the church's email.
