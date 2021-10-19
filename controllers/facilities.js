const Facilities = require('../actions/facilities');

exports.getFacilities = async (req, res) => {
    try {
        const facilities = await Facilities.readFacilities()
        res.status(200).json({ status: 'success', data: facilities });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.postFacilities = async (req, res) => {
    return
};

exports.putFacilities = async (req, res) => {
    return
};

exports.deleteFacilities = async (req, res) => {
    return
};


