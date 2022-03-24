/* WhatsApp spammer
 * Codigo desenvolvido por VOTRON157
 */
require('colors');
const { Client } = require('whatsapp-web.js');
const readline = require("readline");
const qrcode = require('qrcode-terminal');
const client = new Client({puppeteer: {args: ["--no-sandbox"]}});

let alvo = {
    numero: Number, //Numero de telefone do alvo.
    mensagem: String, //Mensagem de para ser enviada.
    vezes: Number //Numero de vezes que a mensagem sera enviada.
}, dados = "";

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



console.log("PROGAMA FEITO POR: VOTRON157".yellow);
console.log("=============================================================================")
inquirer.question("Qual o número do usuario que será spammado? (ex: 55 83 12345678)\n", msg => {
    alvo.numero = msg.split(" ").join("")
    let messageIndex = msg.indexOf(alvo.numero) + alvo.numero.length;
    let message = msg.slice(messageIndex, msg.length);
    alvo.numero = alvo.numero.includes('@c.us') ? alvo.numero : `${alvo.numero}@c.us`;
  inquirer.question("Quantas vezes a mensagem será enviada?\n", number => {
    alvo.vezes = new Number(number)
    inquirer.question("Qual mensagem deverá ser enviada?\n", mensagem => {
        alvo.mensagem = mensagem
        for (var [key, value] of Object.entries(alvo)) {
            dados += `${key}: ${value}\n`
        }
        inquirer.question(`Você confirma os dados? (y, n)\n${dados}`, confirm => {
        switch (confirm) {
            case "y":
                console.log("Agora escaneie os 2 qr code com a camera do seu whatsapp. (aguarde eles aparecerem no console)")
                inquirer.close(); //Acabando as perguntas.
                break;
        
            case "n":
                console.log("Certo, finalizando o programa.")
                process.exit(0) //Finalizando o programa caso o usuario não queira continuar
                break;
        }
    })
    })
  });
});

inquirer.on("close", function() {
    client.initialize();
    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true}); //Escaneie esse qrcode com a camera do seu whatsapp.
    });
});

client.on('ready', () => {
    console.log('QR code escaneado, login efetuado e spammando o pv do alvo, verifique suas conversas com o alvo para visualizar.'.green
    );
    console.log("Para desligar o programa, feche este terminal (cmd, windows powershell, vsc, etc...)".red)
    for(i = 0; i < alvo.vezes; i++){
        client.sendMessage(alvo.numero, alvo.mensagem); //Enviando as mensagens.
}
});