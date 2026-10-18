/*
 * Penyimpanan progres di localStorage.
 * Karena penyelesaian modul selalu berurutan dari modul 1, yang disimpan
 * cukup satu angka: jumlah modul yang sudah selesai.
 */
(function (global) {
  'use strict';

  var KEY = 'cybersec50:progress';
  var APP_ID = 'cybersecurity-50-modul';

  function isWholeNumber(v) {
    return typeof v === 'number' && isFinite(v) && Math.floor(v) === v && v >= 0;
  }

  // Hasil: { completed, status } dengan status 'ok' | 'empty' | 'invalid' | 'unavailable'
  function load(total) {
    var raw;
    try {
      raw = global.localStorage.getItem(KEY);
    } catch (e) {
      return { completed: 0, status: 'unavailable' };
    }
    if (raw === null) return { completed: 0, status: 'empty' };

    var data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return { completed: 0, status: 'invalid' };
    }
    if (data && typeof data === 'object' && isWholeNumber(data.completed)) {
      return { completed: Math.min(data.completed, total), status: 'ok' };
    }
    return { completed: 0, status: 'invalid' };
  }

  function save(completed) {
    try {
      global.localStorage.setItem(KEY, JSON.stringify({ version: 1, completed: completed }));
      return true;
    } catch (e) {
      return false;
    }
  }

  function buildExport(completed, total) {
    return {
      app: APP_ID,
      version: 1,
      completed: completed,
      total: total,
      exportedAt: new Date().toISOString()
    };
  }

  // Hasil: { ok: true, completed } atau { ok: false, error }
  function parseImport(text, total) {
    var data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return { ok: false, error: 'File bukan JSON yang valid.' };
    }
    if (!data || typeof data !== 'object' || data.app !== APP_ID) {
      return { ok: false, error: 'File ini bukan cadangan progres website ini.' };
    }
    if (!isWholeNumber(data.completed)) {
      return { ok: false, error: 'Isi file tidak valid: jumlah modul selesai harus bilangan bulat 0 atau lebih.' };
    }
    if (data.completed > total) {
      return { ok: false, error: 'Cadangan berisi ' + data.completed + ' modul selesai, sedangkan materi saat ini hanya ' + total + ' modul.' };
    }
    return { ok: true, completed: data.completed };
  }

  global.Progress = { load: load, save: save, buildExport: buildExport, parseImport: parseImport };
})(window);
