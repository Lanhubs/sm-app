const studentsModel = require('../model/students')

const studentRegisterController= async (req, res)=>{
    try {
        const data = req.body
        console.log(data)
        const student = new studentsModel({
          fullName: data.fullName,
          courseName: data.courseName,
          gender: data.gender,
          email: data.email,
          phoneNo: data.phoneNo
        })
        var studentDetails =await student.save()
      } catch (err) {
        if (err) {
          res.status(400).json(err.message)
        }
      }
}

module.exports = studentRegisterController