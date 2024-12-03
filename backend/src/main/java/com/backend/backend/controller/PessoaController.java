package com.backend.backend.controller;

import com.backend.backend.entity.Pessoa;
import com.backend.backend.repository.PessoaRepository;
import com.backend.backend.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PessoaService pessoaService;


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

    /**
     * Método para registrar uma nova pessoa.
     *
     * @param pessoa Dados da nova pessoa.
     * @return Confirmação de sucesso ou mensagem de erro.
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registrarPessoa(@RequestBody Pessoa pessoa) {
        if (pessoa.getNome() == null || pessoa.getEmail() == null || pessoa.getSenha() == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Todos os campos são obrigatórios."
            ));
        }

        // Verifica se o e-mail já está registrado
        if (pessoaRepository.findByEmail(pessoa.getEmail()) != null) {
            return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "E-mail já está em uso."
            ));
        }

        // Salva o usuário no banco
        pessoa.setAdmin(false); // Por padrão, não é admin
        pessoaRepository.save(pessoa);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Usuário registrado com sucesso!"
        ));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Pessoa>> listarPessoas() {
        List<Pessoa> pessoas = pessoaRepository.findAll();
        return ResponseEntity.ok(pessoas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPessoa(@PathVariable Long id) {
        pessoaService.excluirPessoa(id);
        return ResponseEntity.noContent().build();
    }



}
