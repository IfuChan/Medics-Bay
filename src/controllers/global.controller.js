const dummydoc = require("../models/dummydoc");

const landingView = async (req, res) => {
    const { recvwd } = req.cookies;

    if (recvwd==null) {
        res.locals.recvwd = false;
        return res.render('index');
    }
    res.locals.recvwd = true;


    // var docId = req.cookies.recvwd;

    var recdoclist = recvwd.split(",");

    let doc = await dummydoc.find({ _id: recdoclist });

    revdoc = doc.reverse().slice(0, 4);

    return res.render("index", {
        recdoc: revdoc
    });

}


const aboutUsView = async (req, res) => {
    return res.render('aboutus');
}

const reviewView = async (req, res) => {
    return res.render('review');
}

const specialistView = async (req, res) => {
    var { department } = req.params;

    department = department.charAt(0).toUpperCase() + department.slice(1);

    const specialists = await dummydoc.find({ department: department });

    return res.render("specialist", {
        specialists: specialists,
        dept: department,
        mapApi: process.env.GAPI
    });
}

const searchDoctors = async (req, res) => {
    let payload = req.body.payload.trim();


    let search = await dummydoc.find({
        $or: [
            {
                name: { $regex: new RegExp(payload + '.*', 'i') }
            },
            {
                department: { $regex: new RegExp('^' + payload + '.*', 'i') }
            }
        ]
    }).exec();
    search=search.slice(0,10); //to limit search results
    res.send({ payload: search });
}

module.exports = {
    landingView,
    aboutUsView,
    reviewView,
    specialistView,
    searchDoctors
}