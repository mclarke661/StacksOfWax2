const axios = require('axios');

let endp = 'http://jbusch.webhosting2.eeecs.qub.ac.uk/tvapi/?shows';

axios.get(endp).then(resp => {

    // console.log('Status Code:', resp.status);
    // console.log('Date in Response header:', resp.headers);

    const result = resp.data;

    for(show of result) {
      console.log(`Got TV show id::: ${show.id} Got TV show name:::  ${show.showname}`);
    }
  }).catch(err => {
    console.log('Error: ', err.message);
});

let singleshow = 1005;
let endps = `http://jbusch.webhosting2.eeecs.qub.ac.uk/tvapi/?id=${singleshow}`;

axios.get(endps).then(resp2 => {

    const showresult = resp2.data;

    showresult.forEach((tvshow) => {
        console.log("SHOW NAME");
        console.log(`id::: ${tvshow.id} 
                     show name:::  ${tvshow.showname} - ${tvshow.descript}`);
        console.log("\n");
    });

  }).catch(err => {
    console.log('Error: ', err.message);
});