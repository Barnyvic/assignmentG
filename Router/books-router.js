const fs = require('fs');
const path = require('path');
const bookDataDB = path.join("C:/Users/Admin/OneDrive/Desktop/assignmentG","db","books.json")

// creating a new book
const createNewBook = (req, res,newBook)=>{
        isEmpty(newBook, res)
        fs.readFile(bookDataDB, 'utf8',(err, book)=>{
            if(err) {res.writeHead(404).end("cound not read dataBase")} 
            const oldBooks = JSON.parse(book)
            oldBooks.push(newBook)
            oldBooks.map((book,i) => book.id = i++)
            fs.writeFile(bookDataDB,JSON.stringify(oldBooks),(err)=>{
                if(err){
                res.writeHead(500)
                res.end("an error occured while writing book to the database")
                }
                res.end(JSON.stringify(oldBooks));
            })
        }) 
}

// getting all books from the database
const getAllBooks = (req,res) => {
    fs.readFile(bookDataDB, 'utf8', (err, books) => {
        if (err) {
            res.writeHead(500)
            res.end("an error occured while getting all books from the database")
        }
        res.end(books)
    })
}

// deleting books from the database

const deleteBook = (req,res,booktoDlete) => {
    fs.readFile(bookDataDB,"utf8", (err, book) => {
    if(err) return res.writeHead(500).end("an error occured while getting all books from the database")
    const Allbooks = JSON.parse(book)
    const bookIndex =  Allbooks.findIndex((book)=>book.id === booktoDlete.id)
    Allbooks.splice(bookIndex, 1)
    fs.writeFile(bookDataDB,JSON.stringify(Allbooks),(err)=>{
        if (err) {
            res.writeHead(500)
            res.end("an error occured while writing book to the database")
        }
        res.end(JSON.stringify({
            message: "Successfully deleted book"
        }))
    })
  })
}


//check if the object is empty
const isEmpty = (obj,res) =>{
   if( Object.keys(obj).length === 0) {
    res.end(JSON.stringify({message: 'Object cannot be empty'}))
   } 
} 

module.exports = {createNewBook,getAllBooks,deleteBook};