const headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json"
});

const graphQLEndpoint = "http://localhost:4000/graphql";

const createQueryStringWithSchoolCode = code => {
  return JSON.stringify({
    query: `{
    school(subject: MATH, schoolCode: ${code})
      {
        subject
        name
        code
        exceededPercent
        metPercent
        partiallyMetPercent
        notMetPercent
      }
  }`
  });
};

const allSchoolsQueryString = JSON.stringify({
  query: `{
  allSchools {
    name
    schoolCode
    districtCode
  }
}`
});

const createQueryStringWithSchoolCodeAndSubject = (subject, schoolCodes) => {
  return JSON.stringify({
    query: `{
      schoolMcas(subject: ${subject}, schoolCodes: [${schoolCodes}])
      {
        subject
        name
        code
        exceededPercent
        metPercent
        partiallyMetPercent
        notMetPercent
      }
    }`
  });
};

const createQueryStringForDistrictMcas = (codes, subject, studentGroup) => {
  return JSON.stringify({
    query: `{
      districtMcas(subject: ${subject}, codes: [${codes}], studentGroup: ${studentGroup})
      {
        subject
        name
        code
        exceededPercent
        metPercent
        partiallyMetPercent
        notMetPercent
      }
    }`
  });
};

export const fetchSchoolArray = code => {
  const queryString = createQueryStringWithSchoolCode(code);
  return fetch(graphQLEndpoint, {
    method: "POST",
    headers,
    body: queryString
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Request failed", error);
    });
};

export const fetchAllSchools = () => {
  return fetch(graphQLEndpoint, {
    method: "POST",
    headers,
    body: allSchoolsQueryString
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Request fetchAllSchools failed", error);
    });
};

const allDistrictsQueryString = JSON.stringify({
  query: `{
  allDistricts {
    name
    code
  }
}`
});

export const fetchAllDistricts = () => {
  return fetch(graphQLEndpoint, {
    method: "POST",
    headers,
    body: allDistrictsQueryString
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Request fetchAllSchools failed", error);
    });
};

export const fetchDistrictsMcas = ({ codes, subject, studentGroup }) => {
  const queryString = createQueryStringForDistrictMcas(
    codes,
    subject,
    studentGroup
  );
  return fetch(graphQLEndpoint, {
    method: "POST",
    headers,
    body: queryString
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Request failed", error);
    });
};

export const fetchAllSelectedSchools = ({ subject, schoolCodes }) => {
  const queryString = createQueryStringWithSchoolCodeAndSubject(
    subject,
    schoolCodes
  );
  return fetch(graphQLEndpoint, {
    method: "POST",
    headers,
    body: queryString
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Request failed", error);
    });
};
