const unirest = require('unirest');

const orgCreate = 'http://192.168.29.160:3002/organizations/create'; 
const createSiteApi = "http://192.168.29.160:3002/site/create";
const createUnitApi ="http://192.168.29.160:3002/unit/create"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTY5NDZlYzk2YTQ4MDY2MDQ2YjM4YSIsInBob25lIjoiNjM3NjQwMjM3MSIsImlhdCI6MTc0MzE2NDUzNSwiZXhwIjoxNzQzMTg2MTM1fQ.ISWn0I4Zzv1hvDAzphE5hjixJ7oQ-sWgYvT7DBhQGyk'; 

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createOrganization(name) {
  console.log("try top",name)
  try {
    const response = await unirest
      .post(`${orgCreate}`)
      .headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      .send({"name":name});
      console.log("org create response",response.body.name);

    if (response.error) {
      console.error('Error creating organization:', response.error);
      return null;
    }

    console.log('Organization created:', response.body);
    return response.body.id;
    // return response.body.id;
  } catch (error) {
    console.error('Error creating organization:', error);
    return null;
  }


}

async function createSite(orgId, name) {
  console.log("createSite",orgId);
  console.log("createSitename",name);
  try {
    const response = await unirest
      .post(`${createSiteApi}`)
      .headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      .send({ "organizationId":orgId, "name":name });
      // console.log("site rep",response.body)

    if (response.error) {
      console.error('Error creating site:', response.error);
      return null;
    }

    console.log('Site created:', response.body);
    return response.body.id;
  } catch (error) {
    console.error('Error creating site:', error);
    return null;
  }
}

async function createUnit(siteId, name) {
  try {
    const response = await unirest
      .post(`${createUnitApi}`)
      .headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      .send({"sitesId":siteId, "name":name });
      console.log("createsite fun",response.body)
    if (response.error) {
      console.error('Error creating unit:', response.error);
      return null;
    }

    // console.log('Unit created:', response.body);
    return response.body.id;
  } catch (error) {
    console.error('Error creating unit:', error);
    return null;
  }
}


async function OrgSiteUnit() {
  var count=0;
  for (let i = 1; i <= 10; i++) {
    const orgName = `Organization_${i}`;
    const orgId = await createOrganization(orgName);
    console.log("org name",orgId)

    if (orgId) {
      console.log("orgId",true)
      const numSites = getRandomInt(2, 5); // 2 to 5 sites
      console.log("numSites",numSites)
      count+=numSites;
      for (let j = 1; j <= numSites; j++) {
        const siteName = `Site_${j}for${orgName}`;
        console.log("siteName",siteName)
        const siteId = await createSite(orgId, siteName);

        if (siteId) {
          console.log("siteId",true)
          const unitName = `Unit_1_for_${siteName}`;
          await createUnit(siteId, unitName);
        }
      }
    }
    else{
      console.log("no daata is here")
    }
  }

  console.log("count",count)
}

OrgSiteUnit();
