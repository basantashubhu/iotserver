var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const readline = require('readline')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vehicle Pollution Detection System' });
});

router.put('/put/:machine', function (req, res) {
  const file = path.join(process.cwd(), 'data', req.params.machine, 'data.txt')
  if(!fs.existsSync(file)) {
    fs.mkdirSync(path.join(process.cwd(), 'data', req.params.machine))
    fs.writeFileSync(file, '')
  }
  const data = req.body.data
  fs.writeFileSync(file, data)
  res.json({message : 'success'})
})

router.get('/get/:machine', async function (req, res) {
  const file = path.join(process.cwd(), 'data', req.params.machine, 'data.txt')
  if(fs.existsSync(file)) {
    const readerInterface = readline.createInterface({
      input : fs.createReadStream(file),
      output : process.stdout,
      console : false
    })

    let data = ''
    for await(line of readerInterface) {
      data = line
    }

    res.send(data)
  }

  res.json
})

module.exports = router;
