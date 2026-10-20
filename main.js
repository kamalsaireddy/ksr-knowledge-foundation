/* Site behaviour. You normally don't need to edit this file:
   change text in config.js and content.js instead. */
(function () {
  "use strict";
  var CFG = window.KSR_CONFIG || {};
  var DATA = window.KSR_CONTENT || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) { return /^(https?:|mailto:)/i.test(u || "") ? u : ""; }
  function parts(str) {
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(str || "");
    if (!m) return null;
    return { y: +m[1], mo: +m[2] - 1, d: +m[3], h: m[4] ? +m[4] : null, mi: m[5] ? +m[5] : 0 };
  }
  function toDate(str) { var p = parts(str); return p ? new Date(p.y, p.mo, p.d, p.h || 23, p.h == null ? 59 : p.mi) : null; }
  function fmtDate(str) { var p = parts(str); return p ? p.d + " " + MONTHS[p.mo] + " " + p.y : ""; }
  function fmtTime(str) {
    var p = parts(str); if (!p || p.h == null) return "";
    var h = p.h % 12 || 12, ap = p.h < 12 ? "am" : "pm";
    return h + (p.mi ? ":" + String(p.mi).padStart(2, "0") : "") + " " + ap;
  }
  function visible(list) { return (list || []).filter(function (x) { return CFG.showSamples || !x.sample; }); }
  function sampleBadge(x) { return x.sample ? '<span class="badge badge-sample">Sample</span>' : ""; }

  function fillFollow(root) {
    var li = (CFG.social || []).filter(function (l) { return /linkedin\.com/i.test(l.url || "") && safeUrl(l.url); })[0];
    $$("[data-follow-linkedin]", root).forEach(function (el) {
      if (!li) { el.hidden = true; return; }
      el.hidden = false; var a = $("a", el); if (a) a.href = li.url;
    });
  }
  /* ---------- Organisation details ---------- */
  function fillOrg() {
    $$("[data-org]").forEach(function (el) { el.textContent = CFG.orgName; });
    $$("[data-tagline]").forEach(function (el) { el.textContent = CFG.tagline; });
    $$("[data-stage]").forEach(function (el) { el.textContent = CFG.stageStatement; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    $$("[data-email]").forEach(function (el) { el.textContent = CFG.email; el.href = "mailto:" + CFG.email; });
    $$("[data-requires-email]").forEach(function (el) { el.hidden = !CFG.email; });
    $$("[data-no-email]").forEach(function (el) { el.hidden = !!CFG.email; });
    $$("[data-location]").forEach(function (el) { el.textContent = CFG.location; });
    $$("[data-requires-location]").forEach(function (el) { el.hidden = !CFG.location; });

    var f = CFG.founder || {};
    $$("[data-founder-name]").forEach(function (el) { el.textContent = f.name; });
    $$("[data-founder-role]").forEach(function (el) { el.textContent = f.role; });
    $$("[data-founder-bio]").forEach(function (el) { el.textContent = f.bio; });
    $$("[data-founder-photo]").forEach(function (el) {
      if (f.photo) el.innerHTML = '<img src="' + esc(f.photo) + '" alt="Portrait of ' + esc(f.name) + '" loading="lazy">';
    });
    $$("[data-founder-links]").forEach(function (el) {
      var links = (f.links || []).filter(function (l) { return safeUrl(l.url); });
      el.innerHTML = links.map(function (l) { return '<a href="' + esc(l.url) + '" rel="noopener" target="_blank">' + esc(l.label) + "</a>"; }).join(" &nbsp; ");
      el.hidden = !links.length;
    });

    fillFollow(document);

    $$('[data-render="social"]').forEach(function (el) {
      var s = (CFG.social || []).filter(function (l) { return safeUrl(l.url); });
      el.innerHTML = s.length
        ? s.map(function (l) { return '<li><a href="' + esc(l.url) + '" rel="noopener" target="_blank">' + esc(l.label) + "</a></li>"; }).join("")
        : "<li>Social channels coming soon</li>";
    });
  }

  /* ---------- Mobile menu ---------- */
  function menu() {
    var btn = $(".nav-toggle"), nav = $(".site-nav");
    if (!btn || !nav) return;
    function set(open) {
      btn.setAttribute("aria-expanded", open);
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      btn.querySelector("span").textContent = open ? "Close" : "Menu";
    }
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { set(false); btn.focus(); } });
    window.matchMedia("(min-width: 1101px)").addEventListener("change", function (m) { if (m.matches) set(false); });
  }


  /* ---------- Coming soon ---------- */
  function csQuote(key) { var cs = window.KSR_COMING_SOON || {}; var q = cs.quotes || {}; return q[key] || q["default"] || { text: "", by: "" }; }
  function comingSoon(key, heading) {
    var cs = window.KSR_COMING_SOON || {}, q = csQuote(key);
    var social = (CFG.social || []).filter(function (l) { return safeUrl(l.url); })[0];
    return '<div class="coming-soon"><span class="badge">' + esc(cs.title || "Coming soon") + "</span>" +
      (heading ? '<h3 class="cs-heading">' + esc(heading) + "</h3>" : "") +
      (q.text ? '<blockquote class="cs-quote"><p>“' + esc(q.text) + '”</p>' + (q.by ? "<footer>" + esc(q.by) + "</footer>" : "") + "</blockquote>" : "") +
      '<p class="cs-message">' + esc(cs.message || "") + "</p>" +
      '<div class="btn-row"><a class="btn btn-primary" href="join.html">Join the community</a>' +
      (social ? '<a class="btn btn-secondary" href="' + esc(social.url) + '" target="_blank" rel="noopener">Follow on ' + esc(social.label) + "</a>" : "") + "</div></div>";
  }

  /* ---------- Impact ---------- */
  function impact() {
    var anyImpact = (DATA.impact || []).some(function (i) { return typeof i.value === "number"; });
    $$('[data-render="impact"]').forEach(function (el) {
      if (!anyImpact) { el.classList.remove("impact"); el.innerHTML = comingSoon("impact", "Our first numbers are on the way"); return; }
      el.innerHTML = (DATA.impact || []).map(function (i) {
        var has = typeof i.value === "number";
        return '<div><span class="num' + (has ? "" : " pending") + '">' + (has ? i.value.toLocaleString("en-IN") : "To be updated") +
          '</span><span class="label">' + esc(i.label) + "</span></div>";
      }).join("");
    });
    $$("[data-impact-updated]").forEach(function (el) {
      if (!anyImpact) { el.hidden = true; return; }
      el.textContent = DATA.impactUpdated ? "Figures last updated " + fmtDate(DATA.impactUpdated) + "." : "We will publish figures here once activities begin. We only show numbers we have recorded.";
    });
  }

  /* ---------- Dialog helper ---------- */
  var dialog;
  function openDialog(html, label) {
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.innerHTML = '<button class="dialog-close" type="button" aria-label="Close">×</button><div class="dialog-body"></div>';
      document.body.appendChild(dialog);
      dialog.querySelector(".dialog-close").addEventListener("click", function () { dialog.close(); });
      dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
      dialog.addEventListener("close", function () { $(".dialog-body", dialog).innerHTML = ""; if (dialog._ret) dialog._ret.focus(); });
    }
    dialog._ret = document.activeElement;
    dialog.setAttribute("aria-label", label || "Details");
    $(".dialog-body", dialog).innerHTML = html;
    dialog.showModal();
    $$("form[data-form]", dialog).forEach(bindForm);
    var h = $("h2", dialog); if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
  }

  /* ---------- Events ---------- */
  function isUpcoming(ev) { var d = toDate(ev.end || ev.start); return d && d >= new Date(); }
  function statusText(ev) {
    if (!isUpcoming(ev)) return "Finished";
    return { open: "Registration open", closed: "Registration closed", full: "Fully booked", draft: "Date not confirmed" }[ev.status] || "";
  }
  function eventCard(ev) {
    var p = parts(ev.start) || {};
    return '<article class="card">' +
      '<div class="event-date"><span class="day">' + (p.d || "") + '</span><span class="mon">' + (MONTHS[p.mo] || "") + "<br>" + (p.y || "") + "</span></div>" +
      '<div class="badge-row"><span class="badge">' + esc(ev.category) + "</span>" + sampleBadge(ev) + "</div>" +
      "<h3>" + esc(ev.title) + "</h3><p>" + esc(ev.description) + "</p>" +
      '<div class="meta"><span><b>When:</b> ' + fmtTime(ev.start) + (ev.end ? "–" + fmtTime(ev.end) : "") + " " + esc(ev.timezone) + "</span>" +
      "<span><b>Where:</b> " + esc(ev.venue) + "</span><span><b>Status:</b> " + statusText(ev) + "</span></div>" +
      '<div class="card-actions"><button class="btn btn-secondary" type="button" data-event="' + esc(ev.id) + '">View details</button></div></article>';
  }
  function eventDetail(ev) {
    var up = isUpcoming(ev);
    var html = '<div class="badge-row"><span class="badge">' + esc(ev.category) + "</span>" + sampleBadge(ev) + "</div>" +
      '<h2 class="mt-0" style="margin-top:.6rem">' + esc(ev.title) + "</h2><p>" + esc(ev.description) + "</p>" +
      '<div class="meta card" style="margin-bottom:1.4rem">' +
      "<span><b>Date:</b> " + fmtDate(ev.start) + "</span>" +
      "<span><b>Time:</b> " + fmtTime(ev.start) + (ev.end ? " to " + fmtTime(ev.end) : "") + " " + esc(ev.timezone) + "</span>" +
      "<span><b>Venue:</b> " + esc(ev.venue) + "</span>" +
      (ev.registrationDeadline ? "<span><b>Register by:</b> " + fmtDate(ev.registrationDeadline) + "</span>" : "") +
      (ev.capacity ? "<span><b>Places:</b> " + ev.capacity + "</span>" : "") +
      (ev.accessibility ? "<span><b>Accessibility:</b> " + esc(ev.accessibility) + "</span>" : "") +
      (ev.organiserEmail ? '<span><b>Organiser:</b> <a href="mailto:' + esc(ev.organiserEmail) + '">' + esc(ev.organiserEmail) + "</a></span>" : "") +
      "<span><b>Status:</b> " + statusText(ev) + "</span></div>";
    var deadlinePassed = ev.registrationDeadline && toDate(ev.registrationDeadline) < new Date();
    if (up && ev.status === "open" && !deadlinePassed) {
      html += '<h3>Register for this event</h3><form class="form" data-form="Event registration" novalidate>' +
        '<input type="hidden" name="event" value="' + esc(ev.title + " (" + fmtDate(ev.start) + ")") + '">' +
        field("text", "reg-name", "name", "Full name", true, 'autocomplete="name"') +
        field("email", "reg-email", "email", "Email address", true, 'autocomplete="email"') +
        field("tel", "reg-phone", "phone", "Phone number", false, 'autocomplete="tel" inputmode="tel"') +
        '<div class="field"><label for="reg-type">I am attending as</label><select id="reg-type" name="attending_as" required><option value="">Choose one</option><option>Student / Job seeker</option><option>Volunteer</option><option>Working professional</option><option>Other</option></select><p class="error-msg" id="reg-type-err"></p></div>' +
        consentBlock("reg") +
        '<div class="form-status" role="status" aria-live="polite"></div><div><button class="btn btn-primary" type="submit">Register for this event</button></div></form>' +
        '<template data-success><div class="form-success"><h3 tabindex="-1">You’re registered</h3><p>We’ve received your registration for <strong>' + esc(ev.title) + "</strong>. We’ll email you the joining details before the event. If your plans change, just reply to that email.</p></div></template>";
    } else if (up && ev.status === "draft") {
      html += '<div class="notice"><p>Registration will open once the date and venue are confirmed. Join the community to hear when it does.</p><p><a class="btn btn-primary" href="join.html?type=Event+Participant">Join the community</a></p></div>';
    } else if (up) {
      html += '<div class="notice"><p>Registration for this event is not open. Join the community to hear about the next one.</p><p><a class="btn btn-secondary" href="join.html?type=Event+Participant">Join the community</a></p></div>';
    }
    return html;
  }
  function bindEventButtons(root) {
    $$("[data-event]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var ev = (DATA.events || []).filter(function (e) { return e.id === b.getAttribute("data-event"); })[0];
        if (ev) openDialog(eventDetail(ev), ev.title);
      });
    });
  }
  function events() {
    var all = visible(DATA.events).sort(function (a, b) { return toDate(a.start) - toDate(b.start); });
    $$('[data-render="events-preview"]').forEach(function (el) {
      var up = all.filter(isUpcoming).slice(0, 3);
      el.innerHTML = up.length ? '<div class="card-list">' + up.map(eventCard).join("") + "</div>" :
        comingSoon("events", "Our first meetups are being planned");
      bindEventButtons(el);
    });
    var page = $('[data-render="events"]');
    if (!page) return;
    if (!all.length) {
      $("[data-event-filters]").hidden = true; var ec = $("[data-event-count]"); if (ec) ec.hidden = true;
      page.innerHTML = comingSoon("events", "Our first meetups are being planned"); return;
    }
    var state = { view: "upcoming", cat: "All" };
    var cats = ["All"].concat(window.KSR_EVENT_CATEGORIES || []);
    var bar = $("[data-event-filters]");
    bar.innerHTML = '<div class="segmented" role="group" aria-label="Which events"><button type="button" data-view="upcoming" aria-pressed="true">Upcoming</button><button type="button" data-view="past" aria-pressed="false">Past</button></div>' +
      '<div class="chips" role="group" aria-label="Filter by category">' + cats.map(function (c) { return '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === "All") + '">' + esc(c) + "</button>"; }).join("") + "</div>";
    function draw() {
      var list = all.filter(function (e) { return (state.view === "upcoming") === !!isUpcoming(e) && (state.cat === "All" || e.category === state.cat); });
      if (state.view === "past") list.reverse();
      page.innerHTML = list.length ? '<div class="card-list">' + list.map(eventCard).join("") + "</div>" :
        '<div class="empty"><strong>' + (state.view === "upcoming" ? "No upcoming events" : "No past events yet") + (state.cat !== "All" ? " in this category" : "") + "</strong>" +
        (state.view === "upcoming" ? 'New sessions are announced to community members first. <a href="join.html?type=Event+Participant">Join the community</a> to hear about them.' : "Finished events will be listed here.") + "</div>";
      bindEventButtons(page);
      var c = $("[data-event-count]"); if (c) c.textContent = list.length + (list.length === 1 ? " event" : " events");
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.dataset.view) { state.view = b.dataset.view; $$("[data-view]", bar).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); }
      if (b.dataset.cat) { state.cat = b.dataset.cat; $$("[data-cat]", bar).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); }
      draw();
    });
    draw();
  }

  /* ---------- Videos ---------- */
  var PLAY = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="currentColor" opacity=".12"/><path d="M19 15l14 9-14 9z" fill="currentColor"/></svg>';
  function thumb(v) {
    var src = v.thumbnail || (v.youtubeId ? "https://i.ytimg.com/vi/" + encodeURIComponent(v.youtubeId) + "/hqdefault.jpg" : "");
    return '<div class="video-thumb"' + (src ? ' style="background-image:url(\'' + esc(src) + '\')"' : "") + ">" + (src ? "" : PLAY) + "</div>";
  }
  function videoCard(v) {
    return '<article class="card">' + thumb(v) + '<div class="badge-row"><span class="badge">' + esc(v.category) + "</span>" + sampleBadge(v) + "</div>" +
      "<h3>" + esc(v.title) + "</h3><p>" + esc(v.description) + "</p>" +
      (v.published ? '<span class="small">Published ' + fmtDate(v.published) + "</span>" : "") +
      '<div class="card-actions"><button class="btn btn-secondary" type="button" data-video="' + esc(v.id) + '">' + (v.youtubeId ? "Watch" : "View details") + "</button></div></article>";
  }
  function videoDetail(v) {
    var all = visible(DATA.videos);
    var related = all.filter(function (x) { return x.category === v.category && x.id !== v.id; }).slice(0, 3);
    var src = (v.sources || []).filter(function (s) { return safeUrl(s.url); });
    return (v.youtubeId
      ? '<iframe class="embed" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtubeId) + '" title="' + esc(v.title) + '" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>'
      : '<div class="video-thumb">' + PLAY + "</div>") +
      '<div class="badge-row" style="margin-top:1rem"><span class="badge">' + esc(v.category) + "</span>" + sampleBadge(v) + "</div>" +
      '<h2 style="margin-top:.6rem">' + esc(v.title) + "</h2><p>" + esc(v.description) + "</p>" +
      (v.youtubeId ? '<p><a href="https://www.youtube.com/watch?v=' + encodeURIComponent(v.youtubeId) + '" target="_blank" rel="noopener">Watch on YouTube</a></p>' : '<p class="small">This video hasn’t been published yet.</p>') +
      (v.reviewed ? '<p class="small">Information last reviewed ' + fmtDate(v.reviewed) + ". Always confirm details on the official source.</p>" : "") +
      (v.captions ? "<details><summary>Transcript</summary><p>" + esc(v.captions) + "</p></details>" : "") +
      (src.length ? "<h3>Sources</h3><ul>" + src.map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>"; }).join("") + "</ul>" : "") +
      (related.length ? '<h3 class="mt-2">Related videos</h3><ul>' + related.map(function (r) { return '<li><button class="btn-link" type="button" data-video="' + esc(r.id) + '">' + esc(r.title) + "</button></li>"; }).join("") + "</ul>" : "");
  }
  function bindVideoButtons(root) {
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-video]"); if (!b) return;
      var v = (DATA.videos || []).filter(function (x) { return x.id === b.getAttribute("data-video"); })[0];
      if (v) { if (dialog && dialog.open) { $(".dialog-body", dialog).innerHTML = videoDetail(v); } else openDialog(videoDetail(v), v.title); }
    });
  }
  function videos() {
    var all = visible(DATA.videos).sort(function (a, b) { return (b.published || "").localeCompare(a.published || ""); });
    $$('[data-render="video-featured"]').forEach(function (el) {
      var f = all.filter(function (v) { return v.featured; })[0] || all[0];
      if (!f) { el.innerHTML = comingSoon("videos", "Our first videos are on the way"); return; }
      el.innerHTML = '<div class="featured-video">' + (f.youtubeId
        ? '<iframe class="embed" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(f.youtubeId) + '" title="' + esc(f.title) + '" allowfullscreen loading="lazy"></iframe>'
        : thumb(f)) +
        '<div><div class="badge-row"><span class="badge">' + esc(f.category) + "</span>" + sampleBadge(f) + '</div><h3 style="margin-top:.7rem;font-size:1.5rem">' + esc(f.title) + "</h3><p>" + esc(f.description) + "</p>" +
        '<a class="btn btn-secondary" href="learn.html">Browse the learning hub</a></div></div>';
    });
    var page = $('[data-render="videos"]');
    if (!page) return;
    if (!all.length) {
      $("[data-video-filters]").hidden = true; $("[data-video-count]").hidden = true;
      var vh = $("[data-video-heading]"); if (vh) vh.textContent = "Topics we’re preparing";
      var topics = (window.KSR_COMING_SOON || {}).topics || {};
      page.innerHTML = '<div class="topic-grid">' + (window.KSR_VIDEO_CATEGORIES || []).map(function (c) {
        return '<button type="button" class="topic-tile" data-topic-tile="' + esc(c) + '"><span class="topic-name">' + esc(c) + '</span><span class="topic-desc">' + esc(topics[c] || "") + '</span><span class="badge">Coming soon</span></button>';
      }).join("") + "</div>";
      page.addEventListener("click", function (e) {
        var b = e.target.closest("[data-topic-tile]"); if (!b) return;
        var c = b.getAttribute("data-topic-tile"); openDialog(comingSoon(c, c), c);
      });
      return;
    }
    bindVideoButtons(document.body);
    var cats = ["All"].concat(window.KSR_VIDEO_CATEGORIES || []);
    var state = { cat: "All", q: "" };
    var bar = $("[data-video-filters]");
    bar.innerHTML = '<div class="search"><label class="visually-hidden" for="video-search">Search videos</label><input id="video-search" type="search" placeholder="Search videos"></div>' +
      '<div class="chips" role="group" aria-label="Filter by category">' + cats.map(function (c) { return '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === "All") + '">' + esc(c) + "</button>"; }).join("") + "</div>";
    function draw() {
      var q = state.q.toLowerCase();
      var list = all.filter(function (v) { return (state.cat === "All" || v.category === state.cat) && (!q || (v.title + " " + v.description).toLowerCase().indexOf(q) > -1); });
      page.innerHTML = list.length ? '<div class="card-list">' + list.map(videoCard).join("") + "</div>" :
        '<div class="empty"><strong>No videos match' + (state.q ? " “" + esc(state.q) + "”" : " this category") + "</strong>Try another word or choose All.</div>";
      $("[data-video-count]").textContent = list.length + (list.length === 1 ? " video" : " videos");
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]"); if (!b) return;
      state.cat = b.dataset.cat; $$("[data-cat]", bar).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); draw();
    });
    $("#video-search").addEventListener("input", function (e) { state.q = e.target.value.trim(); draw(); });
    draw();
  }

  /* ---------- Opportunities & resources ---------- */
  function opportunities() {
    var el = $('[data-render="opportunities"]'); if (!el) return;
    var all = visible(DATA.opportunities);
    var types = ["All"].concat(all.map(function (o) { return o.type; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
    var bar = $("[data-opp-filters]"), state = "All";
    bar.innerHTML = '<div class="chips" role="group" aria-label="Filter by type">' + types.map(function (t) { return '<button type="button" class="chip" data-cat="' + esc(t) + '" aria-pressed="' + (t === "All") + '">' + esc(t) + "</button>"; }).join("") + "</div>";
    function card(o) {
      var expired = o.deadline && toDate(o.deadline) < new Date();
      var apply = safeUrl(o.applyUrl), source = safeUrl(o.sourceUrl);
      return '<article class="card"><div class="badge-row"><span class="badge">' + esc(o.type) + "</span>" + sampleBadge(o) +
        (o.verified ? '<span class="badge badge-verified">Verified ' + fmtDate(o.verified) + "</span>" : "") +
        (expired ? '<span class="badge badge-expired">Deadline passed</span>' : "") + "</div>" +
        "<h3>" + esc(o.title) + "</h3>" + (o.organisation ? '<span class="small">' + esc(o.organisation) + "</span>" : "") + "<p>" + esc(o.description) + "</p>" +
        '<div class="meta"><span><b>Eligibility:</b> ' + esc(o.eligibility || "See source") + "</span><span><b>Location:</b> " + esc(o.location || "See source") + "</span>" +
        "<span><b>Deadline:</b> " + (o.deadline ? fmtDate(o.deadline) : "Not stated") + "</span></div>" +
        '<div class="card-actions">' + (apply && !expired ? '<a class="btn btn-primary" href="' + esc(apply) + '" target="_blank" rel="noopener">Apply on official site</a>' : "") +
        (source ? '<a href="' + esc(source) + '" target="_blank" rel="noopener">View source</a>' : "") +
        (!apply && !source ? '<span class="small">Sample listing: no link</span>' : "") + "</div></article>";
    }
    function draw() {
      var list = all.filter(function (o) { return state === "All" || o.type === state; })
        .sort(function (a, b) { var ea = a.deadline && toDate(a.deadline) < new Date(), eb = b.deadline && toDate(b.deadline) < new Date(); return ea - eb; });
      el.innerHTML = list.length ? '<div class="card-list">' + list.map(card).join("") + "</div>" :
        comingSoon("opportunities", "Verified opportunities are coming soon");
      bar.hidden = !all.length;
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest("[data-cat]"); if (!b) return; state = b.dataset.cat; $$("[data-cat]", bar).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); draw(); });
    draw();
  }
  function resources() {
    $$('[data-render="resources"]').forEach(function (el) {
      var filter = el.getAttribute("data-topic");
      var list = (DATA.resources || []).filter(function (r) { return !filter || r.topic === filter; });
      el.innerHTML = list.map(function (r) {
        return '<article class="card"><span class="badge">' + esc(r.topic) + "</span><h3>" + esc(r.title) + "</h3><p>" + esc(r.description) + "</p>" +
          '<div class="card-actions"><a href="' + esc(safeUrl(r.url)) + '" target="_blank" rel="noopener">Open official site</a></div>' +
          '<span class="small">' + (r.reviewed ? "Link checked " + fmtDate(r.reviewed) : "External site. Always check details on the official page.") + "</span></article>";
      }).join("");
    });
  }
  function campaigns() {
    $$('[data-render="campaigns"]').forEach(function (el) {
      var list = visible(DATA.campaigns);
      el.innerHTML = list.length ? '<div class="card-list">' + list.map(function (c) {
        return '<article class="card"><div class="badge-row"><span class="badge">' + esc(c.status) + "</span>" + sampleBadge(c) + "</div><h3>" + esc(c.title) + "</h3><p>" + esc(c.description) + '</p><span class="small">' + esc(c.period) + "</span></article>";
      }).join("") + "</div>" : comingSoon("books", "Our first book drive is coming soon");
    });
  }
  function faqs() {
    $$('[data-render="faqs"]').forEach(function (el) {
      el.innerHTML = (DATA.faqs || []).map(function (f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("");
    });
  }

  /* ---------- Tabs ---------- */
  function tabs() {
    $$("[data-tabs]").forEach(function (wrap) {
      var tabsEl = $$('[role="tab"]', wrap);
      function select(t, focus) {
        tabsEl.forEach(function (x) {
          var on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
          document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
        });
        if (focus) t.focus();
      }
      tabsEl.forEach(function (t, i) {
        t.addEventListener("click", function () { select(t); history.replaceState(null, "", "#" + t.dataset.hash); });
        t.addEventListener("keydown", function (e) {
          var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (n) { e.preventDefault(); select(tabsEl[(i + n + tabsEl.length) % tabsEl.length], true); }
        });
      });
      var fromHash = tabsEl.filter(function (t) { return "#" + t.dataset.hash === location.hash; })[0];
      select(fromHash || tabsEl[0]);
    });
  }

  /* ---------- Forms ---------- */
  function field(type, id, name, label, required, extra) {
    return '<div class="field"><label for="' + id + '">' + label + (required ? "" : ' <span class="optional">(optional)</span>') + "</label>" +
      '<input type="' + type + '" id="' + id + '" name="' + name + '"' + (required ? " required" : "") + " " + (extra || "") + ' aria-describedby="' + id + '-err">' +
      '<p class="error-msg" id="' + id + '-err"></p></div>';
  }
  function consentBlock(p) {
    return '<div class="consent"><label class="option"><input type="checkbox" name="privacy_consent" value="Yes" required> <span>I agree to the <a href="privacy.html" target="_blank">privacy policy</a> and to being contacted about this request.</span></label>' +
      '<label class="option"><input type="checkbox" name="age_confirmation" value="Yes" required> <span>I am 18 or older, or a parent or guardian has agreed to me sharing these details.</span></label>' +
      '<p class="error-msg" id="' + p + '-consent-err"></p>' +
      '<input class="hp" type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true"></div>';
  }
  window.KSR_consentBlock = consentBlock;

  function errFor(input) {
    var id = input.getAttribute("aria-describedby");
    if (id) return document.getElementById(id);
    var box = input.closest(".field, .consent");
    return box ? $(".error-msg", box) : null;
  }
  function validate(form) {
    var first = null;
    $$(".error-msg", form).forEach(function (e) { e.textContent = ""; });
    $$("[aria-invalid]", form).forEach(function (e) { e.removeAttribute("aria-invalid"); });
    function fail(el, msg, target) {
      (target || el).setAttribute("aria-invalid", "true");
      var e = errFor(el); if (e && !e.textContent) e.textContent = msg;
      if (!first) first = el;
    }
    $$("input, select, textarea", form).forEach(function (el) {
      if (el.type === "hidden" || el.classList.contains("hp") || el.disabled || el.closest("[hidden]")) return;
      if (el.type === "checkbox") { if (el.required && !el.checked) fail(el, "Please tick the boxes to continue."); return; }
      var v = el.value.trim();
      var lbl = (form.querySelector('label[for="' + el.id + '"]') || {}).textContent || "This field";
      lbl = lbl.replace(/\(optional\)/, "").trim();
      if (el.required && !v) return fail(el, "Enter your " + lbl.toLowerCase().replace(/^your /, "") + ".");
      if (v && el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return fail(el, "Enter an email address like name@example.com.");
      if (v && el.type === "tel" && !/^[+\d][\d\s-]{6,16}$/.test(v)) return fail(el, "Enter a phone number using digits only, for example 98765 43210.");
      if (v && el.type === "number" && (+v < +(el.min || -Infinity) || +v > +(el.max || Infinity))) return fail(el, "Enter a number between " + el.min + " and " + el.max + ".");
      if (el.maxLength > 0 && v.length > el.maxLength) return fail(el, "Keep this under " + el.maxLength + " characters.");
    });
    $$("[data-required-group]", form).forEach(function (g) {
      if (g.closest("[hidden]")) return;
      if (!$$("input:checked", g).length) { var e = $(".error-msg", g); if (e) e.textContent = "Choose at least one option."; if (!first) first = $("input", g); }
    });
    if (first) first.focus();
    return !first;
  }
  function collect(form) {
    var out = {}, fd = new FormData(form);
    fd.forEach(function (v, k) { if (k === "botcheck") return; v = String(v).trim(); if (!v) return; out[k] = out[k] ? out[k] + ", " + v : v; });
    return out;
  }
  function mailtoFor(name, data) {
    var body = Object.keys(data).map(function (k) { return k.replace(/_/g, " ") + ": " + data[k]; }).join("\n");
    return "mailto:" + CFG.email + "?subject=" + encodeURIComponent(name + " — " + CFG.orgName) + "&body=" + encodeURIComponent(body);
  }
  function firstSocial() { return (CFG.social || []).filter(function (l) { return safeUrl(l.url); })[0]; }
  function setStatus(form, cls, html) {
    var s = $(".form-status", form); s.className = "form-status " + (cls || ""); s.innerHTML = html || "";
    if (cls === "is-error" || cls === "is-notice") s.setAttribute("role", "alert");
  }
  function success(form) {
    var tpl = form.parentNode.querySelector("template[data-success]") || $("template[data-success]");
    var box = document.createElement("div");
    box.innerHTML = tpl ? tpl.innerHTML : '<div class="form-success"><h3 tabindex="-1">Thank you</h3><p>We’ve received your message and will reply by email.</p></div>';
    form.replaceWith(box);
    fillFollow(box);
    var h = $("[tabindex='-1']", box); if (h) h.focus();
  }
  function bindForm(form) {
    if (form._bound) return; form._bound = true;
    form.setAttribute("novalidate", "");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setStatus(form, "", "");
      if (!validate(form)) { setStatus(form, "is-error", "Some details need fixing. The first one is highlighted."); return; }
      var name = form.getAttribute("data-form");
      if (form.botcheck && form.botcheck.value) { success(form); return; }
      var data = collect(form);
      var fc = CFG.forms || {};
      var alt = CFG.email ? ' <a href="' + mailtoFor(name, data) + '">Email your details to us instead</a>.' : " Please try again later.";
      if (fc.provider === "none" || !fc.provider || (fc.provider === "web3forms" && !fc.web3formsKey) || (fc.provider === "formspree" && !fc.formspreeEndpoint)) {
        setStatus(form, "is-notice", "Online sending isn’t switched on yet, so this form can’t send your details." + (CFG.email ? alt.replace("Email your details to us instead", "Send them by email instead") + " Your email app will open with your answers filled in." : (firstSocial() ? " Please check back soon, or message us on <a href=\"" + esc(firstSocial().url) + "\" target=\"_blank\" rel=\"noopener\">" + esc(firstSocial().label) + "</a>." : " Please check back soon.")));
        return;
      }
      var btn = $('button[type="submit"]', form), label = btn.innerHTML;
      btn.disabled = true; btn.setAttribute("aria-busy", "true"); btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
      var req;
      if (fc.provider === "web3forms") {
        data.access_key = fc.web3formsKey; data.subject = name + " — " + CFG.orgName; data.from_name = CFG.orgName; data.form = name;
        if (data.email) data.replyto = data.email;
        req = fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { return r.json(); }).then(function (j) { if (!j.success) throw new Error(j.message || "Not accepted"); });
      } else {
        data._subject = name + " — " + CFG.orgName; data.form = name;
        req = fetch(fc.formspreeEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); });
      }
      req.then(function () { success(form); }).catch(function () {
        btn.disabled = false; btn.removeAttribute("aria-busy"); btn.innerHTML = label;
        setStatus(form, "is-error", "Your details weren’t sent. Check your internet connection and try again." + (CFG.email ? alt : ""));
      });
    });
  }

  /* Pre-select options from the link, e.g. join.html?type=Volunteer */
  function prefill() {
    var params = new URLSearchParams(location.search);
    params.forEach(function (val, key) {
      $$('input[type="checkbox"][data-prefill="' + key + '"], input[type="radio"][data-prefill="' + key + '"]').forEach(function (i) { if (i.value === val) i.checked = true; });
      $$('select[data-prefill="' + key + '"]').forEach(function (s) { $$("option", s).forEach(function (o) { if (o.value === val) s.value = val; }); });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillOrg(); menu(); impact(); events(); videos(); opportunities(); resources(); campaigns(); faqs(); tabs(); prefill();
    $$("form[data-form]").forEach(bindForm);
    var cfgForms = CFG.forms || {};
    var live = cfgForms.provider === "web3forms" ? !!cfgForms.web3formsKey : cfgForms.provider === "formspree" ? !!cfgForms.formspreeEndpoint : false;
    $$("[data-requires-forms]").forEach(function (el) { el.hidden = !live; });
  });
})();
