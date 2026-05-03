export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { application_key, api_key, mac } = req.query;
  if (!application_key || !api_key || !mac) {
    return res.status(400).json({ error: 'application_key, api_key, mac 필요' });
  }

  const url = `https://api.ecowitt.net/api/v3/device/real_time`
    + `?application_key=${encodeURIComponent(application_key)}`
    + `&api_key=${encodeURIComponent(api_key)}`
    + `&mac=${encodeURIComponent(mac)}`
    + `&call_back=all&temp_unitid=1&pressure_unitid=3&wind_speed_unitid=6&rainfall_unitid=12&solar_irradiance_unitid=16`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
