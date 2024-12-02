package com.backend.backend.controller;

import com.backend.backend.dto.ReservaRequest;
import com.backend.backend.entity.Reserva;
import com.backend.backend.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // Criar uma nova reserva
    @PostMapping("/reservar")
    public Reserva criarReserva(@RequestBody ReservaRequest reservaRequest) {
        // Chamando o service com os dados do DTO
        return reservaService.criarReserva(
                reservaRequest.getLocalId(),
                reservaRequest.getStartDate(),
                reservaRequest.getEndDate(),
                reservaRequest.getStartTime(),
                reservaRequest.getEndTime(),
                reservaRequest.getPessoaId()
        );
    }
}
