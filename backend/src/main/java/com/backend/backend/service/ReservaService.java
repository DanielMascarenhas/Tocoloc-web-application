package com.backend.backend.service;

import com.backend.backend.entity.Local;
import com.backend.backend.entity.Pessoa;
import com.backend.backend.entity.Reserva;
import com.backend.backend.repository.ReservaRepository;
import com.backend.backend.repository.LocalRepository;
import com.backend.backend.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    // Criar nova reserva com validação de conflitos
    public Reserva criarReserva(Long localId, String startDate, String endDate, String startTime, String endTime, Long pessoaId) {
        // Converte as strings de data e hora em LocalDateTime
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime startDateTime = LocalDateTime.parse(startDate + " " + startTime, formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(endDate + " " + endTime, formatter);

        if (endDateTime.isBefore(startDateTime)) {
            throw new RuntimeException("A data/hora de término deve ser posterior à data/hora de início.");
        }

        // Verifica se o local existe
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));

        // Verifica se a pessoa existe
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada."));

        // Verifica conflitos de reservas para o mesmo local
        boolean conflito = reservaRepository.existsByLocalAndDataInicioLessThanEqualAndDataFimGreaterThanEqual(
                local, endDateTime, startDateTime
        );

        if (conflito) {
            throw new RuntimeException("Conflito de reserva: já existe uma reserva para este local neste intervalo de tempo.");
        }

        // Cria a reserva
        Reserva reserva = new Reserva();
        reserva.setLocal(local); // Define o local
        reserva.setPessoa(pessoa); // Define a pessoa
        reserva.setDataInicio(startDateTime);
        reserva.setDataFim(endDateTime);

        // Salva a reserva no banco de dados
        return reservaRepository.save(reserva);
    }

    // Listar reservas por local
    public List<Reserva> listarReservasPorLocal(Long localId) {
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));
        return reservaRepository.findByLocal(local);
    }

    // Listar reservas por pessoa
    public List<Reserva> listarReservasPorPessoa(Long pessoaId) {
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada."));
        return reservaRepository.findByPessoa(pessoa);
    }
}
