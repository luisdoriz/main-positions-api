const Facilities = require('../actions/facilities');
const Areas = require('../actions/areas');

exports.getFacilities = async (req, res) => {
    try {
        const facilities = await Facilities.readFacilities()
        res.status(200).json({ status: 'success', data: facilities });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.getAreasFacility = async (req, res) => {
    //gets areas in facility
    const { idFacility } = req.params;
    try {
        const areas = await Areas.readAreasFacility({ idFacility });
        return res.status(200).send({ status: 'success', data: areas })
    } catch (error) {
        res.status(400).json({ status: 'error', error });
    }
};

exports.postFacilities = async (req, res) => {
    return
};

exports.putFacilities = async (req, res) => {
    const { idFacility } = req.params;
    const { name, timeLimit, maxCapacity, isActive } = req.body;
    try {
        const updatedFacility = await Facilities.updateFacility({
            idFacility, name, timeLimit, maxCapacity, isActive, UpdatedBy: req.user.idUser
        })
        if(!updatedFacility[0]) return res.status(200).json({ status: 'error', error: "Facilty not found" });
        res.status(200).json({ status: 'success', data: updatedFacility[1] });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.deleteFacilities = async (req, res) => {
    return
};


