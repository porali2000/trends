exports.handler = async(event) => {
    const googleTrends = require('google-trends-api');
    var key = event['queryStringParameters']['keyword'];
    var geo = event['queryStringParameters']['geo'];
    var status = 200;
    var toReturn = 'Ok';

    console.log('keyword', key);
    console.log('geo', geo);
    console.log('startdate', startdate);
    console.log('enddate', enddate);
    if ('undefined' != event['queryStringParameters']['startdate'] &&
        null != event['queryStringParameters']['startdate']) {
        var startdate = new Date(event['queryStringParameters']['startdate']);
        var enddate = new Date(event['queryStringParameters']['enddate']);
        var pro = await googleTrends.interestByRegion({
                keyword: key,
                startTime: startdate,
                endTime: enddate,
                geo: geo
            })
            .then((res) => {
                toReturn = res;
                status = 200;
            })
            .catch((err) => {
                console.error(err);
                toReturn = "{'Error' :'" + err + "'}";
                status = 400;
            });
    }
    else {
        var pro = await googleTrends.interestByRegion({
                keyword: key,
                geo: geo
            })
            .then((res) => {
                toReturn = res;
                status = 200;
            })
            .catch((err) => {
                console.error(err);
                toReturn = "{'Error' :'" + err + "'}";
                status = 400;
            });
    }
    const response = {
        statusCode: status,
        body: JSON.stringify(toReturn)
    };
    return response;
}
