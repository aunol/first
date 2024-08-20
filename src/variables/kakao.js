export const loadKakaoMaps = (callback) => {
  if (window.kakao && window.kakao.maps) {
    // 이미 로드된 경우 바로 callback 실행
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=abe34883b83f4fba085bcc9f8093c979&autoload=false';
  script.async = true;
  script.onload = () => {
    window.kakao.maps.load(callback);
  };
  document.head.appendChild(script);
};
