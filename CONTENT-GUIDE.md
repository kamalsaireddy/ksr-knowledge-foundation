# Updating the website content

All regular updates happen in two files. On GitHub, open the file, click the **pencil icon (Edit)**, make your change, then click **Commit changes**. The site updates in 1–2 minutes.

- `assets/js/config.js`: organisation name, email, founder, social links, forms
- `assets/js/content.js`: everything else

**Golden rules for editing**
1. Text goes inside quotes: `title: "My event",`
2. Every line inside an item ends with a comma, and every item `{ … }` is followed by a comma, except possibly the last.
3. Dates: `"2026-12-05"`. Date and time: `"2026-12-05T16:00"` (24-hour clock).
4. If the page goes blank after an edit, a comma or quote is missing. Use **History** on GitHub to compare or revert.
5. `content.js` is public. Never put anyone's phone number, address or private details in it.

## Add a video
1. Upload to YouTube. Copy the link, e.g. `https://www.youtube.com/watch?v=AbC123xYz`. The ID is the part after `v=`: `AbC123xYz`.
2. In `content.js`, find `videos: [`, and paste a new item at the top:
```js
    {
      id: "resume-tips-1",
      featured: false,
      title: "Five fixes for a fresher resume",
      description: "Common mistakes and how to correct them.",
      category: "Interview Preparation",
      published: "2026-11-02",
      youtubeId: "AbC123xYz",
      thumbnail: "",
      sources: [],
      captions: "",
      reviewed: ""
    },
```
- `category` must match one of the names in `KSR_VIDEO_CATEGORIES` at the bottom of the file.
- Set `featured: true` on one video to show it on the home page (set the old one to `false`).
- For time-sensitive videos (deadlines, schemes), set `reviewed` to the date you checked the facts.
- To remove a video, delete its whole `{ … },` block.

## Add an event
Copy an existing event block and change the details. Use a new, unique `id` (letters, numbers and dashes).
- `status: "draft"` = not confirmed (no registration button)
- `status: "open"` = registration form appears, until `registrationDeadline`
- `status: "full"` or `"closed"` = registration closed
- Events move to **Past** automatically after they end.
- `meetingLink` for online events: only share it by email with people who registered; keep it empty in this file.

## Add an opportunity
Only add something you have checked on the official website.
```js
    {
      id: "nsp-2026",
      type: "Scholarship",
      title: "Scholarship name",
      organisation: "Who runs it",
      description: "One or two lines in your own words.",
      eligibility: "Who can apply",
      location: "Telangana / India / Remote",
      deadline: "2026-12-31",
      sourceUrl: "https://official-page",
      applyUrl: "https://official-apply-page",
      verified: "2026-10-21"
    },
```
After the deadline it is labelled "Deadline passed" and the apply button disappears. Delete it when it's no longer useful.

## Update impact numbers
In `impact`, change `value: null` to a real number, e.g. `value: 120,` and set `impactUpdated: "2026-12-01"`. Leave `null` for anything you haven't recorded. It shows "To be updated".

## FAQs, campaigns, resources
Same pattern: copy a block, edit, commit.

## Organisation details (`config.js`)
- `email`: once set, contact links appear across the site and forms offer an email fallback
- `location`: leave `""` to hide
- `founder.photo`: upload e.g. `founder.jpg` into `assets/img/`, then set `photo: "assets/img/founder.jpg"`
- `social`: remove the `//` at the start of a line to switch it on, and put your real link
- `showSamples: false` hides every item marked `sample: true`

## Changing the organisation name
Change `orgName` in `config.js`; the header, footer and page text update automatically. The browser-tab titles and link previews are written into each `.html` file's top section, so also use find-and-replace across the `.html` files, and replace `assets/img/og-image.png`.
