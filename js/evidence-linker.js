// ============================================================
// Evidence Linker - Converts evidence references to clickable links
// ============================================================
// Depends on: supabase-config.js (SUPABASE_STORAGE_URL)
//             evidence-files.js  (EVIDENCE_FILES, EVIDENCE_ALIAS_MAP)
// ============================================================

(function () {
  'use strict';

  // --- Utility: Build Supabase Storage URL ---
  function buildUrl(storagePath) {
    return SUPABASE_STORAGE_URL + '/' + encodeURIComponent(storagePath);
  }

  // --- Utility: Find matching file in registry ---
  function findFile(text) {
    var t = text.trim();

    // 1. Direct match
    if (EVIDENCE_FILES[t]) return EVIDENCE_FILES[t];

    // 2. Alias match
    if (EVIDENCE_ALIAS_MAP[t]) return EVIDENCE_FILES[EVIDENCE_ALIAS_MAP[t]];

    // 3. Try with common extensions
    var exts = ['.pdf', '.PDF', '.jpg', '.JPG', '.png', '.PNG'];
    for (var i = 0; i < exts.length; i++) {
      if (EVIDENCE_FILES[t + exts[i]]) return EVIDENCE_FILES[t + exts[i]];
    }

    // 4. Strip parenthetical suffixes: "文件名（描述）" -> "文件名"
    var stripped = t.replace(/[（(][^）)]*[）)]/g, '').trim();
    if (stripped !== t) {
      var result = findFile(stripped);
      if (result) return result;
    }

    // 5. Partial match: check if any key starts with the text or vice versa
    var keys = Object.keys(EVIDENCE_FILES);
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      var keyBase = key.replace(/\.[^.]+$/, ''); // strip extension
      if (key.indexOf(t) === 0 || t.indexOf(keyBase) === 0) {
        return EVIDENCE_FILES[key];
      }
    }

    // 6. Check aliases for partial match
    var aliasKeys = Object.keys(EVIDENCE_ALIAS_MAP);
    for (var k = 0; k < aliasKeys.length; k++) {
      if (t.indexOf(aliasKeys[k]) >= 0 || aliasKeys[k].indexOf(t) >= 0) {
        return EVIDENCE_FILES[EVIDENCE_ALIAS_MAP[aliasKeys[k]]];
      }
    }

    return null;
  }

  // --- Process evidence-tag spans ---
  function processEvidenceTags() {
    var tags = document.querySelectorAll('span.evidence-tag');
    tags.forEach(function (span) {
      var text = span.textContent.trim();

      // Extract filename: everything before " — " (mdash) or full text
      var parts = text.split(/\s*[\u2014\u2013—]\s*/);
      var filenamePart = parts[0].trim();

      var fileInfo = findFile(filenamePart);
      if (!fileInfo) return; // no match, leave as-is

      if (fileInfo.uploaded && fileInfo.type !== 'folder') {
        // Convert to clickable link
        var link = document.createElement('a');
        link.href = buildUrl(fileInfo.storagePath);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'evidence-tag evidence-link';
        link.setAttribute('data-file-type', fileInfo.type);
        link.innerHTML = span.innerHTML;
        link.title = '\u70b9\u51fb\u67e5\u770b\u8bc1\u636e\u6587\u4ef6'; // 点击查看证据文件
        span.parentNode.replaceChild(link, span);
      } else if (fileInfo.type === 'folder') {
        span.classList.add('evidence-folder');
        span.title = '\u6b64\u4e3a\u6587\u4ef6\u5939\uff0c\u5305\u542b\u591a\u4e2a\u6587\u4ef6'; // 此为文件夹，包含多个文件
      } else {
        // Not uploaded yet
        span.classList.add('evidence-unavailable');
        span.title = '\u6b64\u6587\u4ef6\u5c1a\u672a\u4e0a\u4f20\uff0c\u7a0d\u540e\u6dfb\u52a0'; // 此文件尚未上传，稍后添加
      }
    });
  }

  // --- Process quote divs ---
  function processQuoteDivs() {
    var quotes = document.querySelectorAll('.quote');
    quotes.forEach(function (div) {
      var text = div.textContent.trim();
      if (text.indexOf('\u8bc1\u636e\u6587\u4ef6') !== 0) return; // must start with 证据文件

      // Extract file section after "证据文件："
      var fileSection = text.replace(/^\u8bc1\u636e\u6587\u4ef6[\uff1a:]\s*/, '').trim();

      // Split by Chinese comma, semicolons, or "、"
      var fileRefs = fileSection.split(/[、，;]\s*/);

      var newHTML = '<strong>\u8bc1\u636e\u6587\u4ef6\uff1a</strong>';
      fileRefs.forEach(function (ref, idx) {
        var cleanRef = ref.trim();
        if (!cleanRef) return;

        // Try to extract just the filename (before any long description in parentheses)
        var fileInfo = findFile(cleanRef);

        if (fileInfo && fileInfo.uploaded && fileInfo.type !== 'folder') {
          newHTML += '<a href="' + buildUrl(fileInfo.storagePath) + '" target="_blank" ' +
            'rel="noopener noreferrer" class="evidence-quote-link" ' +
            'data-file-type="' + fileInfo.type + '" ' +
            'title="\u70b9\u51fb\u67e5\u770b\u8bc1\u636e\u6587\u4ef6">' + cleanRef + '</a>';
        } else if (fileInfo && !fileInfo.uploaded) {
          newHTML += '<span class="evidence-quote-unavailable" ' +
            'title="\u6b64\u6587\u4ef6\u5c1a\u672a\u4e0a\u4f20">' + cleanRef + '</span>';
        } else {
          newHTML += cleanRef;
        }

        if (idx < fileRefs.length - 1) newHTML += '\u3001';
      });

      div.innerHTML = newHTML;
    });
  }

  // --- Update embedded media to use Supabase Storage ---
  function updateEmbeddedMedia() {
    // Update images
    document.querySelectorAll('.evidence-media-item img, .card img').forEach(function (img) {
      var src = img.getAttribute('src');
      if (src && src.indexOf('media/') === 0) {
        var filename = src.replace('media/', '');
        img.src = SUPABASE_STORAGE_URL + '/' + encodeURIComponent(filename);
      }
    });

    // Update videos
    document.querySelectorAll('.evidence-media-item video source, .card video source').forEach(function (source) {
      var src = source.getAttribute('src');
      if (src && src.indexOf('media/') === 0) {
        var filename = src.replace('media/', '');
        source.src = SUPABASE_STORAGE_URL + '/' + encodeURIComponent(filename);
        source.parentElement.load();
      }
    });
  }

  // --- Initialize on DOM ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    processEvidenceTags();
    processQuoteDivs();
    updateEmbeddedMedia();
  }
})();
