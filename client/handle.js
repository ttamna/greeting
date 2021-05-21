var Web3 = require('web3');
var web3 = new Web3("ws://127.0.0.1:8545")

var Greeting = require("../build/contracts/Greeting.json")
var greeting = new web3.eth.Contract(Greeting.abi, Greeting.networks[8966].address);

let accounts;

const DataTypeV2 = "tuple(tuple(address,uint96)[],tuple(address,uint96)[])"

function encDataV2(data) {
    return web3.eth.abi.encodeParameter(
        DataTypeV2, 
        data
    );
}

async function encDataV1(tuple){

    var gf = await greeting.methods.encode(tuple).estimateGas({from:accounts[0]});
    greeting.methods.encode(tuple).send({from:accounts[0], gas:gf})
    .on('transactionHash', function(hash){
        var payload2 = encDataV2(tuple)
        
        encoded = "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000401c25f04897935e691600bfb39f6570dc4e95b10000000000000000000000000000000000000000000000000000000000002710000000000000000000000000401c25f04897935e691600bfb39f6570dc4e95b100000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000002000000000000000000000000133f8223754c7a51b88182081b41efe80ea0143b000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000026b4e770560dde850fdf19f18ad619bf870484e70000000000000000000000000000000000000000000000000000000000000190"
        console.log(encoded)
        console.log(payload2)
        console.log(encoded === payload2)
    })

}

async function main(){
    accounts = await web3.eth.getAccounts()

    let originFees = [ [accounts[3], 300], [accounts[4], 400] ];
    let payouts    = [ [accounts[2], 10000], [accounts[2], 10000] ];

    let plainData = [ payouts, originFees ];

    console.log(plainData)

    await encDataV1(plainData);

}

main()


// [
//     [
//         [ "0x401C25F04897935E691600Bfb39F6570DC4E95B1", 10000 ],
//         [ "0x401C25F04897935E691600Bfb39F6570DC4E95B1", 10000 ]
//     ],
//     [
//         [ "0x133f8223754C7A51B88182081b41EfE80Ea0143b", 300 ],
//         [ "0x26b4E770560Dde850fDf19F18aD619bf870484e7", 400 ]
//     ]
// ]

// orderData 0x401C25F04897935E691600Bfb39F6570DC4E95B1,10000,0x401C25F04897935E691600Bfb39F6570DC4E95B1,10000,0x133f8223754C7A51B88182081b41EfE80Ea0143b,300,0x26b4E770560Dde850fDf19F18aD619bf870484e7,400