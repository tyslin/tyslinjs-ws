let _this;

let ecc_config = {
    address_prefix: process.env.npm_config__graphene_ecc_default_address_prefix || "TYS" 
};

_this = {
    core_asset: "CORE",
    address_prefix: "TYS",
    expire_in_secs: 15,
    expire_in_secs_proposal: 24 * 60 * 60,
    review_in_secs_committee: 24 * 60 * 60,
    networks: {
        Tyslin: {
            core_asset: "TYS",
            address_prefix: "TYS",
            chain_id: "0aa492ba80c38093a65bd1c1c8e8a48f26bda25d932b6e9e10b8dad1ec94fb8a"
        },        
        BitShares: {
            core_asset: "BTS",
            address_prefix: "BTS",
            chain_id: "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8"
        },
        Muse: {
            core_asset: "MUSE",
            address_prefix: "MUSE",
            chain_id: "45ad2d3f9ef92a49b55c2227eb06123f613bb35dd08bd876f2aea21925a67a67"
        },
        Test: {
            core_asset: "TEST",
            address_prefix: "TEST",
            chain_id: "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"
        },
        Obelisk: {
            core_asset: "GOV",
            address_prefix: "FEW",
            chain_id: "1cfde7c388b9e8ac06462d68aadbd966b58f88797637d9af805b4560b0e9661e"
        }
    },

    /** Set a few properties for known chain IDs. */
    setChainId: function(chain_id) {

        let i, len, network, network_name, ref;
        ref = Object.keys(_this.networks);

        for (i = 0, len = ref.length; i < len; i++) {

            network_name = ref[i];
            network = _this.networks[network_name];

            if (network.chain_id === chain_id) {

                _this.network_name = network_name;

                if (network.address_prefix) {
                    _this.address_prefix = network.address_prefix;
                    ecc_config.address_prefix = network.address_prefix;
                }

                // console.log("INFO    Configured for", network_name, ":", network.core_asset, "\n");

                return {
                    network_name: network_name,
                    network: network
                }
            }
        }

        if (!_this.network_name) {
            console.log("Unknown chain id (this may be a testnet)", chain_id);
        }

    },

    reset: function() {
        _this.core_asset = "CORE";
        _this.address_prefix = "TYS";
        ecc_config.address_prefix = "TYS";
        _this.expire_in_secs = 15;
        _this.expire_in_secs_proposal = 24 * 60 * 60;

        console.log("Chain config reset");
    },

    setPrefix: function(prefix = "TYS") {
        _this.address_prefix = prefix;
        ecc_config.address_prefix = prefix;
    }
}

export default _this;
