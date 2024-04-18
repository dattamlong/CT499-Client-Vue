<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../../assets/images/banner-1.jpg" class="d-block w-100" alt="banner-1" />
        <div class="carousel-caption d-none d-md-block">
          <h5>Light Novel</h5>
          <p>Đắm mình vào cánh đồng tiểu thuyết nhật bản cuốn hút</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../../assets/images/banner-2.jpg" class="d-block w-100" alt="banner-2" />
        <div class="carousel-caption d-none d-md-block">
          <h5>Tiểu thuyết</h5>
          <p>Một thể loại văn học phổ biến với góc nhìn đa chiều và đa dạng thể loại</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../../assets/images/banner-3.jpg" class="d-block w-100" alt="banner-3" />
        <div class="carousel-caption d-none d-md-block">
          <h5>Self Help</h5>
          <p>Phát triển bản thân là điều các bạn đang mong mỏi?</p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
