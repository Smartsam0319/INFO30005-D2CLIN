var Patient = require("../models/patient");
var Clinician = require("../models/clinician");
var Record = require("../models/record");
const record = require("../models/record");
const moment = require("moment");
exports.patientsGet = async function (req, res) {
    if (!req.query.id) {
        res.redirect('/')
    } else {
        let clinician = await Clinician.findById(req.query.id)
        let patients = await Patient.find().lean().exec();
        let recordsId = Array.from(patients, x => x.record[x.record.length - 1]) //receive the newest data of all patients
        let records = await Record.find().where('_id').in(recordsId).lean().exec();
        for (i = 0; i < patients.length; i++) {
            records[i].patient = patients[i].username
            // May fail with empty entry patient 
            records[i].bloodGlucoseLevelTooHigh = records[i].bloodGlucoseLevel > 2
            records[i].dosesInsulinTakenTooHigh = records[i].dosesInsulinTaken > 4
            records[i].createAt = moment(records[i].createdAt).format('YYYY-MM-DD')
        }
        console.info(JSON.stringify(records))
        //
        res.render('clinician', { username: clinician.username, patients: patients, records: records })
    }
}