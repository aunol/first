export const loadKakaoMaps = (callback) => {
  if (window.kakao && window.kakao.maps) {
    // 이미 로드된 경우 바로 callback 실행
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false';
  script.async = true;
  script.onload = () => {
    window.kakao.maps.load(callback);
  };
  document.head.appendChild(script);
};
