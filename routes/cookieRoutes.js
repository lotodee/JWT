const express=require("express")
const router = express.Router()


const cookiesController =  require("../controllers/cookiesController")



router.get('/set-cookie' , cookiesController.set_cookie)
router.get('/read-cookie' , cookiesController.read_cookie)


module.exports=router