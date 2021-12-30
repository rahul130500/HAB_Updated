const Notice = require("../models/notice");
const Announcement = require("../models/announcement");
const AdminUpload = require("../models/adminUploads");
const Form = require("../models/form");
const Functionary = require("../models/functionary");
const Hostel = require("../models/hostel");
const Category = require("../models/category");
const Link = require("../models/link");
const Ordinance = require("../models/ordinance");
const About = require("../models/about");
const fs = require("fs");

//Hostel Data Models
const HostelNotice = require("../models/hostelModels/notice");
const HostelWebsite = require("../models/hostelModels/personalweb.models");
const HMC = require("../models/hostelModels/hmc.models");
const HostelForm = require("../models/hostelModels/mess");
const HostelEvent = require("../models/hostelModels/event");

exports.getHome = async (req, res) => {
    try{
        const uploads = await AdminUpload.find({});
        const announcements = await Announcement.find({}).sort("-creation");
        const about = await About.find({}).sort("priority_number");
        let uploadImages = [];
        console.log(announcements);
        uploads.forEach((upload) => {
            uploadImages.push(`uploads/adminUploads/${upload.image}`);
        });
       
        return res.render("home/index", {
            announcements,
            uploads,
            uploadImages,
            about,
          });
    }
    catch(error){
        console.log(error);
    }
};

exports.getNotices = async (req, res) => {
    try{
        const category = await Category.find({});
        const notices = await Notice.find({}).sort("-creation");
        let data = {
            "category" : category,
            "notices" : notices
        };
        return res.status(200).send(data);
    }
    catch(error){
        console.log(error);
        return res.status(404);
    }
};

exports.getForms = async (req, res) => {
    try{
        const category = await Category.find({});
        const forms = await Form.find({}).sort("-creation");
        let data = {
            "category" : category,
            "forms" : forms
        };
        return res.status(200).send(data);
    }
    catch(error){
        console.log(error);
        return res.status(404);
    }
};

exports.getHostels = async (req, res) => {
    try{
        const hostels = await Hostel.find({}).sort("-creation");
        return res.status(200).send(hostels);
    }
    catch(error){
        console.log(error);
        return res.status(404);
    }
};

exports.getFunctionaries = async (req, res) => {
    try{
        const functionaries = await Functionary.find({}).sort("-creation");
        return res.status(200).send(functionaries);
    }
    catch(error){
        console.log(error);
        return res.status(404);
    }
};

exports.getOrdinances = async (req, res) => {
    try{
        const ordinances = await Ordinance.find({}).sort("-creation");
        const category = await Category.find({});
        let data = {
            "category" : category,
            "ordinances" : ordinances
        }
        return res.status(200).send(data);
    }
    catch(error){
        console.log(error);
        return res.status(404);
    }
};

exports.getLinks = async (req, res) => {
    try{
        const links = await Link.find({}).sort("priority_number");
        return res.status(200).send(links);
    }
    catch(error){
        console.log(error);
        return res.status(404);
    }
};


exports.getOneHostel = async (req, res) => {
    try {
      const hostel = await Hostel.findById(req.params.hostel_id);
      const hostels = await Hostel.find({});
      const name = hostel.name;
      const notices = await HostelNotice.find({ hostel: name }).sort("-creation");
      const website = await HostelWebsite.findOne({ hostel: name });
      const hmclist = await HMC.find({ hostel: name }).sort("priono");
      const forms = await HostelForm.find({ hostel: name }).sort("-creation");
      const events = await HostelEvent.find({ hostel: name }).sort("-date");
      hmclist.sort((a, b) => (a.priono > b.priono ? 1 : -1));
      const members = hostel.management;
      members.sort((a, b) => (a.priority > b.priority ? 1 : -1));
      return res.render("home/hostels/hostel", {
        members,
        hostel,
        hostels,
        notices,
        website,
        hmclist,
        forms,
        events,
      });
    } catch (error) {
      console.log(error.message);
      return res.redirect("/hab");
    }
  };
  
  exports.getOneNotice = async (req, res) => {
    try {
      const id = req.params.id;
      const notice = await HostelNotice.findById(id);
      const filePath = "uploads/hostel_files/" + notice.path;
      console.log(filePath);
      fs.readFile(filePath, (err, data) => {
        res.contentType("application/pdf");
        return res.send(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  exports.getOneForm = async (req, res) => {
    try {
      const id = req.params.id;
      const form = await HostelForm.findById(id);
      const filePath = "uploads/hostel_files/" + form.path;
  
      fs.readFile(filePath, (err, data) => {
        res.contentType("application/pdf");
        return res.send(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  




