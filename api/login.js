const express = require('express')
const router = express.Router()

module.exports = router

router.post('/', async (req, res) => {
  // 1. check require
  if (!req.body.login || !req.body.pass) {
    return res.send({
      ok: false,
      message: 'กรุณาป้อนชื่อผู้ใช้งานและรหัสผ่าน',
    })
  }
  
  try{
    /*
    // ใช้ทดสอบการการเชื่อมต่อกับตารางว่าทำได้ไหม
    let rows = await req.db('user')
    res.send({
      ok: true,
      student: Object.values(rows[0]),
    })
    */
     
   let rows = await req.db('user')
   .where('login', '=', req.body.login || '')
   .where('pass', '=', req.body.pass || '')
    if (rows.length === 0) {
      return res.send({
        ok: false,
        message: 'ชื่อผู้ใช้งานหรือรหัสผ่าน ไม่ถูกต้อง',
      })
    }
    /*
    else{
      return res.send({
        ok: true,
        message: 'ชื่อผู้ใช้งานหรือรหัสผ่าน ถูกต้อง',
      })
    }
    */
    
   let user = rows[0]
   
   // TODO: save ข้อมูลลง session
   // req.session.data = user
   // ประกาศว่าผู้ใช้ชื่อนี้เข้าสู่ระบบแล้ว
   //req.socket.publish('login' `${user.name} is log in`)
   res.send({
     ok: true,
     user,
   })

  }
  catch(e){
    res.send({ ok: false, error: e.message})
  } 

})