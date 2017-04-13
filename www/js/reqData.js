var url = "https://mint1.coms.hk";
var mint1 = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxf17kB0kRznB/NH9/bokZ635UrIsO7q8NekNLUqxJDxCrCoesvqSz0Wln9tCPtfLGpwK9AXXlOtuSjxlx+yxsbIm0eNoV6TBvBnVAHHB2kehJmq/s1LYjVCbw9zQcfJBDw1K+BXirG6ExHwixxV6I8nM/JStDjqM8jUVeX3HkFqmXMKrwqloeKQ/USRHC4l11uZ8WEUQTyFloKpafGv1c2PRbLDt5UGpIxos/9hfHmpvbDA/13/IVTf0oeYLURP5+tYIVdx2tHnyKypNnZgdqYfHIrMv2bRECAsZquBOEyTZKombtIjMunafoxXn7tPAIUrG02uOnJB9UDCIxA3eZQIDAQAB";

async function req(data, l) {
    var req = {
     method: 'POST',
     url: url + "/" + l,
     headers: {
       'Content-Type': "application/json"
     },
     data: data
    }

    return req;
}

async function endorseData(taddr, sn) {
	data = {
       "faddr": localStorage.getItem("publicKeyPEM"),
        "taddr": taddr,
        "type":"TX",
        "sn":sn,
    };

    return data;
}

async function recordData() {

	var data = {	
		"faddr":localStorage.getItem("publicKeyPEM"),
		"limit":100,
		"offset":0
	};
	privateKey = await importKey(JSON.parse(localStorage.getItem("privateKey")), "sign");
	sign = await signData(privateKey, str2ab(JSON.stringify(data)));
	
	data["sign"] = buf2hex(sign);

	return data;
}