package com.backend.backend.controller;

import com.backend.backend.entity.Pessoa;
import com.backend.backend.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {

    @Autowired
    private PessoaRepository pessoaRepository;

    public PessoaController() {
    }

    /**
     * Método para buscar pessoa por email e senha.
     *
     * @param email Email da pessoa.
     * @param senha Senha da pessoa.
     * @return Pessoa encontrada ou erro 404 se não encontrada.
     */
    @PostMapping("/buscar")
    public ResponseEntity<Map<String, Object>> buscarPessoaPorEmailSenha(
            @RequestBody Map<String, String> payload
    ) {
        String email = payload.get("email");
        String senha = payload.get("password");

        Pessoa pessoa = pessoaRepository.findByEmailAndSenha(email, senha);

        if (pessoa != null) {
            // Simulação de geração de token para exemplo
            String token = UUID.randomUUID().toString();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", pessoa);
            response.put("token", token); // Gere e retorne um token JWT real no futuro
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Credenciais inválidas"
            ));
        }
    }

}
