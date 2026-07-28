/* =============================================================================
   NextGen AI LLC — site.js
   Header, footer, and the calculator suite are each defined ONCE here and
   reused on every page as custom elements. Edit this file, every page updates.

   Loaded from <head> WITHOUT defer, so the browser upgrades <site-header>,
   <site-footer> and <calc-suite> while it parses them — no flash, no layout
   shift. Every page also carries a <noscript> fallback nav.

   Usage:
     <site-header page="toolguard"></site-header>     page = home|toolguard|ai
     <site-footer></site-footer>
     <calc-suite></calc-suite>
   ========================================================================== */
(function () {
  'use strict';

  /* ---- single source of truth for contact + nav ------------------------- */
  var CONTACT = {
    name:  'Michael Carey',
    co:    'NextGen AI LLC',
    city:  'Bloomington, Indiana',
    tel:   '317-200-2112',
    telHref: 'tel:+13172002112',
    email: 'Michaelcareyai@gmail.com'
  };

  // Root-relative so the same markup works at any depth.
  var BASE = '/NEXTGENAI/';
  var NAV = [
    { id: 'toolguard', label: 'Field Operations', href: BASE + 'toolguard/', ref: 'TG' },
    { id: 'ai',        label: 'Custom AI',        href: BASE + 'ai/',        ref: 'AI' }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------------------------------------------------------------- HEADER */
  var HDR_HTML = function (page) {
    var tabs = NAV.map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : '';
      return '<a class="tab" href="' + n.href + '"' + cur + '>' + esc(n.label) + '</a>';
    }).join('');

    var mtabs = NAV.map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : '';
      return '<a href="' + n.href + '"' + cur + '>' + esc(n.label) +
             '<span class="rf">' + n.ref + '</span></a>';
    }).join('');

    return '' +
      '<div class="hdr">' +
        '<div class="hdr-in">' +
          '<a class="wordmark" href="' + BASE + '">' +
            '<span class="n">NextGen AI</span><span class="llc">LLC</span>' +
          '</a>' +
          '<nav class="tabs" aria-label="Primary">' + tabs + '</nav>' +
          '<a class="hdr-cta" href="' + CONTACT.telHref + '">Contact</a>' +
          '<button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
        '<nav class="mnav" id="mnav" aria-label="Primary, mobile">' +
          mtabs +
          '<a href="' + CONTACT.telHref + '">Call ' + CONTACT.tel + '<span class="rf">TEL</span></a>' +
          '<a href="mailto:' + CONTACT.email + '">Email<span class="rf">@</span></a>' +
        '</nav>' +
      '</div>';
  };

  /* ---------------------------------------------------------------- FOOTER */
  var FTR_HTML = '' +
    '<footer class="ftr">' +
      '<div class="ftr-in">' +
        '<div>' +
          '<a class="wordmark" href="' + BASE + '">' +
            '<span class="n">NextGen AI</span><span class="llc">LLC</span>' +
          '</a>' +
          '<p class="small muted" style="margin-top:.9rem;max-width:34ch">' +
            'Field operations systems for construction, and custom AI built on ' +
            'infrastructure you own.</p>' +
          '<p class="ftr-contact">' +
            esc(CONTACT.name) + ' &middot; ' + esc(CONTACT.co) + '<br>' +
            esc(CONTACT.city) + '<br>' +
            '<a href="' + CONTACT.telHref + '">' + CONTACT.tel + '</a><br>' +
            '<a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a>' +
          '</p>' +
        '</div>' +
        '<div>' +
          '<h3 class="lbl">Field Operations</h3>' +
          '<ul>' +
            '<li><a href="' + BASE + 'toolguard/">ToolGuard overview</a></li>' +
            '<li><a href="' + BASE + 'toolguard/#channels">QR and text intake</a></li>' +
            '<li><a href="' + BASE + 'toolguard/#safety">Safety records</a></li>' +
            '<li><a href="' + BASE + 'toolguard/roi/">ROI workbook</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h3 class="lbl">Custom AI</h3>' +
          '<ul>' +
            '<li><a href="' + BASE + 'ai/#stage-1">1 &middot; AI Audit</a></li>' +
            '<li><a href="' + BASE + 'ai/#stage-2">2 &middot; Data Foundation</a></li>' +
            '<li><a href="' + BASE + 'ai/#stage-3">3 &middot; Automation</a></li>' +
            '<li><a href="' + BASE + 'ai/#stage-4">4 &middot; Command Center</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="ftr-btm">' +
        '<span>&copy; 2026 NextGen AI LLC. All rights reserved.</span>' +
        '<span class="mono">ToolGuard is a product of NextGen AI LLC</span>' +
      '</div>' +
    '</footer>';

  /* ------------------------------------------------- CALCULATOR DEFINITIONS
     Preserved from the original ToolGuard site: same models, same constants,
     same conservative trim, same disclaimer language. The only change is that
     the total is gated behind a call.
  ------------------------------------------------------------------------ */
  var CALCS = [
    {
      id: 'fleet', label: 'Fleet Overview',
      note: 'Models direct labor recovery from digital inspections plus uptime gains from ' +
            'fewer major repairs. Conservative floor and growth upside — transparent math.',
      inputs: [
        { id: 'f-size',  label: 'Fleet size (units)',                min: 1,    max: 500, step: 1,   val: 50 },
        { id: 'f-weekly',label: 'Weekly inspections (per asset)',    min: 0,    max: 14,  step: .25, val: 1  },
        { id: 'f-rate',  label: 'Shop hourly rate (loaded)',         min: 25,   max: 200, step: 1,   val: 50, cur: true },
        { id: 'f-inc',   label: 'Prevented breakdowns (per unit/yr)',min: .25,  max: 4,   step: .25, val: 1  }
      ],
      kicker: 'Recoverable annual impact',
      rows: [
        { k: 'Floor · direct labor reclaim',  id: 'f-floor'  },
        { k: 'Upside · prevented breakdowns', id: 'f-upside' }
      ],
      note2: 'Each line applies a $35 conservative trim so totals are not overstated. ' +
             'Actual results scale with fleet utilization and adoption.',
      calc: function (v) {
        var TRIM = 35, ADMIN = 12 / 60, SHOP_HRS = 8;
        function trim(n) { return Math.max(0, Math.round(n) - TRIM); }
        var reports = v['f-size'] * v['f-weekly'] * 52;
        var floor   = trim(reports * ADMIN * v['f-rate']);
        var upside  = trim(v['f-size'] * v['f-inc'] * SHOP_HRS * v['f-rate']);
        return { rows: { 'f-floor': floor, 'f-upside': upside }, total: floor + upside };
      }
    },
    {
      id: 'inspections', label: 'Daily Inspections',
      note: 'Paper inspections cost 10 minutes per machine per day — filling the form, walking it ' +
            'to the trailer, someone re-entering it in the office. Digital brings that to under a ' +
            'minute. Operator and manager time both count.',
      inputs: [
        { id: 'i-fleet', label: 'Fleet size (machines)', min: 1,  max: 500, step: 1, val: 50 },
        { id: 'i-days',  label: 'Working days / year',   min: 50, max: 365, step: 1, val: 250 },
        { id: 'i-op',    label: 'Operator rate ($/hr)',  min: 15, max: 75,  step: 1, val: 28, cur: true },
        { id: 'i-mgr',   label: 'Manager rate ($/hr)',   min: 15, max: 100, step: 1, val: 35, cur: true }
      ],
      kicker: 'Annual time savings',
      rows: [
        { k: 'Operator · 10 min/machine/day', id: 'i-opv'  },
        { k: 'Manager · 2 min/machine/day',   id: 'i-mgrv' }
      ],
      note2: 'Based on 10 min operator + 2 min manager saved per machine per day vs. paper.',
      calc: function (v) {
        var op  = v['i-fleet'] * (10 / 60) * v['i-op']  * v['i-days'];
        var mgr = v['i-fleet'] * (2 / 60)  * v['i-mgr'] * v['i-days'];
        return { rows: { 'i-opv': op, 'i-mgrv': mgr }, total: op + mgr };
      }
    },
    {
      id: 'service', label: 'Service Requests',
      note: 'A phone or text service request takes 15 minutes of back-and-forth to get all the ' +
            'information to the shop. A QR request arrives complete in under a minute. That is ' +
            '14 minutes of manager time and 5 minutes of crew time per request.',
      inputs: [
        { id: 's-vol',  label: 'Requests / week',     min: 1,  max: 200, step: 1, val: 25 },
        { id: 's-mgr',  label: 'Manager rate ($/hr)', min: 15, max: 100, step: 1, val: 35, cur: true },
        { id: 's-crew', label: 'Crew rate ($/hr)',    min: 15, max: 75,  step: 1, val: 28, cur: true }
      ],
      kicker: 'Annual time savings',
      rows: [
        { k: 'Manager · 14 min saved/request', id: 's-mgrv'  },
        { k: 'Crew · 5 min saved/request',     id: 's-crewv' }
      ],
      note2: 'Based on a 15-min phone/text process vs. a 1-min QR request.',
      calc: function (v) {
        var mgr  = (14 / 60) * v['s-mgr']  * v['s-vol'] * 52;
        var crew = (5 / 60)  * v['s-crew'] * v['s-vol'] * 52;
        return { rows: { 's-mgrv': mgr, 's-crewv': crew }, total: mgr + crew };
      }
    },
    {
      id: 'transport', label: 'Transport Requests',
      note: 'Manual move coordination takes 20 minutes of phone tag to get the right information ' +
            'to the right people. A QR transport request arrives complete. That is 18 minutes of ' +
            'dispatcher time and 7 minutes of crew time per move.',
      inputs: [
        { id: 't-vol',  label: 'Moves / week',           min: 1,  max: 100, step: 1, val: 10 },
        { id: 't-disp', label: 'Dispatcher rate ($/hr)', min: 15, max: 100, step: 1, val: 35, cur: true },
        { id: 't-crew', label: 'Crew rate ($/hr)',       min: 15, max: 75,  step: 1, val: 28, cur: true }
      ],
      kicker: 'Annual time savings',
      rows: [
        { k: 'Dispatcher · 18 min saved/move', id: 't-dispv' },
        { k: 'Crew · 7 min saved/move',        id: 't-crewv' }
      ],
      note2: 'Based on 20-min phone coordination vs. a 2-min QR request.',
      calc: function (v) {
        var disp = (18 / 60) * v['t-disp'] * v['t-vol'] * 52;
        var crew = (7 / 60)  * v['t-crew'] * v['t-vol'] * 52;
        return { rows: { 't-dispv': disp, 't-crewv': crew }, total: disp + crew };
      }
    }
  ];

  var DISCLAIMER =
    'All calculator outputs are illustrative estimates for discussion only. They are not ' +
    'guarantees of savings, performance, or outcomes, and are not financial or legal advice. ' +
    'Your actual results will vary.';

  function calcHTML() {
    var tabs = CALCS.map(function (c, i) {
      return '<button class="calc-tab" type="button" role="tab" id="ct-' + c.id + '" ' +
             'aria-controls="cp-' + c.id + '" aria-selected="' + (i === 0) + '" ' +
             'tabindex="' + (i === 0 ? '0' : '-1') + '">' + esc(c.label) + '</button>';
    }).join('');

    var panels = CALCS.map(function (c, i) {
      var fields = c.inputs.map(function (f) {
        return '' +
          '<div class="field">' +
            '<label class="field-lbl" for="' + f.id + '-n">' +
              '<span>' + esc(f.label) + '</span>' +
              '<span class="field-in">' +
                (f.cur ? '<span class="cur">$</span>' : '') +
                '<input type="number" id="' + f.id + '-n" min="' + f.min + '" max="' + f.max +
                  '" step="' + f.step + '" value="' + f.val + '">' +
              '</span>' +
            '</label>' +
            '<input type="range" id="' + f.id + '" min="' + f.min + '" max="' + f.max +
              '" step="' + f.step + '" value="' + f.val + '" ' +
              'aria-label="' + esc(f.label) + ' slider" tabindex="-1">' +
          '</div>';
      }).join('');

      var rows = c.rows.map(function (r) {
        return '<div class="kv"><span class="k">' + esc(r.k) +
               '</span><span class="v locked" id="' + r.id + '">$00,000</span></div>';
      }).join('');

      return '' +
        '<div class="calc-panel" id="cp-' + c.id + '" role="tabpanel" aria-labelledby="ct-' + c.id + '"' +
          (i === 0 ? '' : ' hidden') + '>' +
          '<p class="calc-note">' + esc(c.note) + '</p>' +
          '<div class="calc-grid">' +
            '<div class="plate"><div class="plate-hd">' +
                '<span class="lbl">Your numbers</span><span class="lbl">' + c.id.toUpperCase() + '</span>' +
              '</div>' +
              '<div class="plate-bd">' + fields + '</div>' +
            '</div>' +
            '<div class="plate plate--rivet readout">' +
              '<div class="plate-hd">' +
                '<span class="lbl">' + esc(c.kicker) + '</span>' +
                '<span class="lbl lbl--y">Locked</span>' +
              '</div>' +
              '<div class="plate-bd">' +
                '<p class="readout-total locked" id="' + c.id + '-total">$000,000</p>' +
                '<div style="margin-top:1.1rem">' + rows + '</div>' +
                '<div class="gate">' +
                  '<p>Your inputs are set. We will run the full model against your fleet on a ' +
                     '12-minute call and walk you through the math line by line.</p>' +
                  '<a class="btn btn--y" href="' + CONTACT.telHref + '">Get your number &middot; ' + CONTACT.tel + '</a>' +
                  '<a class="btn btn--o" href="mailto:' + CONTACT.email +
                     '?subject=ROI%20numbers%20for%20my%20fleet">Email instead</a>' +
                '</div>' +
                '<p class="disclaimer">' + esc(c.note2) + ' ' + esc(DISCLAIMER) + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    return '<div class="calc-tabs" role="tablist" aria-label="ROI models">' + tabs + '</div>' + panels;
  }

  /* --------------------------------------------------------------- BEHAVIOUR */

  function wireTablist(root, tabSel, panelPrefix) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll(tabSel));
    if (!tabs.length) return;

    function show(i) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.setAttribute('tabindex', on ? '0' : '-1');
        var p = root.querySelector('#' + t.getAttribute('aria-controls'));
        if (p) { if (on) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); } }
      });
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var n = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { n = (i + 1) % tabs.length; }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { n = (i - 1 + tabs.length) % tabs.length; }
        else if (e.key === 'Home') { n = 0; }
        else if (e.key === 'End') { n = tabs.length - 1; }
        else { return; }
        e.preventDefault();
        tabs[n].focus();
        show(n);
      });
    });
    show(0);
  }

  function wireCalcs(root) {
    var fmt = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };

    CALCS.forEach(function (c) {
      var vals = {};
      c.inputs.forEach(function (f) { vals[f.id] = f.val; });

      function run() {
        var out = c.calc(vals);
        Object.keys(out.rows).forEach(function (id) {
          var el = root.querySelector('#' + id);
          if (el) el.textContent = fmt(out.rows[id]);
        });
        var tot = root.querySelector('#' + c.id + '-total');
        if (tot) tot.textContent = fmt(out.total);
      }

      c.inputs.forEach(function (f) {
        var range = root.querySelector('#' + f.id);
        var num   = root.querySelector('#' + f.id + '-n');
        if (!range || !num) return;

        function set(raw, src) {
          var v = parseFloat(raw);
          if (isNaN(v)) return;
          v = Math.min(f.max, Math.max(f.min, Math.round(v / f.step) * f.step));
          v = Math.round(v * 100) / 100;      // kill float drift on .25 steps
          vals[f.id] = v;
          if (src !== 'range') range.value = v;
          if (src !== 'num')   num.value   = v;
          run();
        }

        range.addEventListener('input', function () { set(this.value, 'range'); });
        num.addEventListener('input',   function () { set(this.value, 'num'); });
        // clamp only on blur, so typing "1" on the way to "150" isn't fought
        num.addEventListener('blur',    function () { set(this.value, null); });
      });

      run();
    });
  }

  /* ----------------------------------------------------------- ELEMENTS */
  function define(name, render, after) {
    if (customElements.get(name)) return;
    customElements.define(name, class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.rendered) return;
        this.dataset.rendered = '1';
        this.innerHTML = render(this);
        if (after) after(this);
      }
    });
  }

  define('site-header', function (el) {
    return HDR_HTML(el.getAttribute('page') || '');
  }, function (el) {
    var burger = el.querySelector('.burger');
    var mnav   = el.querySelector('.mnav');
    if (!burger || !mnav) return;
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mnav.classList.contains('open')) {
        mnav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  });

  define('site-footer', function () { return FTR_HTML; });

  define('calc-suite', calcHTML, function (el) {
    wireTablist(el, '.calc-tab');
    wireCalcs(el);
  });

  /* ------------------------------------- page-level widgets (progressive) */
  document.addEventListener('DOMContentLoaded', function () {
    // workflow mockup tabs on the ToolGuard page
    var mock = document.querySelector('[data-mocks]');
    if (mock) wireTablist(mock, '.mock-tab');

    /* Text-thread mockup: type the conversation out in sequence when it
       scrolls in. The bubbles are hidden HERE rather than in the stylesheet,
       so with JS off — or if anything below fails — the full thread is simply
       visible. A fallback timer guarantees it reveals even if the observer
       never fires. */
    var thread = document.querySelector('[data-thread]');
    if (thread) {
      var bubbles = Array.prototype.slice.call(thread.querySelectorAll('.bub'));
      var reduce  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reduce && window.IntersectionObserver && bubbles.length) {
        var revealed = false;
        bubbles.forEach(function (b) { b.style.opacity = '0'; });

        var reveal = function () {
          if (revealed) return;
          revealed = true;
          bubbles.forEach(function (b, i) {
            setTimeout(function () {
              b.style.transition = 'opacity .35s ease';
              b.style.opacity = '1';
            }, i * 420);
          });
        };

        var io = new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          reveal();
        }, { threshold: .3 });
        io.observe(thread);

        // safety net: never leave the thread stuck invisible
        setTimeout(reveal, 6000);
      }
    }
  });
})();
