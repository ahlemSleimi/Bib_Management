package com.example.demo.DAO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.BibModel;




public interface BibRepos extends JpaRepository <BibModel,Integer>{

}