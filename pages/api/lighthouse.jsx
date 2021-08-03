const lighthouse = require('lighthouse');
const chromium = require('puppeteer');

export async function getLighthouseReport({urlToAudit}) {
  try{
    let urlToAuditFull
    try{
      urlToAuditFull = new URL(urlToAudit).toString()
    } catch {
      urlToAuditFull = new URL('https://' + urlToAudit).toString()
    }

    const chrome = await chromium.launch({
      args: [
        '--allow-running-insecure-content',
        '--autoplay-policy=user-gesture-required',
        '--disable-component-update',
        '--disable-domain-reliability',
        '--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process',
        '--disable-print-preview',
        '--disable-setuid-sandbox',
        '--disable-site-isolation-trials',
        '--disable-speech-api',
        '--disable-web-security',
        '--disk-cache-size=33554432',
        '--enable-features=SharedArrayBuffer',
        '--hide-scrollbars',
        '--ignore-gpu-blocklist',
        '--in-process-gpu',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--use-gl=swiftshader',
        '--window-size=1920,1080',
        '--start-maximized'
      ],
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const options = {logLevel: 'info', output: 'html', port: (new URL(chrome.wsEndpoint())).port, chromePath: await chromium.executablePath};
    const runnerResult = await lighthouse(urlToAuditFull, options);
    await chrome.close();

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
