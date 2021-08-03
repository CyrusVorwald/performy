const lighthouse = require('lighthouse');
const chromium = require('chrome-aws-lambda');

export async function getLighthouseReport({urlToAudit}) {
  try{
    let urlToAuditFull
    try{
      urlToAuditFull = new URL(urlToAudit).toString()
    } catch {
      urlToAuditFull = new URL('https://' + urlToAudit).toString()
    }
    const chrome = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const options = {logLevel: 'info', output: 'html', port: (new URL(chrome.wsEndpoint())).port, chromePath: await chromium.executablePath};
    const runnerResult = await lighthouse(urlToAuditFull, options);
    await chrome.close();

    // `.report` is the HTML report as a string
    // const reportHtml = runnerResult.report;
    // fs.writeFileSync('lhreport.html', reportHtml);

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
  } catch (e) {
    return e
  }




}

export default async function Audit (req, res) {
  try{
    const runnerResult = await getLighthouseReport(req.query)
    res.status(200).json(runnerResult)
  } catch (e) {
    res.status(500).json(e);
  }

};
