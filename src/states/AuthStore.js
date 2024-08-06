// stores/AuthStore.js
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class AuthStore {
    user = {};
    isLoggedIn = false;

    constructor() {
        makeAutoObservable(this);
    }

    async login(userId, password) {
        try {
            const response = await axios.post('http://localhost:8080/login', { userId, password });
            const result = response.data;

            if (result.message === '로그인 성공') {
                runInAction(() => {
                    this.user = {
                        userNo: result.userNo,
                        userId: result.userId,
                        userName: result.userName
                        
                    };
                    this.isLoggedIn = true;
                });

                alert(`${result.userName}님 환영합니다.`);
                if (result.userLoc) {
                    alert(`지역은 ${result.userLoc}로 지정되어 있습니다.\n변경은 ACCOUNT - 내정보에 있습니다.`);
                } else {
                    alert('지역을 설정해주세요.');
                }
            } else {
                runInAction(() => {
                    this.isLoggedIn = false;
                });
                alert(result.message);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    }

    logout() {
        runInAction(() => {
            this.user = {};
            this.isLoggedIn = false;
        });
    }
}

export default new AuthStore();
