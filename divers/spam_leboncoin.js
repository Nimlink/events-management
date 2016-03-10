// We need this to build our post string
var querystring = require('querystring');
var http = require('http');

//curl 'http://www.leboncoin.fr/ar/send/0?ca=2_s&id=936017174'
//-H 'Pragma: no-cache'
//-H 'Cookie: ABTasty=ActionTrackingEvents%3AAdview%2520offres%5E%7C%5ELiwioUTMA%3A0.4.1438869014236.1439800720419.1439820305555.6%5E%7C%5ELiwioTracking%3A15080615501457057%5E%7C%5EsegmentationTracking%3A15080615501457057; OAX=WLyaplY2SY4ADKmq; RMFD=011aCwd1O108Vg; location_search_2_164_pau_64000=Pau%2064000:1; OPTOUTMULTI=0:0%7Cc3:0%7Cc1:0%7Cc2:0; BIGipServerPool_SWAN_FERME1=1100484618.36895.0000; easyid-identity=14eBWMGkJ7AmhlP2cPvrtyrgP_hki4CuelK_BM9dSHqCkzFNnWlU0v8250skOw9ICQCKdpV69aS9CT0QcjiTrfU5tsZzQYulEky9Aih-IPUNwSnNn17WqJnfnGsYIUSMUGnfpRyab5wj0dOEMsChNhRyYxUO8NPdzKIzF1E9C8FmP24uQctDsApyANgWaYMeuJdwX0UHCDPnuYYFTt_X3mZp-5RHwWi2L9813hv625HLN_CsAHHJyWtvRKvxHJVFJXJkvjsdTSvZ5wCwB7xdae-KDiMXpySFw-VrLz2nd-G_bW9yMa9DxbmC-sqY11qPS7UFFYg4-CGv_lyWIoI9nZf5-QvYy-kZOUOkGvx5qXQgyIbePViw_4uhAo7EbBrJnAxA_BDYhEFxUu54NxqVI6yDxZb2HVOsWyKRxTKTk7WiMZ4fMsbd-lkvqTyiZEh8uLA4okTWuuaQrEe8Ijkb8LsgnvDvXjlWIGhgMGWhaAQ-P5CX-WArcLd_xOVsFc7cIZ6NjGqz6CphFX8D8Dz4jXxwLoNxJ7BKZzSAD_0qH-emkNruEsGIoOAfCLPuqjDgT; layout=0; oas_ab=b; hideCookieFrame=1; xtvrn=$266818$562498$; myads-selected=online; csc=9932; cookieFrame=2; watch_status=sc:0; sq=ca=2_s&c=23&th=1&location=Serres-Castet%2064121; BIGipServerPool_SWAN_FERME2=1251479562.36895.0000; s=red1x138ed455cb915e0da0e968314623e8b1ecef9df0; cookieFrame=2; utag_main=v_id:014c2c9f6605001978292cc226c01b06c003206400ac2$_sn:38$_ss:0$_st:1457557600560$_pn:7%3Bexp-session$ses_id:1457555703086%3Bexp-session; xtan562498=-undefined; xtant562498=1; _pulse2data=d7db0299-6df0-4296-aa88-44a6ad63257d,v,x,1457556701065,,unresolved,1454474364305,true,'
// -H 'Origin: http://www.leboncoin.fr'
// -H 'Accept-Encoding: gzip, deflate'
// -H 'Accept-Language: fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4'
// -H 'Upgrade-Insecure-Requests: 1'
// -H 'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
// -H 'Content-Type: application/x-www-form-urlencoded'
// -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
// -H 'Cache-Control: no-cache'
// -H 'Referer: http://www.leboncoin.fr/ar/form/0?ca=2_s&id=936017174'
// -H 'Proxy-Connection: keep-alive'
// --data 'name=test&email=test%40gmail.com&phone=&body=abus%E9e&cc=1&send=Envoyer+votre+message' --compressed



var post_data = querystring.stringify({
    'name' : 'test',
    'email': 'sebastienthomass@gmail.com',
    'phone': '',
    'body' : 'Je suis intéressé par votre bouquin, est il tjs dispo ?',
    'cc' : '1',
    'send' : 'Envoyer+votre+message'
});

var post_options = {
    host: 'www2.leboncoin.fr',
    port: '80',
    path: '/ar/send/0?ca=2_s&id=936017174',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://www.leboncoin.fr',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Length': post_data.length,
        'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Referer': 'http://www2.leboncoin.fr/ar/form/0?ca=2_s&id=936017174',
        'Proxy-Connection': 'keep-alive',
        'Cookie':'cookieFrame=2; s=red1xac0dcc23cf987545a57547960d110d06ecb86683; utag_main=v_id:01535d3b264d001cfff0237d7b9c020b800360b00086e$_sn:1$_ss:1$_pn:1%3Bexp-session$_st:1457559870861$ses_id:1457558070861%3Bexp-session; hideCookieFrame=1; xtvrn=$562498$; xtan562498=-undefined; xtant562498=1; oas_ab=b; _pulse2data=956b8bc9-a3c3-4c77-8726-9fe8c1abc79b,v,x,1457558995248,eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..5dYV-23qEtTrpt_HgucWkQ.-Vlo_U__1k-9bvivJZ6z4SIWa6t19vQtW0LyNRMStRKkhdCWxeseakEOxulQR7pS6qZmvvLobU4Q-b8bDtMy7w.EiG_0sRFRVNlGq9KxoM2Eg,,1457572495248,true,unresolved'
    }
};

console.log('Sending post to','936017174');
var req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ',chunk);
    });
    res.on('end', function () {
        console.log('Sent',res);
    })
});

req.on('error', function(e){
    console.log('problem with request: ',e.message);
});

req.write(post_data);
req.end();
