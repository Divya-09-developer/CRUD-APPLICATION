const Cust = require('../../models/Cust.js');
const cust = require('../../models/Cust.js');
const mongoose = require('mongoose');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

  const locals = {
    title: "NodeJs",
    description: "CRUD-APPLICATION",
  };

  let perPage = 1;
  let page= req.query.page || 1;
  try {
    const customers = await cust.aggregate([ { $sort: { updatedAt: 1}}])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count =await cust.countDocuments({});

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages
    });
  } catch (error) {
   console.log(error); 
  } 
};
/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "CRUD-APPLICATION",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * new customer form
 */
exports.addcustomer = async (req, res) => {
  const locals = {
    title: 'Add new customer - Nodejs',
    description: 'CRUD-APPLICATION',
  };

  res.render('customer/add', locals);
};

/**
 * POST /
 * create new customer
 */
exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const NewCustomer = new cust({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details,
  });

  try {
    await NewCustomer.save();
    await req.flash('info','new customer has been added.')

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * Customer Data
 */
exports.View = async (req, res) => {

    try{
      const customer = await Cust.findOne({ _id: req.params.id });

      const locals = {
        title: "view customer details",
        description: "CRUD-APPLICATION",
      };

      res.render("customer/view",{ 
        locals, 
        customer,
       });
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Cust.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "CRUD-APPLICATION",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    await Cust.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};
/**
 * Delete /
 * Delete Customer Data
 */
exports.deletecustomer = async (req, res) => {
  try {
    await Cust.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
/**
 * Get /
 * Search Customer Data
 */
exports.searchcustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "CRUD-APPLICATION",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Cust.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};