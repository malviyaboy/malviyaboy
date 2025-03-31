const unirest = require('unirest');



const getOrgApi="http://192.168.29.156:3002/organizations/all";
const createUserApi="http://192.168.29.156:3002/users/signup";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWE2YjNkOGQ4NGEwMmU2ODk0MGNlNCIsInBob25lIjoiNjM3NjQwMjM3MSIsImlhdCI6MTc0MzQxNjEzNiwiZXhwIjoxNzQzNDM3NzM2fQ.rHzQFEPkNUNPTdc0ygLT-FI1C6uwKHCeziRc4MGk5jo";


// get Organization data
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

// create users
async function createUser(organizationId, userData) {
    console.log("createuser",organizationId)
    console.log("createuseruserData",userData)
  try {
    const response = await unirest
    .post(`${createUserApi}`)
      .headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      .send(userData);
      console.log("response createUser",response.body)
    if (response.error) {
      console.error(`Error creating user for organization ${organizationId}:`, response.error);
      return null; 
    }

    console.log(`User created for organization ${organizationId}:`, response.body);
    return response.body; 
  } catch (error) {
    console.error(`An unexpected error occurred for organization ${organizationId}:`, error);
    return null; 
  }
}

// create 5 user for each organization
async function createUsersForOrganizations() {
    const orgId = await getOrg();
    let count = 0; // Start count outside the loop for global uniqueness

    console.log("orgIdhere", orgId);
    if (!orgId || orgId.length === 0) {
        console.log("No organizations found.");
        return;
    }

    for (let organization of orgId) {
        let organizationId = organization.id;
        let organizationName = organization.name;
        console.log("organizationId", organizationName);

        for (let i = 0; i < 5; i++) {
            const userData = {
                "name": `User_${organizationId}_${i + 1}`, 
                "phone": "67640237" + count, 
                "password": '1234', 
                "role": 'User', 
                "organizationId":organizationId
            };

            count++; 

            const result = await createUser(organizationId, userData);
            if (result) {
                userCreated = true;
            }
        }
    }
}

createUsersForOrganizations();