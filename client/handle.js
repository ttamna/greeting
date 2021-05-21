var Web3 = require('web3');
var web3 = new Web3("ws://127.0.0.1:8545")

var Greeting = require("../build/contracts/Greeting.json")
var greeting = new web3.eth.Contract(Greeting.abi, Greeting.networks[8966].address);

let accounts;

const DataTypeV2 = "tuple(tuple(address,uint96)[],tuple(address,uint96)[])"

const DataTypeV3 = {
	Part: [
		{name: 'account', type: 'address'},
		{name: 'value', type: 'uint96'}
	],
	DataV1: [
		{name: 'payouts', type: 'Part[]'},
		{name: 'originFees', type: 'Part[]'}
	]
};

function encDataV2(data) {
    return web3.eth.abi.encodeParameter(
        DataTypeV2, 
        data
    );
}

async function encDataV1(tuple){
    var gf = await greeting.methods.encode(tuple).estimateGas({from:accounts[0]});
    greeting.methods.encode(tuple).send({from:accounts[0], gas:gf})
    .once('receipt', function(receipt){
        // console.log('pldt', payload.params[0].data)
        console.log(receipt)

        var payload2 = encDataV2(tuple)
        console.log(payload2)


        return payload
    }) //  결과는 txhash로 봐야한다고?

    // .on('transactionHash', function(hash){
    //     // console.log('txhash', hash)
    // })

}

async function main(){
    accounts = await web3.eth.getAccounts()

    let originFees = [ [accounts[3], 300], [accounts[4], 400] ];
    let payouts    = [ [accounts[2], 10000], [accounts[2], 10000] ];

    let plainData = [ payouts, originFees ];

    await encDataV1(plainData);

}

main()
