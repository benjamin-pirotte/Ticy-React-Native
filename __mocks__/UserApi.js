export class MockUserApi {
    constructor() {
        this.apiKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        this.user = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@fake.com',
            age: '22',
            createdAt: Date(),
            profilePictureUri: null,
            apiKey: this.apiKey
        };
        this.password = 'test';
        this.createUser = (user) => {
            return new Promise((resolve, reject) => {
                if (!user.firstName || !user.lastName || !user.email || !user.age || !user.password || !user.passwordCopy) {
                    reject('missing field');
                }
                let newUser = {
                    id: Math.random() * (100 - 1) + 1,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    age: user.age,
                    createdAt: Date(),
                    profilePictureUri: null,
                    apiKey: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
                };
                resolve(newUser);
            });
        };
        this.loginUser = (email, password) => {
            return new Promise((resolve, reject) => {
                if (!email || !password) {
                    reject('missing field');
                }
                if (this.password !== password || this.user.email !== email) {
                    reject('wrong credential');
                }
                resolve(this.user);
            });
        };
        this.getUserDetail = (apiKey) => {
            return new Promise((resolve, reject) => {
                if (this.apiKey !== apiKey) {
                    reject('wrong api key');
                }
                resolve(this.user);
            });
        };
        this.editUser = (user) => {
            if (!user.firstName || !user.lastName || !user.lastName || !user.email || !user.age) {
                reject('missing field');
            }
            let newUser = Object.assign({}, this.user, user);
            resolve(newUser);
        };
        this.editPassword = (password, passwordCopy) => {
            if (!password || !passwordCopy) {
                reject('missing field');
            }
            if (password !== passwordCopy) {
                reject('wrong password copy');
            }
            if (password === this.password) {
                reject('no change');
            }
            resolve(password);
        };
    }
}
export default MockUserApi;
//# sourceMappingURL=UserApi.js.map