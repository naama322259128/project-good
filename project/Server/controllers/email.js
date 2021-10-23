var nodemailer = require('nodemailer');
const Auction = require('../models/auction')
// const p = require('../../client/src/img/logo_orange&black&blue.png');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chinese.auctions1@gmail.com',
        pass: 'bgnvnrjch'
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {

    from: 'chinese.auctions1@gmail.com',
    accessKeyId: 'AWSACCESSKEY',
    secretAccessKey: 'AWS/Secret/key',

    // to: 'michalkatan18@gmail.com',
    bcc: '',//עותק מוסתר
    subject: '',
    text: ''
};

const sendEmailToWinners = async (req, res) => {

    let { _id } = req.params;
    let auction = await Auction.findById(_id).
        populate([
            { path: "productList.winnerId", select: `userName email` },
            { path: "auctionManager", select: `email` }
        ]);
    let arr = auction.productList;

    mailOptions.subject = `Congratulations! You won the Chinese auction ${auction.organizationName + " : " + auction.name}`;
    arr.map(p => {
        mailOptions.text = `Hi ${p.winnerId.userName}.
          We are happy to inform you that you have won ${productName}
          Please contact us soon to receive the product.
          By email ${auctionManager.email}
          Thank you for your contribution.`
        mailOptions.bcc = p.winnerId.email;
        try {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }

            })
        }
        catch (err) { console.log(err.message) }
        //ברכות! זכית במכירה הפומבית הסינית "_______"

        // שלום _____
        // אנחנו שמחים לבשר לך שזכית ב_____
        // אנא צור עמנו קשר בהקדם כדי לקבל את המוצר.
        // במייל ______
        // תודה על תרומתך.
    })

}
// 👻

const sendWinnersList = async (req, res) => {

    let { _id } = req.params;
    let auction = await Auction.findById(_id).
        populate([
            { path: "productList.winnerId", select: `userName confidentiality email phone address` },
            { path: "auctionManager", select: `email` }
        ]);
    let arr = auction.productList;

    let message = `
    
    <head>
<style>
*{
    direction: ltr;
   
}table, td, th {
    border: 1px solid black;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td{
      text-align:left
  }
  th{
    background-color: #dcdeff;
  }
  img{
      width:10vw
  }
</style>
</head>
<body>
<h3>Hello dear manager, These are the results of the Chinese auction ${auction.name} of ${auction.organizationName}</h3>
<p>Thank you for building your Chinese auction with us.</p>
  <table><thead>
    <th></th>
    <th>Product</th>
    <th>Name</th>
    <th>Confidentiality</th>
    <th>Adress</th>
    <th>Phone</th>
    <th>Email</th>
        </thead>`;

    for (var i = 0; i < arr.length; i++)
        message += `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].winnerId.userName}</td>
        <td>${arr[i].winnerId.confidentiality}</td>
        <td>${arr[i].winnerId.address}</td>
        <td>${arr[i].winnerId.phone}</td>
        <td>${arr[i].winnerId.email}</td>
        </tr>`

    message += `</table> 

    </body>`;
    {/* <img src={${p}}></img> */ }
    try {
        mailOptions.html = message;
        mailOptions.to = auction.auctionManager.email;
        mailOptions.subject = `Winners of your Chinese auction`;
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }

        })
    }
    catch (err) { console.log(err.message) }
}
const sendContactToSiteManager = async (req, res) => {

    let details = req.body;

    mailOptions.subject = details.subject;
    mailOptions.text = details.message + "\nfrom " + details.name;
    mailOptions.to = '‫chinese.auctions1@gmail.com‬';
    mailOptions.from = details.email;
    try {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) { console.log(error); }
            else {
                console.log('Email sent: ' + info.envelope.to);
                return res.send(info)
            }
        })
        return res.send(info)
    }
    catch (err) { console.log(err.message) }
    return false;
}





module.exports = {
    sendEmailToWinners, sendWinnersList, sendContactToSiteManager
}