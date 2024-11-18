/************************************************
 * Swiper.js
 * Created at 2024. 11. 6. 오후 2:50:10.
 *
 * @author ryu
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	cpr.core.ResourceLoader.loadScript("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js").then(function(){
		cpr.core.ResourceLoader.loadCSS("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css").then(function(){
			var vcGrpSlide = app.lookup("grpSlide");
			
			// .cl-layout 에 swiper 클래스 적용
			var voClLayout = document.querySelector(".grp-slide > .cl-layout");
			voClLayout.classList.add("swiper");
			
			// .cl-layout-content 에 swiper-wrapper 클래스 적용
			var voClLayoutContent = document.querySelector(".grp-slide > .cl-layout > .cl-layout-content");
			voClLayoutContent.classList.add("swiper-wrapper");
			
			// .cl-layout-wrap 에 swiper-slide 클래스 적용
			var vaClLayoutWrap = document.querySelectorAll(".grp-slide > .cl-layout > .cl-layout-content > .cl-layout-wrap");
			for(var idx = 0; idx < vaClLayoutWrap.length; idx++){
				/** @type HTMLElement */
				var voClLayoutWrap = vaClLayoutWrap[idx];
				voClLayoutWrap.classList.add("swiper-slide");
			}
			
			// 페이지네이션 추가
			var voPagination = document.createElement("div");
			voPagination.className = "swiper-pagination";
			voClLayout.appendChild(voPagination);
			
			// 슬라이드 버튼 추가
			var voBtnPrev = document.createElement("div");
			voBtnPrev.className = "swiper-button-prev";
			voClLayout.appendChild(voBtnPrev);

			var voBtnNext = document.createElement("div");
			voBtnNext.className = "swiper-button-next";
			voClLayout.appendChild(voBtnNext);
			
			// 스와이퍼 실행
			const swiper = new Swiper(".swiper", {
				slidesPerView: 1,
				speed: 400,
				spaceBetween: 100,
				navigation: {
			      nextEl: '.swiper-button-next',
			      prevEl: '.swiper-button-prev',
			    },
			     pagination: {
				    el: '.swiper-pagination', // 페이지네이션 요소의 클래스 이름
				    clickable: true, // 페이지네이션을 클릭할 수 있도록 설정
				  },
				allowSlideNext: true,
				allowSlidePrev: true,
				autoPlay: {
					delay: 3000
				}
			});
		});
	});
}
