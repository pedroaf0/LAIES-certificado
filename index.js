const csvFilePath='./dados.csv';
const csv=require('csvtojson')
const nodemailer = require('nodemailer') // Importa o módulo principal
require('dotenv').config();
const smtpTransport = require('nodemailer-smtp-transport');
const CryptoJS = require("crypto-js");
const Subtexto = `Por haver participado da palestra "Comunicação Científica", promovida pela Liga\n Acadêmica de Inovação, Empreendedorismo e Tecnologias em Saúde,\n vinculada ao Projeto de Extensão Web Saúde da Faculdade de Odontologia da\n Universidade Federal de Pelotas, em 12 de abril de 2023, às 18h00, com duração\n de 2 (duas) horas`
const DATA = `Pelotas, 12 de abril de 2023.`
const evento = "Comunicação Científica"

  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: 'pedroaf1233@gmail.com',
      pass: "xneporjwcyapomte"
    }
  }));


csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
   // console.log(jsonObj);
    for (let i = 0; i < jsonObj.length; i++) {
      sendemail(jsonObj[i], process.env.EVENTO)
    } 
})

function sendemail(jsonObj){
console.log(jsonObj)



const mailOptions = { // Define informações pertinentes ao E-mail que será enviado
  from: 'pedroaf1233@gmail.com',
  to: jsonObj["E-mail"],
  subject: `[LAIES] Seu certificado chegou!!!`,
  html: `
  
  <style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  h1 {
    color: #333333;
    font-size: 24px;
    margin: 0 0 20px;
  }
  p {
    color: #555555;
    font-size: 16px;
    margin: 0 0 15px;
  }
  .button {
      display: inline-block;
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  .footer {
    margin-top: 30px;
    text-align: center;
    color: #999999;
    font-size: 14px;
  }
</style>
</head>
<body>
<div class="container">
  <h1>Certificado de Participação</h1>
  <p>Olá ${jsonObj["Nome"]}</p>
  
  <p>Parabenizamos você pela sua participação no evento ${evento}! Como reconhecimento, fornecemos o certificado de participação para você.</p>
  
  <!-- Add the image of the certificate here -->
  <img src="https://ruufpelbot.000webhostapp.com/Certificado.php?Nome=${encodeURIComponent(jsonObj["Nome"])}&Subtexto=${encodeURIComponent(Subtexto)}&Data=${encodeURIComponent(DATA)}" alt="Certificado de Participação" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
  
  <p>Obrigado por participar do evento e esperamos vê-lo(a) novamente em nossas próximas atividades!</p>
  
  <p>Atenciosamente,</p>
  <p>Equipe do LAIES</p>
  
  <div class="footer">
    <p>Este é um email automático. Gerado pelo serviço de certificados do LAIES </p>
  </div>
</div>
</body>
`
}

transporter.sendMail(mailOptions, (err, info) => { // Função que, efetivamente, envia o email.
  if (err) {
    return console.log(err)
  }
  
  console.log(info)
})
console.log()
}






