package com.example.demo.Model;



import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class BibModel implements Serializable{

@Id
@GeneratedValue(strategy=GenerationType.AUTO)
private int Id;
private String Author;
private String Title;


public String getAuthor() {
    return Author;
}
public void setAuthor(String author) {
    Author = author;
}
public int getId() {
    return Id;
}
public void setTitle(String title) {
    Title = title;
}
public String getTitle() {
    return Title;
}


}