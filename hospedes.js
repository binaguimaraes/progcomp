const prompt = require('prompt-sync')()

let quartosDisponiveis = (vetQuartos) => {
    let vetDisponiveis = vetQuartos.filter(
        obj => obj.disponivel == true
    )
    console.log("\nQuartos disponíveis:")
    console.log(vetDisponiveis)
}

let cadastraHospede = (vetHospedes, vetQuartos) => {
    let numeroQuarto = Number(prompt(`Informe o quarto (101 a 120): `))
    if (numeroQuarto < 101 || numeroQuarto > 120){
        console.log(`\nQuarto inválido: `)
        return
    }
    else {
        let quartoEncontrado = vetQuartos.find(
            obj => obj.quarto == numeroQuarto 
        )
        if (quartoEncontrado.disponivel){
            let cpf = prompt(`Informe o CPF do hóspede: `)
                if (vetHospedes.some(obj => obj.cpf === cpf)) {
                    console.log(`\nCPF já cadastrado!`)
                    return
                }    
            vetHospedes.push({
                cpf,
                idade: Number(prompt(`Informe a idade: `)),
                quarto: numeroQuarto,
                data: prompt(`Informe a data de entrada (dd-mm-yyyy): `)
            })
            quartoEncontrado.disponivel = false // deixa de estar disponível
            console.log(`\nHóspede cadastrado com sucesso!`)
        }
        else {
            console.log(`\nQuarto indisponível.`)
        }
    }
}

let retiraHospede = (vetHospedes, vetQuartos) => {
    let cpfInteresse = prompt(`Informe o CPF do hóspede: `)
    let hospedeEncontrado = vetHospedes.find(
        obj => obj.cpf == cpfInteresse
    )
    if (!hospedeEncontrado) {
        console.log(`\nHóspede não encontrado!`)
        return
    }    
    let quartoHospede = hospedeEncontrado.quarto
    let posicaoQuarto = vetQuartos.findIndex(
        obj => obj.quarto == quartoHospede
    )
    // atualiza a disponibilidade
    vetQuartos[posicaoQuarto].disponivel = true // fica disponível novamente
    vetHospedes.splice(vetHospedes.indexOf(hospedeEncontrado), 1);
    console.log(`\nHóspede removido e quarto liberado com sucesso!`)
}

let consultaHospedes = (vetHospedes) => {
    if (vetHospedes.length === 0) {
        console.log(`\nNenhum hóspede cadastrado!`)
        return
    }
    console.log(`\nHóspedes atualmente hospedados:`)
    vetHospedes.forEach(h => {
        console.log(`CPF: ${h.cpf}, Idade: ${h.idade}, Quarto: ${h.quarto}, Data de entrada: ${h.data}`)
    })
}

let hospedeMaisTempo = (vetHospedes) => {
    if (vetHospedes.length === 0) {
        console.log(`\nNenhum hóspede cadastrado!`)
        return
    }

    let maisAntigo = vetHospedes[0]

    for (let i = 1; i < vetHospedes.length; i++) {
        let dataMaisAntigo = new Date(maisAntigo.data.split("-").reverse().join("-"))
        let dataAtual = new Date(vetHospedes[i].data.split("-").reverse().join("-"))

        if (dataAtual < dataMaisAntigo) {
            maisAntigo = vetHospedes[i]
        }
    }   
    console.log(`O hospede com maior estadia: ${maisAntigo.cpf}\nSe hospedou em: ${maisAntigo.data}`)
}

let principal = () => {
    // quartos existentes no hotel
    let quartos = [
        {quarto: 101, disponivel: true}, {quarto: 102, disponivel: true},
        {quarto: 103, disponivel: true}, {quarto: 104, disponivel: true},
        {quarto: 105, disponivel: true}, {quarto: 106, disponivel: true},
        {quarto: 107, disponivel: true}, {quarto: 108, disponivel: true},
        {quarto: 109, disponivel: true}, {quarto: 110, disponivel: true},
        {quarto: 111, disponivel: true}, {quarto: 112, disponivel: true},
        {quarto: 113, disponivel: true}, {quarto: 114, disponivel: true},
        {quarto: 115, disponivel: true}, {quarto: 116, disponivel: true},
        {quarto: 117, disponivel: true}, {quarto: 118, disponivel: true},
        {quarto: 119, disponivel: true}, {quarto: 120, disponivel: true},
    ]
    // hospedes existentes no hotel
    let hospedes = []

    let opcao
        do{
            console.log(`\nO que deseja fazer?: \n1- Cadastrar um novo hóspede. \n2- Registrar a saída de um hóspede. \n3- Listar quartos disponíveis. \n4- Listar todos os hóspedes atualmente hospedados. \n5- Mostrar o hóspede com estadia mais longa. \n6- Sair`)
    
            opcao = Number(prompt(`Informe o número da opção escolhida: `))
            
            switch(opcao){
                case 1: 
                    cadastraHospede(hospedes, quartos) 
                    break;
                case 2: 
                    retiraHospede(hospedes, quartos)
                    break;
                case 3: 
                    quartosDisponiveis(quartos)
                    break;
                case 4: 
                    consultaHospedes(hospedes)
                    break;
                case 5: 
                    hospedeMaisTempo(hospedes)
                    break;
                case 6: 
                    console.log(`\nPrograma encerrado!`)
                    break;
                default: 
                    console.log(`\nInformação inválida! Digite novamete`)
            }
        } while(opcao != 6)
}

principal()