const Persons = require('../actions/persons');

//********************************EMPLOYEE****************************************
exports.getEmployee = async (req, res) => {
    return
};

exports.postEmployee = async (req, res) => {
    const { name, firstLastName, secondLastName, email, idFacility, idBeacon, internalId } = req.body;
    try {
        const employee = await Persons.createEmployee({
            name, firstLastName, secondLastName, email, idFacility, idBeacon, internalId, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: employee });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putEmployee = async (req, res) => {
    return
};

exports.putBeaconEmployeePerson = async (req, res) => {
    //links a beacon to an employee
    const { idPerson, idBeacon, isActive } = req.body;
    try {
        const employee = await Persons.updateBeaconEmployeePerson({
            idPerson, idBeacon, isActive, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: employee });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.deleteEmployee = async (req, res) => {
    return
};

//********************************VISITORS****************************************
exports.getVisitor = async (req, res) => {
    return
};

exports.postVisitor = async (req, res) => {
    return
};

exports.putVisitor = async (req, res) => {
    return
};

exports.deleteVisitor = async (req, res) => {
    return
};
