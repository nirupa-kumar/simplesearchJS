// Doctor database for the San Francisco Bay Area
var data = [
    {
    name:'Michael Henehan',
    specialty:'Family Medicine',
    area:'Palo Alto',
    gender:'M',
    reviewScore:4.6
    },
    {
    name:'Grace Yu',
    specialty:'Family Medicine',
    area:'Mountain View',
    gender:'F',
    reviewScore:4.8
    },
    {
    name:'William Cabell',
    specialty:'Family Medicine',
    area:'Palo Alto',
    gender:'M',
    reviewScore:4.6
    },
    {
    name:'Amy Adams',
    specialty:'Family Medicine',
    area:'Mountain View',
    gender:'F',
    reviewScore:4.9
    },
    {
    name:'Daljeet Rai',
    specialty:'Family Medicine',
    area:'Mountain View',
    gender:'M',
    reviewScore:4.7
    },
    {
    name:'Susan Swetter',
    specialty:'Dermatology',
    area:'Palo Alto',
    gender:'F',
    reviewScore:4.8
    },
    {
    name:'Justin Ko',
    specialty:'Dermatology',
    area:'Fremont',
    gender:'M',
    reviewScore:4.6
    },
    {
    name:'Carolyn Lee',
    specialty:'Dermatology',
    area:'Palo Alto',
    gender:'F',
    reviewScore:4.6
    },
    {
    name:'George Triadapoulos',
    specialty:'Gastroenterology',
    area:'Mountain View',
    gender:'M',
    reviewScore:4.9
    },
    {
    name:'Mildred Garcia',
    specialty:'Gastroenterology',
    area:'Fremont',
    gender:'F',
    reviewScore:4.8
    },
    {
    name:'Michael Ladabaum',
    specialty:'Gastroenterology',
    area:'Palo Alto',
    gender:'M',
    reviewScore:4.7
    },
    {
    name:'Darius Moshfeghi',
    specialty:'Ophthalmology',
    area:'Mountain View',
    gender:'F',
    reviewScore:4.7
    },
    {
    name:'Michael Marmor',
    specialty:'Ophthalmology',
    area:'Fremont',
    gender:'M',
    reviewScore:4.9
    },
    {
    name:'Theodore Leng',
    specialty:'Ophthalmology',
    area:'Fremont',
    gender:'F',
    reviewScore:4.8
    },
    {
    name:'Peter Koltai',
    specialty:'Pediatrics',
    area:'Mountain View',
    gender:'M',
    reviewScore:4.9
    },
    {
    name:'Kay Chang',
    specialty:'Pediatrics',
    area:'Mountain View',
    gender:'M',
    reviewScore:4.8
    },
    {
    name:'Manisha Panchal',
    specialty:'Pediatrics',
    area:'Fremont',
    gender:'F',
    reviewScore:4.8
    },
    {
    name:'Susan DeHaan',
    specialty:'Pediatrics',
    area:'Los Gatos',
    gender:'F',
    reviewScore:4.9
    },
    {
    name:'Paula Adams',
    specialty:'Neurology',
    area:'Fremont',
    gender:'F',
    reviewScore:4.9
    },
    {
    name:'Gerald Grant',
    specialty:'Neurology',
    area:'Mountain View',
    gender:'M',
    reviewScore:4.7
    }
];

/* Going to have 4 fields on screen to be entered by the User to search for doctors:
 * Name
 * Speciality
 * Area
 * Gender
 * Review Score
 * Based on the fields entered by the User the searc h result will be determined and the list of doctors generated based on the Review Score
 * Function should be called on hitting the Search button on screen - Currently no UI work has been done
 */

var search = function(drName, drArea, drSpecialty, drGender, drReviewScore) {
    var currRes = data;
    var tempRes = [];

    //If no values are entered by the User, the complete list of doctors is displayed on screen.
    if(!drName && !drArea && !drSpecialty && !drReviewScore && !drGender){
        return(data);
    } else {
        if(drName!=null){
            tempRes = generateResult(drName,'name',currRes);
            currRes = tempRes;
            tempRes = [];
        }
        if(drArea !=null){
            tempRes = generateResult(drArea,'area',currRes);
            currRes = tempRes;
            tempRes = [];
        }
        if(drSpecialty !=null){
             tempRes = generateResult(drSpecialty,'specialty',currRes);
            currRes = tempRes;
            tempRes = [];
        }
        if(drReviewScore !=null){
             tempRes = generateResult(drReviewScore,'reviewScore',currRes);
            currRes = tempRes;
            tempRes = [];
        }
        if(drGender !=null){
             tempRes = generateResult(drGender,'gender',currRes);
            currRes = tempRes;
            tempRes = [];
        }
        if(currRes.length >0){
            reviewScoreSort(currRes);

            console.log("SEARCH RESULT =  "+JSON.stringify(currRes));
            return (currRes);
        } else {
            return(null);
        }

    }
};

/* Function to sort based on review score (high to low)*/
var reviewScoreSort = function(currRes) {
    currRes.sort(function(a,b){
       return (b.reviewScore - a.reviewScore);
    });
    return currRes;
};

/* Function to generate result for each search criteria */
var generateResult = function(value,property,currRes) {
    var tempRes = [];
    currRes.forEach(function(entry){
        var pattern = new RegExp(value);// currently this is a case-sensitive search
        var res =  pattern.test(entry[property]);
        if(res){
            tempRes.push(entry);
        }
    });
    return tempRes;
    console.log("generate result "+JSON.stringify(currRes));
}

/* Result Stats */
var results = {
    total: 0,
    failed: 0
};

/* Unit test helper */
function test(drName, drSpecialty, drArea, drGender, drReviewScore, expected) {
    /* Result Stats */
    currRes = data;
    results.total++;

    var result = search(drName, drArea, drSpecialty, drGender, drReviewScore);

    //if (result !== expected) Using Lodash to compare objects
    if(expected == null && result == null) {
        console.log("expected = NULL, result = NULL");
        console.log("TEST SUCCESS!!!");
    } else if(expected == null && result != null ) {
        console.log("expected = NULL");
        console.log("result = "+ JSON.stringify(result));
        console.log("TEST FAILURE!!!");
    } else if(expected != null && result == null){
        console.log("expected = " + JSON.stringify(expected));
        console.log("result = NULL");
        console.log("TEST FAILURE!!!");
    } else if(!Array.isArray(expected)) {
        if(!_.isEqual(result, expected)){
            console.log("in non array");
            results.failed++;
            console.log("Expected : " + expected + ", but was : " + result);
        }
    } else {
        var exptdJson = JSON.stringify(expected);
        console.log("EXPECTED JSON " +exptdJson);
        if(!_.isEqual(result,expected)){
            results.failed++;
            console.log("TEST FAIL : Expected : " + expected + ", but was : " + result);
        } else {
            console.log("TEST SUCCESS!!!")
        }
    }
}

/***************** Unit Tests **********************/
function unitTests(){

    //Test 1: When all null values passed
    console.log("Running test 1....");
    test(null,null,null,null,null,data);
    console.log("End test 1....");
    console.log("***************************************************************************");

    //Test 2: When no matching records found
    console.log("Running test 2....");
    test('Cass','Palo Alto','Gastro',null,null,null);
    console.log("End test 2....");
    console.log("***************************************************************************");

    //Test 3: When partial name entered (Individual field + partial test)
    console.log("Running test 3....");
    var expectedResult = [{"name":"Michael Marmor","specialty":"Ophthalmology","area":"Fremont","gender":"M","reviewScore":4.9},
                          {"name":"Michael Ladabaum","specialty":"Gastroenterology","area":"Palo Alto","gender":"M","reviewScore":4.7},
                          {"name":"Michael Henehan","specialty":"Family Medicine","area":"Palo Alto","gender":"M","reviewScore":4.6}];

    test('Mich',null,null,null,null,expectedResult);
    console.log("End test 3....");
    console.log("***************************************************************************");

    //Test 4: When partial name, area, specialty are entered (partial string + combo search)
    console.log("Running test 4....");
    expectedResult = [{"name":"Michael Marmor","specialty":"Ophthalmology","area":"Fremont","gender":"M","reviewScore":4.9}];
    test('Mich','Ophthalmology','Fremont',null,null,expectedResult);
    console.log("End test 4....");
    console.log("***************************************************************************");

    //Test 5: When gender alone is entered
    console.log("Running test 5....");
    expectedResult = [{"name":"George Triadapoulos","specialty":"Gastroenterology","area":"Mountain View","gender":"M","reviewScore":4.9},
                      {"name":"Michael Marmor","specialty":"Ophthalmology","area":"Fremont","gender":"M","reviewScore":4.9},
                      {"name":"Peter Koltai","specialty":"Pediatrics","area":"Mountain View","gender":"M","reviewScore":4.9},
                      {"name":"Kay Chang","specialty":"Pediatrics","area":"Mountain View","gender":"M","reviewScore":4.8},
                      {"name":"Daljeet Rai","specialty":"Family Medicine","area":"Mountain View","gender":"M","reviewScore":4.7},
                      {"name":"Michael Ladabaum","specialty":"Gastroenterology","area":"Palo Alto","gender":"M","reviewScore":4.7},
                      {"name":"Gerald Grant","specialty":"Neurology","area":"Mountain View","gender":"M","reviewScore":4.7},
                      {"name":"Michael Henehan","specialty":"Family Medicine","area":"Palo Alto","gender":"M","reviewScore":4.6},
                      {"name":"William Cabell","specialty":"Family Medicine","area":"Palo Alto","gender":"M","reviewScore":4.6},
                      {"name":"Justin Ko","specialty":"Dermatology","area":"Fremont","gender":"M","reviewScore":4.6}]
    test(null,null,null,'M',null,expectedResult);
    console.log("End test 5....");
    console.log("***************************************************************************");

    //Test 6: When partial name and area is entered
    console.log("Running test 6....");
    expectedResult= [{"name":"Michael Ladabaum","specialty":"Gastroenterology","area":"Palo Alto","gender":"M","reviewScore":4.7},
                     {"name":"Michael Henehan","specialty":"Family Medicine","area":"Palo Alto","gender":"M","reviewScore":4.6}];
    test('Mich',null,'Palo Alto',null,null,expectedResult);
    console.log("End test 6....");
    console.log("***************************************************************************");

    //Test 7: When specialty alone is entered
    console.log("Running test 7....");
    expectedResult= [{"name":"Michael Marmor","specialty":"Ophthalmology","area":"Fremont","gender":"M","reviewScore":4.9},
                     {"name":"Theodore Leng","specialty":"Ophthalmology","area":"Fremont","gender":"F","reviewScore":4.8},
                     {"name":"Darius Moshfeghi","specialty":"Ophthalmology","area":"Mountain View","gender":"F","reviewScore":4.7}];
    test(null,"Ophthalmology",null,null,null,expectedResult);
    console.log("End test 7....");
    console.log("***************************************************************************");

    //Test 8: : When Area alone is entered partially
    console.log("Running test 8....");
    expectedResult = [{"name":"Amy Adams","specialty":"Family Medicine","area":"Mountain View","gender":"F","reviewScore":4.9},
                      {"name":"George Triadapoulos","specialty":"Gastroenterology","area":"Mountain View","gender":"M","reviewScore":4.9},
                      {"name":"Peter Koltai","specialty":"Pediatrics","area":"Mountain View","gender":"M","reviewScore":4.9},
                      {"name":"Grace Yu","specialty":"Family Medicine","area":"Mountain View","gender":"F","reviewScore":4.8},
                      {"name":"Kay Chang","specialty":"Pediatrics","area":"Mountain View","gender":"M","reviewScore":4.8},
                      {"name":"Daljeet Rai","specialty":"Family Medicine","area":"Mountain View","gender":"M","reviewScore":4.7},
                      {"name":"Darius Moshfeghi","specialty":"Ophthalmology","area":"Mountain View","gender":"F","reviewScore":4.7},
                      {"name":"Gerald Grant","specialty":"Neurology","area":"Mountain View","gender":"M","reviewScore":4.7}];
    test(null,null,"Mountain",null,null,expectedResult);
    console.log("End test 8....");
    console.log("***************************************************************************");

    console.log(results);
    console.log("***************************************************************************");
}

unitTests();
