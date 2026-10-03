/* =========================================================
       GLOBAL STATE
       ========================================================= */

    let parsedJson = null;

    let selectedNode = null;

    let selectedJsonText = '';

    let traceNodeId = 0;


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

      const trace =
        document.getElementById('jsonTrace');


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


        // Show full trace

        buildTraceTree(
          parsedJson
        );


        selectedNode = null;

        document
          .getElementById('copySelectedBtn')
          .classList.remove('visible');


      } catch (e) {

        parsedJson = null;

        trace.innerHTML =
          'Invalid JSON';

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

function expandJson() {

  const button =
    document.getElementById(
      'expandBtn'
    );

  const expanded =
    button.dataset.expanded === 'true';

  document.querySelector('.tool-content')
    .style.minHeight =
      expanded ? '480px' : '960px';

  document.querySelector('#jsonInput')
    .style.minHeight =
      expanded ? '520px' : '900px';

  document.querySelector('.json-trace')
    .style.maxHeight =
      expanded ? '520px' : '900px';

  document.querySelector('.output-box')
    .style.height =
      expanded ? '520px' : '900px';

  document.querySelector('.output-box')
    .style.minHeight =
      expanded ? '520px' : '900px';

  button.dataset.expanded =
    !expanded;

  button.textContent =
    expanded
      ? 'Expand'
      : 'Collapse';

}
/* =========================================================
       MINIFY
       ========================================================= */

    function minifyJson() {

      const input =
        document.getElementById('jsonInput');

      const output =
        document.getElementById('jsonOutput');

      const errorBox =
        document.getElementById('jsonError');


      const text = input.value;


      errorBox.classList.remove('visible');


      try {

        parsedJson =
          JSON.parse(text);


        output.textContent =
          JSON.stringify(parsedJson);


        buildTraceTree(
          parsedJson
        );


      } catch (e) {

        output.textContent =
          'Invalid JSON';

        showJsonError(
          e,
          text
        );

      }

    }


    /* =========================================================
       BUILD TRACE TREE
       ========================================================= */

    function buildTraceTree(data) {

      const container =
        document.getElementById('jsonTrace');

      container.innerHTML = '';

      traceNodeId = 0;

      const root =
        createTraceNode(
          data,
          'ROOT',
          '$'
        );

      container.appendChild(root);

    }


    /* =========================================================
       CREATE TRACE NODE
       ========================================================= */

    function createTraceNode(
      value,
      label,
      path
    ) {

      const node =
        document.createElement('div');

      node.className =
        'trace-node';


      const row =
        document.createElement('div');

      row.className =
        'trace-node-row';


      const expand =
        document.createElement('span');

      expand.className =
        'trace-expand';


      const children =
        document.createElement('div');

      children.className =
        'trace-children';


      const isObject =
        value !== null &&
        typeof value === 'object';


      const type =
        Array.isArray(value)
          ? 'array'
          : value === null
            ? 'null'
            : typeof value;


      /* =======================================================
         EXPAND ICON
         ======================================================= */

      if (isObject) {

        expand.textContent = '▼';

        expand.onclick = function(event) {

          event.stopPropagation();

          const collapsed =
            children.classList.toggle(
              'collapsed'
            );

          expand.textContent =
            collapsed
              ? '▶'
              : '▼';

        };

      } else {

        expand.textContent = '•';

      }


      /* =======================================================
         LABEL
         ======================================================= */

      const labelElement =
        document.createElement('span');

      labelElement.className =
        'trace-label';

      labelElement.textContent =
        label;


      /* =======================================================
         TYPE
         ======================================================= */

      const typeElement =
        document.createElement('span');

      typeElement.className =
        'trace-type';

      typeElement.textContent =
        type;


      /* =======================================================
         COPY BUTTON
         ======================================================= */

      const copyButton =
        document.createElement('button');

      copyButton.className =
        'trace-copy';

      copyButton.textContent =
        'Copy';


      copyButton.onclick =
        function(event) {

          event.stopPropagation();

          copyNodeValue(
            value
          );

        };


      /* =======================================================
         CLICK NODE
         ======================================================= */

      row.onclick =
        function() {

          selectTraceNode(
            row,
            value,
            label,
            path
          );

        };


      row.appendChild(expand);
      row.appendChild(labelElement);
      row.appendChild(typeElement);

      if (isObject) {

        row.appendChild(copyButton);

      }


      node.appendChild(row);


      /* =======================================================
         CHILDREN
         ======================================================= */

      if (isObject) {

        if (Array.isArray(value)) {

          value.forEach(
            (item, index) => {

              const child =
                createTraceNode(
                  item,
                  `[${index}]`,
                  `${path}[${index}]`
                );

              children.appendChild(
                child
              );

            }
          );

        } else {

          Object.keys(value).forEach(
            key => {

              const child =
                createTraceNode(
                  value[key],
                  key,
                  `${path}.${key}`
                );

              children.appendChild(
                child
              );

            }
          );

        }

        node.appendChild(
          children
        );

      }


      return node;

    }


    /* =========================================================
       SELECT TRACE NODE
       ========================================================= */

    function selectTraceNode(
      row,
      value,
      label,
      path
    ) {

      document
        .querySelectorAll(
          '.trace-node-row.selected'
        )
        .forEach(
          element => {

            element.classList.remove(
              'selected'
            );

          }
        );


      row.classList.add(
        'selected'
      );


      selectedNode = value;


      selectedJsonText =
        JSON.stringify(
          value,
          null,
          2
        );


      document
        .getElementById('jsonOutput')
        .textContent =
        selectedJsonText;


      document
        .getElementById('copySelectedBtn')
        .classList.add(
          'visible'
        );

    }


    /* =========================================================
       COPY SELECTED NODE
       ========================================================= */

    function copySelectedJson() {

      if (
        selectedJsonText === ''
      ) {

        return;

      }


      copyText(
        selectedJsonText
      );

    }


    /* =========================================================
       COPY NODE
       ========================================================= */

    function copyNodeValue(
      value
    ) {

      const text =
        JSON.stringify(
          value,
          null,
          2
        );


      copyText(
        text
      );

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
            const button = event.target.closest('[data-json-viewer-action]');
            if (!button) return;
            switch (button.dataset.jsonViewerAction) {
              case 'copy-selected': copySelectedJson(); break;
              case 'format': formatJson(); break;
              case 'minify': minifyJson(); break;
              case 'expand': expandJson(); break;
              case 'copy-all': copyAllJson(); break;
            }
          });

        formatJson();

      }
    );
