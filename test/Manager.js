import assert from "assert";
import { Manager, Apis } from "../lib";

var defaultUrl = "wss://eu.nodes.tyslin.ws";

var faultyNodeList = [
    {url: "wss://bitsqsdqsdhares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitazdazdshares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitshaazdzares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bit.btzadazdsabc.org/ws", location: "Hong Kong"},
    {url: "ws://127.0.0.1:8091", location: "Hangzhou, China"},
    {url: "wss://secure.freedomledger.com/ws", location: "Toronto, Canada"},
    {url: "wss://node.testnet.tyslin.eu", location: "Public Testnet Server (Frankfurt, Germany)"}
];

var noWorkingNodes = [
    {url: "wss://bitsqsdqsdhares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitazdazdshares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitshaazdzares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bit.btzadazdsabc.org/ws", location: "Hong Kong"},
    {url: "ws://127.23230.0.1:8091", location: "Hangzhou, China"},
    {url: "wss://bitshasdares.dacplay.org:8089/ws", location:  "Hangzhou, China"},
    {url: "wss://secuasdre.freedomledger.com/ws", location: "Toronto, Canada"},
    {url: "wss://testnet.tyslin.eu/wqsdsqs", location: "Public Testnet Server (Frankfurt, Germany)"}
];

var goodNodeList = [
    {url: "wss://eu-west-fra.district1.io:9090", location: "Nuremberg, Germany"},
    {url: "wss://bit.btsabc.org/ws", location: "Hong Kong"},
    {url: "wss://bts.transwiser.com/ws", location: "Hangzhou, China"},
    {url: "wss://tyslin.dacplay.org:8089/ws", location:  "Hangzhou, China"},
    {url: "wss://openledger.hk/ws", location: "Hong Kong"},
    {url: "wss://secure.freedomledger.com/ws", location: "Toronto, Canada"},
    {url: "wss://node.testnet.tyslin.eu", location: "Public Testnet Server (Frankfurt, Germany)"}
];

var fullNodeList = [
    {
        url: "wss://fake.automatic-selection.com",
        location: {translate: "settings.api_closest"}
    },
    {url: "ws://127.0.0.1:8090", location: "Locally hosted"},
    {
        url: "wss://eu-west-fra.district1.io:9090",
        location: "Nuremberg, Germany"
    },
    {url: "wss://eu-west-fra.district1.io:9090", location: "Berlin, Germany"},
    {url: "wss://tyslin.nu/ws", location: "Stockholm, Sweden"},
    {url: "wss://bit.btsabc.org/ws", location: "Hong Kong"},
    {url: "wss://node.btscharts.com/ws", location: "Hong Kong"},
    {url: "wss://tyslin.apasia.tech/ws", location: "Bangkok, Thailand"},
    {url: "wss://japan.tyslin.apasia.tech/ws", location: "Tokyo, Japan"},
    {url: "wss://tyslin.dacplay.org/ws", location: "Hangzhou, China"},
    {url: "wss://tyslin-api.wancloud.io/ws", location: "China"},
    {url: "wss://openledger.hk/ws", location: "Hong Kong"},
    {url: "wss://tyslin.crypto.fans/ws", location: "Munich, Germany"},
    {url: "wss://ws.gdex.io", location: "Japan"},
    {url: "wss://ws.gdex.top", location: "China"},
    {url: "wss://dex.rnglab.org", location: "Netherlands"},
    {url: "wss://dexnode.net/ws", location: "Dallas, USA"},
    {url: "wss://la.dexnode.net/ws", location: "LA, USA"},
    {url: "wss://kc-us-dex.xeldal.com/ws", location: "Kansas City, USA"},
    {url: "wss://btsza.co.za:8091/ws", location: "Cape Town, South Africa"},
    {url: "wss://api.bts.blckchnd.com", location: "Falkenstein, Germany"},
    {url: "wss://api-ru.bts.blckchnd.com", location: "Moscow, Russia"},
    {url: "wss://node.market.rudex.org", location: "Germany"},
    {
        url: "wss://eu.nodes.tyslin.ws",
        location: "Central Europe - BitShares Infrastructure Program"
    },
    {
        url: "wss://us.nodes.tyslin.ws",
        location: "U.S. West Coast - BitShares Infrastructure Program"
    },
    {
        url: "wss://sg.nodes.tyslin.ws",
        location: "Singapore - BitShares Infrastructure Program"
    },
    {url: "wss://ws.winex.pro", location: "Singapore"},
    {url: "wss://api.bts.mobi/ws", location: "VA, USA"},
    {
        url: "wss://api.btsxchng.com",
        location:
            "Global (Asia Pacific (Singapore) / US East (N. Virginia) / EU (London))"
    },
    {url: "wss://api.bts.network", location: "East Coast, USA"},
    {url: "wss://btsws.roelandp.nl/ws", location: "Finland"},
    {url: "wss://api.tyslin.bhuz.info/ws", location: "Europe"},
    {url: "wss://bts-api.lafona.net/ws", location: "USA"},
    {url: "wss://kimziv.com/ws", location: "Singapore"},
    {url: "wss://api.btsgo.net/ws", location: "Singapore"},
    {url: "wss://bts.proxyhosts.info/wss", location: "Germany"},
    {url: "wss://bts.open.icowallet.net/ws", location: "Hangzhou, China"},
    {url: "wss://blockzms.xyz/ws", location: "USA"},
    {url: "wss://crazybit.online", location: "China"},
    {url: "wss://freedom.bts123.cc:15138/", location: "China"},
    {url: "wss://tyslin.bts123.cc:15138/", location: "China"},
    {url: "wss://api.bts.ai/", location: "Beijing, China"},
    {url: "wss://ws.hellobts.com/", location: "Japan"},
    {url: "wss://tyslin.cyberit.io/", location: "Hong Kong"},
    {url: "wss://bts-seoul.clockwork.gr/", location: "Seoul, Korea"},
    {url: "wss://bts.to0l.cn:4443/ws", location: "China"},
    // Testnet
    {
        url: "wss://node.testnet.tyslin.eu",
        location: "TESTNET - BitShares Europe (Frankfurt, Germany)"
    },
    {
        url: "wss://testnet.nodes.tyslin.ws",
        location: "TESTNET - BitShares Infrastructure Program"
    }
]


/* This node currently throws an API error for the crypto API */
var failedInitNodes = [
    {url: "wss://tyslin.crypto.fans/ws", location: "Munich"}
];

describe("Connection Manager", function() {

    afterEach(function() {
        return new Promise(function(res) {
            Manager.close().then(res);
        })
    });

    it("Instantiates", function() {
        let man = new Manager({url: defaultUrl, urls: faultyNodeList.map(a => a.url)});
        assert.equal(man.url, defaultUrl);
    });

    it("Instantiates with crypto api", function() {
        let man = new Manager({url: "wss://eu-west-fra.district1.io:9090", urls: [], optionalApis: {enableCrypto: true}});
        return new Promise( function(resolve, reject) {
            man.connect().then(() => {
                assert(!!Apis.instance().crypto_api());
                resolve();
            })
        });
    });

    it("Instantiates with orders api", function() {
        let man = new Manager({url: "wss://eu-west-fra.district1.io:9090", urls: [], optionalApis: {enableCrypto: true, enableOrders: true}});
        return new Promise( function(resolve, reject) {
            man.connect().then(() => {
                assert(!!Apis.instance().orders_api());
                resolve();
            })
        });
    });

    it("Tries to connect default url", function() {
        this.timeout(3000);
        let man = new Manager({url: defaultUrl, urls: faultyNodeList.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.connect().then(resolve)
            .catch(reject)
        });
    });

    it("Tries to connect to fallback and updates current url on connection success", function() {
        this.timeout(15000);
        let man = new Manager({url: "ws://127.0.0.1:8092", urls: faultyNodeList.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.connectWithFallback().then(function() {
                assert.equal(man.url, "wss://eu-west-fra.district1.io:9090");
                resolve();
            })
            .catch(reject)
        });
    });

    it("Rejects if no connections are successful ", function() {
        this.timeout(15000);
        let man = new Manager({url: "ws://127.0.0.1:8092", urls: noWorkingNodes.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.connectWithFallback().then(reject)
            .catch(resolve);
        });
    });

    it("Can automatically fallback when closed", function() {
        this.timeout(20000);
        let man = new Manager({
            url: "wss://eu.nodes.tyslin.ws",
            urls: ([
                "wss://eu.nodes.tyslin.ws",
                "wss://eu-west-fra.district1.io:9090"
            ]),
            autoFallback: true
        });

        return new Promise( function(resolve, reject) {
            man.connectWithFallback().then(function() {
                // Assign faulty url to simulate faulty connection
                man.url = faultyNodeList[0].url;
                Apis.instance().ws_rpc.ws.close();
                setTimeout(function() {
                    if (man.isConnected) {
                        resolve();
                        /* Set autoFallback to false here to prevent permanent reconnections*/
                        man.autoFallback = false;
                    }
                    else reject();
                }, 2000);
            });
        });
    });

    it("Can call a fallbackCb when closed", function() {
        this.timeout(20000);
        return new Promise( function(resolve, reject) {

        let man = new Manager({
            url: "wss://eu.nodes.tyslin.ws",
            urls: ([
                "wss://eu.nodes.tyslin.ws",
                "wss://eu-west-fra.district1.io:9090"
            ]),
            closeCb: function() {
                resolve();
            }
        });

            man.connectWithFallback().then(function() {
                Apis.instance().ws_rpc.ws.close();
            });
        });
    })

    it("Can check connection times for all connections", function() {
        this.timeout(20000);
        let man = new Manager({url: "ws://127.0.0.1:8090", urls: fullNodeList.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.checkConnections().then((latencies => {
                resolve();
            })).catch(reject);
        });
    });

    it("Checks connections for url and urls", function() {
        this.timeout(20000);
        let man = new Manager({url: "wss://eu.nodes.tyslin.ws", urls: ["wss://bts.open.icowallet.net/ws"]});
        return new Promise( function(resolve, reject) {
            man.checkConnections().then((latencies => {
                assert.equal(Object.keys(latencies).length, 2);
                resolve();
            })).catch(reject);
        });
    });

    // it("Throws an error if an API fails to initialize", function() {
    //     this.timeout(5000);
    //     let man = new Manager({url: failedInitNodes[0].url, urls: []});
    //     return new Promise(function(resolve, reject) {
    //         man.connect(undefined, undefined, true).then(function(res) {
    //             reject();
    //         }).catch(function(err) {
    //             resolve();
    //         });
    //     });
    // });

});
