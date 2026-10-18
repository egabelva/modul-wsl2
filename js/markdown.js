/*
 * Pembaca Markdown kecil untuk materi modul.
 * Mendukung: judul (#..######), paragraf, daftar bernomor, daftar poin,
 * blok kode (```), huruf tebal (**), miring (*), dan kode dalam backtick.
 * Semua teks di-escape dulu, jadi tanda < dan > selalu tampil sebagai teks
 * (contoh: <script> atau <nama-paket> tidak pernah ditafsirkan sebagai HTML).
 */
(function (global) {
  'use strict';

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function inline(text) {
    var codes = [];
    var t = text.replace(/`([^`]+)`/g, function (m, c) {
      codes.push(c);
      return '\u0000' + (codes.length - 1) + '\u0000';
    });
    t = esc(t);
    t = t.replace(/\*\*([^*\s](?:[^*]*[^*\s])?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/\*([^*\s](?:[^*]*[^*\s])?)\*/g, '<em>$1</em>');
    t = t.replace(/\u0000(\d+)\u0000/g, function (m, i) {
      return '<code>' + esc(codes[Number(i)]) + '</code>';
    });
    return t;
  }

  var OL = /^\s*\d+\.\s+/;
  var UL = /^\s*[-*]\s+/;
  var FENCE = /^```/;
  var HEAD = /^(#{1,6})\s+(.*)$/;

  function render(md) {
    var lines = String(md).replace(/\r\n?/g, '\n').split('\n');
    var out = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }

      if (FENCE.test(line)) {
        var buf = [];
        i++;
        while (i < lines.length && !FENCE.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
        continue;
      }

      var h = line.match(HEAD);
      if (h) {
        var lv = h[1].length;
        out.push('<h' + lv + '>' + inline(h[2].trim()) + '</h' + lv + '>');
        i++;
        continue;
      }

      if (OL.test(line) || UL.test(line)) {
        var ordered = OL.test(line);
        var marker = ordered ? OL : UL;
        var items = [];
        while (i < lines.length) {
          var j = i;
          while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && marker.test(lines[j])) {
            var text = lines[j].replace(marker, '');
            j++;
            while (j < lines.length && lines[j].trim() && !OL.test(lines[j]) &&
                   !UL.test(lines[j]) && /^\s+/.test(lines[j])) {
              text += ' ' + lines[j].trim();
              j++;
            }
            items.push(text);
            i = j;
          } else {
            break;
          }
        }
        var tag = ordered ? 'ol' : 'ul';
        out.push('<' + tag + '>' + items.map(function (t) {
          return '<li>' + inline(t) + '</li>';
        }).join('') + '</' + tag + '>');
        continue;
      }

      var para = [line.trim()];
      i++;
      while (i < lines.length && lines[i].trim() && !FENCE.test(lines[i]) &&
             !HEAD.test(lines[i]) && !OL.test(lines[i]) && !UL.test(lines[i])) {
        para.push(lines[i].trim());
        i++;
      }
      out.push('<p>' + inline(para.join(' ')) + '</p>');
    }
    return out.join('\n');
  }

  /*
   * Memecah satu file Markdown menjadi modul-modul.
   * Awal modul = baris "# Modul NN: Judul" (di luar blok kode).
   * Nomor modul untuk website = urutan kemunculan di file (1, 2, 3, ...).
   */
  var MODULE_HEAD = /^#\s+Modul\s+\d+\s*:\s*(.+?)\s*$/;

  function splitModules(md) {
    var lines = String(md).replace(/\r\n?/g, '\n').split('\n');
    var modules = [];
    var current = null;
    var inFence = false;

    lines.forEach(function (line) {
      if (FENCE.test(line)) inFence = !inFence;
      var m = !inFence ? line.match(MODULE_HEAD) : null;
      if (m) {
        current = { number: modules.length + 1, title: m[1], lines: [] };
        modules.push(current);
      } else if (current) {
        current.lines.push(line);
      }
    });

    return modules.map(function (mod) {
      return { number: mod.number, title: mod.title, body: mod.lines.join('\n').trim() };
    });
  }

  global.Markdown = { esc: esc, render: render, splitModules: splitModules };
})(typeof window !== 'undefined' ? window : globalThis);
