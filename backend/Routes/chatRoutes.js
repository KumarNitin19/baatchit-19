const express = require('express');
const { accessChat, fetchChats,createGroupChat,renameGroupChat,addToGroup,removeFromGroup } = require('../Controller/chatControllers');
const { protect } = require('../Midlleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renameGroupChat);
router.route('/groupremove').put(protect,removeFromGroup);
router.route('/groupadd').put(protect,addToGroup);



module.exports = router;