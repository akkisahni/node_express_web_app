const express = require('express');
const bookRoutes = express.Router();
const debug = require('debug')('EXPRESS_POC:BookRoute');
const MongoService = require('../services/mongoService');
let books = [];
function bookRouter(nav){
  bookRoutes.use((req,res, next)=>{
    if(req.user){
      next();
    }else{
      res.redirect('/');
    }
  })
    bookRoutes.route('/')
    .get(async (req, res) => {
        debug("Inside main book list view");;
        books = await MongoService().getCollection('books');
        res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
        );
    });
  

    bookRoutes.route('/:id')
    .get((req, res) => {
        debug("Book with id  ", req.params.id);
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book: books[req.params.id]
          }
        );
      });
  
    return bookRoutes;
}

module.exports = bookRouter;