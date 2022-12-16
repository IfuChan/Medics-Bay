const mongoose=require('mongoose');

const dummyDocSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    }
});

module.exports=mongoose.model('dummydoctor', dummyDocSchema);