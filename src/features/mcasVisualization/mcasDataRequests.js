const headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json"
});

const graphQLEndpoint = "http://localhost:4000/graphql";

const createQueryStringWithSchoolCode = schoolCode => {
  return JSON.stringify({
    query: `{
    school(subject: "MATH", schoolCode: ${schoolCode})
      {
        subject
        schoolName
        schoolCode
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
  schools(subject: "ELA") {
    subject
    schoolName
    schoolCode
  }
}`
});

export const fetchSchoolArray = schoolCode => {
  const queryString = createQueryStringWithSchoolCode(schoolCode);
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
      console.log("Request for all schools failed", error);
    });
};
