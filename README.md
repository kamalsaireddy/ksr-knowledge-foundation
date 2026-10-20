# KSR Knowledge Foundation website

A static website (plain HTML, CSS and JavaScript) built to run on GitHub Pages, the same way your portfolio does. There is nothing to install and no build step: you upload the files and GitHub publishes them.

## What's in the folder

| File / folder | What it is |
|---|---|
| `index.html` … `terms.html` | One file per page (home, about, opportunities, books, donate, english, join, events, learn, get-involved, contact, privacy, terms, 404) |
| `assets/js/config.js` | **Organisation settings**: name, email, founder, social links, form service |
| `assets/js/content.js` | **Content**: events, videos, opportunities, resources, campaigns, impact numbers, FAQs |
| `assets/css/style.css` | Colours, fonts and layout. Colours are at the top |
| `assets/js/main.js` | Site behaviour (menu, filters, forms). You shouldn't need to edit it |
| `assets/img/` | Images. `og-image.png` is the link preview on WhatsApp/LinkedIn |
| `sitemap.xml`, `robots.txt` | For search engines |
| `.nojekyll` | Tells GitHub Pages to publish files as they are. Keep it |

Day-to-day editing is explained in **CONTENT-GUIDE.md**.

## 1. Put it online (GitHub Pages)

Keep this separate from your portfolio so neither can break the other.

1. On GitHub, click **New repository**. Name it `ksr-knowledge-foundation`, set it to **Public**, and click **Create repository**.
2. Click **uploading an existing file**. Drag in **everything inside** this folder (not the folder itself), including `.nojekyll` and the `assets` folder. On a Mac, press Cmd + Shift + . in Finder to see `.nojekyll`.
3. Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and click **Save**.
5. After 1–2 minutes the site is live at `https://kamalsaireddy.github.io/ksr-knowledge-foundation/`.

Every page is a real file, so refreshing any page or sharing a direct link works normally.

**If you use a different repository name or a custom domain**, replace `https://kamalsaireddy.github.io/ksr-knowledge-foundation/` with your address in all `.html` files, `sitemap.xml` and `robots.txt` (on a computer, use "Find and replace in folder" in VS Code). All links inside the site are relative, so nothing else changes.

## 2. Making the forms work

GitHub Pages only serves files. It cannot receive form submissions, so the forms send to a free form service, which emails each submission to you. Until one is set up, the forms show an honest message instead of pretending to send.

**Recommended: Web3Forms** (simplest, no dashboard needed)
1. Go to web3forms.com, enter the email address that should receive submissions, and you'll be emailed an *access key*.
2. In `assets/js/config.js` set:
   ```js
   forms: { provider: "web3forms", web3formsKey: "YOUR-ACCESS-KEY", formspreeEndpoint: "" },
   ```
3. Commit. Submit each form once to test it.

The Web3Forms access key is designed to be public: it can only send submissions to your inbox, so it's safe in this file. Its free plan has a monthly submission limit (a few hundred at the time of writing); check their pricing page for current limits.

**Alternative: Formspree.** Create a free account and a form, then set `provider: "formspree"` and `formspreeEndpoint: "https://formspree.io/f/xxxxxxx"`. The free plan has a lower monthly limit; check their site.

**Fallback:** set `email` in `config.js`. Even with `provider: "none"`, visitors are then offered a button that opens their email app with their answers filled in.

Spam protection: every form has a hidden "honeypot" field that bots fill in and people don't. Both services also filter spam on their side. Both validate submissions on their servers, in addition to the checks in the browser.

Privacy: submissions go to your email inbox only. They are never stored in this repository or in the visitor's browser.

## 3. Before you announce the site

- [ ] `config.js`: add the official email, founder name, bio and photo, social links; add the location only if you want it public
- [ ] Set up forms (section 2) and test every form
- [ ] Replace sample content in `content.js`, then set `showSamples: false`
- [ ] Open each resource link, then fill in its `reviewed` date
- [ ] Add real photos (with permission) to `assets/img/`
- [ ] Fill in the "Last updated" date on `privacy.html` and `terms.html`, and have both reviewed
- [ ] Decide how you'll describe the organisation legally (see below)

**About the name.** The word "Foundation" usually suggests a registered trust, society or Section 8 company. The site states clearly that it is an early-stage, unregistered initiative that doesn't accept money. Keep that wording until registration is done, and get advice from a CA or lawyer before registering or accepting any funds.

## 4. Growing later: admin dashboard and video uploads

This first version deliberately has no login. A login on a static site can't protect anything, so a fake one would be worse than none.

**Videos:** upload to your YouTube channel, then add the video's ID to `content.js`. This is free, handles any size, and gives you captions and statistics. Uploading video files directly to the website would need cloud storage (for example Cloudinary or Supabase Storage) plus a backend, which adds cost and work.

**When you need a real admin area** (managing enquiries, tracking every book, publishing without editing files), the most practical next step is:
- **Supabase** (free tier available): a database for events, videos, opportunities and book records; real login with email; row-level security so only admins can write and nobody can read private data; storage for images.
- Forms would save into Supabase tables instead of email, and a protected `/admin` page would let approved people edit content.
- Alternatively, **Decap CMS** gives a simple editing screen for `content.js`-style content using GitHub login, without a database.

The content is already structured (one list per type, each item with an id, dates and status) so it can move into a database without redesigning the pages.

## Accessibility and quality notes

- Works from 320 px phones to large desktops; mobile menu closes with Escape
- Skip link, visible keyboard focus, labelled form fields with clear error messages
- Animation (the rising book spines on the home page) is switched off for people who choose reduced motion
- No external scripts apart from Google Fonts; no cookies; YouTube embeds use privacy-enhanced mode
