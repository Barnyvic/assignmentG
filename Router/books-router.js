const fs = require('fs');
const path = require('path');
const bookDataDB = path.join("C:/Users/Admin/OneDrive/Desktop/assignmentG","db","books.json")
const loanBookdb = path.join("C:/Users/Admin/OneDrive/Desktop/assignmentG","db","Loanbook.json")

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

// updating a book
const updateBook = (req, res, updateBook) => {
    isEmpty(updateBook)
    fs.readFile(bookDataDB,"utf8",(err, book) => {
        if(err) return res.writeHead(500).end("an error occured while getting all books from the database")
        const Allbooks = JSON.parse(book)
        const bookIndex =  Allbooks.findIndex((book)=>book.id === updateBook.id)
        if (!bookIndex) return res.end("YOu cant upadte this book")
        // const updatedBook = { ...Allbooks[bookIndex], ...updateBook }
        //     Allbooks[bookIndex] = updatedBook
        const updateExistingBook = Allbooks.map((books)=>{
                if(books.id === updateBook.id)   return updateBook;
                return books;
        })
        fs.writeFile(bookDataDB,JSON.stringify(updateExistingBook),(err)=>{
            if(err) {
            res.writeHead(500)
            res.end("an error occured while writing book to the database")
            }
            res.end(JSON.stringify(updateExistingBook));
        })
    })
}

// Loan a book from the database
const Loanbook = (req, res,Loanbook) => {
    fs.readFile(bookDataDB,"utf8",(err, book) => {
        if(err) return res.writeHead(500).end("an error occured while getting all books from the database")
        const Allbooks = JSON.parse(book)
        const bookLoan =  Allbooks.findIndex((book)=>book.id === Loanbook.id)
        if (!bookLoan) return res.end("Book not available at this time")
        const bookTOloan = Allbooks.splice(bookLoan, 1)
        const LoanBookdatas = [...bookTOloan]
        fs.writeFile(loanBookdb,JSON.stringify(LoanBookdatas),(err)=>{
                if(err) {
                res.writeHead(500)
                res.end("an error occured while writing book to the database")
                }
                res.end(JSON.stringify(LoanBookdatas));

                fs.writeFile(bookDataDB,JSON.stringify(Allbooks),(err)=>{
                if(err) {
                res.writeHead(500)
                res.end("an error occured while writing book to the database")
                }
                res.end(JSON.stringify(Allbooks));
            
            })
        })
        
    })
}

// Return  a LoanBook
const Returnbook = (req,res,returnBook) => {
    isEmpty(returnBook)
    fs.readFile(loanBookdb,"utf8",(err,data) => {
        if(err) return res.writeHead(500).end("an error occured while getting all books from the database")
        const bookToReturn = JSON.parse(data)
        const booking = bookToReturn.splice(0,1)
        console.log(booking);
       fs.readFile(bookDataDB,"utf8",(err, books) => {
        if(err) return res.writeHead(500).end("an error occured while getting all books from the database")
        const Allbooks = JSON.parse(books)
        const Booksreturned = [Allbooks,...booking]
        console.log(Booksreturned);
        fs.writeFile(bookDataDB,JSON.stringify(Booksreturned),(err)=>{
            if(err) {
            res.writeHead(500)
            res.end("an error occured while writing book to the database")
            }
            res.end(JSON.stringify(Booksreturned));
        })
       })
    })
}

//check if the object is empty
const isEmpty = (obj,res) =>{
   if( Object.keys(obj).length === 0) {
    res.end(JSON.stringify({message: 'Object cannot be empty'}))
   } 
} 

module.exports = {createNewBook,getAllBooks,deleteBook,updateBook,Loanbook,Returnbook};