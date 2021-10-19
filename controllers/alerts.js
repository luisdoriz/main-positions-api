const Alerts = require('../actions/alerts');

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alerts.readAlerts()
        res.status(200).json({ status: 'success', data: alerts });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.postAlert = async (req, res) => {
    return
};

exports.putAlert = async (req, res) => {
    return
};

exports.deleteAlert = async (req, res) => {
    try {
        const { idAlert } = req.params;
        const alerts = await Alerts.deleteAlert({ idAlert })
        res.status(200).json({ status: 'success', data: alerts });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};


