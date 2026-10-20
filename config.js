/* ============================================================
   SITE SETTINGS — edit this file to change organisation details.
   Everything here is public (it is sent to every visitor's browser),
   so never put passwords or private API keys in this file.
   ============================================================ */
window.KSR_CONFIG = {
  orgName: "KSR Knowledge Foundation",
  shortName: "KSR",
  tagline: "Knowledge. Language. Opportunity.",

  // Shown in the footer and About page. Keep this honest until registration is complete.
  stageStatement:
    "KSR Knowledge Foundation is a community initiative in its first stage. We are building our community before applying for formal registration, so we are not yet a registered organisation and we do not accept money donations.",

  // Leave empty ("") to hide. Only fill in once confirmed.
  location: "",                       // e.g. "Hyderabad, Telangana, India"
  email: "",                          // e.g. "hello@yourdomain.org" — until set, contact links are hidden

  founder: {
    name: "Kamal Sai Reddy",
    role: "Founder",
    photo: "founder.jpg",
    bio: "Kamal Sai started KSR Knowledge Foundation to share the knowledge, resources and opportunities he believes every student and job seeker should be able to reach.",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/kamal-sai-reddy" },
      { label: "Portfolio", url: "https://kamalsaireddy.github.io/Portfolio/" }
    ]
  },

  social: [
    // { label: "YouTube", url: "https://www.youtube.com/@yourchannel" },
    // { label: "Instagram", url: "https://www.instagram.com/yourhandle" }, // remove // and add a comma after it to switch on
    // LinkedIn company page. If you change its public URL on LinkedIn, update this link too.
    { label: "LinkedIn", url: "https://www.linkedin.com/company/ksrknowledgefoundation/" }
  ],

  /* ---------- Forms ----------
     provider: "none"      → forms show an honest notice and offer to email instead (needs `email` above)
               "web3forms" → set web3formsKey (this key is designed to be public)
               "formspree" → set formspreeEndpoint, e.g. "https://formspree.io/f/abcdwxyz"
     See README.md, section "Making the forms work". */
  forms: {
    provider: "none",
    web3formsKey: "",
    formspreeEndpoint: ""
  },

  // true = show items marked `sample: true` in content.js (with a "Sample" label).
  // Set to false once you have real content.
  showSamples: false
};
