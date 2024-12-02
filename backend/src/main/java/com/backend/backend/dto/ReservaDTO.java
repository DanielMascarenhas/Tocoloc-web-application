package com.backend.backend.dto;

public class ReservaDTO {
    private Long id;
    private Long localId;
    private String localNome; // Nome do local associado
    private String dataInicio;
    private String dataFim;

    // Construtor
    public ReservaDTO(Long id, Long localId, String localNome, String dataInicio, String dataFim) {
        this.id = id;
        this.localId = localId;
        this.localNome = localNome;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLocalId() {
        return localId;
    }

    public void setLocalId(Long localId) {
        this.localId = localId;
    }

    public String getLocalNome() {
        return localNome;
    }

    public void setLocalNome(String localNome) {
        this.localNome = localNome;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(String dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getDataFim() {
        return dataFim;
    }

    public void setDataFim(String dataFim) {
        this.dataFim = dataFim;
    }
}
