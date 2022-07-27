const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
	  "Content-Type": "application/json"
  };

  try {
	  switch (event.routeKey) {
  	    case "GET /gdscore":
    	    body = await dynamo.scan({ TableName: "gd-results" }).promise();
    	  break;
  	    case "PUT /gdscore":
    	    let requestJSON = JSON.parse(event.headers);
    	  await dynamo.put({
        	TableName: "gd-results",
        	Item: {
        	  recordID: "" + new Date(),
            game: requestJSON.game,
            score: requestJSON.score
        	  }
      	})
      	.promise();
    	  body = `Put item ${requestJSON.id}`;
    	  break;
  	    default:
    	    throw new Error(`Unsupported route: "${event.routeKey}"`);
	      }
  } catch (err) {
	  statusCode = 400;
	  body = err.message;
  } finally {
	  body = JSON.stringify(body);
  }
  return {
	  statusCode,
	  body,
	  headers
  };
};
