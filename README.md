1. Command to generate the crypto-materials:
./fabricNetwork.sh generate

2. Command to start the network
./fabricNetwork.sh up

3. Command to kill the network
./fabricNetwork.sh down

4. Command to install and instantiate the chaincode on the network
./fabricNetwork.sh install


* Generate Crypto Materials
 cryptogen generate --config crypto-config.yaml 
* Orderer Genesis Block Creation
 configtxgen -profile OrdererGenesis -channelID pharma-sys-channel -outputBlock ./channel-artifacts/genesis.block
* Channel Creation Transaction Generation
configtxgen -profile PharmaChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID pharmachannel
 

 * Commands

 * Register Company

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:registerCompany","MAN001","Sun Pharma","Chennai","manufacturer"]}'

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:registerCompany","TRA001","FedEx","Delhi","transporter"]}'

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:registerCompany","TRA002","Blue Dart","Bangalore","transporter"]}'

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:registerCompany","DIST001","VG Pharma","Vizag","distributor"]}'

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:registerCompany","RET002","upgrad","Mumbai","retailer"]}'

*****View


docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:viewCompany","MAN001","Sun Pharma"]}'



* Add drug

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:addDrug","Paracetamol","001","01-01-2019","01-01-202","MAN001"]}'

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:addDrug","Paracetamol","002","01-01-2019","01-01-202","MAN001"]}'

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:addDrug","Paracetamol","003","01-01-2019","01-01-202","MAN001"]}'


* Create PO

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.distributor:createPO", ]}'

* Create Shipment

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:createShipment","DIST001","Paracetamol","001","TRA001"]}'

* Update Shipment

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.transporter:updateShipment","DIST001","Paracetamol","TRA001"]}'

* View Drug Current State

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:viewDrugCurrentState","Paracetamol","001"]}'

* Retailer Raising PO
docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.retailer:createPO","RET002","DIST001","Paracetamol","1"]}'

* Distributor creating shipment sending retailer the consignment

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.distributor:createShipment","RET002","Paracetamol","001","TRA001"]}'

* Update Shipment

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.transporter:updateShipment","RET002","Paracetamol","TRA001"]}'

* RetailDrug

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.retailer:retailDrug","Paracetamol","001","RET002","ABC"]}'

* View history 

docker exec -it peer0.manufacturer.pharma-network.com peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.contract.manufacturer:viewHistory","Paracetamol","001"]}'