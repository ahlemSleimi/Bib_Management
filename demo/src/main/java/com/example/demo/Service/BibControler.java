package com.example.demo.Service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DAO.BibRepos;
import com.example.demo.Model.BibModel;

import jakarta.transaction.Transactional;


// this annotation is to allos acces from specfic endpoint
@CrossOrigin(origins = {"http://127.0.0.1:8080","http://localhost:4200"})

@RestController
@Transactional
public class BibControler{
    // intenciate the interface to get adventages of the ORM provided by spring boot 
    @Autowired
     BibRepos br;

    // get list of all the books from the data base
    @GetMapping("/AllBooks")
     public ArrayList<BibModel> listbib(){
            return (ArrayList<BibModel>) br.findAll();

     }

    // Add new book to the table
    @PostMapping("/addBook")
    public BibModel addbooks(@RequestBody BibModel book){
        // test Locally 
        // book.setAuthor("bahe");
        // book.setTitle("les miserables");
        return br.save(book);

    }

    //Modify existing book basic on the given ID
    @PutMapping("/updateBook/{id}")
    public BibModel updatebook(@PathVariable (value = "id") int id, @RequestBody BibModel Newbook)throws ResourceNotFoundException {
        BibModel book= br.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("book not found" + id));
        book.setAuthor(Newbook.getAuthor());
        book.setTitle(Newbook.getTitle());
        return br.save(book);
        // final BibModel updatedBook = br.save(book);
        // return ResponseEntity.ok(updatedBook);
    }

    // delete specifique book based on the ID which is sent from the backend
    @DeleteMapping("/deleteBook/{id}")
    public Map<String, Boolean> deleteBook(@PathVariable(value = "id") int id)throws ResourceNotFoundException {
            BibModel book= br.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("books with this id does not exist :: " + id));
        br.delete(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }



}