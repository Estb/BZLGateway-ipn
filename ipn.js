exports.update = (req, res, next) => {

/**
 *
 * @param {String} hmac
 * @param {String} ipnSecret
 * @param {Object} payload
 * @returns {Boolean}
 * @throws {CoinpaymentsIPNError}
 */


let isValid, error;

try {
  isValid = verify(hmac, ipnSecret, payload);
} catch (e) {
  error = e;
}
if (error) {
  if (error instanceof CoinpaymentsIPNError) {
    // handle invalid payload
  }
  // make bug report
}

if (isValid) {
  
  const txn_id = req.body.txn_id
  
  if(txn_id) {
  Models.findOne({txn_id, where: {txn_id:txn_id}})
  .then(transaction => {
    if(transaction) {
   // const userId =req.userId
          Models.update(
            {
              finalizado : finalizado
            },
            {where: {txn_id:txn_id}}
          )
          .then( () => { 
            res.status(200).send({sucess: true, message: 'updated' , statusCode: 200})
          })
          .catch (error => next (error))
    } else {
      res.status(404).send({sucess: false, message: 'Transaction not found' , statusCode: 404})

    }
  })
  .catch (error => next (error))
  } else {
    res.status(422).send({sucess: false, message:'Txid is required', statusCode: 422})
  }


} else {
  // invalid
}
}