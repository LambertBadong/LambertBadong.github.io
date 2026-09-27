/* Lambert Badong portfolio - interactions (vanilla, no dependencies).
   The page is fully rendered in HTML; this script only adds state, clicks and scaling. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var root = document.querySelector('.site');
  if (!root) return;

  /* ---- tiny state holder (same API the design's component logic was written against) */
  function DCLogic(props) { this.props = props; this.state = {}; }
  DCLogic.prototype.setState = function (patch) { this.state = Object.assign({}, this.state, patch); render(); };

  class Component extends DCLogic {
  renderVals() {
    const s = this.state || {};
    const sel = s.sel || 0;
    const door = s.door === undefined ? true : s.door;
    const ex = !!s.ex, flip = !!s.flip, touched = !!s.touched;
    const cut = s.cut === undefined ? true : s.cut;
    const shot = s.shot || 0;
    const tool = s.tool || 0;
    const taps = s.taps || {};
    const bump = (k, extra) => this.setState(Object.assign({ taps: Object.assign({}, taps, { [k]: (taps[k] || 0) + 1 }) }, extra || {}));
    const ab = k => { const n = taps[k] || 0; return n === 0 ? '' : (n % 2 ? ' ta' : ' tb'); };
    const P = [null,
      ['1', 'FoxFab Engineering Vault', 'An Obsidian second brain for the switchgear design team.', '#p1'],
      ['2', 'Engineering Tool Hub', 'One app for every job\u2019s BOMs, revisions, exports and prints.', '#p2'],
      ['3', 'Daybook DMS', 'Offline, encrypted daycare software for small daycares.', '#p3'],
      ['4', 'Kobe Bot', 'A Discord bot that runs our household from chat.', '#p4'],
      ['5', 'Project KOBE', 'Voice AI desk assistant \u2014 work in progress.', '#p5']];
    const view = sel ? 'v' + sel : (ex ? (flip ? 'vxf' : 'vx') : (flip ? 'v0f' : 'v0'));
    const rest = !sel && !ex && !flip;
    const cap = P[sel] || P[1];
    const shotNames = ['dashboard', 'attendance', 'billing', 'payroll', 'analytics', 'compliance'];
    const v = {
      accent: this.props.accent ?? '#e0674f',
      rootClass: (this.props.motion ?? true) ? '' : 'still',
      stageCls: touched ? 'hold' : 'live',
      camCls: 'zoom ' + view,
      pitchCls: 'pitch ' + view,
      yawCls: 'yaw ' + view,
      ovlCls: 'ovlw' + (rest ? '' : ' off'),
      doorCls: 'door' + (door ? ' open' : ''),
      doorLabel: door ? 'Close door' : 'Open door',
      doorPressed: door ? 'true' : 'false',
      exLabel: ex ? 'Assemble' : 'Explode',
      exPressed: ex ? 'true' : 'false',
      rotPressed: flip ? 'true' : 'false',
      orbitTxt: touched ? 'auto-orbit paused \u00b7 Reset view to resume' : 'auto-orbit on',
      orbitTag: touched ? '\u25cf HOLD' : '\u25cf LIVE',
      capCls: 'cap' + (sel ? ' on' : '') + ab('cap'),
      capNum: cap[0], capTitle: cap[1], capText: cap[2], capHref: cap[3],
      toggleDoor: () => this.setState({ door: !door, touched: true }),
      toggleExplode: () => this.setState({ ex: !ex, sel: 0, touched: true }),
      rotate: () => this.setState({ flip: !flip, sel: 0, touched: true }),
      reset: () => this.setState({ sel: 0, door: true, ex: false, flip: false, touched: false }),
      ofcCls: 'ofc' + (cut ? ' cut' : '') + ab('cut'),
      cutLabel: cut ? 'Close section' : 'Cut section A\u2013A',
      cutPressed: cut ? 'true' : 'false',
      toggleCut: () => bump('cut', { cut: !cut }),
      hudCls: 'hud' + ab('hud'),
      hudLabel: (taps.hud || 0) ? 'Reboot HUD' : 'Boot HUD',
      bootHud: () => bump('hud'),
      lapCls: 'lap' + ab('lap'),
      shotName: shotNames[shot],
      nextShot: () => bump('lap', { shot: (shot + 1) % 6 })
    };
    for (let i = 0; i < 4; i++) v['sec' + i] = 'sec s' + i + (ex ? ' ex' : '') + (i === 0 && door ? ' dopen' : '') + (sel === i + 1 ? ' hl' : '') + (sel === 5 ? ' hle' : '');
    for (let n = 1; n <= 5; n++) {
      v['pick' + n] = () => bump('cap', { sel: sel === n ? 0 : n, ex: false, flip: false, touched: true });
      v['bal' + n] = 'bal b' + n + (sel === n ? ' on' : '');
      v['key' + n] = 'krow k' + n + (sel === n ? ' on' : '');
      v['tree' + n] = 'tree' + (sel === n ? ' on' : '');
      v['pt' + n] = 'pt' + ab('p' + n);
      v['spin' + n] = () => bump('p' + n);
    }
    for (let k = 1; k <= 7; k++) {
      v['tr' + k] = 'trow' + (tool === k ? ' on' : '') + ab('t' + k);
      v['tool' + k] = () => bump('t' + k, { tool: k });
    }
    const AG = [['Read', 'Reads release forms and BOMs'], ['Write', 'Fills job and part notes'], ['Diff', 'Diffs parts against reference job'], ['Log', 'Logs every task for audit']];
    const ag = s.ag || 1;
    v.agName = 'Step ' + ag + ' \u00b7 ' + AG[ag - 1][0];
    v.agRole = AG[ag - 1][1];
    v.agRoleCls = 'agrole' + ab('ag');
    for (let k = 1; k <= 4; k++) { v['ag' + k] = 'agn' + (ag === k ? ' on' : ''); v['agPick' + k] = () => bump('ag', { ag: k }); }
    for (let k = 0; k < 6; k++) v['shot' + k] = 'shot' + (shot === k ? ' on' : ((shot + 5) % 6 === k && s.shot !== undefined ? ' prev' : ''));
    ['ocop','ocla','mgpt','mcla','hcop','hgpt','hcla','acla','acop','agpt','ccla','ccop','cgpt'].forEach(b => { v['bc_' + b] = 'botbtn' + ab('b_' + b); v['wave_' + b] = () => bump('b_' + b); });
    return v;
  }
}

  var motion = true;
  try { if (localStorage.getItem('lb-motion') === 'off') motion = false; } catch (e) { /* storage blocked */ }
  var comp = new Component({ accent: '#e0674f', motion: motion });
  var vals = {};
  var bound = Array.prototype.slice.call(document.querySelectorAll('[data-bind]'));
  var texts = Array.prototype.slice.call(document.querySelectorAll('[data-bt]'));
  var HOLE = /\{\{\s*([\w.]+)\s*\}\}/g;

  function render() {
    vals = comp.renderVals();
    for (var i = 0; i < bound.length; i++) {
      var el = bound[i], at = el.attributes;
      for (var j = 0; j < at.length; j++) {
        var n = at[j].name;
        if (n.indexOf('data-b-') !== 0) continue;
        var target = n.slice(7);
        var v = at[j].value.replace(HOLE, function (m, k) { return vals[k] == null ? '' : String(vals[k]); });
        if (el.getAttribute(target) !== v) el.setAttribute(target, v);
      }
    }
    for (var t = 0; t < texts.length; t++) {
      var val = vals[texts[t].getAttribute('data-bt')];
      val = val == null ? '' : String(val);
      if (texts[t].textContent !== val) texts[t].textContent = val;
    }
    var mb = document.querySelector('.motion-btn');
    if (mb) {
      mb.setAttribute('aria-pressed', motion ? 'true' : 'false');
      mb.querySelector('.lbl').textContent = motion ? 'Motion on' : 'Motion off';
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-click]') : null;
    if (!el) return;
    var f = vals[el.getAttribute('data-click')];
    if (typeof f === 'function') f(e);
  });

  /* ---- motion toggle (remembered) */
  var mbtn = document.querySelector('.motion-btn');
  if (mbtn) mbtn.addEventListener('click', function () {
    motion = !motion;
    comp.props.motion = motion;
    try { localStorage.setItem('lb-motion', motion ? 'on' : 'off'); } catch (e) { /* ignore */ }
    render();
  });

  /* ---- mobile menu */
  var nav = root.querySelector('nav');
  var menu = nav && nav.querySelector('.menu-btn');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (menu) {
    menu.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('.navlinks a')) setMenu(false); });
    nav.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menu.focus(); } });
  }

  /* ---- logo / back-to-top: smooth scroll to the very top, close the menu */
  var reduceMq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  Array.prototype.forEach.call(document.querySelectorAll('a[href="#top"]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (menu) setMenu(false);
      var smooth = !(reduceMq && reduceMq.matches) && motion;
      window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' });
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    });
  });

  /* ---- scale the fixed-size 3D stages to their column */
  var fits = Array.prototype.slice.call(document.querySelectorAll('.fit'));
  function fitAll() {
    for (var i = 0; i < fits.length; i++) {
      var f = fits[i], w = +f.getAttribute('data-w'), h = +f.getAttribute('data-h'), stage = f.firstElementChild;
      f.style.maxWidth = w + 'px';
      var s = Math.min(1, (f.clientWidth || w) / w);
      stage.style.transform = s < 1 ? 'scale(' + s + ')' : '';
      f.style.height = (h * s) + 'px';
      f.style.setProperty('--inv', (1 / s).toFixed(4));
      f.style.setProperty('--bz', Math.max(1, 0.62 / s).toFixed(4));
    }
  }
  fitAll();
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function () { fitAll(); });
    fits.forEach(function (f) { ro.observe(f.parentElement); });
  } else {
    window.addEventListener('resize', fitAll);
  }

  /* ---- scroll reveals: CSS scroll timelines where supported, IntersectionObserver otherwise */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cssTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  if (!cssTimeline && !reduce && 'IntersectionObserver' in window) {
    root.classList.add('io');
    var rows = root.querySelectorAll('.trow');
    for (var r = 0; r < rows.length; r++) rows[r].style.setProperty('--i', r);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(root.querySelectorAll('.sr, .trow'), function (el) { io.observe(el); });
  }

  render();
})();
