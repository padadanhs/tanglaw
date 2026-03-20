const submissionEmail = "samueljohn.parreno@deped.gov.ph";

function buildMailto() {
  const title = document.getElementById('ms-title')?.value.trim() || '[Insert Manuscript Title]';
  const articleType = document.getElementById('ms-type')?.value || 'Original Research';
  const author = document.getElementById('ms-author')?.value.trim() || '[Corresponding Author]';
  const email = document.getElementById('ms-email')?.value.trim() || '[Author Email]';
  const note = document.getElementById('ms-note')?.value.trim() || '[Optional cover note]';

  const subject = `Tanglaw submission: ${articleType} — ${title}`;
  const body = [
    'Dear Editorial Office,',
    '',
    'Please consider our manuscript for possible publication in Tanglaw.',
    '',
    `Article type: ${articleType}`,
    `Title: ${title}`,
    `Corresponding author: ${author}`,
    `Email: ${email}`,
    '',
    'Brief note to the editors:',
    note,
    '',
    'Attachments to include:',
    '- Manuscript file',
    '- Signed forms or declarations, if applicable',
    '- Supplementary files, if any'
  ].join('\n');

  return { subject, body };
}

document.getElementById('compose-mail')?.addEventListener('click', () => {
  const { subject, body } = buildMailto();
  window.location.href = `mailto:${encodeURIComponent(submissionEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('copy-mail')?.addEventListener('click', async () => {
  const { subject, body } = buildMailto();
  const text = `To: ${submissionEmail}\nSubject: ${subject}\n\n${body}`;

  try {
    await navigator.clipboard.writeText(text);
    const btn = document.getElementById('copy-mail');
    const old = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => {
      btn.textContent = old;
    }, 1200);
  } catch (e) {
    alert('Copy failed. Please copy the email details manually.');
  }
});
