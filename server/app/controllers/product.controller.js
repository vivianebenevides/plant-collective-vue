const db = require('../models')
const Product = db.products

exports.findAll = (req, res) => {
    Product.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'table not found'
            })
        })
}

exports.create = (req, res) => {
   // console.log(req.body)

//    if(!req.body.name || !req.body.photo){
//     res.status(400).send({
//         message: 'Name & Photo are mandatory'
//     })
//     return
//    }

   Product.create(req.body)
   .then(data => {
    res.send(data)
   })
   .catch(e => {
    res.status(500).send({
        message: 'Could not insert into DB'
    })
   })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Product.findByPk(id)
    .then(data => {
        res.send(data)
    }) 
    .catch(e => {
        res.status(500).send({
            message: 'could not find the data'
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
        where: {id:id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: 'Product updated'
            })
        }else{
            res.send({
                message: 'Could not update'
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: 'Database Error'
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Product.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: 'Product was deleted'
            })
        }else{
            res.send({
                message: 'Could not delete'
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: 'Database Error'
        })
    })
}