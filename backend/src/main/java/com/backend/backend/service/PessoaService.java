package com.backend.backend.service;

import com.backend.backend.entity.Pessoa;
import com.backend.backend.entity.Reserva;
import com.backend.backend.repository.PessoaRepository;
import com.backend.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    /**
     * Listar todas as pessoas.
     */
    public List<Pessoa> listarPessoas() {
        return pessoaRepository.findAll();
    }

    /**
     * Buscar uma pessoa por ID.
     */
    public Pessoa buscarPessoaPorId(Long id) {
        return pessoaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pessoa com ID " + id + " não encontrada."));
    }

    /**
     * Criar ou atualizar uma pessoa.
     */
    public Pessoa salvarPessoa(Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    /**
     * Excluir uma pessoa e suas reservas associadas.
     */
    public void excluirPessoa(Long pessoaId) {
        // Buscar a pessoa pelo ID
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada."));

        // Buscar e remover reservas associadas à pessoa
        List<Reserva> reservas = reservaRepository.findByPessoaId(pessoaId);
        for (Reserva reserva : reservas) {
            reservaRepository.delete(reserva);
        }

        // Excluir a pessoa
        pessoaRepository.delete(pessoa);
    }
}
