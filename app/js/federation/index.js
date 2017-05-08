const request = require('../helpers/request');
import { StellarDataManager } from 'stellar-toolkit';


let federationUrl = "https://stellar-wilson.herokuapp.com/federation";

function setUrl(url) {
  federationUrl = url;
}

function federationResolve(stellar_address) {
  return request({
    url: federationUrl,
    qs: {
      type: 'name',
      q: stellar_address,
    },
  });
}

function federationReverse(account_id) {
  return request({
    url: federationUrl,
    qs: {
      type: 'id',
      q: account_id,
    },
  });
}

function federationKeypair({ q, password }) {
  return request({
    url: federationUrl,
    qs: {
      type: 'keypair',
      q,
      password,
    },
  });
}

function federationCreate({ stellar_address, password }, keypair ) {
  
  console.log(JSON.stringify({ stellar_address, password }))

  var body = {
    stellar_address: stellar_address,
    account_id: keypair.publicKey(),
    password
  };
  var signature = StellarDataManager.sign(body, keypair.secret());
  return request({
    url: federationUrl,
    method: 'POST',
    body: body,
    headers: {
      signature: signature
    }
  });
}

function federationRegister({stellar_address, passport_nr, address, first_name, last_name}, keypair) {

  console.log(JSON.stringify({stellar_address, passport_nr, address, first_name, last_name}))

  const body = {
    stellar_address,
    account_id: keypair.publicKey(),
    passport_nr,
    address,
    first_name,
    last_name
  };
  const signature = StellarDataManager.sign(body, keypair.secret());

  return request({
    url: federationUrl,
    method: 'PUT',
    headers: {
      signature,
    },
    body,
  });
}

function federationDelete({ stellar_address, keypair }) {
  const body = {
    stellar_address,
    account_id: keypair.publicKey(),
  };
  const signature = StellarDataManager.sign(body, keypair.secret());

  return request({
    url: federationUrl,
    method: 'PUT',
    headers: {
      signature,
    },
    body,
  });
}

module.exports = {
  setUrl,
  federationResolve,
  federationReverse,
  federationKeypair,
  federationCreate,
  federationRegister,
  federationDelete,
};