export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const { application_key, api_key, mac } = req.query;
  const url = `https://api.ecowitt.net/api/v3/device/real_time?application_key=${application_key}&api_key=${api_key}&mac=${mac}&call_back=all&temp_unitid=1&pressure_unitid=3&wind_speed_unitid=6&rainfall_unitid=12&solar_irradiance_unitid=17`;
  const r = await fetch(url);
  const data = await r.json();
  res.status(200).json(data);
}
