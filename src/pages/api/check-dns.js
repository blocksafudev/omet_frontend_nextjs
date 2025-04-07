import { query } from "dns-query";

const checkSPF = (records) => {
  return records.some((record) => record.includes("v=spf1"));
};

const checkDMARC = (records) => {
  return records.some((record) => record.includes("v=DMARC1"));
};

const checkDKIM = (records) => {
  return records.some((record) => record.includes("k=rsa"));
};

const checkIneffectiveSPF = (records) => {
  return records.some((record) => record.includes("~all"));
};

const checkSoftfailWithoutDMARC = (spfRecords, dmarcRecords) => {
  const hasSoftfailSPF = spfRecords.some((record) => record.includes("~all"));
  const hasDMARC = dmarcRecords.length > 0;
  return hasSoftfailSPF && !hasDMARC;
};

const checkNameServerVersion = async () => {
  try {
    const { answers } = await query(
      { question: { type: "TXT", name: "version.bind", class: "CHAOS" } },
      { endpoints: ["8.8.8.8"] }
    );
    return answers.length > 0;
  } catch (error) {
    return false;
  }
};

const checkRecursiveQueries = async (url) => {
  try {
    const { rcode } = await query(
      { question: { type: "A", name: "nonexistent." + url } },
      { endpoints: ["8.8.8.8"] }
    );
    return rcode === "NOERROR";
  } catch (error) {
    return false;
  }
};

const checkCNameInNS = (nsRecords) => {
  return nsRecords.some((record) => record.includes("CNAME"));
};

export default async function handler(req, res) {
  let { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Remove http:// or https:// from the URL if present
  url = url.replace(/^https?:\/\//, "");

  try {
    const txtQuery = await query(
      { question: { type: "TXT", name: url } },
      { endpoints: ["8.8.8.8"] }
    );
    const mxQuery = await query(
      { question: { type: "MX", name: url } },
      { endpoints: ["8.8.8.8"] }
    );
    const nsQuery = await query(
      { question: { type: "NS", name: url } },
      { endpoints: ["8.8.8.8"] }
    );

    const txtAnswers = txtQuery.answers || [];
    const mxAnswers = mxQuery.answers || [];
    const nsAnswers = nsQuery.answers || [];

    // console.log('TXT Answers:', txtAnswers);
    // console.log('MX Answers:', mxAnswers);
    // console.log('NS Answers:', nsAnswers);

    const txtData = txtAnswers.map((answer) => answer.data).flat();
    const mxData = mxAnswers.map((answer) => answer.exchange);
    const nsData = nsAnswers.map((answer) => answer.data).flat();

    const missingSPF = !checkSPF(txtData);
    const missingDMARC = !checkDMARC(txtData);
    const missingDKIM = !checkDKIM(txtData);
    const ineffectiveSPF = checkIneffectiveSPF(txtData);
    const softfailWithoutDMARC = checkSoftfailWithoutDMARC(
      txtData,
      txtData.filter((record) => checkDMARC([record]))
    );

    const nameServerVersion = await checkNameServerVersion();
    const recursiveQueries = await checkRecursiveQueries(url);
    const cNameInNS = checkCNameInNS(nsData);
    const mxPrivateIPs = mxData.some((record) =>
      /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/.test(record)
    );
    const mxInvalidChars = mxData.some((record) =>
      /[^a-zA-Z0-9.-]/.test(record)
    );

    res.status(200).json({
      missingSPF,
      missingDMARC,
      missingDKIM,
      ineffectiveSPF,
      softfailWithoutDMARC,
      nameServerVersion,
      recursiveQueries,
      cNameInNS,
      mxPrivateIPs,
      mxInvalidChars,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
