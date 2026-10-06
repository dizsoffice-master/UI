(function () {
  'use strict';

  const designs = {
    classic: { label: 'Classic', accent: '#143a5a', soft: '#edf3f7', border: '#c7d5df' },
    modern: { label: 'Modern', accent: '#146b59', soft: '#eaf5f1', border: '#b9d9ce' },
    minimal: { label: 'Minimal', accent: '#383838', soft: '#f3f3f3', border: '#d8d8d8' },
    executive: { label: 'Executive', accent: '#725516', soft: '#faf5e7', border: '#e3d4a9' }
  };

  const makers = {
    'salary-slip': {
      title: 'Salary Slip Generator Online Free Tool',
      description: 'Create a customizable salary slip with optional company, employee, payroll, tax, payment, signature, and stamp details. Preview four designs and export PDF or Word-compatible DOC.',
      groups: [
        { title: 'Company details', fields: [
          ['companyName', 'Company name'], ['gst', 'GST number'], ['cin', 'CIN'], ['companyAddress', 'Company address', 'textarea'], ['logo', 'Company logo', 'file:image/*']
        ] },
        { title: 'Payroll period', fields: [
          ['salaryMonth', 'Salary month'], ['payDate', 'Payment date', 'date'], ['currency', 'Currency code (e.g. INR)'], ['paymentMode', 'Payment mode', 'select:|Bank transfer|Cash|Cheque|UPI|Other'], ['daysWorked', 'Days worked', 'number'], ['totalDays', 'Days in period', 'number']
        ] },
        { title: 'Employee details', fields: [
          ['employeeName', 'Employee name'], ['employeeId', 'Employee ID'], ['designation', 'Designation'], ['department', 'Department'], ['pan', 'PAN'], ['uan', 'UAN'], ['bankName', 'Bank name'], ['accountNumber', 'Bank account (optional)']
        ] },
        { title: 'Earnings', fields: [
          ['basic', 'Basic salary', 'number'], ['hra', 'House rent allowance', 'number'], ['otherAllowance', 'Other allowances', 'number'], ['bonus', 'Bonus / incentive', 'number'], ['overtime', 'Overtime', 'number'], ['otherEarnings', 'Other earnings', 'number']
        ] },
        { title: 'Deductions and sign-off', fields: [
          ['pf', 'Provident fund', 'number'], ['esi', 'ESI', 'number'], ['tax', 'TDS / tax', 'number'], ['otherDeductions', 'Other deductions', 'number'], ['notes', 'Notes', 'textarea'], ['signatoryName', 'Authorized signatory'], ['signature', 'Signature image', 'file:image/*'], ['stamp', 'Company stamp image', 'file:image/*']
        ] }
      ]
    },
    'offer-letter': {
      title: 'Offer Letter Maker Online Free Tool',
      description: 'Draft a customizable employment offer letter with optional company, candidate, role, compensation, start date, terms, logo, signature, and stamp. Export PDF or Word-compatible DOC.',
      groups: [
        { title: 'Company details', fields: [['companyName', 'Company name'], ['gst', 'GST number'], ['cin', 'CIN'], ['companyAddress', 'Company address', 'textarea'], ['logo', 'Company logo', 'file:image/*']] },
        { title: 'Candidate and role', fields: [['letterDate', 'Letter date', 'date'], ['candidateName', 'Candidate name'], ['candidateAddress', 'Candidate address', 'textarea'], ['jobTitle', 'Job title'], ['department', 'Department'], ['employmentType', 'Employment type'], ['workLocation', 'Work location'], ['joiningDate', 'Proposed joining date', 'date'], ['reportingTo', 'Reports to']] },
        { title: 'Compensation and terms', fields: [['annualCompensation', 'Annual compensation', 'number'], ['currency', 'Currency code (e.g. INR)'], ['probation', 'Probation period'], ['workingHours', 'Working hours'], ['offerExpiry', 'Offer expiry date', 'date'], ['terms', 'Additional terms', 'textarea']] },
        { title: 'Sign-off', fields: [['signatoryName', 'Authorized signatory'], ['signatoryTitle', 'Signatory title'], ['signature', 'Signature image', 'file:image/*'], ['stamp', 'Company stamp image', 'file:image/*']] }
      ]
    },
    'fresher-resume': {
      title: 'Fresher Resume Maker Online Free Tool',
      description: 'Build a clean fresher resume with optional contact, objective, education, skills, projects, internships, and achievements. Choose a design and export PDF or Word-compatible DOC.',
      groups: [
        { title: 'Profile', fields: [['fullName', 'Full name'], ['targetRole', 'Target role'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'City / location'], ['portfolio', 'Portfolio or LinkedIn URL'], ['photo', 'Profile photo (optional)', 'file:image/*'], ['objective', 'Career objective', 'textarea']] },
        { title: 'Education and skills', fields: [['education', 'Education (one qualification per line)', 'textarea'], ['skills', 'Skills (comma-separated or one per line)', 'textarea'], ['projects', 'Projects (one per line)', 'textarea']] },
        { title: 'Experience and extras', fields: [['internships', 'Internships or volunteering', 'textarea'], ['certifications', 'Certifications', 'textarea'], ['achievements', 'Achievements', 'textarea'], ['languages', 'Languages', 'textarea']] }
      ]
    },
    'increment-letter': {
      title: 'Salary Increment Letter Maker Online Free Tool',
      description: 'Prepare a salary increment letter with optional company, employee, role, current and revised salary, effective date, and authorized sign-off. Export PDF or Word-compatible DOC.',
      groups: [
        { title: 'Company details', fields: [['companyName', 'Company name'], ['gst', 'GST number'], ['cin', 'CIN'], ['companyAddress', 'Company address', 'textarea'], ['logo', 'Company logo', 'file:image/*']] },
        { title: 'Employee and revision', fields: [['letterDate', 'Letter date', 'date'], ['employeeName', 'Employee name'], ['employeeId', 'Employee ID'], ['designation', 'Current designation'], ['newDesignation', 'New designation'], ['department', 'Department'], ['currentSalary', 'Current salary', 'number'], ['revisedSalary', 'Revised salary', 'number'], ['currency', 'Currency code (e.g. INR)'], ['effectiveDate', 'Effective date', 'date'], ['reason', 'Additional message or notes', 'textarea']] },
        { title: 'Sign-off', fields: [['signatoryName', 'Authorized signatory'], ['signatoryTitle', 'Signatory title'], ['signature', 'Signature image', 'file:image/*'], ['stamp', 'Company stamp image', 'file:image/*']] }
      ]
    }
  };

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const money = (value, currency) => `${escapeHtml(currency || '')}${currency ? ' ' : ''}${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  function fieldMarkup([name, label, kind = 'text']) {
    const fieldId = `maker-${name}`;
    if (kind === 'textarea') return `<label class="document-field document-field-wide" for="${fieldId}">${label}<textarea id="${fieldId}" data-doc-field="${name}" rows="3"></textarea></label>`;
    if (kind.startsWith('select:')) {
      const options = kind.slice(7).split('|').map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option || 'Select (optional)')}</option>`).join('');
      return `<label class="document-field" for="${fieldId}">${label}<select id="${fieldId}" data-doc-field="${name}">${options}</select></label>`;
    }
    if (kind.startsWith('file:')) return `<label class="document-field" for="${fieldId}">${label}<input id="${fieldId}" data-doc-file="${name}" type="file" accept="${kind.slice(5)}"></label>`;
    return `<label class="document-field" for="${fieldId}">${label}<input id="${fieldId}" data-doc-field="${name}" type="${kind}" ${kind === 'number' ? 'min="0" step="any"' : ''}></label>`;
  }

  function optionalLine(label, value) {
    return value ? `<div class="document-detail"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value).replace(/\n/g, '<br>')}</span></div>` : '';
  }

  function signatureBlock(values) {
    const signature = values.signature ? `<img class="document-signature" src="${values.signature}" alt="Signature">` : '';
    const stamp = values.stamp ? `<img class="document-stamp" src="${values.stamp}" alt="Company stamp">` : '';
    if (!signature && !stamp && !values.signatoryName && !values.signatoryTitle) return '';
    return `<div class="document-signoff"><div>${signature}<div class="document-signline"></div>${optionalLine('Authorized by', values.signatoryName)}${optionalLine('Title', values.signatoryTitle)}</div>${stamp}</div>`;
  }

  function salaryDocument(values, design) {
    const earnings = [['Basic salary', values.basic], ['House rent allowance', values.hra], ['Other allowances', values.otherAllowance], ['Bonus / incentive', values.bonus], ['Overtime', values.overtime], ['Other earnings', values.otherEarnings]].filter(([, value]) => value !== '');
    const deductions = [['Provident fund', values.pf], ['ESI', values.esi], ['TDS / tax', values.tax], ['Other deductions', values.otherDeductions]].filter(([, value]) => value !== '');
    const sum = rows => rows.reduce((total, [, amount]) => total + (Number(amount) || 0), 0);
    const earningsTotal = sum(earnings), deductionTotal = sum(deductions), net = earningsTotal - deductionTotal;
    const tableRows = rows => rows.map(([label, amount]) => `<tr><td>${label}</td><td>${money(amount, values.currency)}</td></tr>`).join('');
    const logo = values.logo ? `<img class="document-logo" src="${values.logo}" alt="Company logo">` : '';
    return `<article class="generated-document salary-design-${design}" style="--doc-accent:${designs[design].accent};--doc-soft:${designs[design].soft};--doc-border:${designs[design].border}">
      <header class="document-header">${logo}<div><h2>${escapeHtml(values.companyName || 'Company name')}</h2>${optionalLine('Address', values.companyAddress)}${optionalLine('GST', values.gst)}${optionalLine('CIN', values.cin)}</div></header>
      <h1>Salary Slip${values.salaryMonth ? ` — ${escapeHtml(values.salaryMonth)}` : ''}</h1><div class="document-meta">${optionalLine('Payment date', values.payDate)}${optionalLine('Payment mode', values.paymentMode)}${optionalLine('Days worked', values.daysWorked)}${optionalLine('Days in period', values.totalDays)}</div>
      <h3>Employee details</h3><div class="document-details">${[['Employee', values.employeeName], ['Employee ID', values.employeeId], ['Designation', values.designation], ['Department', values.department], ['PAN', values.pan], ['UAN', values.uan], ['Bank', values.bankName], ['Account', values.accountNumber]].map(([label, value]) => optionalLine(label, value)).join('') || '<p class="document-empty-note">No employee details entered.</p>'}</div>
      <div class="document-pay-tables"><section><h3>Earnings</h3><table><tbody>${tableRows(earnings)}<tr class="document-total"><th>Total earnings</th><td>${money(earningsTotal, values.currency)}</td></tr></tbody></table></section><section><h3>Deductions</h3><table><tbody>${tableRows(deductions)}<tr class="document-total"><th>Total deductions</th><td>${money(deductionTotal, values.currency)}</td></tr></tbody></table></section></div>
      <div class="document-net-pay"><span>Net pay</span><strong>${money(net, values.currency)}</strong></div>${optionalLine('Notes', values.notes)}${signatureBlock(values)}<footer>Generated salary statement. Please verify all amounts before issuing.</footer></article>`;
  }

  function letterDocument(values, design, kind) {
    const logo = values.logo ? `<img class="document-logo" src="${values.logo}" alt="Company logo">` : '';
    const isOffer = kind === 'offer-letter';
    const heading = isOffer ? 'Employment Offer Letter' : 'Salary Increment Letter';
    const recipient = isOffer ? values.candidateName : values.employeeName;
    const body = isOffer
      ? `<p>Dear ${escapeHtml(recipient || 'Candidate')},</p><p>We are pleased to offer you the position of <strong>${escapeHtml(values.jobTitle || '[Job title]')}</strong>${values.companyName ? ` at ${escapeHtml(values.companyName)}` : ''}.</p><div class="document-details">${[['Department', values.department], ['Employment type', values.employmentType], ['Work location', values.workLocation], ['Proposed joining date', values.joiningDate], ['Reports to', values.reportingTo], ['Annual compensation', values.annualCompensation ? money(values.annualCompensation, values.currency) : ''], ['Probation period', values.probation], ['Working hours', values.workingHours], ['Offer expiry', values.offerExpiry]].map(([label, value]) => optionalLine(label, value)).join('')}</div>${values.terms ? `<p>${escapeHtml(values.terms).replace(/\n/g, '<br>')}</p>` : ''}<p>Please indicate your acceptance by signing this letter.</p>`
      : `<p>Dear ${escapeHtml(recipient || 'Employee')},</p><p>We are pleased to inform you of a salary revision${values.companyName ? ` at ${escapeHtml(values.companyName)}` : ''}.</p><div class="document-details">${[['Employee ID', values.employeeId], ['Department', values.department], ['Current designation', values.designation], ['New designation', values.newDesignation], ['Current salary', values.currentSalary ? money(values.currentSalary, values.currency) : ''], ['Revised salary', values.revisedSalary ? money(values.revisedSalary, values.currency) : ''], ['Effective date', values.effectiveDate]].map(([label, value]) => optionalLine(label, value)).join('')}</div>${values.reason ? `<p>${escapeHtml(values.reason).replace(/\n/g, '<br>')}</p>` : ''}<p>We appreciate your contributions and wish you continued success.</p>`;
    return `<article class="generated-document salary-design-${design}" style="--doc-accent:${designs[design].accent};--doc-soft:${designs[design].soft};--doc-border:${designs[design].border}"><header class="document-header">${logo}<div><h2>${escapeHtml(values.companyName || 'Company name')}</h2>${optionalLine('Address', values.companyAddress)}${optionalLine('GST', values.gst)}${optionalLine('CIN', values.cin)}</div></header><div class="document-letter-date">${optionalLine('Date', values.letterDate)}</div><h1>${heading}</h1><div class="document-letter-body">${body}</div>${signatureBlock(values)}<footer>Prepared using DIZS business tools. Review and complete any missing terms before issuing.</footer></article>`;
  }

  function resumeDocument(values, design) {
    const sections = [['Career objective', values.objective], ['Education', values.education], ['Skills', values.skills], ['Projects', values.projects], ['Internships & volunteering', values.internships], ['Certifications', values.certifications], ['Achievements', values.achievements], ['Languages', values.languages]];
    const photo = values.photo ? `<img class="document-resume-photo" src="${values.photo}" alt="Profile photo">` : '';
    return `<article class="generated-document generated-resume salary-design-${design}" style="--doc-accent:${designs[design].accent};--doc-soft:${designs[design].soft};--doc-border:${designs[design].border}"><header class="document-resume-header">${photo}<div><h1>${escapeHtml(values.fullName || 'Your Name')}</h1>${optionalLine('Target role', values.targetRole)}<div class="document-contact-line">${[values.email, values.phone, values.location, values.portfolio].filter(Boolean).map(escapeHtml).join(' · ')}</div></div></header>${sections.filter(([, text]) => text).map(([heading, text]) => `<section class="resume-section"><h2>${heading}</h2><p>${escapeHtml(text).replace(/\n/g, '<br>')}</p></section>`).join('')}</article>`;
  }

  function readFile(file) {
    return new Promise(resolve => {
      if (!file) return resolve('');
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

  function downloadWord(element, filename, title) {
    const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>body{font-family:Calibri,Arial,sans-serif;color:#24324a}.generated-document{max-width:760px;margin:auto;padding:36px;border:1px solid #ccd6dd}.document-header,.document-resume-header{display:flex;gap:18px;align-items:center;border-bottom:3px solid #146b59;padding-bottom:18px}.generated-document h1{color:#143a5a}.document-details{display:flex;flex-wrap:wrap;gap:12px 22px;margin:14px 0}.document-detail{min-width:180px;margin:4px 0}.document-detail strong{display:block;font-size:11px;color:#667085;text-transform:uppercase}.document-pay-tables{display:flex;gap:20px}.document-pay-tables section{flex:1}.document-pay-tables table{width:100%;border-collapse:collapse}.document-pay-tables td,.document-pay-tables th{padding:8px;border-bottom:1px solid #ccd6dd;text-align:left}.document-net-pay{display:flex;justify-content:space-between;padding:18px;background:#edf3f7}.document-logo,.document-signature,.document-stamp,.document-resume-photo{max-width:130px;max-height:90px;object-fit:contain}.document-signoff{display:flex;justify-content:space-between;gap:30px;margin-top:46px}.document-signline{width:220px;border-top:1px solid #73818b;margin-top:30px}.resume-section{margin-top:20px}.resume-section h2{border-bottom:1px solid #ccd6dd;padding-bottom:6px}.document-empty-note,footer{color:#667085;font-size:11px;margin-top:22px}</style></head><body>${element.outerHTML}</body></html>`;
    const blob = new Blob(['\ufeff', documentHtml], { type: 'application/msword;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.replace(/\.docx?$/i, '') + '.doc';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function downloadPdf(element, filename, status) {
    if (!window.html2pdf) await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('PDF export library could not be loaded. Check your connection and use Print > Save as PDF instead.'));
      document.head.append(script);
    });
    await window.html2pdf().set({ margin: 10, filename, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }).from(element).save();
    status.textContent = 'PDF downloaded.';
  }

  function renderMaker(root, maker) {
    document.title = maker.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = maker.description;
    root.querySelector('[data-maker-title]').textContent = maker.title;
    root.querySelector('[data-maker-description]').textContent = maker.description;
    const form = root.querySelector('[data-maker-fields]');
    form.innerHTML = maker.groups.map(group => `<fieldset class="maker-fieldset"><legend>${escapeHtml(group.title)}</legend><div class="maker-field-grid">${group.fields.map(fieldMarkup).join('')}</div></fieldset>`).join('');
    const isSalary = root.dataset.documentMaker === 'salary-slip';
    const designPicker = root.querySelector('[data-maker-design]');
    if (isSalary) {
      designPicker.innerHTML = Object.entries(designs).map(([key, value]) => `<option value="${key}">${value.label}</option>`).join('');
    } else {
      designPicker.closest('.maker-design-control').hidden = true;
    }

    const preview = root.querySelector('[data-maker-preview]');
    const status = root.querySelector('[data-maker-status]');
    const values = {};
    async function build() {
      form.querySelectorAll('[data-doc-field]').forEach(field => { values[field.dataset.docField] = field.value.trim(); });
      for (const field of form.querySelectorAll('[data-doc-file]')) values[field.dataset.docFile] = await readFile(field.files[0]);
      const design = designPicker.value || 'classic';
      const type = root.dataset.documentMaker;
      preview.innerHTML = type === 'salary-slip' ? salaryDocument(values, design) : type === 'fresher-resume' ? resumeDocument(values, design) : letterDocument(values, design, type);
      preview.hidden = false;
      status.textContent = 'Preview updated. Fields left blank are omitted.';
    }
    root.querySelector('[data-maker-generate]').addEventListener('click', build);
    designPicker.addEventListener('change', () => { if (!preview.hidden) build(); });
    root.querySelector('[data-maker-clear]').addEventListener('click', () => {
      form.querySelectorAll('input,textarea,select').forEach(field => { field.value = ''; });
      preview.replaceChildren(); preview.hidden = true; status.textContent = 'Form cleared.';
    });
    root.querySelector('[data-maker-word]').addEventListener('click', async () => {
      if (preview.hidden) await build();
      const slug = root.dataset.documentMaker;
      downloadWord(preview.firstElementChild, `${slug}-document.doc`, maker.title);
      status.textContent = 'Word-compatible DOC downloaded.';
    });
    root.querySelector('[data-maker-pdf]').addEventListener('click', async () => {
      try {
        if (preview.hidden) await build();
        await downloadPdf(preview.firstElementChild, `${root.dataset.documentMaker}-document.pdf`, status);
      } catch (error) {
        status.textContent = error.message;
      }
    });
  }

  function initializeMaker(root) {
    if (!root || root.dataset.documentMakerInitialized === 'true') return;
    const maker = makers[root.dataset.documentMaker];
    if (!maker) return;
    root.dataset.documentMakerInitialized = 'true';
    renderMaker(root, maker);
  }

  window.DocumentMakers = Object.freeze({
    initialize(makerId) {
      document.querySelectorAll('[data-document-maker]').forEach(root => {
        if (!makerId || root.dataset.documentMaker === makerId) initializeMaker(root);
      });
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    window.DocumentMakers.initialize();
  });
}());
