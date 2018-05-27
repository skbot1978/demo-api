const express = require('express')
const router = express.Router()

module.exports = router
//     http://localhost:7000/api/student?class=1
router.get('/list', async (req, res) => {
  try{
    // let rows = await req.db.raw(`
    //   SELECT * 
    //   FROM student 
    //   WHERE room=?`, [req.query.room])   
    //let rows = await req.db('student').select('st_code', 'st_firstname' )
    //let rows = await req.db('student').select('class' )
    let rows = await req.db('student')
    res.send({
      ok: true,
      //student: Object.values(rows[0]),
      student: rows
    })
  }
  catch (e) {
    res.send({ ok: false, error: e.message })
  }
})
// /api/student/id/555
router.get('/id/:id', async (req, res) => {
  let db = req.db
  let rows = await db('student')
    .where('id', '=', req.params.id)
  res.send({
    ok: true,
    student: rows[0] || {},
  })
})
//   /api/student/save
router.post('/save', async (req, res) => {
  let db = req.db
  // UPDATE student SET first_name=?, last_name=? WHERE id=7
  await db('student').where({id: req.body.id}).update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  // let ids = await db('student').insert({
  //   code: '',
  //   first_name: '',
  //   last_name: '',
  // })
  // let id = ids[0]
  res.send({ok: true})
})

//   /api/student/insert   // ใช้แทรกข้อมูลนักเรียนเก่าลงไป
router.post('/insert', async (req, res) => {
  console.log(req.body)
  if (!req.body.stCode || !req.body.stFirstname 
      || !req.body.stLastname || !req.body.stRoom) {
     return res.send({
      ok: false,
      //message: req.body.stCode,
      //console.log(req.body.stCode),
      message: 'กรุณกรอกข้อมูลให้ครบ',
    })
  }
  
  try{
    let id = await req.db('student').insert({
      st_code: req.body.stCode || '',
      st_firstname: req.body.stFirstname || '',
      st_lastname: req.body.stLastname || '',
      st_room: req.body.stRoom || '',
      st_ship: req.body.stShip || '',
      st_map: req.body.stMap || '',
    }).then(ids => ids[0])
    let student = await req.db('student').where('st_code', '=', req.body.stCode )
    res.send({
      ok: true,
      id,
      student,
    })
  }
  catch(e) {
    res.send({ ok: false, eror: e.message})
  }
})

//   /api/student/update   // ใช้แทรกข้อมูลนักเรียนเก่าลงไป
router.post('/update', async (req, res) => {
  console.log(req.body)
  if (!req.body.stCode || !req.body.stFirstname 
      || !req.body.stLastname || !req.body.stRoom) {
     return res.send({
      ok: false,
      //message: req.body.stCode,
      //console.log(req.body.stCode),
      message: 'กรุณกรอกข้อมูลให้ครบ',
    })
  }
  
  try{
    let id = await req.db('student')
    .where('st_code', '=', req.body.stCode )
    .update({
      st_code: req.body.stCode || '',
      st_firstname: req.body.stFirstname || '',
      st_lastname: req.body.stLastname || '',
      st_room: req.body.stRoom || '',
      st_ship: req.body.stShip || '',
      st_map: req.body.stMap || '',
    }).then(ids => ids[0])

    let student = await req.db('student').where('st_code', '=', req.body.stCode )
    res.send({
      ok: true,
      id,
      student,
    })
  }
  catch(e) {
    res.send({ ok: false, eror: e.message})
  }
})


router.delete('/:id', function (req, res) {
  req.db('student').where({id: req.params.id}).delete().then(() =>{
    res.send({status: true})
  }).catch(e => res.send({status: false, error: e.message}))
})
router.post('/save2', (req, res) => {
  let db = req.db  
  db('t1').insert({}).then(ids => {
    let id = ids[0]
    Promise.all([
      db('t2').insert({}).catch(),
      db('t3').insert({}).catch(),
    ]).then(() => {
      res.send({status: true})
    }).catch(err => {
      res.send({status: false})
    })    
  })
  console.log('ok')
})
router.get('/save3', async (req, res) => {
  try {
    let db = req.db  
    let ids = await db('t1').insert({})
    await Promise.all([
      db('t2').insert({}),
      db('t3').insert({})
    ])
    res.send({status: true})
  } catch (e) {
    res.send({status: false})
  }
})
router.get('/about', function (req, res) {
  res.send('About birds')
})

