var users = [
    {
        id: 1,
        name: 'Hung Dang'
    },
    {
        id: 2,
        name: 'Son Dang'
    }
]

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Anh son chua ra video :('
    },
    {
        id: 2,
        user_id: 2,
        content: 'Vua ra day e'
    },
    {
        id: 3,
        user_id: 1,
        content: 'Cam on a'
    },
    {
        id: 4,
        user_id: 2,
        content: 'OK e'
    }
]
/*
Lấy comment ra
Từ comment lấy user_id
Từ user_id lấy ra user tương ứng
 */

var getComments = new Promise(function(resolve) {
    setTimeout(function() {
        resolve(comments)
    },500);
})

function getUserById(userIds) {
    return new Promise(resolve => {
        var result = users.filter(function(user) {
            return userIds.includes(user.id)
        })
        setTimeout(function() {
            resolve(result)
        }, 500)
    })
}

getComments
    .then(comments => {
        var userIds = comments.map(function(comment) {
            return comment.user_id
        })
        return getUserById(userIds)
            // .then(function(users) {
            //     return {
            //         users: users,
            //         comments: comments
            //     }
            // })
    })
    .then(users => {
        return {
            users: users,
            comments: comments
        }
    })
    // Bỏ 2 method then ở trên và bỏ data ở dưới thì vẫn trả về kết quả đúng nhưng phải duyệt qua tất cả user
    // Dùng data get từ 2 method then ở trên để tránh trường hợp phải duyệt qua những user không comment
    .then(function(data) {
        var getUlElement = document.getElementById('comment-block')
        var html = ''
        data.comments.forEach(function(comment) {
            var user = data.users.find(function(user) {
                return user.id === comment.user_id
            })
            html += `<li>${user.name}: ${comment.content}</li>`;
        });
        getUlElement.innerHTML = html;
    })
    
// Fetch
var userAPI = 'https://jsonplaceholder.typicode.com/users'
var todosAPI = 'https://jsonplaceholder.typicode.com/todos'
fetch(userAPI)
    .then(response => response.json())
    // .then(users => {
    //     var userIds = users.map(function(userId) {
    //         return users.id
    //     })
    //     return userIds
    // })
    .then( listUsers => {
        fetch(todosAPI)
            .then(response => response.json())
            .then(todosList => {
                var html = 'So cong viec da hoan thanh: <br>'
                var completeBlock =  document.getElementById('complete-todos')
                listUsers.forEach(function(user) {
                    var completed = todosList.reduce(function(total, todo) {
                        return total += (todo.userId == user.id && todo.completed)?1:0;
                    },0)
                    html += `<li>${user.name}: ${completed}</li>`
                })
                completeBlock.innerHTML = html;
            })
    })
