package com.backend.backend.service;

import com.backend.backend.entity.Local;
import com.backend.backend.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalService {
    @Autowired
    private LocalRepository localRepository;

    public List<Local> listarTodos() {
        return localRepository.findAll();
    }

    public Local salvarLocal(Local local) {
        return localRepository.save(local);
    }
}
