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

    @PostMapping("/cadastrar") // Alterado o endpoint para "/cadastrar"
    public Local criarLocal(@RequestBody Local local) {
        // Verificar se nome e descrição não são nulos ou vazios
        if (local.getNome() == null || local.getNome().isEmpty()) {
            throw new IllegalArgumentException("O nome do local não pode ser vazio.");
        }
        if (local.getDescricao() == null || local.getDescricao().isEmpty()) {
            throw new IllegalArgumentException("A descrição do local não pode ser vazia.");
        }

        return localService.salvarLocal(local);
    }

    @DeleteMapping("/{id}")
    public void excluirLocal(@PathVariable Long id) {
        localService.excluirLocal(id);
    }
}
