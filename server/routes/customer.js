const express = require ('express');
const router = express.Router();
const customercontroller = require('./controllers/customercontroller');
/**

 * Customer Routes
 */

router.get('/',customercontroller.homepage);
router.get('/about',customercontroller.about);
router.get('/add',customercontroller.addcustomer);
router.post('/add',customercontroller.postCustomer);
router.get('/View/:id',customercontroller.View);
router.get('/edit/:id',customercontroller.edit);
router.put('/edit/:id',customercontroller.editPost);
router.delete('/edit/:id',customercontroller.deletecustomer);
router.post('/search',customercontroller.searchcustomers );
module.exports = router;
