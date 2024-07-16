import { useEffect } from "react";

const { kakao } = window;

const Kakao = () =>{
    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=abe34883b83f4fba085bcc9f8093c979&autoload=false`
        document.head.appendChild(kakaoMapScript)
      
        const onLoadKakaoAPI = () => {
          window.kakao.maps.load(() => {
            var container = document.getElementById('map')
            var options = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 5,
            }
      
            var map = new window.kakao.maps.Map(container, options)
          })
        }
      
        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
      }, [])


    return(
        <div id="map" style={{ width: "700px", height: "500px" }}></div>

    )

}
export default Kakao;