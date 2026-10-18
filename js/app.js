/*
 * Logika website: memuat materi, routing (#/ dan #/modul/N),
 * dashboard, halaman belajar, progres berurutan, ekspor/impor.
 */
(function () {
  'use strict';

  var MD_URL = 'content/modul-cybersecurity.md';
  var SITE_TITLE = 'Cybersecurity White Hat Hacker';
  var esc = Markdown.esc;
  var root = document.getElementById('app');

  var state = { modules: [], completed: 0, notice: '' };

  /* ---------- Util ---------- */

  function pad(n) {
    return String(n).padStart(String(state.modules.length).length, '0');
  }

  function percent() {
    return Math.round((state.completed / state.modules.length) * 100);
  }

  function today() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function toast(message) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }

  function setCompleted(value) {
    state.completed = value;
    if (!Progress.save(value)) {
      toast('Progres tidak bisa disimpan di browser ini. Ekspor progres sebelum menutup tab.');
    }
  }

  /* ---------- Tampilan ---------- */

  function statusMark(n) {
    if (n <= state.completed) return '<span class="st" aria-hidden="true">\u2713</span><span class="sr">selesai</span>';
    if (n === state.completed + 1) return '<span class="st" aria-hidden="true">\u25CB</span><span class="sr">modul berikutnya</span>';
    return '<span class="st"></span>';
  }

  function itemClass(n, current) {
    var c = 'sb-item';
    if (n <= state.completed) c += ' done';
    else if (n === state.completed + 1) c += ' next';
    if (n === current) c += ' current';
    return c;
  }

  function moduleItem(m, current) {
    return '<li><a class="' + itemClass(m.number, current) + '" href="#/modul/' + m.number + '"' +
      (m.number === current ? ' aria-current="page"' : '') + ' title="' + esc(m.title) + '">' +
      '<span class="num">' + pad(m.number) + '</span>' +
      '<span class="ttl">' + esc(m.title) + '</span>' +
      statusMark(m.number) + '</a></li>';
  }

  function viewDashboard() {
    var total = state.modules.length;
    var done = state.completed;
    var next = done < total ? done + 1 : null;

    var ticks = '';
    for (var i = 0; i < total; i++) {
      ticks += '<span class="tick' + (i < done ? ' on' : '') + '"></span>';
    }

    var cta;
    if (next) {
      cta = '<a class="btn primary" href="#/modul/' + next + '">' +
        (done === 0 ? 'Mulai dari modul 1' : 'Lanjutkan ke modul ' + next) + '</a>';
    } else {
      cta = '<p class="all-done">Semua modul sudah selesai.</p>' +
        '<a class="btn" href="#/modul/1">Baca ulang dari modul 1</a>';
    }

    var list = state.modules.map(function (m) { return moduleItem(m, 0); }).join('');

    return '' +
      '<main class="dash">' +
        '<header class="dash-head">' +
          '<h1>' + esc(SITE_TITLE) + '</h1>' +
          '<p class="sub">' + total + ' modul pembelajaran</p>' +
        '</header>' +
        (state.notice ? '<p class="notice" role="alert">' + esc(state.notice) + '</p>' : '') +
        '<section class="panel progress" aria-labelledby="h-progress">' +
          '<h2 id="h-progress">Progres belajar</h2>' +
          '<div class="pct-row">' +
            '<span class="pct">' + percent() + '<small>%</small></span>' +
            '<p class="count"><strong>' + done + '</strong> dari <strong>' + total + '</strong> modul selesai</p>' +
          '</div>' +
          '<div class="ticks" style="grid-template-columns:repeat(' + total + ',1fr)" role="progressbar"' +
            ' aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + done + '"' +
            ' aria-label="Modul selesai berurutan">' + ticks + '</div>' +
          '<div class="cta">' + cta + '</div>' +
        '</section>' +
        '<section class="modules" aria-labelledby="h-modules">' +
          '<h2 id="h-modules">Semua modul</h2>' +
          '<ol class="mod-list" style="grid-template-rows:repeat(' + Math.ceil(total / 2) + ',auto)">' + list + '</ol>' +
        '</section>' +
        '<section class="panel backup" aria-labelledby="h-backup">' +
          '<h2 id="h-backup">Cadangan progres</h2>' +
          '<p>Progres disimpan di browser ini saja. Data hilang kalau data situs dihapus, dan tidak ikut ke perangkat atau browser lain. ' +
          'Ekspor file cadangan secara berkala, lalu impor file itu untuk memulihkan progres.</p>' +
          '<div class="actions">' +
            '<button type="button" class="btn" id="btn-export">Ekspor progres</button>' +
            '<button type="button" class="btn" id="btn-import">Impor progres</button>' +
            '<input type="file" id="file-import" accept="application/json,.json" hidden>' +
          '</div>' +
          '<p id="backup-msg" class="backup-msg" role="status"></p>' +
        '</section>' +
      '</main>';
  }

  function completionControl(n) {
    var c = state.completed;
    if (n < c) {
      return {
        html: '<span class="state done"><span aria-hidden="true">\u2713</span> Selesai</span>',
        hint: 'Hanya modul terakhir yang selesai (modul ' + c + ') yang bisa dibatalkan.'
      };
    }
    if (n === c) {
      return {
        html: '<span class="state done"><span aria-hidden="true">\u2713</span> Selesai</span>' +
          '<button type="button" class="btn ghost" id="btn-undo">Batalkan selesai</button>',
        hint: ''
      };
    }
    if (n === c + 1) {
      return { html: '<button type="button" class="btn primary" id="btn-done">Selesai</button>', hint: '' };
    }
    return {
      html: '<button type="button" class="btn" disabled>Selesai</button>',
      hint: 'Selesaikan modul ' + (c + 1) + ' dulu agar modul ini bisa ditandai selesai.'
    };
  }

  function viewLearn(n) {
    var total = state.modules.length;
    var m = state.modules[n - 1];
    var ctrl = completionControl(n);

    var prev = n > 1
      ? '<a class="btn" href="#/modul/' + (n - 1) + '">Sebelumnya</a>'
      : '<span class="btn is-disabled" aria-disabled="true">Sebelumnya</span>';
    var next = n < total
      ? '<a class="btn" href="#/modul/' + (n + 1) + '">Berikutnya</a>'
      : '<span class="btn is-disabled" aria-disabled="true">Berikutnya</span>';

    var isDone = n <= state.completed;

    return '' +
      '<div class="learn">' +
        '<aside class="sidebar" aria-label="Daftar modul">' +
          '<div class="sb-head">' +
            '<a class="back" href="#/">Dashboard</a>' +
            '<p class="sb-progress">' + state.completed + ' dari ' + total + ' selesai (' + percent() + '%)</p>' +
          '</div>' +
          '<ol class="sb-list">' + state.modules.map(function (x) { return moduleItem(x, n); }).join('') + '</ol>' +
        '</aside>' +
        '<main class="main" tabindex="-1">' +
          '<article class="article">' +
            '<h1><span class="num">Modul ' + pad(n) + '</span>' + esc(m.title) + '</h1>' +
            '<p class="status' + (isDone ? ' is-done' : '') + '">' +
              (isDone ? '<span aria-hidden="true">\u2713</span> Selesai' : 'Belum selesai') + '</p>' +
            Markdown.render(m.body) +
            '<nav class="pager" aria-label="Navigasi modul">' +
              prev +
              '<div class="mid">' + ctrl.html + '</div>' +
              next +
            '</nav>' +
            (ctrl.hint ? '<p class="hint">' + esc(ctrl.hint) + '</p>' : '') +
          '</article>' +
        '</main>' +
      '</div>';
  }

  function viewNotFound() {
    return '<main class="dash"><div class="panel">' +
      '<h1 class="nf">Halaman tidak ditemukan</h1>' +
      '<p>Modul yang kamu tuju tidak ada. Materi saat ini berisi modul 1 sampai ' + state.modules.length + '.</p>' +
      '<p><a class="btn primary" href="#/">Kembali ke dashboard</a></p>' +
      '</div></main>';
  }

  function showLoadError(err) {
    var detail;
    if (location.protocol === 'file:') {
      detail = 'Halaman ini dibuka langsung dari file di komputer. Chrome memblokir pemuatan materi dengan cara itu. ' +
        'Jalankan lewat server lokal (misalnya ekstensi Live Server di VS Code), atau buka versi di GitHub Pages. Langkahnya ada di README.md.';
    } else if (err && err.message === 'FORMAT') {
      detail = 'File materi terbaca, tetapi tidak ada judul modul berformat "# Modul NN: Judul". Periksa isi ' + MD_URL + '.';
    } else {
      detail = 'File materi (' + MD_URL + ') tidak bisa dimuat' +
        (err && err.message ? ' (' + err.message + ')' : '') +
        '. Pastikan file itu ada di folder content dan namanya sama persis.';
    }
    root.innerHTML = '<main class="dash"><div class="panel">' +
      '<h1 class="nf">Materi tidak dapat dimuat</h1><p>' + esc(detail) + '</p></div></main>';
  }

  /* ---------- Routing ---------- */

  function parseRoute() {
    var h = location.hash;
    var m = h.match(/^#\/modul\/(\d+)$/);
    if (m) return { name: 'modul', n: parseInt(m[1], 10) };
    if (h === '' || h === '#' || h === '#/') return { name: 'dashboard' };
    return { name: 'notfound' };
  }

  function render(keepScroll) {
    var total = state.modules.length;
    var r = parseRoute();
    var prevList = document.querySelector('.sb-list');
    var prevMain = document.querySelector('.main');
    var sbTop = prevList ? prevList.scrollTop : 0;
    var mainTop = prevMain ? prevMain.scrollTop : 0;
    var hadSidebar = !!prevList;

    var html;
    var title = SITE_TITLE;
    if (r.name === 'modul' && r.n >= 1 && r.n <= total) {
      html = viewLearn(r.n);
      title = 'Modul ' + pad(r.n) + ': ' + state.modules[r.n - 1].title + ' | ' + SITE_TITLE;
    } else if (r.name === 'dashboard') {
      html = viewDashboard();
    } else {
      html = viewNotFound();
      title = 'Halaman tidak ditemukan | ' + SITE_TITLE;
    }
    root.innerHTML = html;
    document.title = title;

    var list = document.querySelector('.sb-list');
    var main = document.querySelector('.main');
    if (list) {
      var cur = list.querySelector('.current');
      if (hadSidebar) list.scrollTop = sbTop;
      if (cur) {
        var top = cur.offsetTop;
        var bottom = top + cur.offsetHeight;
        if (!hadSidebar) {
          list.scrollTop = Math.max(0, top - list.clientHeight / 2);
        } else if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) {
          list.scrollTop = Math.max(0, top - list.clientHeight / 2);
        }
      }
    }
    if (main) {
      if (keepScroll) {
        main.scrollTop = mainTop;
      } else {
        main.scrollTop = 0;
        main.focus({ preventScroll: true });
      }
    } else if (!keepScroll) {
      window.scrollTo(0, 0);
    }
  }

  /* ---------- Aksi ---------- */

  function markDone() {
    var r = parseRoute();
    if (r.name !== 'modul' || r.n !== state.completed + 1) return;
    setCompleted(r.n);
    render(true);
    toast('Modul ' + pad(r.n) + ' ditandai selesai.');
  }

  function undoDone() {
    var r = parseRoute();
    if (r.name !== 'modul' || r.n !== state.completed) return;
    setCompleted(r.n - 1);
    render(true);
    toast('Status selesai modul ' + pad(r.n) + ' dibatalkan.');
  }

  function exportProgress() {
    var data = Progress.buildExport(state.completed, state.modules.length);
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'progres-cybersecurity-' + today() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    setBackupMessage('Cadangan diekspor: ' + state.completed + ' modul selesai.', false);
  }

  function setBackupMessage(text, isError) {
    var el = document.getElementById('backup-msg');
    if (!el) return;
    el.textContent = text;
    el.className = 'backup-msg' + (isError ? ' error' : '');
  }

  function importProgress(file) {
    file.text().then(function (text) {
      var result = Progress.parseImport(text, state.modules.length);
      if (!result.ok) {
        setBackupMessage('Impor dibatalkan. ' + result.error, true);
        return;
      }
      var ok = window.confirm(
        'Progres saat ini (' + state.completed + ' modul selesai) akan diganti menjadi ' +
        result.completed + ' modul selesai. Lanjutkan?'
      );
      if (!ok) {
        setBackupMessage('Impor dibatalkan. Progres tidak diubah.', false);
        return;
      }
      setCompleted(result.completed);
      render(true);
      setBackupMessage('Impor berhasil: ' + result.completed + ' modul selesai.', false);
    }).catch(function () {
      setBackupMessage('Impor dibatalkan. File tidak bisa dibaca.', true);
    });
  }

  root.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    if (btn.id === 'btn-done') markDone();
    else if (btn.id === 'btn-undo') undoDone();
    else if (btn.id === 'btn-export') exportProgress();
    else if (btn.id === 'btn-import') {
      var input = document.getElementById('file-import');
      if (input) input.click();
    }
  });

  root.addEventListener('change', function (e) {
    if (e.target.id !== 'file-import') return;
    var file = e.target.files && e.target.files[0];
    if (file) importProgress(file);
    e.target.value = '';
  });

  /* ---------- Mulai ---------- */

  function start() {
    fetch(MD_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        state.modules = Markdown.splitModules(text);
        if (!state.modules.length) throw new Error('FORMAT');

        var saved = Progress.load(state.modules.length);
        state.completed = saved.completed;
        if (saved.status === 'unavailable') {
          state.notice = 'Browser ini tidak mengizinkan penyimpanan lokal, jadi progres hilang saat tab ditutup. Gunakan ekspor progres untuk menyimpan cadangan.';
        } else if (saved.status === 'invalid') {
          state.notice = 'Data progres di browser tidak valid, jadi progres dimulai dari 0. Kalau punya file cadangan, impor di bagian Cadangan progres.';
        }

        window.addEventListener('hashchange', function () { render(false); });
        render(false);
      })
      .catch(showLoadError);
  }

  start();
})();
