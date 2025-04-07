// pages/api/checkLink.js
import linkCheck from 'link-check';

export default function handler(req, res) {
    const { url } = req.query;

    linkCheck(url, function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error checking link' });
            return;
        }
        // console.log(result);
        if (result.status === 'alive') {
            res.status(200).json({ status: 'alive', message: 'Link is alive' });
        } else if (result.statusCode === 403) {
            res.status(403).json({ status: 'cloudflare', message: 'Link is alive with cloudflare' });
        } else {
            res.status(404).json({ status: 'dead', message: 'Link is dead or inaccessible' });
        }
    });
}