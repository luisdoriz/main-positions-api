const Persons = require('../actions/persons');

exports.putBeaconPerson = async (req, res) => {
    //links a beacon to a person
    const { idPerson, idBeacon, isActive } = req.body;
    try {
        const person = await Persons.updateBeaconPerson({
            idPerson, idBeacon, isActive, UpdatedBy: req.user.idUser
        })
        res.status(200).json({ status: 'success', data: person });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

//********************************EMPLOYEE****************************************
exports.getEmployee = async (req, res) => {
    const { idEmployee } = req.body;
    try {
        //TODO
        //const employee = await Persons.readEmployee({ idEmployee })
        res.status(200).json({ status: 'success', data: employee });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }

};

exports.getEmployees = async (req, res) => {
    //gets all employees grouped by facility (used in cases frontend)
    try {
        const employees = await Persons.readEmployees()
        res.status(200).json({ status: 'success', data: employees });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
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
    // const { idEmployee, name, firstLastName, secondLastName, email, idFacility, idBeacon, internalId, isActive } = req.body;
    // try {
    //     const updatedEmployee = await Persons.updateEmployee({
    //         idEmployee, name, firstLastName, secondLastName, email, idFacility, idBeacon, internalId, isActive, UpdatedBy: req.user.idUser
    //     })
    //     res.status(201).json({ status: 'success', data: updatedEmployee });
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).json({ status: 'error', error });
    // }
};

exports.deleteEmployee = async (req, res) => {
    return
};

//********************************VISITORS****************************************
exports.getVisitor = async (req, res) => {
    return
};

exports.postVisitor = async (req, res) => {
    const { name, firstLastName, secondLastName, email, idFacility, idBeacon, expirationDate } = req.body;
    try {
        const visitor = await Persons.createEmployee({
            name, firstLastName, secondLastName, email, idFacility, idBeacon, expirationDate, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: visitor });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putVisitor = async (req, res) => {
    return
};

exports.deleteVisitor = async (req, res) => {
    return
};
