export const createUrl = (path) => {
    const baseUrl = 'http://223.130.154.211:8080/'; // 기본 URL
    return `${baseUrl}${path.replace(/^\//, '')}`; // baseUrl과 path를 결합하여 전체 URL 생성
  };