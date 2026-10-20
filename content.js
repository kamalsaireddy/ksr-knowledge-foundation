/* ============================================================
   WEBSITE CONTENT — videos, events, opportunities, resources,
   book campaigns, impact numbers and FAQs.
   How to edit: see CONTENT-GUIDE.md. Keep commas between items.
   Dates use the format "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM".
   Never put anyone's private phone number or address in this file:
   it is public.
   ============================================================ */
window.KSR_CONTENT = {

  /* ---------- Impact numbers ----------
     Use real, recorded numbers only. null shows "To be updated". */
  impact: [
    { label: "Books collected", value: null },
    { label: "Books distributed", value: null },
    { label: "Students reached", value: null },
    { label: "Volunteers engaged", value: null },
    { label: "English practice sessions", value: null },
    { label: "Videos and resources published", value: null },
    { label: "Community events held", value: null }
  ],
  impactUpdated: "", // e.g. "2026-12-01"

  /* ---------- Events ----------
     status: "open" (registration open), "closed", "full", "draft" (not confirmed yet)
     category must be one of: English-speaking circle, Book collection drive,
     Book distribution, Career guidance, Resume & mock interview, Student meetup,
     Volunteer orientation, Online awareness session */
  events: [
    {
      id: "english-circle-sample",
      sample: true,
      status: "draft",
      title: "English-speaking circle for beginners",
      category: "English-speaking circle",
      description: "A relaxed group conversation for people who understand English but feel shy speaking it. Short topics, small groups, no judgement.",
      start: "2026-11-21T10:30",
      end: "2026-11-21T12:00",
      timezone: "IST (UTC+5:30)",
      venue: "Venue to be confirmed",
      online: false,
      meetingLink: "",
      registrationDeadline: "2026-11-19",
      capacity: 20,
      accessibility: "Details will be shared when the venue is confirmed.",
      organiserEmail: ""
    },
    {
      id: "resume-workshop-sample",
      sample: true,
      status: "draft",
      title: "Resume basics: your first one-page resume",
      category: "Resume & mock interview",
      description: "Bring a draft or start from nothing. We go through what recruiters look for in a fresher resume and help each other improve one section at a time.",
      start: "2026-12-05T16:00",
      end: "2026-12-05T17:30",
      timezone: "IST (UTC+5:30)",
      venue: "Online",
      online: true,
      meetingLink: "",
      registrationDeadline: "2026-12-03",
      capacity: 40,
      accessibility: "Online session. Captions will be switched on where the platform allows.",
      organiserEmail: ""
    },
    {
      id: "book-drive-sample-past",
      sample: true,
      status: "closed",
      title: "Sample past event: book collection drive",
      category: "Book collection drive",
      description: "This sample shows how a finished event appears in the Past events list.",
      start: "2026-09-12T10:00",
      end: "2026-09-12T13:00",
      timezone: "IST (UTC+5:30)",
      venue: "Sample venue",
      online: false,
      meetingLink: "",
      registrationDeadline: "2026-09-10",
      capacity: null,
      accessibility: "",
      organiserEmail: ""
    }
  ],

  /* ---------- Videos ----------
     youtubeId is the code after "watch?v=" in a YouTube link.
     For https://www.youtube.com/watch?v=abc123XYZ the youtubeId is "abc123XYZ".
     Leave thumbnail empty to use YouTube's own thumbnail. */
  videos: [
    {
      id: "welcome-sample",
      sample: true,
      featured: true,
      title: "Why we started: knowledge, language and opportunity",
      description: "An introduction to the three initiatives and how you can take part. Replace this sample with your first published video.",
      category: "Community Stories",
      published: "",
      youtubeId: "",
      thumbnail: "",
      sources: [],
      captions: "",
      reviewed: ""
    },
    {
      id: "interview-intro-sample",
      sample: true,
      featured: false,
      title: "Answering “Tell me about yourself” as a fresher",
      description: "Sample entry. A short guide to structuring your introduction in an interview.",
      category: "Interview Preparation",
      published: "",
      youtubeId: "",
      thumbnail: "",
      sources: [],
      captions: "",
      reviewed: ""
    },
    {
      id: "scholarship-portal-sample",
      sample: true,
      featured: false,
      title: "How to use the National Scholarship Portal",
      description: "Sample entry. Time-sensitive content like this should always show a last-reviewed date.",
      category: "Scholarships & Education",
      published: "",
      youtubeId: "",
      thumbnail: "",
      sources: [{ label: "National Scholarship Portal", url: "https://scholarships.gov.in/" }],
      captions: "",
      reviewed: ""
    }
  ],

  /* ---------- Opportunities ----------
     Only add opportunities you have checked on the official source.
     verified: the date YOU checked it. deadline: "" if none. */
  opportunities: [
    {
      id: "sample-internship",
      sample: true,
      type: "Internship",
      title: "Sample listing: data analytics internship",
      organisation: "Example organisation",
      description: "This is a sample showing how a verified opportunity will appear. It is not a real opening.",
      eligibility: "Final-year students and recent graduates",
      location: "Remote",
      deadline: "2026-12-15",
      sourceUrl: "",
      applyUrl: "",
      verified: ""
    }
  ],

  /* ---------- Free public resources ----------
     Official portals. Fill in `reviewed` after you open each link and confirm it works. */
  resources: [
    { title: "National Scholarship Portal", topic: "Scholarships", description: "Government of India portal for central and state scholarship applications.", url: "https://scholarships.gov.in/", reviewed: "" },
    { title: "SWAYAM", topic: "Free courses", description: "Free online courses from Indian universities and institutions, some with certificates.", url: "https://swayam.gov.in/", reviewed: "" },
    { title: "National Career Service", topic: "Jobs & careers", description: "Government job portal with listings, career counselling information and job fairs.", url: "https://www.ncs.gov.in/", reviewed: "" },
    { title: "AICTE Internship Portal", topic: "Internships", description: "Internship listings for students of AICTE-approved institutions.", url: "https://internship.aicte-india.org/", reviewed: "" },
    { title: "British Council LearnEnglish", topic: "English learning", description: "Free grammar, vocabulary, listening and reading practice at different levels.", url: "https://learnenglish.britishcouncil.org/", reviewed: "" }
  ],

  /* ---------- Book collection campaigns ---------- */
  campaigns: [
    {
      sample: true,
      title: "Sample campaign: English learning books",
      description: "Grammar books, dictionaries and spoken-English guides for students preparing for interviews.",
      status: "Planned",
      period: "Dates to be announced"
    }
  ],

  /* ---------- Frequently asked questions ---------- */
  faqs: [
    { q: "Is this a registered organisation?", a: "Not yet, and we want to be upfront about that. We are first building a community of learners, volunteers and supporters. Once we have a steady group and a record of activities, we plan to apply for formal registration and will publish the details on our About page." },
    { q: "How can I support you right now?", a: "Follow us, share our posts with someone who could use them, join the community, or donate a book. At this stage, followers and word of mouth help us more than anything else." },
    { q: "Do you accept money donations?", a: "No. We currently accept books and volunteer time only. If anyone asks you for money in our name, please do not pay and let us know." },
    { q: "Do I have to pay to join or attend events?", a: "No. Joining the community and attending our sessions is free." },
    { q: "Do you guarantee jobs or English fluency?", a: "No. We share verified information and create practice opportunities. Progress depends on many things, and we are honest about that." },
    { q: "Which books do you accept?", a: "English grammar books, dictionaries, vocabulary and spoken-English guides, interview-preparation material, educational textbooks and general reading books in usable condition." },
    { q: "What do you do with my personal details?", a: "We use them only to respond to you and coordinate the activity you asked about. We never publish donor or recipient details. See the privacy policy for more." }
  ]
};

/* Category lists used by the filters. Add a new category here before using it above. */
window.KSR_EVENT_CATEGORIES = ["English-speaking circle", "Book collection drive", "Book distribution", "Career guidance", "Resume & mock interview", "Student meetup", "Volunteer orientation", "Online awareness session"];
window.KSR_VIDEO_CATEGORIES = ["Career Opportunities", "Job & Internship Updates", "English Learning", "Interview Preparation", "Scholarships & Education", "Digital Skills", "Community Stories", "Awareness & Public Resources"];
