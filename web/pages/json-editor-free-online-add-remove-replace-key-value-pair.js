/* =========================================================
       GLOBAL STATE
       ========================================================= */

    let parsedJson = null;

    let selectedJsonText = '';


    /* =========================================================
       FORMAT JSON
       ========================================================= */

    function formatJson() {

      const input =
        document.getElementById('jsonInput');

      const output =
        document.getElementById('jsonOutput');

      const errorBox =
        document.getElementById('jsonError');

      const text = input.value;


      // Clear previous error

      errorBox.classList.remove('visible');
      errorBox.textContent = '';


      try {

        parsedJson = JSON.parse(text);


        // Complete formatted JSON

        selectedJsonText =
          JSON.stringify(
            parsedJson,
            null,
            2
          );


        output.textContent =
          selectedJsonText;


      } catch (e) {

        parsedJson = null;

        output.textContent =
          'Invalid JSON';


        showJsonError(
          e,
          text
        );

      }

    }



    /* =========================================================
       expandJson
    ========================================================= */

function renameKey() {

  const existing =
    document.getElementById(
      'renameKeyPopup'
    );

  if (existing) {
    existing.remove();
  }

  const popup =
    document.createElement('div');

  popup.id =
    'renameKeyPopup';

  popup.innerHTML = `
    <style>
      #renameKeyPopup {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
      }

      #renameKeyPopup .popup-card {
        width: 420px;
        max-width: 95vw;
        background: white;
        border-radius: 12px;
        padding: 16px;
        display: grid;
        gap: 10px;
      }

      #renameKeyPopup input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
      }

      #renameKeyPopup .popup-actions {
        display: flex;
        gap: 8px;
      }

      #renameKeyPopup button {
        flex: 1;
      }
    </style>

    <div class="popup-card">

      <h3>Rename Key</h3>

      <input
        id="renameObjectName"
        placeholder="Object Name (optional)"
      >

      <input
        id="renameOldKey"
        placeholder="Key Name"
      >

      <input
        id="renameNewKey"
        placeholder="New Key Name"
      >

      <div class="popup-actions">

        <button
          data-json-editor-action="rename-confirm">
          Rename
        </button>

        <button
          data-json-editor-action="rename-cancel">
          Cancel
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(
    popup
  );

}


function renameKeyConfirm() {

  const oldKey = document.getElementById('renameOldKey').value.trim();
  const newKey = document.getElementById('renameNewKey').value.trim();

  if (!oldKey || !newKey) {
    alert('Enter Key Name and New Key Name');
    return;
  }

  try {
    const input = document.getElementById('jsonInput');
    const json = JSON.parse(input.value);
    let renameCount = 0;

    function processNode(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) {
        node.forEach(processNode);
        return;
      }
      if (Object.prototype.hasOwnProperty.call(node, oldKey) &&
          !Object.prototype.hasOwnProperty.call(node, newKey)) {
        node[newKey] = node[oldKey];
        delete node[oldKey];
        renameCount++;
      }
      Object.values(node).forEach(processNode);
    }

    processNode(json);
    input.value = JSON.stringify(json, null, 2);
    formatJson();
    alert(`${renameCount} key(s) renamed`);
    document.getElementById('renameKeyPopup')?.remove();
  } catch (error) {
    alert('Invalid JSON');
  }
}


function replaceValue() {

  const oldValue = prompt('Value to replace');
  const newValue = prompt('New value');

  if (oldValue === null || newValue === null) return;

  try {
    const input = document.getElementById('jsonInput');
    const json = JSON.parse(input.value);

    function replaceNode(node) {
      if (!node || typeof node !== 'object') return;
      Object.keys(node).forEach(key => {
        if (node[key] !== null && typeof node[key] === 'object') {
          replaceNode(node[key]);
        } else if (String(node[key]) === oldValue) {
          node[key] = newValue;
        }
      });
    }

    replaceNode(json);
    input.value = JSON.stringify(json, null, 2);
    formatJson();
  } catch (error) {
    alert('Invalid JSON');
  }
}


function addKeyValueJson() {

  const key = prompt('Key name');
  const value = prompt('Value');

  if (!key || value === null) return;

  try {
    const input = document.getElementById('jsonInput');
    const json = JSON.parse(input.value);
    const parsedValue = value.trim() === '' ? '' : JSON.parse(value);

    if (Array.isArray(json)) {
      json.push({ [key]: parsedValue });
    } else if (json && typeof json === 'object') {
      json[key] = parsedValue;
    }

    input.value = JSON.stringify(json, null, 2);
    formatJson();
  } catch (error) {
    alert('Enter a valid JSON value');
  }
}


function removeKeyValueJson() {

  const key = prompt('Key name to remove');

  if (!key) return;

  try {
    const input = document.getElementById('jsonInput');
    const json = JSON.parse(input.value);

    function removeNode(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) {
        node.forEach(removeNode);
        return;
      }
      delete node[key];
      Object.values(node).forEach(removeNode);
    }

    removeNode(json);
    input.value = JSON.stringify(json, null, 2);
    formatJson();
  } catch (error) {
    alert('Invalid JSON');
  }
}


    /* =========================================================
       COPY ALL
       ========================================================= */

    function copyAllJson() {

      if (
        parsedJson === null
      ) {

        return;

      }


      const text =
        JSON.stringify(
          parsedJson,
          null,
          2
        );


      copyText(
        text
      );

    }


    /* =========================================================
       COPY HELPER
       ========================================================= */

    function copyText(
      text
    ) {

      navigator.clipboard
        .writeText(text)
        .then(
          () => {

            console.log(
              'JSON copied successfully'
            );

          }
        )
        .catch(
          () => {

            // Fallback

            const temp =
              document.createElement(
                'textarea'
              );

            temp.value =
              text;

            document.body.appendChild(
              temp
            );

            temp.select();

            document.execCommand(
              'copy'
            );

            temp.remove();

          }
        );

    }


    /* =========================================================
       JSON ERROR
       ========================================================= */

    function showJsonError(
      error,
      text
    ) {

      const errorBox =
        document.getElementById(
          'jsonError'
        );


      let position =
        getJsonErrorPosition(
          error
        );


      if (
        position < 0
      ) {

        position = 0;

      }


      const lineInfo =
        getLineInformation(
          text,
          position
        );


      errorBox.textContent =
        'JSON Error\n' +
        error.message +
        '\n\n' +
        'Line: ' +
        lineInfo.line +
        '   Column: ' +
        lineInfo.column;


      errorBox.classList.add(
        'visible'
      );


      highlightJsonError(
        position,
        text
      );

    }


    /* =========================================================
       GET ERROR POSITION
       ========================================================= */

    function getJsonErrorPosition(
      error
    ) {

      const message =
        String(
          error.message || ''
        );


      /*
       * Chrome / Edge / modern browsers:
       *
       * Unexpected token } in JSON at position 123
       */

      let match =
        message.match(
          /position\s+(\d+)/i
        );


      if (match) {

        return Number(
          match[1]
        );

      }


      /*
       * Some browsers:
       *
       * line 2 column 15
       */

      match =
        message.match(
          /line\s+(\d+).*column\s+(\d+)/i
        );


      if (match) {

        return -1;

      }


      return -1;

    }


    /* =========================================================
       LINE INFORMATION
       ========================================================= */

    function getLineInformation(
      text,
      position
    ) {

      const before =
        text.substring(
          0,
          position
        );


      const line =
        before.split(
          '\n'
        ).length;


      const lastNewLine =
        before.lastIndexOf(
          '\n'
        );


      const column =
        position -
        lastNewLine;


      return {
        line,
        column
      };

    }


    /* =========================================================
       HIGHLIGHT ERROR
       ========================================================= */

    function highlightJsonError(
      position,
      text
    ) {

      const input =
        document.getElementById(
          'jsonInput'
        );


      /*
       * Select the error character.
       */

      input.focus();


      const safePosition =
        Math.min(
          Math.max(
            position,
            0
          ),
          text.length
        );


      input.setSelectionRange(
        safePosition,
        Math.min(
          safePosition + 1,
          text.length
        )
      );


      /*
       * Scroll textarea so error
       * position becomes visible.
       */

      const lineStart =
        text.lastIndexOf(
          '\n',
          safePosition - 1
        ) + 1;


      const lineNumber =
        text.substring(
          0,
          safePosition
        ).split(
          '\n'
        ).length;


      const lineHeight =
        parseFloat(
          getComputedStyle(
            input
          ).lineHeight
        ) || 22;


      input.scrollTop =
        Math.max(
          0,
          (lineNumber - 3) *
          lineHeight
        );

    }


    /* =========================================================
       INITIAL FORMAT
       ========================================================= */

    window.addEventListener(
      'DOMContentLoaded',
      function() {

          document.addEventListener('click', event => {
            const button = event.target.closest('[data-json-editor-action]');
            if (!button) return;
            switch (button.dataset.jsonEditorAction) {
              case 'format': formatJson(); break;
              case 'rename': renameKey(); break;
              case 'replace': replaceValue(); break;
              case 'add': addKeyValueJson(); break;
              case 'remove': removeKeyValueJson(); break;
              case 'copy-all': copyAllJson(); break;
              case 'rename-confirm': renameKeyConfirm(); break;
              case 'rename-cancel': document.getElementById('renameKeyPopup').remove(); break;
            }
          });

        formatJson();

      }
    );
