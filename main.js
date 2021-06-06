const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}
	createGenesisBlock(){
		return new Block(0, "06/06/2021", "Genesis block", "0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}
		return true;
	}
}

let newCoin = new Blockchain();
newCoin.addBlock(new Block(1, "06/06/2021", {ammount: 4}));
newCoin.addBlock(new Block(2, "06/06/2021", {ammount: 10}));

console.log('is blockchain valid? ' + newCoin.isChainValid());

newCoin.chain[1].data = {ammount: 100 } //tampered with chain*
newCoin.chain[1].hash = newCoin.chain[1].calculateHash(); //tampered with hash*

console.log('is blockchain valid? ' + newCoin.isChainValid());

// console.log(JSON.stringify(newCoin, null, 4)); //correct hash calculations commented out for test

