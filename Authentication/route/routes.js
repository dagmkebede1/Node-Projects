const router = require('express').Router()
const {logtask, secret, Regitask, logview, regiview} = require('../controler/controler')

router.route('/').get(regiview).post(Regitask)
router.route('/auth').get(logview).post(logtask)
router.route('/home').get(secret)



module.exports = router


