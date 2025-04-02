const unirest = require('unirest');

const getOrgApi="http://192.168.29.156:3002/organization/all";
const createGatewayApi="http://192.168.29.156:3002/gateway";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWE2YjNkOGQ4NGEwMmU2ODk0MGNlNCIsInBob25lIjoiNjM3NjQwMjM3MSIsImlhdCI6MTc0MzU5MDAxNiwiZXhwIjoxNzQzNjExNjE2fQ._3ZSQAUm2N-faMGxi_CX1bdZ0DkyMAEQ18fp2YZh8_M";


// hex xonversion of string and number
function euiStringHex(prefix, dec) {
    function stringToHex(str) {
      let hex = '';
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        const hexValue = charCode.toString(16).toUpperCase();
        hex += hexValue.padStart(2, '0');
      }
      return hex;
    }
  
    function decToHex(decimal) {
      return decimal.toString(16).toUpperCase().padStart(4, '0');
    }
  
    const prefixHex = stringToHex(prefix);
    const decHex = decToHex(dec);
  
    return prefixHex + decHex;
  }

//   get organization data
    async function getOrg(){
        try{
            const response=await unirest.get(`${getOrgApi}`)
            .headers({
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            });
            console.log("response",response.body)
            return response.body;
        }
        catch (error) {
            console.error('Error creating organization:', error);
            return null;
          }
        //   console.log("res",response.body.id)
    }

// create sensor data
async function createGateway(organizationId, gatewayData){
    // console.log("organizationId",organizationId)
    // console.log("gatewayData",gatewayData)
    try {
        const response = await unirest
        .post(`${createGatewayApi}`)
          .headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
          .send(gatewayData);
        //   console.log("response createUser",response.body)
        if (response.error) {
          console.error(`Error creating user for organization ${organizationId}:`, response.error);
          return null; 
        }
    
        // console.log(`User created for organization ${organizationId}:`, response.body);
        return response.body; 
      } catch (error) {
        console.error(`An unexpected error occurred for organization ${organizationId}:`, error);
        return null; 
      }
}

async function createGatewayForOrganization(){
    let count = 1;
    const orgId = await getOrg();
    console.log("orgId",orgId)
    if (!orgId || orgId.length === 0) {
        console.log("No organizations found.");
        return;
    }
    for (let organization of orgId) {
        let organizationId=organization.id;
        // console.log("organization",organizationId);
        for(let i=0;i<5;i++){
            const gatewayData={
                "sn": `${euiStringHex("BLGT",count)}`,
                "region":"IN865 ",
                "organizationId": `${organizationId}`
            }
            const result = await createGateway(organizationId, gatewayData);
            count++;
        }
        console.log("totle count",count)
        
    }
}

createGatewayForOrganization();

// getOrg();
