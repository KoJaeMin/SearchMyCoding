$(function() {
    $.getJSON('/inflean_data' , function(res) {
        $(".inflearn .courses a").remove();
        for(var i=0;i<res.length;i++){
            var rate=parseInt(res[i].rating)/20;
            $(".inflearn .courses").append(
                `<a class="course" href="${res[i].link}">
                    <div>
                        <!--강의 이미지-->
                        <div class="course_image">
                            <img src="${res[i].image}" style="width:100%;height:100%;object-fit:cover;">
                        </div>
                        <!--강의 제목-->
                        <div class="course_title">
                            ${res[i].title}
                        </div>
                        <!--강의 가격-->
                        <div class="course_price">
                            ${res[i].price}
                        </div>
                        <!--강의 평점-->
                        <div class="course_rating">
                            ★ ${rate}/5
                        </div>
                    </div>
                </a>`
            )
        }
    });
    $.getJSON('/opentutorials' , function(res) {
        $(".opentutorials .courses a").remove();
        for(var i=0;i<res.length;i++){
            $(".opentutorials .courses").append(
                `<a class="course" href="${res[i].link}">
                    <div>
                        <!--강의 제목-->
                        <div class="course_title">
                            ${res[i].title}
                        </div>
                        <!--강의 가격-->
                        <div class="course_price">
                            무료
                        </div>
                    </div>
                </a>`
            )
        }
    });
});
