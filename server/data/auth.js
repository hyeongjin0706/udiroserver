// abcd1234:
let users = [
    {
        id: '1',
        username: 'melon',
        password: '$2b$10$ni1ekOL/oE197B4jqYOTUuMbmW7fSemQu9k8UYJ71a66ogGBVM.gy',
        name: '이메론',
        email: 'melon@melon.com',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAUs',
    }
];

export async function findByUsername(username) {
    return users.find((user) => user.username === username);
};

export async function createUser(user) {
    const created =  {...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
}

export async function findById(id) {
    return users.find((user) => user.id === id);
};