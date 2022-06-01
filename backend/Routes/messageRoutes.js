const express = require('express');
const { sendMessage, allMessages } = require('../Controller/messageController');
const { protect } = require('../Midlleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect,sendMessage);
router.route('/:chatId').get(protect,allMessages);


module.exports = router;

