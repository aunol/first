export const createUrl = (path) => {
    const baseUrl = 'http://localhost:8080/'; // 기본 URL
    return `${baseUrl}${path.replace(/^\//, '')}`; // baseUrl과 path를 결합하여 전체 URL 생성
  };