package com.backend.backend.controller;

import com.backend.backend.entity.Local;
import com.backend.backend.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locais")
public class LocalController {
    @Autowired
    private LocalService localService;

    @GetMapping
    public List<Local> listarLocais() {
        return localService.listarTodos();
    }

    @PostMapping
    public Local criarLocal(@RequestBody Local local) {
        return localService.salvarLocal(local);
    }
}
