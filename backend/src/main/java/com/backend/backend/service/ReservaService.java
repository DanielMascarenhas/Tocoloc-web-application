package com.backend.backend.service;

import com.backend.backend.dto.*;
import com.backend.backend.entity.Local;
import com.backend.backend.entity.Pessoa;
import com.backend.backend.entity.Reserva;
import com.backend.backend.repository.LocalRepository;
import com.backend.backend.repository.PessoaRepository;
import com.backend.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public Reserva criarReserva(Long localId, String startDate, String endDate, String startTime, String endTime, Long pessoaId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime startDateTime = LocalDateTime.parse(startDate + " " + startTime, formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(endDate + " " + endTime, formatter);

        if (endDateTime.isBefore(startDateTime)) {
            throw new RuntimeException("A data/hora de término deve ser posterior à data/hora de início.");
        }

        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));

        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada."));

        boolean conflito = reservaRepository.existsByLocalAndDataInicioLessThanEqualAndDataFimGreaterThanEqual(
                local, endDateTime, startDateTime
        );

        if (conflito) {
            throw new RuntimeException("Conflito de reserva: já existe uma reserva para este local neste intervalo de tempo.");
        }

        Reserva reserva = new Reserva();
        reserva.setLocal(local);
        reserva.setPessoa(pessoa);
        reserva.setDataInicio(startDateTime);
        reserva.setDataFim(endDateTime);

        return reservaRepository.save(reserva);
    }



    public List<Reserva> listarReservasPorLocal(Long localId) {
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));
        return reservaRepository.findByLocal(local);
    }


    public List<ReservaDTO> listarReservasPorPessoa(Long pessoaId) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return reservaRepository.findByPessoaId(pessoaId).stream().map(reserva -> {
            // Obtenha o nome do local associado
            String localNome = reserva.getLocal().getNome(); // Ajuste baseado na entidade Local

            return new ReservaDTO(
                    reserva.getId(),
                    reserva.getLocal().getId(), // ID do local
                    localNome,
                    reserva.getDataInicio().format(dateFormatter), // Data início formatada
                    reserva.getDataFim().format(dateFormatter) // Data fim formatada
            );
        }).collect(Collectors.toList());
    }


    // Método auxiliar para buscar o nome do local
    private String getLocalNome(Long localId) {
        // Substitua pela lógica correta para buscar o nome do local
        // Por exemplo, pode ser um repositório de locais ou chamada de outro serviço
        return "Nome do Local"; // Exemplo fixo
    }

    public void cancelarReserva(Long reservaId) {
        if (!reservaRepository.existsById(reservaId)) {
            throw new RuntimeException("Reserva com ID " + reservaId + " não encontrada.");
        }
        reservaRepository.deleteById(reservaId);
    }

}
