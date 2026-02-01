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

  // --- Language Selection Popup ---
  function createPopup() {
    var overlay = document.createElement('div');
    overlay.id = 'evidence-lang-overlay';
    overlay.innerHTML =
      '<div class="evidence-lang-popup">' +
        '<div class="evidence-lang-title">\u8bf7\u9009\u62e9\u6587\u4ef6\u7248\u672c</div>' +
        '<a id="evidence-lang-ja" class="evidence-lang-btn" target="_blank" rel="noopener noreferrer">' +
          '<span class="evidence-lang-icon">\ud83c\uddef\ud83c\uddf5</span> \u65e5\u8bed\u539f\u7248' +
        '</a>' +
        '<a id="evidence-lang-cn" class="evidence-lang-btn" target="_blank" rel="noopener noreferrer">' +
          '<span class="evidence-lang-icon">\ud83c\udde8\ud83c\uddf3</span> \u4e2d\u6587\u7ffb\u8bd1\u4ef6' +
        '</a>' +
        '<button id="evidence-lang-close" class="evidence-lang-close">\u53d6\u6d88</button>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.id === 'evidence-lang-close') {
        overlay.classList.remove('active');
      }
    });

    return overlay;
  }

  var popupOverlay = null;

  function showLangPopup(translations) {
    if (!popupOverlay) popupOverlay = createPopup();

    var jaBtn = document.getElementById('evidence-lang-ja');
    var cnBtn = document.getElementById('evidence-lang-cn');

    // Japanese version
    if (translations.ja && translations.ja.uploaded) {
      jaBtn.href = buildUrl(translations.ja.storagePath);
      jaBtn.classList.remove('disabled');
      jaBtn.onclick = function () {
        setTimeout(function () { popupOverlay.classList.remove('active'); }, 100);
      };
    } else {
      jaBtn.href = '#';
      jaBtn.classList.add('disabled');
      jaBtn.onclick = function (e) { e.preventDefault(); };
    }

    // Chinese version
    if (translations.cn && translations.cn.uploaded) {
      cnBtn.href = buildUrl(translations.cn.storagePath);
      cnBtn.classList.remove('disabled');
      cnBtn.textContent = '';
      cnBtn.innerHTML = '<span class="evidence-lang-icon">\ud83c\udde8\ud83c\uddf3</span> \u4e2d\u6587\u7ffb\u8bd1\u4ef6';
      cnBtn.onclick = function () {
        setTimeout(function () { popupOverlay.classList.remove('active'); }, 100);
      };
    } else {
      cnBtn.href = '#';
      cnBtn.classList.add('disabled');
      cnBtn.innerHTML = '<span class="evidence-lang-icon">\ud83c\udde8\ud83c\uddf3</span> \u4e2d\u6587\u7ffb\u8bd1\u4ef6 <span class="evidence-lang-badge">\u5f85\u8865\u5145</span>';
      cnBtn.onclick = function (e) { e.preventDefault(); };
    }

    popupOverlay.classList.add('active');
  }

  // --- Process evidence-tag spans ---
  function processEvidenceTags() {
    var tags = document.querySelectorAll('span.evidence-tag');
    tags.forEach(function (span) {
      var text = span.textContent.trim();

      // Extract filename: everything before " — " (mdash) or full text
      var parts = text.split(/\s*[\u2014\u2013\u2014]\s*/);
      var filenamePart = parts[0].trim();

      var fileInfo = findFile(filenamePart);
      if (!fileInfo) return; // no match, leave as-is

      if (fileInfo.uploaded && fileInfo.type !== 'folder') {
        if (fileInfo.translations) {
          // Bilingual file: convert to clickable span that opens popup
          var btn = document.createElement('span');
          btn.className = 'evidence-tag evidence-link evidence-bilingual';
          btn.setAttribute('data-file-type', fileInfo.type);
          btn.innerHTML = span.innerHTML;
          btn.title = '\u70b9\u51fb\u9009\u62e9\u65e5\u8bed\u539f\u7248\u6216\u4e2d\u6587\u7ffb\u8bd1\u4ef6';
          btn.style.cursor = 'pointer';
          var trans = fileInfo.translations;
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            showLangPopup(trans);
          });
          span.parentNode.replaceChild(btn, span);
        } else {
          // Single-language file: direct link
          var link = document.createElement('a');
          link.href = buildUrl(fileInfo.storagePath);
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.className = 'evidence-tag evidence-link';
          link.setAttribute('data-file-type', fileInfo.type);
          link.innerHTML = span.innerHTML;
          link.title = '\u70b9\u51fb\u67e5\u770b\u8bc1\u636e\u6587\u4ef6';
          span.parentNode.replaceChild(link, span);
        }
      } else if (fileInfo.type === 'folder') {
        span.classList.add('evidence-folder');
        span.title = '\u6b64\u4e3a\u6587\u4ef6\u5939\uff0c\u5305\u542b\u591a\u4e2a\u6587\u4ef6';
      } else {
        // Not uploaded yet
        span.classList.add('evidence-unavailable');
        span.title = '\u6b64\u6587\u4ef6\u5c1a\u672a\u4e0a\u4f20\uff0c\u7a0d\u540e\u6dfb\u52a0';
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

        var fileInfo = findFile(cleanRef);

        if (fileInfo && fileInfo.uploaded && fileInfo.type !== 'folder') {
          if (fileInfo.translations) {
            // Bilingual: use span with click handler
            var spanId = 'eq-' + idx + '-' + Math.random().toString(36).substr(2, 5);
            newHTML += '<span id="' + spanId + '" class="evidence-quote-link evidence-bilingual" ' +
              'data-file-type="' + fileInfo.type + '" ' +
              'title="\u70b9\u51fb\u9009\u62e9\u65e5\u8bed\u539f\u7248\u6216\u4e2d\u6587\u7ffb\u8bd1\u4ef6" ' +
              'style="cursor:pointer">' + cleanRef + '</span>';
            // Attach handler after innerHTML is set
            setTimeout(function () {
              var el = document.getElementById(spanId);
              if (el) {
                el.addEventListener('click', function (e) {
                  e.preventDefault();
                  showLangPopup(fileInfo.translations);
                });
              }
            }, 0);
          } else {
            newHTML += '<a href="' + buildUrl(fileInfo.storagePath) + '" target="_blank" ' +
              'rel="noopener noreferrer" class="evidence-quote-link" ' +
              'data-file-type="' + fileInfo.type + '" ' +
              'title="\u70b9\u51fb\u67e5\u770b\u8bc1\u636e\u6587\u4ef6">' + cleanRef + '</a>';
          }
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
    document.querySelectorAll('.evidence-media-item img, .card img').forEach(function (img) {
      var src = img.getAttribute('src');
      if (src && src.indexOf('media/') === 0) {
        var filename = src.replace('media/', '');
        img.src = SUPABASE_STORAGE_URL + '/' + encodeURIComponent(filename);
      }
    });

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
