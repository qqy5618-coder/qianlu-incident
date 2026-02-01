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

  // ============================================================
  // Popup: unified popup for preview + language selection
  // ============================================================
  function createPopup() {
    var overlay = document.createElement('div');
    overlay.id = 'evidence-lang-overlay';
    overlay.innerHTML =
      '<div class="evidence-lang-popup">' +
        '<div class="evidence-lang-title">\u8bf7\u9009\u62e9\u67e5\u770b\u65b9\u5f0f</div>' +
        '<button id="evidence-preview-btn" class="evidence-preview-btn">' +
          '\ud83d\udd0d \u5feb\u901f\u6d4f\u89c8\uff08\u5173\u952e\u5185\u5bb9\uff09' +
        '</button>' +
        '<hr class="evidence-popup-divider">' +
        '<a id="evidence-lang-ja" class="evidence-lang-btn" target="_blank" rel="noopener noreferrer">' +
          '<span class="evidence-lang-icon">\ud83c\uddef\ud83c\uddf5</span> \u65e5\u8bed\u539f\u7248' +
        '</a>' +
        '<a id="evidence-lang-cn" class="evidence-lang-btn" target="_blank" rel="noopener noreferrer">' +
          '<span class="evidence-lang-icon">\ud83c\udde8\ud83c\uddf3</span> \u4e2d\u6587\u7ffb\u8bd1\u4ef6' +
        '</a>' +
        '<a id="evidence-lang-full" class="evidence-lang-btn" target="_blank" rel="noopener noreferrer">' +
          '\ud83d\udcc4 \u67e5\u770b\u5b8c\u6574\u6587\u4ef6' +
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

  // Show popup with preview + full doc options
  // opts: { fileInfo, previewPath, previewCaption, partyGroup }
  function showPopup(opts) {
    if (!popupOverlay) popupOverlay = createPopup();

    var fileInfo = opts.fileInfo;
    var previewPath = opts.previewPath;
    var previewCaption = opts.previewCaption;
    var partyGroup = opts.partyGroup || null;

    var previewBtn = document.getElementById('evidence-preview-btn');
    var divider = popupOverlay.querySelector('.evidence-popup-divider');
    var jaBtn = document.getElementById('evidence-lang-ja');
    var cnBtn = document.getElementById('evidence-lang-cn');
    var fullBtn = document.getElementById('evidence-lang-full');

    // --- Quick Preview Button ---
    if (previewPath) {
      previewBtn.style.display = 'block';
      previewBtn.classList.remove('disabled');
      divider.style.display = 'block';
      previewBtn.onclick = function () {
        popupOverlay.classList.remove('active');
        showPreviewLightbox(buildUrl(previewPath), previewCaption || '', partyGroup);
      };
    } else {
      previewBtn.style.display = 'none';
      divider.style.display = 'none';
    }

    // --- Determine layout mode ---
    var hasTrans = fileInfo.translations;

    if (hasTrans) {
      // Bilingual mode: show JA + CN buttons, hide full button
      jaBtn.style.display = 'block';
      cnBtn.style.display = 'block';
      fullBtn.style.display = 'none';

      // Japanese version
      if (hasTrans.ja && hasTrans.ja.uploaded) {
        jaBtn.href = buildUrl(hasTrans.ja.storagePath);
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
      if (hasTrans.cn && hasTrans.cn.uploaded) {
        cnBtn.href = buildUrl(hasTrans.cn.storagePath);
        cnBtn.classList.remove('disabled');
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
    } else {
      // Single-language mode: hide JA/CN, show full button
      jaBtn.style.display = 'none';
      cnBtn.style.display = 'none';
      fullBtn.style.display = 'block';

      if (fileInfo.uploaded && fileInfo.storagePath) {
        fullBtn.href = buildUrl(fileInfo.storagePath);
        fullBtn.classList.remove('disabled');
        fullBtn.onclick = function () {
          setTimeout(function () { popupOverlay.classList.remove('active'); }, 100);
        };
      } else {
        fullBtn.href = '#';
        fullBtn.classList.add('disabled');
        fullBtn.onclick = function (e) { e.preventDefault(); };
      }
    }

    popupOverlay.classList.add('active');
  }

  // Backward-compatible wrapper
  function showLangPopup(translations, fileInfo, previewPath, previewCaption) {
    showPopup({
      fileInfo: fileInfo || { translations: translations },
      previewPath: previewPath,
      previewCaption: previewCaption
    });
  }

  // ============================================================
  // Lightbox: full-screen preview image viewer
  // ============================================================
  var lightboxEl = null;

  function createLightbox() {
    var lb = document.createElement('div');
    lb.id = 'evidence-preview-lightbox';
    lb.innerHTML =
      '<button class="evidence-preview-close">\u00d7</button>' +
      '<div class="evidence-preview-container">' +
        '<div class="evidence-party-legend" style="display:none"></div>' +
        '<img class="evidence-preview-img" src="" alt="">' +
        '<div class="evidence-preview-caption"></div>' +
      '</div>';
    document.body.appendChild(lb);

    // Close on overlay click or close button
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('evidence-preview-close')) {
        lb.classList.remove('active');
      }
    });

    // Toggle zoom on image click
    var img = lb.querySelector('.evidence-preview-img');
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      img.classList.toggle('zoomed');
    });

    // ESC key to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('active')) {
        lb.classList.remove('active');
      }
    });

    return lb;
  }

  function showPreviewLightbox(imageUrl, caption, partyGroup) {
    if (!lightboxEl) lightboxEl = createLightbox();

    var img = lightboxEl.querySelector('.evidence-preview-img');
    var cap = lightboxEl.querySelector('.evidence-preview-caption');
    var legend = lightboxEl.querySelector('.evidence-party-legend');

    img.classList.remove('zoomed');
    img.src = imageUrl;
    img.alt = caption || '';

    // Party legend
    if (partyGroup && typeof PARTY_GROUPS !== 'undefined' && PARTY_GROUPS[partyGroup]) {
      var group = PARTY_GROUPS[partyGroup];
      var html = '<div class="evidence-party-legend-title">' + group.title + '</div>';
      html += '<div class="evidence-party-legend-grid">';
      for (var i = 0; i < group.parties.length; i++) {
        var p = group.parties[i];
        html += '<div class="evidence-party-legend-item">' +
          '<span class="evidence-party-legend-code">' + p.code + '</span>' +
          ' = ' +
          '<span class="evidence-party-legend-name">' + p.name + '</span> ' +
          '<span class="evidence-party-legend-role">(' + p.role + ')</span>' +
          '</div>';
      }
      html += '</div>';
      legend.innerHTML = html;
      legend.style.display = 'block';
    } else {
      legend.style.display = 'none';
    }

    if (caption) {
      cap.innerHTML = caption;
      cap.style.display = 'inline-block';
    } else {
      cap.style.display = 'none';
    }

    lightboxEl.classList.add('active');
  }

  // ============================================================
  // Resolve preview info for an evidence tag
  // ============================================================
  function resolvePreview(span, fileInfo) {
    // Priority 1: data-preview attribute on the span itself
    var overridePath = span.getAttribute('data-preview');
    if (overridePath) {
      return {
        storagePath: overridePath,
        caption: span.getAttribute('data-caption') || ''
      };
    }
    // Priority 2: default quickPreview from registry
    if (fileInfo && fileInfo.quickPreview && fileInfo.quickPreview.uploaded) {
      return {
        storagePath: fileInfo.quickPreview.storagePath,
        caption: fileInfo.quickPreview.caption || ''
      };
    }
    return null;
  }

  // ============================================================
  // Process evidence-tag spans
  // ============================================================
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
        var preview = resolvePreview(span, fileInfo);
        var hasPreview = !!preview;
        var hasTranslations = !!fileInfo.translations;

        if (hasPreview || hasTranslations) {
          // Show popup (with preview and/or language options)
          var btn = document.createElement('span');
          btn.className = 'evidence-tag evidence-link';
          if (hasTranslations) btn.classList.add('evidence-bilingual');
          btn.setAttribute('data-file-type', fileInfo.type);
          btn.innerHTML = span.innerHTML;
          btn.title = hasPreview
            ? '\u70b9\u51fb\u5feb\u901f\u6d4f\u89c8\u6216\u67e5\u770b\u5b8c\u6574\u6587\u4ef6'
            : '\u70b9\u51fb\u9009\u62e9\u65e5\u8bed\u539f\u7248\u6216\u4e2d\u6587\u7ffb\u8bd1\u4ef6';
          btn.style.cursor = 'pointer';

          // Copy data attributes for override
          if (span.getAttribute('data-preview')) {
            btn.setAttribute('data-preview', span.getAttribute('data-preview'));
          }
          if (span.getAttribute('data-caption')) {
            btn.setAttribute('data-caption', span.getAttribute('data-caption'));
          }

          var capturedFileInfo = fileInfo;
          var capturedPreview = preview;
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            var pg = (capturedFileInfo.quickPreview && capturedFileInfo.quickPreview.partyGroup) || null;
            showPopup({
              fileInfo: capturedFileInfo,
              previewPath: capturedPreview ? capturedPreview.storagePath : null,
              previewCaption: capturedPreview ? capturedPreview.caption : null,
              partyGroup: pg
            });
          });
          span.parentNode.replaceChild(btn, span);
        } else {
          // Single-language, no preview: direct link (existing behavior)
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

  // ============================================================
  // Process quote divs
  // ============================================================
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
          var hasPreview = fileInfo.quickPreview && fileInfo.quickPreview.uploaded;
          var hasTranslations = !!fileInfo.translations;

          if (hasPreview || hasTranslations) {
            // Show popup on click
            var spanId = 'eq-' + idx + '-' + Math.random().toString(36).substr(2, 5);
            newHTML += '<span id="' + spanId + '" class="evidence-quote-link' +
              (hasTranslations ? ' evidence-bilingual' : '') + '" ' +
              'data-file-type="' + fileInfo.type + '" ' +
              'title="\u70b9\u51fb\u67e5\u770b\u8bc1\u636e" ' +
              'style="cursor:pointer">' + cleanRef + '</span>';
            (function (fInfo) {
              setTimeout(function () {
                var el = document.getElementById(spanId);
                if (el) {
                  el.addEventListener('click', function (e) {
                    e.preventDefault();
                    var pv = (fInfo.quickPreview && fInfo.quickPreview.uploaded) ? fInfo.quickPreview : null;
                    var pg = (fInfo.quickPreview && fInfo.quickPreview.partyGroup) || null;
                    showPopup({
                      fileInfo: fInfo,
                      previewPath: pv ? pv.storagePath : null,
                      previewCaption: pv ? pv.caption : null,
                      partyGroup: pg
                    });
                  });
                }
              }, 0);
            })(fileInfo);
          } else {
            // Direct link
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
