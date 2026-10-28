
let saldo = 1000;

let historico = [
    "Abertura da conta: R$ 1.000,00"
];

const campoSaldo = document.getElementById("saldo");
const campoOperacao = document.getElementById("operacao");
const campoValor = document.getElementById("valor");
const botaoExecutar = document.getElementById("executar");
const campoResultado = document.getElementById("resultado");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarSaldo() {
    campoSaldo.textContent = formatarMoeda(saldo);
}

botaoExecutar.addEventListener("click", function () {
    const operacao = campoOperacao.value;
    const valorDigitado = campoValor.value;
    const valor = Number(valorDigitado);

    campoResultado.replaceChildren();

    switch (operacao) {

        case "consultar":
            campoResultado.textContent =
                "Saldo disponível: " + formatarMoeda(saldo);
            break;

        case "depositar":

            if (
                valorDigitado.trim() === "" ||
                !Number.isInteger(valor) ||
                valor <= 0
            ) {
                campoResultado.textContent =
                    "Erro: informe um valor inteiro maior que zero.";
            } else {
                saldo += valor;

                historico.push(
                    "Depósito: +" + formatarMoeda(valor)
                );

                atualizarSaldo();

                campoResultado.textContent =
                    "Depósito de " + formatarMoeda(valor) +
                    " realizado com sucesso! Novo saldo: " +
                    formatarMoeda(saldo);
            }

            break;

        case "sacar":

            if (
                valorDigitado.trim() === "" ||
                !Number.isInteger(valor) ||
                valor <= 0
            ) {
                campoResultado.textContent =
                    "Erro: informe um valor inteiro maior que zero.";

            } else if (valor % 10 !== 0) {

                campoResultado.textContent =
                    "Erro: o valor do saque deve ser múltiplo de 10.";

            } else if (valor > saldo) {

                campoResultado.textContent =
                    "Erro: saldo insuficiente.";

            } else {

                saldo -= valor;

                historico.push(
                    "Saque: -" + formatarMoeda(valor)
                );

                let restante = valor;

                let notas100 = 0;
                let notas50 = 0;
                let notas20 = 0;
                let notas10 = 0;

                while (restante >= 100) {
                    notas100++;
                    restante -= 100;
                }

                while (restante >= 50) {
                    notas50++;
                    restante -= 50;
                }

                while (restante >= 20) {
                    notas20++;
                    restante -= 20;
                }

                while (restante >= 10) {
                    notas10++;
                    restante -= 10;
                }

                atualizarSaldo();

                const titulo = document.createElement("p");
                titulo.textContent =
                    "Saque de " + formatarMoeda(valor) +
                    " realizado com sucesso!";

                campoResultado.appendChild(titulo);

                const tituloNotas = document.createElement("p");
                tituloNotas.textContent = "Notas entregues:";
                campoResultado.appendChild(tituloNotas);

                const listaNotas = document.createElement("ul");

                const notas = [
                    { valor: 100, quantidade: notas100 },
                    { valor: 50, quantidade: notas50 },
                    { valor: 20, quantidade: notas20 },
                    { valor: 10, quantidade: notas10 }
                ];

                for (let i = 0; i < notas.length; i++) {
                    if (notas[i].quantidade > 0) {
                        const item = document.createElement("li");

                        item.textContent =
                            notas[i].quantidade +
                            " nota(s) de R$ " + notas[i].valor;

                        listaNotas.appendChild(item);
                    }
                }

                campoResultado.appendChild(listaNotas);

                const total = document.createElement("p");
                total.textContent =
                    "Total de notas entregues: " + totalNotas;
                campoResultado.appendChild(total);

                const saldoFinal = document.createElement("p");
                saldoFinal.textContent =
                    "Saldo restante: " + formatarMoeda(saldo);
                campoResultado.appendChild(saldoFinal);
            }

            break;

        case "extrato":

            const tituloExtrato = document.createElement("h3");
            tituloExtrato.textContent = "EXTRATO";
            campoResultado.appendChild(tituloExtrato);

            const listaExtrato = document.createElement("ol");

            for (let i = 0; i < historico.length; i++) {
                const item = document.createElement("li");
                item.textContent = historico[i];
                listaExtrato.appendChild(item);
            }

            campoResultado.appendChild(listaExtrato);

            const saldoExtrato = document.createElement("p");
            saldoExtrato.textContent =
                "Saldo atual: " + formatarMoeda(saldo);
            campoResultado.appendChild(saldoExtrato);

            break;

        default:
            campoResultado.textContent =
                "Erro: operação inválida.";
    }
});

atualizarSaldo();
