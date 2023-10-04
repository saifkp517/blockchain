const sha256 = require("crypto-js/sha256")

class Block
{
    //data stores the value transactions that takes place
    constructor(timestamp, data)
    {
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash()
    {
        return sha256(this.index + this.previousHash + this.data + this.timestamp + this.nonce).toString();
    }

    mineBlock(difficulty)
    {

    }
}

class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesis()];
    }

    createGenesis()
    {
        return new Block(0, "10/04/2023", "Genesis Block", "0")
    }

    latestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock)
    {
       newBlock.previousHash = this.latestBlock().hash;
       newBlock.hash = newBlock.calculateHash();
       this.chain.push(newBlock);
    }

    checkValid()
    {
        for(let i = 1; i < this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash)
            {
                return false;
            }
        }
        return true;
    }
}

let firstChain = new Blockchain();
firstChain.addBlock(new Block("12/25/2017", {amount: 5}));
firstChain.addBlock(new Block("12/26/2017", {amount: 10}));

if(firstChain.checkValid())
{
    console.log(JSON.stringify(firstChain, null, 4));
}
else
{
    console.log("data tampered")
}