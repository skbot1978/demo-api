const express = require('express')
const router = express.Router()

module.exports = router
//     http://localhost:7000/api/student?class=1
router.get('/', async (req, res) => {
  let db = req.db
  let rows
  if (req.query.class) {
    rows = await db('student').where('class', '=', req.query.class).orderBy('first_name')
  } else {
    rows = await db('student').orderBy('first_name')
  }
  // let rows = await db('student').orderBy('fname').where(function() {
  //   if (req.query.class) {
  //     this.where('class', '=', req.query.class)
  //   }
  // })
  res.send({
    ok: true,
    student: rows,
  })
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

