package com.backend.backend.service;

import com.backend.backend.entity.Local;
import com.backend.backend.entity.Pessoa;
import com.backend.backend.entity.Reserva;
import com.backend.backend.repository.LocalRepository;
import com.backend.backend.repository.PessoaRepository;
import com.backend.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


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

        // Busca o local
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado com ID: " + localId));

        // Busca a pessoa
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com ID: " + pessoaId));

        // Verifica conflitos de reservas para o mesmo local
        boolean conflito = reservaRepository.existsByLocalIdAndDataHoraInicioLessThanEqualAndDataHoraFimGreaterThanEqual(
                localId, endDateTime, startDateTime
        );

        if (conflito) {
            throw new RuntimeException("Conflito de reserva: já existe uma reserva para este local neste intervalo de tempo.");
        }

        // Cria a reserva
        Reserva reserva = new Reserva();
        reserva.setLocalId(local.getId()); // Define o ID do local
        reserva.setPessoaId(pessoaId); // Define o ID da pessoa diretamente
        reserva.setDataHoraInicio(startDateTime);
        reserva.setDataHoraFim(endDateTime);

        // Salva a reserva no banco de dados
        return reservaRepository.save(reserva);

    }

    // Listar reservas por local
    public List<Reserva> listarReservasPorLocal(Long localId) {
        return reservaRepository.findByLocalId(localId);
    }

    // Listar reservas por pessoa
    public List<Reserva> listarReservasPorPessoa(Long pessoaId) {
        return reservaRepository.findByPessoaId(pessoaId);
    }
}

