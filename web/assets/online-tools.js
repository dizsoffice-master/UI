(function () {
  'use strict';

  const toolData = {
    'sql-difference-checker': {
      title: 'SQL Difference Checker Online Free Tool', category: 'SQL Tools', type: 'two-text',
      description: 'Compare two SQL scripts online and quickly find statements, clauses, and lines that were added or removed. Your SQL text is compared in this browser.',
      details: 'Use the SQL difference checker to review query revisions, migration scripts, stored procedure changes, or database configuration. Paste the original script on the left and the updated script on the right. The comparison reports lines that occur only in either version, making it easier to review changes before you run or deploy SQL.',
      steps: ['Paste the original SQL in the first editor.', 'Paste the revised SQL in the second editor.', 'Choose Compare SQL to list lines unique to each version.'],
      faq: [['Does this execute SQL?', 'No. It compares text only and never connects to a database.'], ['Is the SQL uploaded?', 'No. Comparison runs locally in your browser.']]
    },
    'sql-blank-line-remover': {
      title: 'SQL Blank Line Remover Online Free Tool', category: 'SQL Tools', type: 'remove-blank-lines',
      description: 'Remove empty and whitespace-only lines from SQL scripts in your browser while preserving the remaining query text and line order.',
      details: 'Clean up SQL copied from documentation, editors, logs, or chat by removing blank rows in one pass. The tool retains every non-empty line exactly as written, including indentation, comments, and SQL statement order. Review the result before copying it into your database editor.',
      steps: ['Paste your SQL script into the input.', 'Select Remove Blank Lines.', 'Copy or download the cleaned script.'],
      faq: [['Does this change SQL syntax?', 'Only blank or whitespace-only lines are removed; non-empty lines remain unchanged.'], ['Can it run queries?', 'No, the tool only edits text in your browser.']]
    },
    'json-sorter': {
      title: 'JSON Sorter Online Free Tool', category: 'JSON Tools', type: 'json-sort',
      description: 'Validate JSON and sort object keys alphabetically, including keys inside nested objects, with this free browser-based JSON sorter.',
      details: 'Consistent key ordering makes JSON easier to inspect, diff, review, and maintain. Paste a JSON object or array to parse it, recursively sort object properties, and format the result with readable indentation. Array order is preserved because array positions can carry meaning.',
      steps: ['Paste valid JSON into the editor.', 'Select Sort JSON Keys.', 'Copy the formatted, recursively sorted output.'],
      faq: [['Are array elements reordered?', 'No. Array order is preserved while keys within objects are sorted.'], ['What happens with invalid JSON?', 'The browser reports a parse error instead of returning a misleading result.']]
    },
    'json-validator': {
      title: 'JSON Validator Online Free Tool', category: 'JSON Tools', type: 'json-validate',
      description: 'Check whether JSON is syntactically valid, locate parsing errors, and view a neatly formatted result without uploading your data.',
      details: 'Validate JSON before using it in an API request, configuration file, application, or data pipeline. The validator uses the browser JSON parser, reports parsing errors, and pretty-prints valid input so missing commas, quotes, brackets, and other syntax mistakes are easier to spot.',
      steps: ['Paste JSON into the input area.', 'Choose Validate JSON.', 'Read the validation message and copy formatted JSON when valid.'],
      faq: [['Does validation check a JSON Schema?', 'This tool checks JSON syntax and formatting, not a separate JSON Schema.'], ['Is my data sent to a server?', 'No. Parsing takes place locally in the browser.']]
    },
    'json-to-csv': {
      title: 'JSON to CSV Converter Online Free Tool', category: 'JSON Tools', type: 'json-to-csv',
      description: 'Convert an array of JSON objects into properly escaped CSV rows for spreadsheet use, right in your browser.',
      details: 'Turn a JSON array of records into comma-separated values with a header row. Object properties become columns; nested values are serialized as JSON text. CSV quoting is applied to values containing commas, quotation marks, or line breaks so spreadsheet applications can read the result reliably.',
      steps: ['Paste a JSON array containing objects.', 'Choose Convert JSON to CSV.', 'Copy the CSV output or save it as a .csv file.'],
      faq: [['What JSON shape is supported?', 'The input should be an array of JSON objects.'], ['Are nested values flattened?', 'No. Nested arrays and objects are written as JSON strings in their cell.']]
    },
    'csv-to-json': {
      title: 'CSV to JSON Converter Online Free Tool', category: 'JSON Tools', type: 'csv-to-json',
      description: 'Convert CSV data with a header row into a JSON array of objects. Quoted commas and escaped quotes are handled in your browser.',
      details: 'Use the first CSV row as field names and convert every following record into a JSON object. The parser recognizes quoted fields, commas within quotes, escaped double quotes, and line breaks inside quoted cells. Values remain strings so identifiers, leading zeros, and other spreadsheet data are not silently changed.',
      steps: ['Paste CSV with column names on the first row.', 'Choose Convert CSV to JSON.', 'Copy the JSON array or download it as a file.'],
      faq: [['Are values converted to numbers?', 'No. CSV cell values are retained as strings to avoid losing formatting or leading zeros.'], ['Does it support quoted commas?', 'Yes, standard quoted CSV fields are supported.']]
    },
    'excel-to-csv': {
      title: 'Excel to CSV Converter Online Free Tool', category: 'CSV / Excel Tools', type: 'file-csv',
      description: 'Export a worksheet from an Excel workbook as CSV in your browser using a local file selection.',
      details: 'Choose an .xlsx or .xls workbook and convert its first worksheet into comma-separated values. Workbook bytes are read in the browser and are not uploaded by this page. CSV is useful for data exchange with databases, scripts, and applications that accept plain text tables.',
      steps: ['Choose an Excel workbook from your device.', 'Select Convert to CSV.', 'Download the first worksheet as a .csv file.'],
      faq: [['Which worksheet is converted?', 'The first worksheet in the workbook is used.'], ['Are formulas recalculated?', 'No. The converter exports the values stored in the selected workbook.']]
    },
    'csv-to-excel': {
      title: 'CSV to Excel Converter Online Free Tool', category: 'CSV / Excel Tools', type: 'file-xlsx',
      description: 'Convert CSV text into an Excel-compatible workbook file in your browser.',
      details: 'Paste comma-separated data with a header row and create a spreadsheet workbook for Excel-compatible applications. Quoted fields are parsed as CSV, and the data is written to a downloadable workbook using the SheetJS browser library.',
      steps: ['Paste CSV data including its header row.', 'Select Convert to Excel.', 'Download and open the generated workbook.'],
      faq: [['Does the converter upload my CSV?', 'No. The conversion runs in the browser.'], ['Can it process multiple CSV files?', 'This page converts one pasted CSV table at a time.']]
    },
    'csv-data-cleaner': {
      title: 'CSV Data Cleaner Online Free Tool', category: 'CSV / Excel Tools', type: 'csv-clean',
      description: 'Trim extra spaces, remove empty rows, and normalize CSV cell spacing with a free in-browser data cleaner.',
      details: 'Prepare pasted CSV for import by trimming spaces around cell values and optionally excluding rows with no data. Quoted fields and escaped quotes are parsed before cleanup, then values are safely quoted again when needed for valid CSV output.',
      steps: ['Paste CSV text into the editor.', 'Choose Clean CSV Data.', 'Copy the cleaned CSV or download the result.'],
      faq: [['Are spaces inside a value removed?', 'Leading and trailing whitespace is trimmed; spaces within a value are retained.'], ['Are empty columns removed?', 'No. Column layout and header names are preserved.']]
    },
    'jpeg-to-png': {
      title: 'JPEG to PNG Converter Online Free Tool', category: 'Image Tools', type: 'image-png',
      description: 'Convert a JPEG image to PNG in your browser and download the converted image without uploading the original file.',
      details: 'Select a JPEG image to decode it in your browser and export a PNG copy. PNG uses lossless compression and supports transparency, though converting a JPEG cannot restore detail already lost in JPEG compression. The image stays on your device during conversion.',
      steps: ['Choose a .jpg or .jpeg image.', 'Select Convert Image.', 'Download the generated .png file.'],
      faq: [['Is image quality restored?', 'No. The PNG file avoids additional lossy compression but cannot restore detail already lost in the JPEG.'], ['Is the image uploaded?', 'No. The browser converts the selected file locally.']]
    },
    'png-to-jpeg': {
      title: 'PNG to JPEG Converter Online Free Tool', category: 'Image Tools', type: 'image-jpeg',
      description: 'Convert PNG images to JPEG format locally in your browser, with a white background behind transparent pixels.',
      details: 'Create a JPEG copy for sites or systems that require JPEG files. JPEG does not support transparency, so transparent PNG areas are composited on white. Conversion quality is adjustable and the original image file is not modified.',
      steps: ['Choose a PNG image.', 'Set the JPEG quality if needed.', 'Convert and download the .jpg result.'],
      faq: [['What happens to transparency?', 'Transparent pixels are placed on a white background because JPEG has no alpha channel.'], ['Can I keep the PNG original?', 'Yes. Conversion creates a new download and leaves your selected file unchanged.']]
    },
    'image-compressor': {
      title: 'Image Compressor Online Free Tool', category: 'Image Tools', type: 'image-compress',
      description: 'Reduce the size of JPEG or PNG images in your browser by adjusting output quality and downloading an optimized copy.',
      details: 'Compress a photo by re-encoding it as JPEG at a chosen quality setting. Smaller quality values usually create smaller files with more visible artifacts. Transparent input is composited on white for JPEG output. Compare the result before replacing your original.',
      steps: ['Select an image from your device.', 'Choose a compression quality.', 'Compress and download the optimized image.'],
      faq: [['Does a lower quality setting reduce file size?', 'Usually yes, but visual artifacts become more noticeable as quality decreases.'], ['Does compression replace my image?', 'No. The compressed image is downloaded separately.']]
    },
    'image-resizer': {
      title: 'Image Resizer Online Free Tool', category: 'Image Tools', type: 'image-resize',
      description: 'Resize an image to chosen pixel dimensions in your browser and download a separate copy.',
      details: 'Set the output width and height in pixels to create an image suited to a document, profile, website, or message. The resizer uses a browser canvas and exports a JPEG copy. Enter positive dimensions and consider keeping the original aspect ratio when you need undistorted results.',
      steps: ['Choose an image.', 'Enter its output width and height.', 'Resize and download the new image.'],
      faq: [['Does resizing keep the aspect ratio?', 'The dimensions are applied exactly as entered; use proportional dimensions to avoid stretching.'], ['Is there an upload?', 'No. Image processing uses your browser.']]
    },
    'image-converter': {
      title: 'Image Converter Online Free Tool', category: 'Image Tools', type: 'image-convert',
      description: 'Convert a browser-readable image to PNG or JPEG and save the output directly to your device.',
      details: 'Open a common browser-supported image and select PNG or JPEG as the output format. The converter uses the browser image decoder and canvas encoder. JPEG output uses a white background for transparency; PNG output preserves alpha where supported.',
      steps: ['Choose an image file supported by your browser.', 'Select PNG or JPEG output.', 'Convert and download the new image.'],
      faq: [['Which formats can I open?', 'Common browser-readable formats such as JPEG, PNG, WebP, and GIF are supported.'], ['Can the converter create animated images?', 'Canvas conversion exports a still frame, not an animation.']]
    },
    'image-cropper': {
      title: 'Image Cropper Online Free Tool', category: 'Image Tools', type: 'image-crop',
      description: 'Crop the center of an image to a chosen width and height, then download the cropped result from your browser.',
      details: 'Enter crop dimensions in pixels to extract a centered region from your image. The cropper checks that the requested dimensions fit inside the source image, draws the selected area to a canvas, and creates a downloadable PNG without sending the image to a server.',
      steps: ['Choose an image file.', 'Enter crop width and height in pixels.', 'Crop the centered area and download it.'],
      faq: [['Where is the crop taken from?', 'The requested rectangle is centered in the original image.'], ['Can I crop outside the image bounds?', 'No. The tool requires crop dimensions that fit within the source image.']]
    },
    'passport-photo-maker': {
      title: 'Passport Photo Maker for Print Shops Online Free Tool', category: 'Image Tools', type: 'passport-photo',
      description: 'Prepare India, USA, UK, or Australia passport-size photos for photo studios and print shops. Reposition the crop, arrange multiple copies on A4, and export PNG, JPG, SVG, or print.',
      details: 'Create a passport-photo proof for customers at a photo studio, cyber cafe, or print shop. Choose a commonly used country size, reposition the crop horizontally and vertically, and place a requested number of copies onto an A4 sheet. Export the individual crop or print sheet in PNG, JPG, or SVG, or open a print-ready A4 page. Country photo requirements can vary by application and change over time; check the relevant issuing authority before printing official submissions.',
      steps: ['Upload a clear portrait photo from the customer.', 'Choose a country size and adjust horizontal and vertical crop position.', 'Set the number of copies to fit on an A4 sheet.', 'Download the individual photo or A4 sheet as PNG, JPG, or SVG, or print the sheet.'],
      faq: [['Which dimensions are provided?', 'The presets use common reference dimensions: India, UK, and Australia 35 × 45 mm; USA 51 × 51 mm. Confirm the current requirements for the exact document application.'], ['Can I change how the face is positioned?', 'Yes. Use the horizontal and vertical crop-position controls and check the preview before exporting.'], ['How many copies fit on A4?', 'The sheet uses A4 portrait dimensions and places copies left to right, then continues on the next row. The requested number is limited to 1–100.'], ['Does the tool upload customer photos?', 'No. Image processing runs in this browser tab.']]
    },
    'base64-encoder-decoder': {
      title: 'Base64 Encoder and Decoder Online Free Tool', category: 'Developer Tools', type: 'base64',
      description: 'Encode text to Base64 or decode Base64 back to readable text using UTF-8 support in your browser.',
      details: 'Base64 represents bytes using a text-safe alphabet; it is encoding, not encryption. This tool converts Unicode text through UTF-8 bytes, handles ordinary Base64 input, and reports malformed input. Do not use Base64 to protect secrets or sensitive information.',
      steps: ['Enter text or a Base64 value.', 'Choose Encode or Decode.', 'Copy the resulting text.'],
      faq: [['Is Base64 encryption?', 'No. Anyone can decode Base64; it provides no confidentiality.'], ['Does it support Unicode?', 'Yes. Text is converted using UTF-8.']]
    },
    'url-encoder-decoder': {
      title: 'URL Encoder and Decoder Online Free Tool', category: 'Developer Tools', type: 'url',
      description: 'Encode text for use in a URL component or decode percent-encoded text safely in your browser.',
      details: 'URL component encoding converts reserved characters and spaces into percent-encoded form for query values and URL segments. Decoding reverses percent-encoding. The browser reports malformed escape sequences instead of silently returning corrupted text.',
      steps: ['Paste a value into the editor.', 'Select Encode URL Component or Decode URL Component.', 'Copy the converted result.'],
      faq: [['Should I encode a complete URL?', 'This tool encodes a component value, not an entire URL with its separators.'], ['Are spaces changed to plus signs?', 'Component encoding uses percent escapes, such as %20.']]
    },
    'html-formatter': {
      title: 'HTML Formatter Online Free Tool', category: 'Developer Tools', type: 'format-html',
      description: 'Indent HTML markup for easier reading and code review with this browser-based free HTML formatter.',
      details: 'Format pasted markup with consistent indentation so nested elements are easier to inspect. The formatter tracks opening and closing tags, preserves text and comments, and does not execute scripts. Review output for template syntax or unusual void elements that may need project-specific formatting rules.',
      steps: ['Paste HTML markup.', 'Choose Format HTML.', 'Copy the indented markup.'],
      faq: [['Does formatting change page behavior?', 'The formatter changes whitespace and indentation; review sensitive inline text and template markup before use.'], ['Are scripts executed?', 'No. Input is handled as plain text.']]
    },
    'css-formatter': {
      title: 'CSS Formatter Online Free Tool', category: 'Developer Tools', type: 'format-css',
      description: 'Format CSS rules and declarations with readable indentation using a lightweight in-browser formatter.',
      details: 'Apply a consistent layout to CSS rules by placing selectors and declarations on separate lines with indentation inside blocks. The formatter is intentionally lightweight and does not replace a project-aware CSS parser, especially for advanced nested syntax or preprocessors.',
      steps: ['Paste CSS rules into the editor.', 'Choose Format CSS.', 'Review and copy the formatted stylesheet.'],
      faq: [['Does it support SCSS?', 'It targets standard CSS and may not preserve every SCSS-specific construct.'], ['Does it change property values?', 'It formats separators and whitespace; inspect output before committing changes.']]
    },
    'javascript-formatter': {
      title: 'JavaScript Formatter Online Free Tool', category: 'Developer Tools', type: 'format-js',
      description: 'Indent JavaScript source code for readability with a lightweight browser-based formatter.',
      details: 'Add line breaks and indentation around common braces and statement separators to make JavaScript easier to review. This lightweight formatter does not parse every language feature and should not be used as a substitute for a project linter or syntax-aware formatter on production code.',
      steps: ['Paste JavaScript source code.', 'Choose Format JavaScript.', 'Review the output and copy it to your editor.'],
      faq: [['Is the result guaranteed to preserve syntax?', 'No. Use a parser-aware formatter for complex syntax and always run your project checks.'], ['Is code uploaded?', 'No. The transformation is performed locally.']]
    },
    'xml-formatter': {
      title: 'XML Formatter Online Free Tool', category: 'Developer Tools', type: 'xml',
      description: 'Validate XML with the browser parser and format well-formed documents with readable indentation.',
      details: 'Parse an XML document locally, detect malformed markup, and serialize its nodes with indentation. Formatting helps inspect nested XML configuration and data, but serialization may normalize declaration details and whitespace; preserve an original copy when exact byte-level fidelity matters.',
      steps: ['Paste a complete XML document.', 'Choose Validate and Format XML.', 'Copy the formatted XML or read the parse error.'],
      faq: [['Does it validate an XSD?', 'No. It checks XML well-formedness, not validation against a schema.'], ['Will it preserve every byte?', 'No. XML serialization may normalize whitespace and declarations.']]
    },
    'timestamp-converter': {
      title: 'Timestamp Converter Online Free Tool', category: 'Developer Tools', type: 'timestamp',
      description: 'Convert Unix timestamps in seconds or milliseconds to UTC date text, or parse a date into Unix time.',
      details: 'Convert a Unix epoch value to an ISO UTC date, or enter a date recognized by your browser to get seconds and milliseconds since 1970-01-01 UTC. The tool displays UTC to avoid ambiguity from local time zones and identifies whether large numeric values are treated as milliseconds.',
      steps: ['Enter an epoch number or a date string.', 'Choose Convert Timestamp.', 'Read the UTC date, seconds, and milliseconds.'],
      faq: [['Are timestamps shown in local time?', 'The converted date is shown in UTC using ISO 8601.'], ['How are seconds and milliseconds detected?', 'Large epoch values are interpreted as milliseconds; smaller values are interpreted as seconds.']]
    },
    'text-difference-checker': {
      title: 'Text Difference Checker Online Free Tool', category: 'Other Tools', type: 'two-text',
      description: 'Compare two text versions and identify lines that were added or removed with a free in-browser difference checker.',
      details: 'Review document edits, configuration changes, notes, or copied text by comparing two versions line by line. The result lists unique lines from each side while preserving their original order. It is a simple line comparison and does not attempt word-level or semantic matching.',
      steps: ['Paste the earlier text in the first editor.', 'Paste the newer text in the second editor.', 'Select Compare Text to see unique lines.'],
      faq: [['Is comparison case-sensitive?', 'Yes. Lines are compared as written, including capitalization and whitespace.'], ['Are differences uploaded?', 'No. The comparison runs in your browser.']]
    },
    'word-counter': {
      title: 'Word Counter Online Free Tool', category: 'Other Tools', type: 'count',
      description: 'Count words, characters, sentences, and lines in pasted text instantly in your browser.',
      details: 'Check text length for articles, essays, captions, messages, and content with word limits. The counter reports words separated by whitespace, characters with and without spaces, sentence-ending punctuation groups, and non-empty lines. Counts update locally when you analyze the input.',
      steps: ['Paste or type text into the input.', 'Choose Count Text.', 'Review word, character, sentence, and line totals.'],
      faq: [['How are words counted?', 'A word is a non-empty group separated by whitespace.'], ['Is the text stored?', 'No. This page calculates counts in the current browser session.']]
    },
    'character-counter': {
      title: 'Character Counter Online Free Tool', category: 'Other Tools', type: 'count',
      description: 'Count characters with and without spaces, along with words and lines, for posts and text with length limits.',
      details: 'Measure text against character limits for forms, social posts, metadata, and messages. The counter reports JavaScript string length, non-whitespace character count, words, and lines. Some systems count Unicode grapheme clusters differently, so use the destination platform as the final authority for strict limits.',
      steps: ['Enter or paste the text to measure.', 'Select Count Text.', 'Use the displayed totals to adjust your text.'],
      faq: [['Are spaces included in the character total?', 'Both totals are shown: characters including spaces and characters excluding whitespace.'], ['How are emoji counted?', 'The total follows JavaScript string length and may differ from user-perceived grapheme counts.']]
    },
    'qr-code-generator': {
      title: 'QR Code Generator Online Free Tool', category: 'Other Tools', type: 'qr',
      description: 'Create a downloadable QR code from text or a URL in your browser using a QR encoding library.',
      details: 'Generate a scannable QR code for a web address, short message, or other text. Keep the encoded content concise for easier scanning, and test the downloaded image with a phone before printing or sharing. The QR library loads only when you run the generator.',
      steps: ['Enter the URL or text to encode.', 'Choose Generate QR Code.', 'Download the image and test that it scans correctly.'],
      faq: [['Can I encode a long document?', 'QR codes have capacity limits; short links or concise text scan more reliably.'], ['Is my content sent to a QR service?', 'The QR encoder library runs in your browser; content is not submitted to a QR-generation API.']]
    },
    'password-generator': {
      title: 'Password Generator Online Free Tool', category: 'Other Tools', type: 'password',
      description: 'Generate a random password with browser cryptographic randomness and choose its length and character groups.',
      details: 'Create a password using the browser Web Crypto API, which supplies cryptographically strong random bytes. Choose a length and whether to include uppercase, lowercase, digits, and symbols. Store generated passwords in a password manager and never reuse a password across important accounts.',
      steps: ['Choose the password length and character groups.', 'Select Generate Password.', 'Copy the result into a trusted password manager.'],
      faq: [['Is randomness cryptographically secure?', 'Where supported, the tool uses the browser Web Crypto API.'], ['Is my password saved?', 'No. The generated password remains in the current page until you clear or leave it.']]
    },
    'basic-calculator': {
      title: 'Basic Calculator Online Free Tool', category: 'Banking & Finance Calculators', type: 'basic-calculator',
      description: 'Use a free online calculator for addition, subtraction, multiplication, and division with clear, immediate results.',
      details: 'Perform everyday arithmetic using two numeric values and a selected operation. The calculator validates its inputs, reports division by zero clearly, and keeps calculations in your browser. It is intended for general arithmetic, not financial advice or tax calculations.',
      steps: ['Enter the first and second values.', 'Select addition, subtraction, multiplication, or division.', 'Choose Calculate to view the result.'],
      faq: [['Can I divide by zero?', 'No. The calculator reports that division by zero is undefined.'], ['Are values sent to a server?', 'No. Arithmetic runs locally in your browser.']]
    },
    'emi-loan-calculator': {
      title: 'EMI Loan Calculator Online Free Tool', category: 'Banking & Finance Calculators', type: 'emi-calculator',
      description: 'Estimate monthly loan EMI, total repayment, and total interest from the loan amount, annual interest rate, and term.',
      details: 'Estimate a fixed-rate monthly installment using the standard reducing-balance EMI formula. The estimate excludes fees, insurance, rate changes, taxes, and lender-specific rounding. Confirm final repayment figures with your lender before making a borrowing decision.',
      steps: ['Enter the principal loan amount.', 'Enter the annual interest rate as a percentage.', 'Enter the repayment term in years and calculate the estimate.'],
      faq: [['What does EMI mean?', 'EMI is an equated monthly installment, a fixed monthly payment estimate for a reducing-balance loan.'], ['Does the estimate include fees?', 'No. Lender fees, insurance, taxes, and rate changes are not included.']]
    },
    'interest-calculator': {
      title: 'Simple and Compound Interest Calculator Online Free Tool', category: 'Banking & Finance Calculators', type: 'interest-calculator',
      description: 'Calculate estimated simple or compound interest using principal, annual rate, time, and a compounding frequency.',
      details: 'Compare simple interest with compound growth over a chosen number of years. Simple interest is calculated on the original principal; compound interest adds earned interest to the balance at each selected interval. Results are mathematical estimates and do not include fees, taxes, changing rates, or investment risk.',
      steps: ['Enter the starting principal and annual percentage rate.', 'Enter the duration in years.', 'Choose simple or compound interest and its compounding frequency.'],
      faq: [['How does compound interest differ?', 'Compound interest is calculated on principal plus previously accumulated interest at each compounding interval.'], ['Are these investment returns guaranteed?', 'No. The calculator only applies the rate you enter and does not predict or guarantee returns.']]
    },
    'daily-monthly-yearly-interest-calculator': {
      title: 'Daily Monthly Yearly Interest Calculator Online Free Tool', category: 'Banking & Finance Calculators', type: 'period-interest-calculator',
      description: 'Estimate simple interest by day, month, or year from a principal and annual percentage rate.',
      details: 'Convert an annual simple interest rate into a per-day, per-month, or per-year estimate and calculate interest for a selected number of periods. Daily calculations use a 365-day year; monthly calculations use one twelfth of the annual rate. Actual bank day-count conventions, compounding, and product terms may differ.',
      steps: ['Enter the principal and annual rate.', 'Choose daily, monthly, or yearly periods.', 'Enter the number of periods and calculate estimated interest and total.'],
      faq: [['Does this calculator compound interest?', 'No. This tool calculates simple interest for the selected period. Use the separate compound interest calculator for compounding.'], ['How are days counted?', 'The estimate uses 365 days per year; actual financial products may use another convention.']]
    }
  };

  function csvParse(source) {
    const rows = [];
    let row = [], value = '', quoted = false;
    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];
      if (quoted && char === '"' && source[index + 1] === '"') { value += '"'; index += 1; }
      else if (char === '"') quoted = !quoted;
      else if (char === ',' && !quoted) { row.push(value); value = ''; }
      else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && source[index + 1] === '\n') index += 1;
        row.push(value); rows.push(row); row = []; value = '';
      } else value += char;
    }
    row.push(value);
    if (row.some(cell => cell !== '') || rows.length === 0) rows.push(row);
    if (quoted) throw new Error('A quoted CSV field is not closed.');
    return rows;
  }

  function csvEscape(value) {
    const text = value == null ? '' : String(value);
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function csvStringify(rows) { return rows.map(row => row.map(csvEscape).join(',')).join('\r\n'); }

  function sortedJson(value) {
    if (Array.isArray(value)) return value.map(sortedJson);
    if (value && typeof value === 'object') return Object.keys(value).sort((a, b) => a.localeCompare(b)).reduce((result, key) => { result[key] = sortedJson(value[key]); return result; }, {});
    return value;
  }

  function encodeBase64Utf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
  }

  function compareLines(sourceText, targetText) {
    const remaining = new Map();
    targetText.split(/\r\n|\r|\n/).forEach(line => remaining.set(line, (remaining.get(line) || 0) + 1));
    return sourceText.split(/\r\n|\r|\n/).filter(line => {
      const count = remaining.get(line) || 0;
      if (count) { remaining.set(line, count - 1); return false; }
      return true;
    });
  }

  function cryptoIndex(max) {
    const range = 0x100000000;
    const limit = Math.floor(range / max) * max;
    const value = new Uint32Array(1);
    do { crypto.getRandomValues(value); } while (value[0] >= limit);
    return value[0] % max;
  }

  function formatMarkup(source, mode) {
    const tokens = source.replace(/>\s*</g, '><').match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) || [];
    let depth = 0;
    return tokens.map(token => {
      if (!token.trim()) return '';
      const closing = /^<\//.test(token);
      const declaration = /^<!|^<\?/.test(token);
      const selfClosing = /\/\s*>$/.test(token) || /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i.test(token);
      if (closing) depth = Math.max(0, depth - 1);
      const line = `${'  '.repeat(depth)}${token.trim()}`;
      if (!closing && !selfClosing && !declaration && /^<[^>]+>$/.test(token)) depth += 1;
      return line;
    }).filter(Boolean).join('\n');
  }

  function formatSimpleCode(source, kind) {
    const normalized = source.replace(/\r\n?/g, '\n').trim();
    if (kind === 'css') return normalized.replace(/\s*\{\s*/g, ' {\n  ').replace(/\s*:\s*/g, ': ').replace(/;\s*/g, ';\n  ').replace(/\s*}\s*/g, '\n}\n').replace(/\n  \n/g, '\n').trim();
    let output = '', depth = 0, quote = '', escaped = false;
    for (const char of normalized) {
      if (quote) { output += char; if (escaped) escaped = false; else if (char === '\\') escaped = true; else if (char === quote) quote = ''; continue; }
      if (char === '"' || char === "'" || char === '`') { quote = char; output += char; continue; }
      if (char === '{') { output = output.trimEnd() + ' {\n'; depth += 1; output += '  '.repeat(depth); }
      else if (char === '}') { depth = Math.max(0, depth - 1); output = output.trimEnd() + `\n${'  '.repeat(depth)}}\n${'  '.repeat(depth)}`; }
      else if (char === ';') output = output.trimEnd() + `;\n${'  '.repeat(depth)}`;
      else if (char === ',') output += ',\n' + '  '.repeat(depth);
      else output += char;
    }
    return output.split('\n').map(line => line.trimEnd()).join('\n').trim();
  }

  function downloadText(text, filename, mime) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([text], { type: mime || 'text/plain;charset=utf-8' }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function downloadBlob(blob, filename) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function renderPassportMaker(root, controls, result, status, imageResult) {
    controls.innerHTML = `<p class="passport-step-heading">1. Upload customer photo</p><label class="document-field document-field-wide">Portrait photo<input data-passport-file type="file" accept="image/*"></label>
      <p class="passport-step-heading">2. Select country photo size</p><label class="document-field">Country size<select data-passport-size><option value="india">India — 35 × 45 mm</option><option value="usa">USA — 51 × 51 mm</option><option value="uk">UK — 35 × 45 mm</option><option value="australia">Australia — 35 × 45 mm</option></select></label>
      <p class="passport-step-heading">3. Position crop and set photo background</p>
      <label class="document-field">Horizontal crop position <output data-position-x>50%</output><input data-position="x" type="range" min="0" max="100" value="50"></label>
      <label class="document-field">Vertical crop position <output data-position-y>50%</output><input data-position="y" type="range" min="0" max="100" value="50"></label>
      <p class="passport-step-note">Drag the crop frame over the full image preview, or use the position sliders.</p>
      <fieldset class="passport-background-options"><legend>Photo background</legend><label><input type="checkbox" data-remove-background> Remove plain background</label><label class="document-field">Replacement<select data-background-mode><option value="transparent">Transparent</option><option value="white" selected>White</option><option value="lightblue">Light blue</option><option value="custom">Custom color</option></select></label><label class="document-field" data-custom-color-wrap hidden>Custom color<input type="color" data-background-color value="#ffffff"></label><label class="document-field">Background tolerance <output data-background-tolerance-label>45</output><input data-background-tolerance type="range" min="10" max="140" value="45"></label><small>Background removal samples the image edges and works best with a plain, evenly lit background.</small></fieldset>
      <p class="passport-authority-note">Common reference sizes only. Check current photo requirements for the issuing authority before printing official documents.</p>
      <div class="maker-actions"><button type="button" data-passport-generate-photo disabled>4. Generate photo</button></div>
      <section class="passport-export-group"><h3>Individual photo</h3><div class="maker-actions"><button type="button" data-export-photo="png" disabled>Photo PNG</button><button type="button" data-export-photo="jpg" disabled>Photo JPG</button><button type="button" data-export-photo="svg" disabled>Photo SVG</button></div></section>
      <fieldset class="passport-sheet-controls" disabled><legend>5. Generate A4 sheet</legend><label class="document-field">Number of copies<input data-passport-copies type="number" min="1" max="100" step="1" value="6"></label><p>Copies auto-fit horizontally on A4 paper, then continue on the next row.</p><div class="maker-actions"><button type="button" data-passport-generate-sheet disabled>Generate A4 sheet</button></div></fieldset>`;
    root.querySelector('.online-tool-actions').hidden = true;
    result.hidden = true;
    imageResult.innerHTML = '<section class="passport-preview-panel"><h2>Uploaded image and crop position</h2><canvas data-passport-source-preview aria-label="Uploaded portrait with draggable crop frame"></canvas></section><section class="passport-preview-panel passport-photo-output" hidden><h2>Generated individual photo</h2><canvas data-passport-photo-preview></canvas></section><section class="passport-preview-panel passport-sheet-output" hidden><h2>Generated A4 sheet</h2><canvas data-passport-sheet-preview></canvas><div class="maker-actions passport-sheet-downloads"><button type="button" data-export-sheet="png" disabled>Download PNG</button><button type="button" data-export-sheet="jpg" disabled>Download JPG</button><button type="button" data-export-sheet="svg" disabled>Download SVG</button><button type="button" data-passport-print disabled>Print A4 sheet</button></div></section>';
    const sourceCanvas = imageResult.querySelector('[data-passport-source-preview]');
    const photoCanvas = imageResult.querySelector('[data-passport-photo-preview]');
    const sheetCanvas = imageResult.querySelector('[data-passport-sheet-preview]');
    const sourceContext = sourceCanvas.getContext('2d');
    const photoContext = photoCanvas.getContext('2d');
    const sheetContext = sheetCanvas.getContext('2d');
    const presets = {
      india: { width: 35, height: 45 },
      usa: { width: 51, height: 51 },
      uk: { width: 35, height: 45 },
      australia: { width: 35, height: 45 }
    };
    let bitmap = null;
    let cropData = null;
    let sheetData = null;
    let photoGenerated = false;
    let sheetGenerated = false;
    let dragging = false;
    const selectedSize = () => presets[controls.querySelector('[data-passport-size]').value];
    const outputSize = () => {
      const size = selectedSize();
      return { width: Math.round(size.width / 25.4 * 300), height: Math.round(size.height / 25.4 * 300) };
    };

    function cropGeometry() {
      if (!bitmap) return false;
      const { width, height } = outputSize();
      const targetRatio = width / height;
      const sourceRatio = bitmap.width / bitmap.height;
      let sourceWidth = bitmap.width, sourceHeight = bitmap.height;
      if (sourceRatio > targetRatio) sourceWidth = bitmap.height * targetRatio;
      else sourceHeight = bitmap.width / targetRatio;
      const maxX = bitmap.width - sourceWidth;
      const maxY = bitmap.height - sourceHeight;
      const xPosition = Number(controls.querySelector('[data-position="x"]').value) / 100;
      const yPosition = Number(controls.querySelector('[data-position="y"]').value) / 100;
      const sourceX = maxX * xPosition;
      const sourceY = maxY * yPosition;
      return { sourceX, sourceY, sourceWidth, sourceHeight, width, height, maxX, maxY };
    }

    function drawSourcePreview() {
      if (!bitmap) return false;
      const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
      const previewWidth = Math.max(1, Math.round(bitmap.width * scale));
      const previewHeight = Math.max(1, Math.round(bitmap.height * scale));
      if (sourceCanvas.width !== previewWidth) sourceCanvas.width = previewWidth;
      if (sourceCanvas.height !== previewHeight) sourceCanvas.height = previewHeight;
      sourceContext.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
      sourceContext.drawImage(bitmap, 0, 0, sourceCanvas.width, sourceCanvas.height);
      const crop = cropGeometry();
      if (!crop) return false;
      const x = crop.sourceX * scale, y = crop.sourceY * scale;
      const width = crop.sourceWidth * scale, height = crop.sourceHeight * scale;
      sourceContext.fillStyle = 'rgba(10, 20, 28, .48)';
      sourceContext.fillRect(0, 0, sourceCanvas.width, y);
      sourceContext.fillRect(0, y + height, sourceCanvas.width, sourceCanvas.height - y - height);
      sourceContext.fillRect(0, y, x, height);
      sourceContext.fillRect(x + width, y, sourceCanvas.width - x - width, height);
      sourceContext.strokeStyle = '#fff'; sourceContext.lineWidth = Math.max(2, sourceCanvas.width / 300);
      sourceContext.strokeRect(x, y, width, height);
      sourceContext.strokeStyle = '#08715f'; sourceContext.lineWidth = Math.max(1, sourceCanvas.width / 600);
      sourceContext.strokeRect(x + 2, y + 2, Math.max(0, width - 4), Math.max(0, height - 4));
      return { scale, x, y, width, height };
    }

    function removeSampledBackground(context, width, height) {
      if (!controls.querySelector('[data-remove-background]').checked) return;
      const mode = controls.querySelector('[data-background-mode]').value;
      const tolerance = Number(controls.querySelector('[data-background-tolerance]').value);
      const image = context.getImageData(0, 0, width, height);
      const data = image.data;
      const samplePoints = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1], [Math.floor(width / 2), 0], [Math.floor(width / 2), height - 1]];
      const background = samplePoints.reduce((sum, [x, y]) => {
        const offset = (y * width + x) * 4;
        sum[0] += data[offset]; sum[1] += data[offset + 1]; sum[2] += data[offset + 2];
        return sum;
      }, [0, 0, 0]).map(value => value / samplePoints.length);
      const color = controls.querySelector('[data-background-color]').value;
      const replacement = color.match(/[\da-f]{2}/gi).map(value => parseInt(value, 16));
      for (let index = 0; index < data.length; index += 4) {
        const distance = Math.sqrt((data[index] - background[0]) ** 2 + (data[index + 1] - background[1]) ** 2 + (data[index + 2] - background[2]) ** 2);
        if (distance <= tolerance) {
          if (mode === 'transparent') data[index + 3] = 0;
          else {
            const rgb = mode === 'white' ? [255, 255, 255] : mode === 'lightblue' ? [210, 230, 250] : replacement;
            data[index] = rgb[0]; data[index + 1] = rgb[1]; data[index + 2] = rgb[2]; data[index + 3] = 255;
          }
        }
      }
      context.putImageData(image, 0, 0);
    }

    function drawPhoto() {
      const crop = cropGeometry();
      if (!crop) return false;
      const { width, height, sourceX, sourceY, sourceWidth, sourceHeight } = crop;
      photoCanvas.width = width; photoCanvas.height = height;
      photoContext.clearRect(0, 0, width, height);
      photoContext.drawImage(bitmap, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
      removeSampledBackground(photoContext, width, height);
      cropData = crop;
      return true;
    }

    function drawSheet() {
      if (!photoGenerated) return false;
      const dpi = 300, sheetWidth = Math.round(210 / 25.4 * dpi), sheetHeight = Math.round(297 / 25.4 * dpi);
      const margin = Math.round(5 / 25.4 * dpi), gap = Math.round(2 / 25.4 * dpi);
      const columns = Math.max(1, Math.floor((sheetWidth - margin * 2 + gap) / (photoCanvas.width + gap)));
      const rowsFit = Math.max(1, Math.floor((sheetHeight - margin * 2 + gap) / (photoCanvas.height + gap)));
      const capacity = Math.min(100, columns * rowsFit);
      const requested = Math.max(1, Math.min(100, Math.floor(Number(controls.querySelector('[data-passport-copies]').value) || 1)));
      const copies = Math.min(requested, capacity);
      controls.querySelector('[data-passport-copies]').value = copies;
      controls.querySelector('[data-passport-copies]').max = capacity;
      const rows = Math.ceil(copies / columns);
      sheetCanvas.width = sheetWidth;
      sheetCanvas.height = sheetHeight;
      sheetContext.fillStyle = '#fff';
      sheetContext.fillRect(0, 0, sheetWidth, sheetHeight);
      for (let index = 0; index < copies; index += 1) {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = margin + column * (photoCanvas.width + gap);
        const y = margin + row * (photoCanvas.height + gap);
        if (y + photoCanvas.height > sheetHeight - margin) break;
        sheetContext.drawImage(photoCanvas, x, y);
      }
      sheetData = { copies, columns, rows, width: sheetWidth, height: sheetHeight, margin, gap, photoWidth: photoCanvas.width, photoHeight: photoCanvas.height };
      result.hidden = false;
      result.textContent = `A4 portrait · ${sheetData.copies} copies · ${columns} per row · capacity ${capacity} · ${widthMm(photoCanvas.width)} × ${widthMm(photoCanvas.height)} mm each · 300 DPI`;
      if (requested > capacity) status.textContent = `A4 sheet capacity is ${capacity} copies at this photo size. Copy count adjusted to fit.`;
      imageResult.querySelector('.passport-sheet-output').hidden = false;
      sheetGenerated = true;
      imageResult.querySelectorAll('[data-export-sheet],[data-passport-print]').forEach(button => { button.disabled = false; });
      return true;
    }

    function widthMm(pixels) { return (pixels / 300 * 25.4).toFixed(1); }
    function invalidateSheet() {
      sheetGenerated = false;
      imageResult.querySelector('.passport-sheet-output').hidden = true;
      result.hidden = true;
      imageResult.querySelectorAll('[data-export-sheet],[data-passport-print]').forEach(button => { button.disabled = true; });
    }

    function invalidatePhoto() {
      photoGenerated = false;
      imageResult.querySelector('.passport-photo-output').hidden = true;
      controls.querySelector('[data-passport-generate-sheet]').disabled = true;
      controls.querySelector('[data-passport-copies]').disabled = true;
      controls.querySelector('.passport-sheet-controls').disabled = true;
      controls.querySelectorAll('[data-export-photo]').forEach(button => { button.disabled = true; });
      invalidateSheet();
    }

    function announce() { status.textContent = bitmap ? 'Crop and sheet preview updated locally.' : 'Upload a portrait photo to start. Your image stays in this browser.'; }
    function requirePhoto() {
      if (!photoGenerated) { status.textContent = 'Position the crop and choose Generate photo before exporting.'; return false; }
      return true;
    }
    function requireSheet() {
      if (!sheetGenerated) { status.textContent = 'Choose Generate A4 sheet before exporting or printing the sheet.'; return false; }
      return true;
    }
    function canvasBlob(canvas, mime) {
      return new Promise(resolve => canvas.toBlob(resolve, mime, 0.95));
    }
    function toSvg(canvas, widthMmValue, heightMmValue) {
      const data = canvas.toDataURL('image/png');
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${widthMmValue}mm" height="${heightMmValue}mm" viewBox="0 0 ${canvas.width} ${canvas.height}"><image width="${canvas.width}" height="${canvas.height}" href="${data}"/></svg>`;
    }

    controls.querySelector('[data-passport-file]').addEventListener('change', async event => {
      const file = event.target.files[0];
      if (!file) {
        bitmap = null; cropData = null; sheetData = null;
        controls.querySelector('[data-passport-generate-photo]').disabled = true;
        photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
        sheetContext.clearRect(0, 0, sheetCanvas.width, sheetCanvas.height);
        sourceContext.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
        invalidatePhoto(); announce(); return;
      }
      try {
        bitmap = await createImageBitmap(file);
        invalidatePhoto();
        controls.querySelector('[data-passport-generate-photo]').disabled = false;
        drawSourcePreview();
        announce();
      } catch (error) { bitmap = null; status.textContent = 'The selected image could not be opened by this browser.'; }
    });
    controls.querySelector('[data-passport-size]').addEventListener('change', () => { if (bitmap) drawSourcePreview(); invalidatePhoto(); });
    controls.querySelector('[data-passport-copies]').addEventListener('input', invalidateSheet);
    for (const axis of ['x', 'y']) {
      controls.querySelector(`[data-position="${axis}"]`).addEventListener('input', event => {
        controls.querySelector(`[data-position-${axis}]`).value = `${event.target.value}%`;
        if (bitmap) drawSourcePreview();
        invalidatePhoto();
      });
    }
    controls.querySelector('[data-passport-generate-photo]').addEventListener('click', () => {
      if (!bitmap) { status.textContent = 'Upload a portrait photo before generating.'; return; }
      if (drawPhoto()) {
        photoGenerated = true;
        imageResult.querySelector('.passport-photo-output').hidden = false;
        controls.querySelectorAll('[data-export-photo]').forEach(button => { button.disabled = false; });
        controls.querySelector('.passport-sheet-controls').disabled = false;
        controls.querySelector('[data-passport-copies]').disabled = false;
        controls.querySelector('[data-passport-generate-sheet]').disabled = false;
        invalidateSheet();
        status.textContent = 'Photo generated. Review it, set the copy count, then generate the A4 sheet.';
      }
    });
    controls.querySelector('[data-passport-generate-sheet]').addEventListener('click', () => {
      if (!photoGenerated) { status.textContent = 'Generate and review the individual photo first.'; return; }
      if (drawSheet()) status.textContent = 'A4 sheet generated. Check the layout and copy count before printing.';
    });
    controls.querySelector('[data-remove-background]').addEventListener('change', invalidatePhoto);
    controls.querySelector('[data-background-mode]').addEventListener('change', event => { controls.querySelector('[data-custom-color-wrap]').hidden = event.target.value !== 'custom'; invalidatePhoto(); });
    controls.querySelector('[data-background-color]').addEventListener('input', invalidatePhoto);
    controls.querySelector('[data-background-tolerance]').addEventListener('input', event => { controls.querySelector('[data-background-tolerance-label]').value = event.target.value; invalidatePhoto(); });
    sourceCanvas.addEventListener('pointerdown', event => { if (!bitmap) return; dragging = true; sourceCanvas.setPointerCapture(event.pointerId); });
    sourceCanvas.addEventListener('pointerup', event => { dragging = false; if (sourceCanvas.hasPointerCapture(event.pointerId)) sourceCanvas.releasePointerCapture(event.pointerId); });
    sourceCanvas.addEventListener('pointermove', event => {
      if (!dragging || !bitmap) return;
      const rect = sourceCanvas.getBoundingClientRect();
      const preview = drawSourcePreview();
      if (!preview) return;
      const localX = (event.clientX - rect.left) / rect.width * sourceCanvas.width;
      const localY = (event.clientY - rect.top) / rect.height * sourceCanvas.height;
      const xRange = Math.max(0, sourceCanvas.width - preview.width);
      const yRange = Math.max(0, sourceCanvas.height - preview.height);
      const xRatio = xRange ? Math.max(0, Math.min(1, (localX - preview.width / 2) / xRange)) : 0.5;
      const yRatio = yRange ? Math.max(0, Math.min(1, (localY - preview.height / 2) / yRange)) : 0.5;
      controls.querySelector('[data-position="x"]').value = Math.round(xRatio * 100);
      controls.querySelector('[data-position="y"]').value = Math.round(yRatio * 100);
      controls.querySelector('[data-position-x]').value = `${controls.querySelector('[data-position="x"]').value}%`;
      controls.querySelector('[data-position-y]').value = `${controls.querySelector('[data-position="y"]').value}%`;
      invalidatePhoto();
    });
    controls.querySelectorAll('[data-export-photo]').forEach(button => button.addEventListener('click', async () => {
      if (!requirePhoto()) return;
      const format = button.dataset.exportPhoto;
      const size = selectedSize();
      if (format === 'svg') downloadBlob(new Blob([toSvg(photoCanvas, size.width, size.height)], { type: 'image/svg+xml;charset=utf-8' }), `passport-photo-${controls.querySelector('[data-passport-size]').value}.svg`);
      else {
        const blob = await canvasBlob(photoCanvas, format === 'jpg' ? 'image/jpeg' : 'image/png');
        if (blob) downloadBlob(blob, `passport-photo-${controls.querySelector('[data-passport-size]').value}.${format}`);
      }
      status.textContent = `Passport photo exported as ${format.toUpperCase()}.`;
    }));
    imageResult.querySelectorAll('[data-export-sheet]').forEach(button => button.addEventListener('click', async () => {
      if (!requireSheet()) return;
      const format = button.dataset.exportSheet;
      if (format === 'svg') downloadBlob(new Blob([toSvg(sheetCanvas, 210, 297)], { type: 'image/svg+xml;charset=utf-8' }), 'passport-photos-a4.svg');
      else {
        const blob = await canvasBlob(sheetCanvas, format === 'jpg' ? 'image/jpeg' : 'image/png');
        if (blob) downloadBlob(blob, `passport-photos-a4.${format}`);
      }
      status.textContent = `A4 sheet exported as ${format.toUpperCase()}.`;
    }));
    imageResult.querySelector('[data-passport-print]').addEventListener('click', () => {
      if (!requireSheet()) return;
      const printWindow = window.open('', '_blank');
      if (!printWindow) { status.textContent = 'Allow pop-ups for this site to open the print sheet.'; return; }
      const image = sheetCanvas.toDataURL('image/png');
      printWindow.document.write(`<!doctype html><html><head><title>A4 Passport Photo Sheet</title><style>@page{size:A4 portrait;margin:0}html,body{width:210mm;height:297mm;margin:0}img{display:block;width:210mm;height:297mm}</style></head><body><img src="${image}" alt="A4 passport photo sheet"><script>window.onload=()=>{window.focus();window.print()}<\/script></body></html>`);
      printWindow.document.close();
      status.textContent = 'A4 print sheet opened. Check printer paper size and scale before printing.';
    });
    announce();
  }

  function renderPage(root, tool) {
    document.title = tool.title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.content = tool.description;
    const title = root.querySelector('[data-tool-title]');
    const intro = root.querySelector('[data-tool-description]');
    const body = root.querySelector('[data-tool-content]');
    title.textContent = tool.title;
    intro.textContent = tool.description;

    const faqMarkup = tool.faq.map(([question, answer]) => `<details class="online-tool-faq"><summary>${question}</summary><p>${answer}</p></details>`).join('');
    body.innerHTML = `<section class="online-tool-interface" aria-label="${tool.title} interface"><div class="online-tool-controls"></div><div class="online-tool-actions"><button class="online-tool-run" type="button">${tool.type === 'two-text' ? 'Compare' : 'Run Tool'}</button><button class="online-tool-clear" type="button">Clear</button><button class="online-tool-download" type="button">Download Result</button></div><p class="online-tool-status" aria-live="polite"></p><pre class="online-tool-result" tabindex="0" aria-label="Tool result"></pre><div class="online-tool-image-result"></div></section>
      <section class="online-tool-guide"><h2>About ${tool.title.replace(/ Online Free Tool$/i, '')}</h2><p>${tool.details}</p><h2>How to use this ${tool.category.replace(/s$/, '').toLowerCase()}</h2><ol>${tool.steps.map(step => `<li>${step}</li>`).join('')}</ol><h2>Features and privacy</h2><p>This free online tool works in a modern browser and is designed to keep text and selected files on your device. It does not replace project-specific validation or the rules of the service where you plan to use the result. Check the output before relying on it in production or official documents.</p><h2>Frequently asked questions</h2>${faqMarkup}</section>`;

    const controls = root.querySelector('.online-tool-controls');
    const type = tool.type;
    if (type === 'two-text') {
      controls.innerHTML = '<label>Original text<textarea data-input="left" rows="12" spellcheck="false"></textarea></label><label>Updated text<textarea data-input="right" rows="12" spellcheck="false"></textarea></label>';
    } else if (type === 'passport-photo') {
      renderPassportMaker(root, controls, root.querySelector('.online-tool-result'), root.querySelector('.online-tool-status'), root.querySelector('.online-tool-image-result'));
      return;
    } else if (type.startsWith('image-') || type === 'file-csv') {
      controls.innerHTML = `<label>Choose a local file<input data-file type="file" accept="${type === 'file-csv' ? '.xlsx,.xls' : 'image/*'}"></label>${type === 'image-compress' || type === 'image-jpeg' ? '<label>JPEG quality <input data-option="quality" type="range" min="0.2" max="1" step="0.05" value="0.82"><output data-quality>82%</output></label>' : ''}${type === 'image-resize' || type === 'image-crop' || type === 'passport-photo' ? `<div class="online-tool-dimensions"><label>Width (px)<input data-option="width" type="number" min="1" max="10000" value="${type === 'passport-photo' ? 600 : 800}"></label><label>Height (px)<input data-option="height" type="number" min="1" max="10000" value="${type === 'passport-photo' ? 600 : 600}"></label></div>` : ''}${type === 'image-convert' ? '<label>Output format<select data-option="format"><option value="png">PNG</option><option value="jpeg">JPEG</option></select></label>' : ''}`;
    } else if (type === 'password') {
      controls.innerHTML = '<label>Password length<input data-option="length" type="number" min="8" max="128" value="20"></label><div class="online-tool-checks"><label><input data-option="lower" type="checkbox" checked> Lowercase</label><label><input data-option="upper" type="checkbox" checked> Uppercase</label><label><input data-option="numbers" type="checkbox" checked> Numbers</label><label><input data-option="symbols" type="checkbox" checked> Symbols</label></div>';
    } else if (type === 'basic-calculator') {
      controls.innerHTML = '<label>First number<input data-option="first" type="number" step="any" value="25"></label><label>Operation<select data-option="operation"><option value="add">Add (+)</option><option value="subtract">Subtract (-)</option><option value="multiply">Multiply (×)</option><option value="divide">Divide (÷)</option></select></label><label>Second number<input data-option="second" type="number" step="any" value="5"></label>';
    } else if (type === 'emi-calculator') {
      controls.innerHTML = '<label>Loan amount<input data-option="principal" type="number" min="0.01" step="any" value="1000000"></label><label>Annual interest rate (%)<input data-option="rate" type="number" min="0" step="any" value="8.5"></label><label>Loan term (years)<input data-option="years" type="number" min="0.01" step="any" value="20"></label>';
    } else if (type === 'interest-calculator') {
      controls.innerHTML = '<label>Principal amount<input data-option="principal" type="number" min="0.01" step="any" value="100000"></label><label>Annual interest rate (%)<input data-option="rate" type="number" min="0" step="any" value="6"></label><label>Time (years)<input data-option="years" type="number" min="0.01" step="any" value="5"></label><label>Interest method<select data-option="method"><option value="compound">Compound interest</option><option value="simple">Simple interest</option></select></label><label>Compounding frequency<select data-option="frequency"><option value="1">Annually</option><option value="2">Semi-annually</option><option value="4">Quarterly</option><option value="12" selected>Monthly</option><option value="365">Daily</option></select></label>';
    } else if (type === 'period-interest-calculator') {
      controls.innerHTML = '<label>Principal amount<input data-option="principal" type="number" min="0.01" step="any" value="100000"></label><label>Annual interest rate (%)<input data-option="rate" type="number" min="0" step="any" value="6"></label><label>Period<select data-option="period"><option value="daily">Daily</option><option value="monthly" selected>Monthly</option><option value="yearly">Yearly</option></select></label><label>Number of periods<input data-option="periods" type="number" min="0.01" step="any" value="12"></label>';
    } else if (type === 'qr') {
      controls.innerHTML = '<label>Text or URL<input data-input="left" type="text" autocomplete="off" placeholder="https://example.com"></label>';
    } else if (type === 'base64' || type === 'url') {
      const label = type === 'base64' ? 'Base64' : 'URL component';
      controls.innerHTML = `<label>Conversion<select data-option="mode"><option value="encode">Encode to ${label}</option><option value="decode">Decode ${label}</option></select></label><label>Input<textarea data-input="left" rows="14" spellcheck="false"></textarea></label>`;
    } else if (type === 'file-xlsx') {
      controls.innerHTML = '<label>CSV data<textarea data-input="left" rows="12" spellcheck="false" placeholder="name,email\nAda,ada@example.com"></textarea></label>';
    } else {
      controls.innerHTML = '<label>Input<textarea data-input="left" rows="14" spellcheck="false"></textarea></label>';
    }
    if (type === 'timestamp') controls.querySelector('textarea').placeholder = 'Enter a Unix timestamp or date, e.g. 1700000000 or 2026-10-01T12:00:00Z';
    if (type === 'json-to-csv') controls.querySelector('textarea').placeholder = '[{"name":"Ada","city":"London"}]';
    if (type === 'csv-to-json' || type === 'csv-clean') controls.querySelector('textarea').placeholder = 'name,city\nAda,London';
    if (type === 'base64') controls.querySelector('textarea').placeholder = 'Enter text or Base64';
    if (type === 'url') controls.querySelector('textarea').placeholder = 'Enter text or percent-encoded URL component';

    const result = root.querySelector('.online-tool-result');
    const status = root.querySelector('.online-tool-status');
    let latestResult = '';
    let latestFilename = 'online-tool-result.txt';
    const input = name => controls.querySelector(`[data-input="${name}"]`);
    const say = (message, isError) => { status.textContent = message; status.classList.toggle('is-error', Boolean(isError)); };

    async function run() {
      try {
        const source = input('left')?.value || '';
        let output = '';
        let filename = 'online-tool-result.txt';
        switch (type) {
          case 'remove-blank-lines': output = source.split(/\r?\n/).filter(line => line.trim()).join('\n'); filename = 'cleaned-sql.sql'; break;
          case 'sql-diff':
          case 'two-text': {
            const left = input('left').value;
            const right = input('right').value;
            output = `Only in original:\n${compareLines(left, right).join('\n') || '(none)'}\n\nOnly in updated:\n${compareLines(right, left).join('\n') || '(none)'}`;
            filename = type === 'sql-diff' ? 'sql-differences.txt' : 'text-differences.txt';
            break;
          }
          case 'json-sort': output = JSON.stringify(sortedJson(JSON.parse(source)), null, 2); filename = 'sorted.json'; break;
          case 'json-validate': output = JSON.stringify(JSON.parse(source), null, 2); filename = 'validated.json'; break;
          case 'json-to-csv': {
            const records = JSON.parse(source);
            if (!Array.isArray(records) || records.some(record => !record || typeof record !== 'object' || Array.isArray(record))) throw new Error('Enter a JSON array of objects.');
            const keys = [...new Set(records.flatMap(record => Object.keys(record)))];
            output = csvStringify([keys, ...records.map(record => keys.map(key => record[key] != null && typeof record[key] === 'object' ? JSON.stringify(record[key]) : record[key] ?? ''))]);
            filename = 'converted.csv'; break;
          }
          case 'csv-to-json': {
            const [headers, ...rows] = csvParse(source);
            output = JSON.stringify(rows.filter(row => row.some(cell => cell !== '')).map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || '']))), null, 2);
            filename = 'converted.json'; break;
          }
          case 'csv-clean': output = csvStringify(csvParse(source).filter(row => row.some(cell => cell.trim() !== '')).map(row => row.map(cell => cell.trim()))); filename = 'cleaned.csv'; break;
          case 'base64': {
            const decode = controls.querySelector('[data-option="mode"]').value === 'decode';
            output = decode ? new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(atob(source.trim()), char => char.charCodeAt(0))) : encodeBase64Utf8(source);
            filename = decode ? 'decoded.txt' : 'encoded-base64.txt'; break;
          }
          case 'url': {
            const decode = controls.querySelector('[data-option="mode"]').value === 'decode';
            output = decode ? decodeURIComponent(source) : encodeURIComponent(source);
            filename = decode ? 'decoded-url-component.txt' : 'encoded-url-component.txt'; break;
          }
          case 'format-html': output = formatMarkup(source, 'html'); filename = 'formatted.html'; break;
          case 'format-css': output = formatSimpleCode(source, 'css'); filename = 'formatted.css'; break;
          case 'format-js': output = formatSimpleCode(source, 'js'); filename = 'formatted.js'; break;
          case 'xml': {
            const parsed = new DOMParser().parseFromString(source, 'application/xml');
            const parseError = parsed.querySelector('parsererror');
            if (parseError) throw new Error(parseError.textContent.replace(/\s+/g, ' ').trim());
            output = formatMarkup(new XMLSerializer().serializeToString(parsed), 'xml'); filename = 'formatted.xml'; break;
          }
          case 'timestamp': {
            const numeric = Number(source.trim());
            const date = source.trim() && Number.isFinite(numeric) ? new Date(Math.abs(numeric) < 1e11 ? numeric * 1000 : numeric) : new Date(source);
            if (Number.isNaN(date.getTime())) throw new Error('Enter a valid timestamp or date.');
            output = `UTC: ${date.toISOString()}\nUnix seconds: ${Math.floor(date.getTime() / 1000)}\nUnix milliseconds: ${date.getTime()}`; filename = 'timestamp-conversion.txt'; break;
          }
          case 'basic-calculator': {
            const first = Number(controls.querySelector('[data-option="first"]').value);
            const second = Number(controls.querySelector('[data-option="second"]').value);
            if (!Number.isFinite(first) || !Number.isFinite(second)) throw new Error('Enter valid numbers in both fields.');
            const operation = controls.querySelector('[data-option="operation"]').value;
            if (operation === 'divide' && second === 0) throw new Error('Division by zero is undefined.');
            const symbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
            const value = operation === 'add' ? first + second : operation === 'subtract' ? first - second : operation === 'multiply' ? first * second : first / second;
            output = `${first} ${symbols[operation]} ${second} = ${value}`; filename = 'calculation.txt'; break;
          }
          case 'emi-calculator': {
            const principal = Number(controls.querySelector('[data-option="principal"]').value);
            const annualRate = Number(controls.querySelector('[data-option="rate"]').value);
            const years = Number(controls.querySelector('[data-option="years"]').value);
            if (!(principal > 0) || annualRate < 0 || !(years > 0) || ![principal, annualRate, years].every(Number.isFinite)) throw new Error('Enter a positive loan amount and term, and a non-negative rate.');
            const months = Math.round(years * 12);
            const monthlyRate = annualRate / 1200;
            const emi = monthlyRate === 0 ? principal / months : principal * monthlyRate * ((1 + monthlyRate) ** months) / (((1 + monthlyRate) ** months) - 1);
            const total = emi * months;
            const currency = value => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            output = `Estimated monthly EMI: ${currency(emi)}\nNumber of monthly payments: ${months}\nTotal repayment: ${currency(total)}\nTotal interest: ${currency(total - principal)}\n\nFormula: EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)\nP = principal, r = monthly rate, n = number of monthly payments.\nEstimate only; lender fees and terms are not included.`;
            filename = 'emi-loan-estimate.txt'; break;
          }
          case 'interest-calculator': {
            const principal = Number(controls.querySelector('[data-option="principal"]').value);
            const annualRate = Number(controls.querySelector('[data-option="rate"]').value);
            const years = Number(controls.querySelector('[data-option="years"]').value);
            const frequency = Number(controls.querySelector('[data-option="frequency"]').value);
            const method = controls.querySelector('[data-option="method"]').value;
            if (!(principal > 0) || annualRate < 0 || !(years > 0) || ![principal, annualRate, years, frequency].every(Number.isFinite)) throw new Error('Enter a positive principal and duration, plus a non-negative rate.');
            const amount = method === 'simple' ? principal * (1 + annualRate / 100 * years) : principal * (1 + annualRate / 100 / frequency) ** (frequency * years);
            const currency = value => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            output = `Method: ${method === 'simple' ? 'Simple interest' : 'Compound interest'}\nPrincipal: ${currency(principal)}\nInterest earned: ${currency(amount - principal)}\nEstimated final amount: ${currency(amount)}\nAnnual rate: ${annualRate}%\nDuration: ${years} years${method === 'compound' ? `\nCompounding periods per year: ${frequency}` : ''}\n\nEstimate only; taxes, fees, changing rates, and investment risk are not included.`;
            filename = 'interest-estimate.txt'; break;
          }
          case 'period-interest-calculator': {
            const principal = Number(controls.querySelector('[data-option="principal"]').value);
            const annualRate = Number(controls.querySelector('[data-option="rate"]').value);
            const periods = Number(controls.querySelector('[data-option="periods"]').value);
            const period = controls.querySelector('[data-option="period"]').value;
            if (!(principal > 0) || annualRate < 0 || !(periods > 0) || ![principal, annualRate, periods].every(Number.isFinite)) throw new Error('Enter a positive principal and number of periods, plus a non-negative rate.');
            const daysPerPeriod = period === 'daily' ? 1 : period === 'monthly' ? 365 / 12 : 365;
            const periodRate = annualRate / 100 * daysPerPeriod / 365;
            const interest = principal * periodRate * periods;
            const currency = value => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            output = `Period: ${period[0].toUpperCase()}${period.slice(1)}\nNumber of periods: ${periods}\nRate per period (simple): ${(periodRate * 100).toFixed(6)}%\nEstimated interest: ${currency(interest)}\nEstimated total: ${currency(principal + interest)}\n\nDaily uses 365 days per year; monthly uses 1/12 of a year. Simple interest only; lender conventions may differ.`;
            filename = 'period-interest-estimate.txt'; break;
          }
          case 'count': {
            const words = source.trim() ? source.trim().split(/\s+/u).length : 0;
            const sentences = (source.match(/[.!?]+(?=\s|$)/g) || []).length;
            output = `Words: ${words}\nCharacters (including spaces): ${source.length}\nCharacters (excluding whitespace): ${source.replace(/\s/g, '').length}\nSentences: ${sentences}\nLines: ${source ? source.split(/\r\n|\r|\n/).length : 0}`;
            filename = 'text-count.txt'; break;
          }
          case 'password': {
            const options = controls;
            const alphabet = `${options.querySelector('[data-option="lower"]').checked ? 'abcdefghijklmnopqrstuvwxyz' : ''}${options.querySelector('[data-option="upper"]').checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''}${options.querySelector('[data-option="numbers"]').checked ? '0123456789' : ''}${options.querySelector('[data-option="symbols"]').checked ? '!@#$%^&*()-_=+[]{}?' : ''}`;
            if (!alphabet) throw new Error('Select at least one character group.');
            const length = Math.min(128, Math.max(8, Number(options.querySelector('[data-option="length"]').value) || 20));
            const characters = [];
            const groups = [
              ['lower', 'abcdefghijklmnopqrstuvwxyz'], ['upper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
              ['numbers', '0123456789'], ['symbols', '!@#$%^&*()-_=+[]{}?']
            ];
            groups.forEach(([name, group]) => { if (options.querySelector(`[data-option="${name}"]`).checked) characters.push(group[cryptoIndex(group.length)]); });
            while (characters.length < length) characters.push(alphabet[cryptoIndex(alphabet.length)]);
            for (let index = characters.length - 1; index > 0; index -= 1) {
              const swap = cryptoIndex(index + 1);
              [characters[index], characters[swap]] = [characters[swap], characters[index]];
            }
            output = characters.join(''); filename = 'generated-password.txt'; break;
          }
          case 'qr': {
            const text = source.trim();
            if (!text) throw new Error('Enter text or a URL to create a QR code.');
            if (!window.QRCode) await new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; script.onload = resolve; script.onerror = () => reject(new Error('QR encoder could not be loaded. Check your internet connection.')); document.head.append(script); });
            const target = root.querySelector('.online-tool-image-result'); target.replaceChildren(); new QRCode(target, { text, width: 256, height: 256, correctLevel: QRCode.CorrectLevel.M });
            const image = target.querySelector('img') || target.querySelector('canvas');
            if (image) { const link = document.createElement('a'); link.className = 'online-tool-image-download'; link.download = 'qr-code.png'; link.textContent = 'Download QR code'; link.href = image.tagName === 'CANVAS' ? image.toDataURL('image/png') : image.src; target.append(link); }
            result.textContent = 'QR code generated. Scan the preview and download the image.'; latestResult = ''; say('QR code created.'); return;
          }
          case 'file-csv': {
            const file = controls.querySelector('[data-file]').files[0];
            if (!file) throw new Error('Choose an Excel workbook first.');
            if (!window.XLSX) await new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js'; script.onload = resolve; script.onerror = () => reject(new Error('Spreadsheet reader could not be loaded. Check your internet connection.')); document.head.append(script); });
            const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
            output = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]); filename = `${file.name.replace(/\.[^.]+$/, '')}.csv`; break;
          }
          case 'file-xlsx': {
            const rows = csvParse(source);
            if (!source.trim()) throw new Error('Enter CSV data first.');
            if (!window.XLSX) await new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js'; script.onload = resolve; script.onerror = () => reject(new Error('Spreadsheet writer could not be loaded. Check your internet connection.')); document.head.append(script); });
            const workbook = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(rows), 'Sheet1'); XLSX.writeFile(workbook, 'converted.xlsx');
            result.textContent = 'Excel workbook created and downloaded.'; latestResult = ''; say('Workbook downloaded.'); return;
          }
          default:
            if (type.startsWith('image-') || type === 'passport-photo') {
              const file = controls.querySelector('[data-file]').files[0];
              if (!file) throw new Error('Choose an image first.');
              const bitmap = await createImageBitmap(file);
              const width = Number(controls.querySelector('[data-option="width"]')?.value) || bitmap.width;
              const height = Number(controls.querySelector('[data-option="height"]')?.value) || bitmap.height;
              const outputWidth = type === 'passport-photo' ? Math.min(width, height) : type === 'image-resize' ? width : type === 'image-crop' ? width : type === 'image-convert' || type === 'image-compress' || type === 'image-jpeg' ? bitmap.width : bitmap.width;
              const outputHeight = type === 'passport-photo' ? outputWidth : type === 'image-resize' ? height : type === 'image-crop' ? height : bitmap.height;
              if (outputWidth < 1 || outputHeight < 1 || outputWidth > 10000 || outputHeight > 10000) throw new Error('Dimensions must be between 1 and 10,000 pixels.');
              if ((type === 'image-crop' || type === 'passport-photo') && (outputWidth > bitmap.width || outputHeight > bitmap.height)) throw new Error('Crop dimensions must fit within the selected image.');
              const canvas = document.createElement('canvas'); canvas.width = outputWidth; canvas.height = outputHeight;
              const context = canvas.getContext('2d');
              const jpeg = type === 'image-jpeg' || type === 'image-compress' || type === 'image-resize' || type === 'image-crop' || type === 'passport-photo' || (type === 'image-convert' && controls.querySelector('[data-option="format"]').value === 'jpeg');
              if (jpeg) { context.fillStyle = '#fff'; context.fillRect(0, 0, outputWidth, outputHeight); }
              const cropX = (bitmap.width - outputWidth) / 2, cropY = (bitmap.height - outputHeight) / 2;
              if (type === 'image-crop' || type === 'passport-photo') context.drawImage(bitmap, cropX, cropY, outputWidth, outputHeight, 0, 0, outputWidth, outputHeight);
              else context.drawImage(bitmap, 0, 0, outputWidth, outputHeight);
              const mime = jpeg ? 'image/jpeg' : 'image/png';
              const quality = Number(controls.querySelector('[data-option="quality"]')?.value) || .82;
              const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, quality));
              if (!blob) throw new Error('The browser could not encode this image.');
              const url = URL.createObjectURL(blob); const image = document.createElement('img'); image.src = url; image.alt = 'Processed image preview'; image.className = 'online-tool-preview-image';
              const link = document.createElement('a'); link.href = url; link.download = `${file.name.replace(/\.[^.]+$/, '')}-online-tool.${jpeg ? 'jpg' : 'png'}`; link.textContent = 'Download processed image'; link.className = 'online-tool-image-download';
              root.querySelector('.online-tool-image-result').replaceChildren(image, link);
              result.textContent = `Output: ${outputWidth} × ${outputHeight} pixels\nFile size: ${blob.size.toLocaleString()} bytes`; latestResult = ''; say('Image processed in this browser.'); return;
            }
            throw new Error('This tool is not available.');
        }
        latestResult = output; latestFilename = filename; result.textContent = output || '(No output)';
        say(type === 'json-validate' ? 'Valid JSON.' : 'Done. Review the result before using it.');
      } catch (error) { latestResult = ''; result.textContent = ''; say(error.message || 'Could not process this input.', true); }
    }

    root.querySelector('.online-tool-run').addEventListener('click', run);
    root.querySelector('.online-tool-clear').addEventListener('click', () => {
      controls.querySelectorAll('textarea,input[type="text"],input[type="file"]').forEach(field => { field.value = ''; });
      result.textContent = ''; status.textContent = ''; status.classList.remove('is-error'); latestResult = ''; root.querySelector('.online-tool-image-result').replaceChildren();
    });
    root.querySelector('.online-tool-download').addEventListener('click', () => {
      if (!latestResult) { say('Run the tool to create a downloadable text result.', true); return; }
      downloadText(latestResult, latestFilename, 'text/plain;charset=utf-8');
    });
    controls.querySelector('[data-option="quality"]')?.addEventListener('input', event => { controls.querySelector('[data-quality]').value = `${Math.round(Number(event.target.value) * 100)}%`; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-online-tool]').forEach(root => {
      const tool = toolData[root.dataset.onlineTool];
      if (tool) renderPage(root, tool);
    });
  });
}());