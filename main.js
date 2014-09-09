/* ###### ######### */
/* GLOBAL VARIABLES */
var hanzis = [];

/* ######## #### ###### */
/* DOCUMENT JUST LOADED */
tenMostUsedHanzis();

/* ##### ######### */
/* EVENT LISTENERS */
document.addEventListener('keyup', tenMostUsedHanzis, false);
document.getElementById('number-of-hanzis').addEventListener('keyup', changeNumberOfHanzis, false);

/* #### ##### ######### */
/* USER LEVEL FUNCTIONS */

function tenMostUsedHanzis() {
  // variables :
  var stringToStudy = document.getElementById('text').textContent;

  // from string '的区区' to hanzis [{key: '区', value: 2}, {key: '的', value: 1}]
  var allCharacters = stringToStudy.split('');
  allCharacters = removeUseless(allCharacters);
  hanzis = createHanzis(allCharacters);
  hanzis = sortHanzis(hanzis);

  modifyResultSection(hanzis, getNumberOfHanzisToShow())
}

function changeNumberOfHanzis() {
  var numberOfHanzis = getNumberOfHanzisToShow();

  modifyResultSection(hanzis, numberOfHanzis)
}

function modifyResultSection(array, numberOfHanzis) {
  var analyseResult =  document.getElementById('result');

  //remove everything in the result node
  analyseResult.innerHTML = '';

  // show the hanzis in the result node:
  analyseResult.appendChild(createHanzisHTML(array, numberOfHanzis));
}

/* ##### ######### */
/* BASIC FUNCTIONS */

/* removeUseless(array)
    -> takes a string
    -> returns an array of characters [d, s, e, s]
*/
function removeUseless(array) {

  var uselessStuff = ['，', '。', ',', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', ':', '!', '?', '、'];

  for(var i = array.length; i--;){
    for (j=0; j<uselessStuff.length; j++) {
      if (array[i] === uselessStuff[j]) {
        array.splice(i, 1);
      }
    }
  }

  return array;

}

/* createHanzis(array)
    -> takes an array of characters [d, s, e, s]
    -> returns an array [{key: blabla, value: blabla}]
       - with value = number of times the character appeared and no doubles
*/
function createHanzis(array) {

  var arrayOfHanzis = [];

  for ( var i=0; i<array.length; i++) {
  	var exist = false;

    //regarder s'il existe dans le tableau hanzis[]
    for ( var j=0; j<arrayOfHanzis.length; j++) {
      if (arrayOfHanzis[j].key === array[i]) {
        exist = true;
        arrayOfHanzis[j].value++;
      }
    }

    //S'il n'existe pas, le rajouter
    if (!exist) {
      arrayOfHanzis.push({ key: array[i], value: 1 });
    }

  }
  return arrayOfHanzis;
}

/* sortHanzis(array)
    -> takes an array of hanzis [{key: blabla, value: blabla}]
    -> returns a similar array, but sorted by decreasing value
*/
function sortHanzis(array) {

  array.sort(function(a, b){
    return b.value-a.value;
  })

  return array;
}

/* createHanzisHTML(array)
    -> takes an array of hanzis [{key: blabla, value: blabla}]
    -> returns an HTML list of this array
*/
function createHanzisHTML(array, numberOfHanzis) {

  var tableHTML = document.createElement('ul');
      tableHTML.className = 'hanzis-array';

  var i=0;
  while (i<numberOfHanzis && i<array.length) {

    var listItem = document.createElement('li');

    var hanzi = document.createElement('span');
        hanzi.textContent = array[i].key;
        hanzi.className = 'hanzis-array__hanzi';

    var quantity = document.createElement('span');
        quantity.textContent = array[i].value;
        quantity.className = 'hanzis-array__quantity';

    listItem.appendChild(hanzi);
    listItem.appendChild(quantity);
    tableHTML.appendChild(listItem);

    i++;
  }

  return tableHTML;
}

function getNumberOfHanzisToShow() {
  var numberOfHanzis = document.getElementById('number-of-hanzis').textContent;

  if (isNaN(numberOfHanzis)) {
    return 11;
  } else {
    return numberOfHanzis;
  }
}
