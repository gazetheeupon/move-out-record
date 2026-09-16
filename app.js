(function () {
  "use strict";

  var photos = []; // {id, label, dataUrl}
  var seq = 0;

  var $ = function (id) { return document.getElementById(id); };

  var STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

  function init() {
    var sel = $("state");
    STATES.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s; o.textContent = s;
      sel.appendChild(o);
    });
    sel.addEventListener("change", renderRights);
    $("fileinp").addEventListener("change", onFiles);
    $("gen").addEventListener("click", generate);
    $("moveout").value = new Date().toISOString().slice(0, 10);
    updateCount();
  }

  function renderRights() {
    var s = $("state").value;
    var box = $("rights");
    var note = $("stateNote");
    if (!s) {
      box.innerHTML = '<p class="note">Select a state above to see sourced security-deposit and inspection guidance.</p>';
      note.textContent = "";
      return;
    }
    var r = (window.RENTER_RIGHTS && window.RENTER_RIGHTS[s]) || window.RENTER_RIGHTS._default;
    note.textContent = r.name ? "Guidance for " + r.name + " — verified " + (r.verified || "") + ". See sources; not legal advice." : "";
    var html = "";
    if (r.deadline) html += "<p><strong>Deposit deadline:</strong> " + esc(r.deadline) + "</p>";
    if (r.inspection) html += "<p><strong>Inspections:</strong> " + esc(r.inspection) + "</p>";
    if (r.caution) html += "<p class='note'>" + esc(r.caution) + "</p>";
    html += "<ul>";
    (r.sources || []).forEach(function (src) {
      html += '<li><a href="' + esc(src.url) + '" target="_blank" rel="noopener noreferrer">' + esc(src.label) + "</a></li>";
    });
    html += "</ul>";
    box.innerHTML = html;
  }

  function onFiles(e) {
    var files = Array.prototype.slice.call(e.target.files || []);
    var label = $("room").value.trim() || "Room";
    var pending = files.length;
    if (!pending) return;
    files.forEach(function (f) {
      if (!/^image\//.test(f.type)) return;
      var fr = new FileReader();
      fr.onload = function () {
        photos.push({ id: ++seq, label: label, dataUrl: String(fr.result) });
        renderPhotos();
      };
      fr.readAsDataURL(f);
    });
    e.target.value = "";
  }

  function renderPhotos() {
    var box = $("photos");
    box.innerHTML = "";
    photos.forEach(function (p) {
      var d = document.createElement("div");
      d.className = "photo";
      d.dataset.id = String(p.id);
      var img = document.createElement("img");
      img.src = p.dataUrl;
      img.alt = p.label;
      var meta = document.createElement("div");
      meta.className = "meta";
      var inp = document.createElement("input");
      inp.type = "text";
      inp.value = p.label;
      inp.setAttribute("aria-label", "Photo label");
      inp.addEventListener("input", function () { p.label = inp.value; });
      meta.appendChild(inp);
      var rm = document.createElement("button");
      rm.className = "rm";
      rm.textContent = "✕";
      rm.setAttribute("aria-label", "Remove photo");
      rm.addEventListener("click", function () {
        photos = photos.filter(function (x) { return x.id !== p.id; });
        renderPhotos();
      });
      d.appendChild(img);
      d.appendChild(meta);
      d.appendChild(rm);
      box.appendChild(d);
    });
    updateCount();
  }

  function updateCount() {
    $("photoCount").textContent = photos.length
      ? photos.length + " photo" + (photos.length > 1 ? "s" : "") + " added. They exist only in this browser tab."
      : "No photos yet.";
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // ---- report window (printable, photos embedded) ----
  function generate() {
    var status = $("status");
    if (!photos.length) {
      status.textContent = "Add at least one photo first.";
      return;
    }
    var s = $("state").value;
    var r = (window.RENTER_RIGHTS && s && (window.RENTER_RIGHTS[s] || window.RENTER_RIGHTS._default)) || null;

    var w = window.open("", "_blank");
    if (!w) {
      status.textContent = "Your browser blocked the report window. Allow pop-ups for this page and try again.";
      return;
    }
    var out = w.document;
    out.title = "Move-Out Record";
    var head = out.createElement("style");
    head.textContent =
      "body{font:12px/1.5 Georgia,serif;margin:32px;color:#111}" +
      "h1{font-size:20px;margin:0 0 4px}h2{font-size:14px;margin:18px 0 6px;border-bottom:1px solid #999;padding-bottom:2px}" +
      ".meta{color:#444;font-size:11px;margin-bottom:14px}" +
      ".ph{break-inside:avoid;page-break-inside:avoid;margin:10px 0}" +
      ".ph img{width:100%;max-height:400px;object-fit:contain;border:1px solid #ccc}" +
      ".cap{font-size:11px;color:#333;margin-top:2px}" +
      "table{width:100%;border-collapse:collapse;font-size:11px}" +
      "td,th{border:1px solid #999;padding:4px;text-align:left;vertical-align:top}" +
      ".small{font-size:10px;color:#444}" +
      "@media print{.noprint{display:none}button{display:none}}";
    out.head.appendChild(head);

    var body = out.body;
    var h = out.createElement("h1");
    h.textContent = "Move-Out Condition Record";
    body.appendChild(h);

    var m = out.createElement("div");
    m.className = "meta";
    var generated = new Date().toLocaleString();
    m.textContent = "Generated " + generated + " · Tool: Move-Out Record (browser-based; photos were processed on the tenant's device and not uploaded anywhere)";
    body.appendChild(m);

    var t = out.createElement("table");
    t.innerHTML =
      "<tr><th>Property address</th><td>" + esc($("addr").value) + "</td></tr>" +
      "<tr><th>Move-out date</th><td>" + esc($("moveout").value) + "</td></tr>" +
      "<tr><th>State</th><td>" + esc(s || "—") + "</td></tr>" +
      "<tr><th>Tenant</th><td>" + esc($("name").value) + "</td></tr>";
    body.appendChild(t);

    var h2 = out.createElement("h2");
    h2.textContent = "Condition notes";
    body.appendChild(h2);
    var p = out.createElement("p");
    p.style.whiteSpace = "pre-wrap";
    p.textContent = $("notes").value || "—";
    body.appendChild(p);

    var h3 = out.createElement("h2");
    h3.textContent = "Photos (" + photos.length + ")";
    body.appendChild(h3);
    photos.forEach(function (ph, i) {
      var d = out.createElement("div");
      d.className = "ph";
      var img = out.createElement("img");
      img.src = ph.dataUrl;
      img.alt = ph.label;
      var cap = out.createElement("div");
      cap.className = "cap";
      cap.textContent = "Photo " + (i + 1) + " — " + (ph.label || "Unlabeled");
      d.appendChild(img);
      d.appendChild(cap);
      body.appendChild(d);
    });

    if (r && (r.deadline || r.sources)) {
      var h4 = out.createElement("h2");
      h4.textContent = "State guidance (informational, not legal advice)";
      body.appendChild(h4);
      if (r.deadline) {
        var pd = out.createElement("p");
        pd.textContent = r.deadline;
        body.appendChild(pd);
      }
      if (r.inspection) {
        var pi = out.createElement("p");
        pi.textContent = r.inspection;
        body.appendChild(pi);
      }
      var ul = out.createElement("ul");
      (r.sources || []).forEach(function (src) {
        var li = out.createElement("li");
        var a = out.createElement("a");
        a.href = src.url;
        a.textContent = src.label;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        ul.appendChild(li);
      });
      body.appendChild(ul);
    }

    var small = out.createElement("p");
    small.className = "small";
    small.textContent = "General information only — not legal advice. Confirm deadlines with the official sources linked above.";
    body.appendChild(small);

    var btn = out.createElement("button");
    btn.textContent = "Print / Save as PDF";
    btn.className = "noprint";
    btn.style.cssText = "padding:10px 18px;font:14px system-ui;cursor:pointer";
    btn.addEventListener("click", function () { w.print(); });
    body.insertBefore(btn, body.firstChild);

    status.textContent = "Report ready — use “Print / Save as PDF” in the report window.";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
