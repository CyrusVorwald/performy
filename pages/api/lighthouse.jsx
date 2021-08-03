const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const chromium = require('chrome-aws-lambda');

export async function getLighthouseReport({urlToAudit}) {
  let urlToAuditFull
  try{
    urlToAuditFull = new URL(urlToAudit).toString()
  } catch {
    urlToAuditFull = new URL('https://' + urlToAudit).toString()
  }

  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', port: chrome.port, chromePath: await chromium.executablePath};
  const runnerResult = await lighthouse(urlToAuditFull, options);

  // `.report` is the HTML report as a string
  // const reportHtml = runnerResult.report;
  // fs.writeFileSync('lhreport.html', reportHtml);

  await chrome.kill();
  let res = {
    'urlToAudit': urlToAudit,
    'performance_score': runnerResult.lhr.categories.performance.score,
    'accessibility_score': runnerResult.lhr.categories.accessibility.score,
    'best_practices_score': runnerResult.lhr.categories['best-practices'].score,
    'seo_score': runnerResult.lhr.categories.seo.score,
    'pwa_score': runnerResult.lhr.categories.pwa.score,
    'audits': runnerResult.lhr.audits}
  delete res['audits']['screenshot-thumbnails']
  delete res['audits']['full-page-screenshot']
  delete res['audits']['final-screenshot']

  return res
}

export default async function Audit (req, res) {
  try{
    const runnerResult = await getLighthouseReport(req.query)
    res.status(200).json(runnerResult)
  } catch (e) {
    res.status(500).json(e);
  }

};
