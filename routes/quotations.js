var express = require("express");
const companyModel = require("../models/companies");
var router = express.Router();
var OfferModel = require("../models/offers");
var QuotationModel = require("../models/quotations")

////// ROUTES POUR SENDQUOTE //////
//route qui permet de trouver les informations d'un devis et d'une offre
router.get("/quotation-info/:token/:reqQuoteId/", async function (req, res, next) {

    let token = req.params.token;
    let quoteId = req.params.reqQuoteId
    if (!token) { res.json({ result: false }) } else {
        

        var quotationFromBack = await QuotationModel.findById({ _id: quoteId })
        var answers = quotationFromBack.answers;
        var offerId = quotationFromBack.offerId

        var offer = await OfferModel.findOne({id: offerId})


        res.json({ result: true, quotationFromBack, answers, offer });
    }
});
//route qui s'actionne lorsqu'on envoie un devis
router.put("/send-quotation", async function (req, res, next) {

    var token = req.body.token;

    if (!token) { res.json({ result: false }) } else {
        //on cherche le devis à modifier et on modifie le statut du devis 
        var quotationToSend = await QuotationModel.updateOne({ id: req.body.quoteId },
            { status: "sent",
            dateQuotationAccepted:req.body.date
         })

        
        res.json({ result: true, quotationToSend });
    }
});

//routes pour les demandes de devis
router.get("/quote-request/:token/:reqOfferId/:companyId", async function (req, res, next) {

    let token = req.params.token;
    let offerId = req.params.reqOfferId
    let clientId = req.params.companyId

    if (!token) { res.json({ result: false }) } else {

        var offer = await OfferModel.findById(offerId )
        

        var existingQuotation = await QuotationModel.findOne({
           clientId: clientId,
           offerId: offerId}
        )
        
//vérifie qu'il n'existe pas déjà une demande de devis pour le même client et la même offre
        if (existingQuotation) {
            var erreur = "Vous avez déjà demandé un devis pour cette offre. Voulez-vous redemander un devis ?"
            res.json({ result: false, erreur, offer })
        } else {

           
            res.json({ result: true, offer });
        }
    }
});

//ajout d'une demande de devis
router.post("/add-quotation", async function (req, res, next) {
    let token = req.body.token;
    if (!token) {
        res.json({ result: false })
    } else {
        var newQuotation = new QuotationModel({
            clientId: req.body.clientId,
            providerId: req.body.providerId,
            answers: [{
                answer: req.body.sunshine,
                question: "Ensoleillement"
            }, { answer: req.body.forfait, question: "Forfait" }, { answer: req.body.area, question: "Superficie" }, { answer: req.body.details, question: "Autre chose à ajouter " }],
            status: "requested",
            offerId: req.body.offerId,
            quotationUrl: "",
            dateQuotationRequested: req.body.date

        })

        var quotationSaved = await newQuotation.save();

        res.json({ result: true, quotationSaved })
    };

});

////// ROUTES POUR QUOTATIONS //////

//route qui permet de trouver les devis et demandes de devis
router.get("/find-quotation/:token/:companyId", async function (req, res, next) {
    //quotations correspondent aux devis côté client
    //requests correspondent aux devis côté prestataire

    let companyId = req.params.companyId
    let token = req.params.token
    if (!token) {
        res.json({ result: false })
    } else {


        var quotations = await QuotationModel.find({ clientId: companyId })
        var requests = await QuotationModel.find({ providerId: companyId })
        var quotationsToDisplay = []
        var requestsToDisplay = []

//on construit des objets avec les informations dont on a besoin dans le front et on les rajoute dans un tableau
        for (var i = 0; i < quotations.length; i++) {
            offer = await OfferModel.findById(quotations[i].offerId);
            
            provider = await companyModel.findById(quotations[i].providerId)


            quotationsToDisplay.push({
                id: quotations[i].id,
                logo: provider.logo,
                name: provider.companyName,
                providerId: provider._id,
                offer: offer.offerName,
                status: quotations[i].status

            })
        }


        for (var i = 0; i < requests.length; i++) {
            client = await companyModel.findById(requests[i].clientId)
            offer = await OfferModel.findById(requests[i].offerId)
            requestsToDisplay.push({
                id: requests[i].id,
                logo: client.logo,
                name: client.companyName,
                offer: offer.offerName,
                status: requests[i].status
            })
        }

        res.json({ result: true, quotationsToDisplay, requestsToDisplay })
    }
})

module.exports = router;

//route test update statut

// router.put("/end-quotation", async function(req, res, next){

//     var quotationToEnd = await QuotationModel.updateOne({ id: "61ba08c711286bd01c8f78e0" },
//         { status: "done" })

//     console.log("quotationToEnd", quotationToEnd)

//     res.json({ result: true, quotationToEnd});
// })