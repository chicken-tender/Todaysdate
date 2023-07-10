package com.kh.backend_finalproject.repository;

import com.kh.backend_finalproject.entitiy.FestivalTb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FestivalRepository extends JpaRepository<FestivalTb, String> {
}
