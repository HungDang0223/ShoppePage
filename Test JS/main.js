// // var firstnamr='Hung';
// // var lastname='Dang';
// // console.log(firstnamr + ' ' + lastname);
// // console.log(2>3);
// // console.log(typeof(firstnamr))
// // function sum(a, b) {
// //     console.log(a + b);
// // }
// // sum(2,4);
// var arr = [
//     "h",
//     'i',
//     'k',
//     'm',
//     'n'
// ]
// var myInfo = {
//     name: 'Hung',
//     age: 20,
//     address: 'Hue, VN'
// }
// function getRandomItem(arr) {
//     var len = arr.length;
//     var ran = Math.floor(Math.random() * len)
//     return arr[ran]
// }
// console.log(getRandomItem(arr));
// var age = 18;
// switch (age) {
//     case 18: console.log('18 tuoi');
//     case 17: '17 tuoi';
// }
// // for ... of không dùng cho object
// for (var key of arr) {
//     console.log(key)
// }
// function dequy(n) {
//     if (n<=1) return n; 
//     return n * dequy(n-1);
// }
// console.log(dequy(10))
// console.log(Date)
const per = {
  name: "hung"
}
let i=10
{
  i=2
  per.name = "hung1"
}
console.log(per.name)
console.log(i)
var sports = [
    {
        name: 'Bơi lội',
        gold: 11
    },
    {
        name: 'Boxing',
        gold: 3
    },
    {
        name: 'Đạp xe',
        gold: 4
    },
    {
        name: 'Đấu kiếm',
        gold: 5
    },
]

function getTotalGold(array) {
    function myFunc(total, value) {
        return total + value['gold'];
    };
    return array.reduce(myFunc,0);
}
// Expected results:
console.log(getTotalGold(sports)) // Output: 23
var watchList = [
    {
      "Title": "Inception",
      "Year": "2010",
      "Rated": "PG-13",
      "Released": "16 Jul 2010",
      "Runtime": "148 min",
      "Genre": "Action, Adventure, Crime",
      "Director": "Christopher Nolan",
      "Writer": "Christopher Nolan",
      "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
      "Plot": "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
      "Language": "English, Japanese, French",
      "Country": "USA, UK",
      "imdbRating": "8.8",
      "imdbVotes": "1,446,708",
      "imdbID": "tt1375666",
      "Type": "movie",
    },
    {
      "Title": "Interstellar",
      "Year": "2014",
      "Rated": "PG-13",
      "Released": "07 Nov 2014",
      "Runtime": "169 min",
      "Genre": "Adventure, Drama, Sci-Fi",
      "Director": "Christopher Nolan",
      "Writer": "Jonathan Nolan, Christopher Nolan",
      "Actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
      "Plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      "Language": "English",
      "Country": "USA, UK",
      "imdbRating": "8.6",
      "imdbVotes": "910,366",
      "imdbID": "tt0816692",
      "Type": "movie",
    },
    {
      "Title": "The Dark Knight",
      "Year": "2008",
      "Rated": "PG-13",
      "Released": "18 Jul 2008",
      "Runtime": "152 min",
      "Genre": "Action, Adventure, Crime",
      "Director": "Christopher Nolan",
      "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
      "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
      "Plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
      "Language": "English, Mandarin",
      "Country": "USA, UK",
      "imdbRating": "9.0",
      "imdbVotes": "1,652,832",
      "imdbID": "tt0468569",
      "Type": "movie",
    },
    {
      "Title": "Batman Begins",
      "Year": "2005",
      "Rated": "PG-13",
      "Released": "15 Jun 2005",
      "Runtime": "140 min",
      "Genre": "Action, Adventure",
      "Director": "Christopher Nolan",
      "Writer": "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
      "Actors": "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
      "Plot": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
      "Language": "English, Urdu, Mandarin",
      "Country": "USA, UK",
      "imdbRating": "8.3",
      "imdbVotes": "972,584",
      "imdbID": "tt0372784",
      "Type": "movie",
    },
    {
      "Title": "Avatar",
      "Year": "2009",
      "Rated": "PG-13",
      "Released": "18 Dec 2009",
      "Runtime": "162 min",
      "Genre": "Action, Adventure, Fantasy",
      "Director": "James Cameron",
      "Writer": "James Cameron",
      "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
      "Plot": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      "Language": "English, Spanish",
      "Country": "USA, UK",
      "imdbRating": "7.9",
      "imdbVotes": "876,575",
      "imdbID": "tt0499549",
      "Type": "movie",
    }
  ];
  
  function calculateRating(array) {
    var director = array.filter(function(value) {
        return value["Director"] == "Christopher Nolan";
    });
    var rating = director.reduce(function(total, value) {
        return total + Number(value['imdbRating']);
    }, 0);
    return rating / director.length;
  }
  
  // Expected results
  console.log(calculateRating(watchList)); // Output: 8.675
  function arrToObj(array) {
    var myObject={};
    var result = array.reduce(function(index, value) {
      myObject[index[0]] = index[1]
      myObject[value[0]] = value[1]
    })
    return myObject;
  }
   
  var arr = [
      ['name', 'Sơn Đặng'],
      ['age', 18],
  ];
  console.log(arrToObj(arr)); // { name: 'Sơn Đặng', age: 18 }

  Array.prototype.myMap = function(cb) {
    var output = [];
    for (let i=0; i<this.length; i++) {
      result = cb(this[i], i)
      output.push(result)
    }
    return output;
}
const numbers = [1, 2, 3];
console.log(numbers.myMap(function(number) {
  return number * 2;
}))
console.log(numbers.myMap(function (number, index) {
    return number * index;
}))

// myFilter prototype
Array.prototype.myFilter = function(cb) {
  var ans = [];
  for (var index in this) {
      if (this.hasOwnProperty(index)) { // Kiểm tra thuộc tính có tồn tại trong this
        result = cb(this[index], index, this);
        if (result) {
          ans.push(this[index])
        };
      };
  }
  return ans;
}
const numbers1 = [1, 2, 3, 4];

console.log(numbers1.myFilter(function (number) {
  return number % 2 === 0;
}));
// Output: [2, 4]s
console.log(numbers1.myFilter(function (number, index) {
  return index % 2 === 0;
}));
// Output: [1, 3]

console.log(numbers1.myFilter(function (number, index, array) {
  return array.length % 2 === 0;
}));
// Output: [1, 2, 3, 4]

// mySome prototype ~ some()
Array.prototype.mySome = function(cb) {
    for (var index in this) {
      if (this.hasOwnProperty(index)) {
        if (cb(this[index], index, this)) {
          return true
        }
      }
    }
    return false;
}
const numbers2 = [1, 3, 3, 5];

console.log(numbers2.mySome(function (number) {
    return number % 2 === 0;
})); 
// Output: false
console.log(numbers2.mySome(function (number, index) {
    return index % 2 === 0;
})); 
// Output: true
console.log(numbers2.mySome(function (number, index, array) {
    return array.length % 2 === 0;
})); 
// Output: true
//forEach
const numbers3 = [1, 3, 3, 5];
var toatl = numbers3.reduce(function(total, value) {
  return total + value;
}, 10)
console.log(toatl);
var productsListElement = document.querySelector('div.products-list');
var firstProductElement = document.querySelector('div.product:first-child')
var buttonElements = document.getElementsByTagName('button');
console.log(productsListElement);
console.log(firstProductElement)
console.log(buttonElements)

const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.toString()
console.log(fruits)
console.log(fruits.sort())
// tim phan tu lon nhat trong mang voi ham max
console.log(Math.max.apply(null, [1, 2, 4, 6]))

// innerHTML

// var courses = ['HTML & CSS', 'Javascript', 'PHP', 'Java']

// function render(courses) {
//     var ulElement = document.querySelector('ul');
//     var html = courses.map(function(value) {
//       return '<li>' + value + '</li>';
//     })
//     html = html.join(`<br>`);
//     ulElement.innerHTML = html;
//     console.log(html);
// }
// render(courses);


// ClassList Property
// add class red vao element box
var boxElement = document.querySelector('.box');
var h1InBoxElement = document.querySelector('.box h1')
boxElement.classList.add('red')
// contains property kiem tra su ton tai cua 1 element trong class return true/false
console.log(boxElement.classList.contains('blue'));
// remove: xoa 1 element trong class neu co
// toogle: xoa 1 element trong class neu co, neu khong thi se them element do vao class
// boxElement.classList.toggle('green');
console.log(boxElement.classList)
console.log(h1InBoxElement.classList)
h1InBoxElement.onmousedown = function() {
  h1InBoxElement.innerHTML = "classlist";
}
h1InBoxElement.onmouseup = function() {
  h1InBoxElement.innerHTML = " CLASSLIST";
}
// DOM events
var inputTextElement = document.querySelector('.input1')
var inputCheckboxElement = document.querySelector('input[type="checkbox"]')
inputTextElement.onchange = function(e) {
  console.log(e.target.value)
}
inputCheckboxElement.onchange = function(e) {
  console.log(e.target.checked)
}

// preventDefault and StopPropagation
var getulElement = document.querySelector('ul');
getulElement.onmousedown = function(e) {
  e.preventDefault();
}
document.querySelector('ul').onclick =
  function(e) {
    console.log(e.target)
  }

var clickElement = document.querySelector('.click');
clickElement.onclick = function(e) {
  e.stopPropagation();
  console.log('click me!');
}

// event listener
// lắng nghe các sự kiện hoặc hủy bỏ lắng nghe
// Day la 1 phuong thuc
var listener1 = function() {
  console.log('event1');
}
var listener2 = function() {
  console.log('event2')
}
//addEventListener and removeEventListener chi ap dung cho 2 tham so event name + function
clickElement.addEventListener('click', listener1)
clickElement.addEventListener('click', listener2)
setTimeout(function() {
  clickElement.removeEventListener('click', listener1); // huy lang nghe sau 3s
  clickElement.removeEventListener('click', listener2);
}, 3000)

// Nhập 1 giá trị vào input rồi add nó vào list ul
var getValueInput;
//C1: dùng DOM event
// inputTextElement.onchange = function(e) {
//   getValueInput = e.target.value;
//   const newLiElement = document.createElement('li');
//   newLiElement.innerHTML = getValueInput;
//   getulElement.appendChild(newLiElement)
// };
//C2: dùng event listener
var onchangeInput = function(e) {
  getValueInput = e.target.value;
  const newLiElement = document.createElement('li');
  newLiElement.innerHTML = getValueInput;
  getulElement.appendChild(newLiElement)
};
inputTextElement.addEventListener('change', onchangeInput)

// nhập 2 value vào 2 input firstname va lastname rồi xuat ra fullname
var firstName='', lastName='';
getFirstName = document.querySelector('#firstName')
getLastName = document.querySelector('#lastName')
getFirstName.onchange = function(e1) {
  firstName = e1.target.value
  console.log(e1.target.value)
  }
  getLastName.onchange = function(e2) {
    lastName = e2.target.value
    console.log(e2.target.value)
  }
function displayFullName() {
  // dùng onlick sẽ phải thêm 1 lượt click để thực hiện -> bỏ
  var getBtnElement = document.querySelector('#showFullName')
  // getBtnElement.onclick = function(e) {
    document.getElementById('fullName').innerHTML = firstName + " " + lastName
// }
}