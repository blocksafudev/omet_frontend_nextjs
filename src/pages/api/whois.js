import whois from "whois-json";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Remove http:// or https:// from the URL if present
    const domain = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

    const whoisData = await whois(domain);

    if (!whoisData.creationDate) {
      return res.status(404).json({ error: "Creation date not found" });
    }

    res.status(200).json({ creationDate: whoisData.creationDate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
