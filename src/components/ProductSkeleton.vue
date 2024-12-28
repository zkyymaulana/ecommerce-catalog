<template>
  <div class="product_card skeleton-card">
    <div class="skeleton-content">
      <div class="skeleton-left">
        <div class="skeleton-image"></div>
      </div>

      <div class="skeleton-right">
        <div class="skeleton-breadcrumb"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-rating"></div>
        <div class="skeleton-category"></div>
        <div class="skeleton-description">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    </div>

    <div class="skeleton-footer">
      <div class="skeleton-price"></div>
      <div class="skeleton-button"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background: white;
  height: 500px;
  width: 900px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
}

.skeleton-content {
  display: flex;
  gap: 3rem;
}

.skeleton-left {
  width: 300px;
  flex-shrink: 0;
}

.skeleton-image {
  width: 300px;
  height: 300px;
  background: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

.skeleton-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.skeleton-breadcrumb {
  height: 16px;
  width: 60%;
  background: #f0f0f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-title {
  height: 28px;
  width: 80%;
  background: #f0f0f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-rating {
  height: 20px;
  width: 40%;
  background: #f0f0f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-category {
  height: 24px;
  width: 30%;
  background: #f0f0f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-description {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.skeleton-line {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-line:nth-child(1) {
  width: 100%;
}
.skeleton-line:nth-child(2) {
  width: 90%;
}
.skeleton-line:nth-child(3) {
  width: 80%;
}

.skeleton-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid #eee;
}

.skeleton-price {
  height: 40px;
  width: 100px;
  background: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

.skeleton-button {
  height: 40px;
  width: 120px;
  background: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 1024px) {
  .skeleton-card {
    width: 800px;
    height: 480px;
  }

  .skeleton-left {
    width: 280px;
  }

  .skeleton-image {
    width: 280px;
    height: 280px;
  }
}

@media (max-width: 768px) {
  .skeleton-card {
    width: 100%;
    height: auto;
    min-height: 580px;
    padding: 1.5rem;
  }

  .skeleton-content {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .skeleton-left {
    width: 250px;
  }

  .skeleton-image {
    width: 250px;
    height: 250px;
  }

  .skeleton-right {
    width: 100%;
    align-items: center;
  }

  .skeleton-breadcrumb,
  .skeleton-title,
  .skeleton-rating,
  .skeleton-category,
  .skeleton-line {
    width: 100%;
  }

  .skeleton-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .skeleton-price,
  .skeleton-button {
    width: 100%;
  }
}
</style>
